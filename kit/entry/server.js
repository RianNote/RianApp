/* eslint-disable no-param-reassign, no-console */

// Server entry point, for Webpack.  This will spawn a Koa web server
// and listen for HTTP requests.  Clients will get a return render of React
// or the file they have requested
//
// Note:  No HTTP optimisation is performed here (gzip, http/2, etc).  Node.js
// will nearly always be slower than Nginx or an equivalent, dedicated proxy,
// so it's usually better to leave that stuff to a faster upstream provider

// ----------------------
// IMPORTS

/* Node */
import path from 'path';

/* NPM */

// Patch global.`fetch` so that Apollo calls to GraphQL work
import 'isomorphic-fetch';

// Needed to read manifest files
import { readFileSync } from 'fs';

// React UI
import React from 'react';

// React utility to transform JSX to HTML (to send back to the client)
import ReactDOMServer from 'react-dom/server';

// Koa 2 web server.  Handles incoming HTTP requests, and will serve back
// the React render, or any of the static assets being compiled
import Koa from 'koa';

// Apollo tools to connect to a GraphQL server.  We'll grab the
// `ApolloProvider` HOC component, which will inject any 'listening' React
// components with GraphQL data props.  We'll also use `getDataFromTree`
// to await data being ready before rendering back HTML to the client
import { ApolloProvider, getDataFromTree } from 'react-apollo';

// HTTP header hardening
import koaHelmet from 'koa-helmet';

// Koa Router, for handling URL requests
import KoaRouter from 'koa-router';

// Static file handler
import koaStatic from 'koa-static';

// High-precision timing, so we can debug response time to serve a request
import ms from 'microseconds';

// React Router HOC for figuring out the exact React hierarchy to display
// based on the URL
import { StaticRouter } from 'react-router';

// <Helmet> component for retrieving <head> section, so we can set page
// title, meta info, etc along with the initial HTML
import Helmet from 'react-helmet';

/* Local */

// Grab the shared Apollo Client
import { serverClient } from 'kit/lib/apollo';

// Custom redux store creator.  This will allow us to create a store 'outside'
// of Apollo, so we can apply our own reducers and make use of the Redux dev
// tools in the browser
import createNewStore from 'kit/lib/redux';

// Initial view to send back HTML render
import Html from 'kit/views/ssr';

// App entry point
import App from 'src/components/app';

// Import paths.  We'll use this to figure out where our public folder is
// so we can serve static files
import PATHS from 'config/paths';
import { PORT } from 'config/project';
import { isLoggedIn } from './utils/serverUtils';
// MongoDB + Mongoose
import mongoose from 'mongoose';
import mongoConfig from 'config/mongoDB';

// Auth
import session from 'koa-session';
import bodyParser from 'koa-bodyparser';
import passport from 'koa-passport';
import passportRoutes from 'config/routes';
import passportConfig from 'config/passport';
import cookieConfig from 'config/cookie';


//GraphQL Server 
import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa';
import { SubscriptionManager, PubSub } from 'graphql-subscriptions';
import { schema } from './qlSchema/schema.js';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { pubsub } from './pubsub/pubsub.js';
import koaBody from 'koa-bodyparser';
import { createServer } from 'http';
// ----------------------

// Read in manifest files
const [manifest, chunkManifest] = ['manifest', 'chunk-manifest'].map(
  name => JSON.parse(
    readFileSync(path.resolve(PATHS.dist, `${name}.json`), 'utf8'),
  ),
);

const scripts = [
  'manifest.js',
  'vendor.js',
  'browser.js'].map(key => manifest[key]);

//Make SubscriptionMAnager
const subscriptionManager = new SubscriptionManager({
  schema,
  pubsub: pubsub,
  setupFunctions: {
    //어떤 서브스크립션에 대한 검증인가
    chatSubscription: (options, args) => ({ //이렇게 리턴으로 서브스크립션 key를 가지고 있는 옵젝을 리턴해야함.
      chatSubscription: {
        filter: newMessage => {
          //comment로 들어오는게 지금 pubsub으로 보내야되는 값
          //args는 최초에 서브스크립션을 찍었을때 들어온 variables들.
          console.log("Filter", newMessage.chatSubscription.projectid === args.projectid, newMessage, args)
          if (newMessage.chatSubscription.projectid === args.projectid) { 
            return true 
          } else {
            return false
          } 

        }
      }
    })
  }
});

// Run the server
(async function server() {
  // 몽고DB 연결
  mongoose.Promise = global.Promise;
  mongoose.connect(mongoConfig.mongoURL).then(
    () => { console.log(`connected to MongoDB: ${mongoConfig.mongoURL}`)}, 
    error => { 
    console.error("Please make sure Mongodb is installed and running!");
    throw error;
  });

  // Set up routes
  const router = (new KoaRouter())
    .post('/api/graphql', graphqlKoa({ schema }))
    .get('/api/graphiql', graphiqlKoa({ endpointURL: '/api/graphql' }))
    // Set-up a general purpose /ping route to check the server is alive
    .get('/ping', async ctx => {
      ctx.body = 'pong';
    })

    // Favicon.ico.  By default, we'll serve this as a 204 No Content.
    // If /favicon.ico is available as a static file, it'll try that first
    .get('/favicon.ico', async ctx => {
      ctx.res.statusCode = 204;
    })
    // Everything else is React
    .get('/*', isLoggedIn, async ctx => {
      const preloadedState = ctx.state.initial || {}; 
      const route = {};

      // Create a new server Apollo client for this request
      const client = serverClient();

      // Create a new Redux store for this request
      const store = createNewStore(client, preloadedState);

      // Generate the HTML from our React tree.  We're wrapping the result
      // in `react-router`'s <StaticRouter> which will pull out URL info and
      // store it in our empty `route` object
      const components = (
        <StaticRouter location={ctx.request.url} context={route}>
          <ApolloProvider store={store} client={client}>
            <App />
          </ApolloProvider>
        </StaticRouter>
      );

      // Wait for GraphQL data to be available in our initial render,
      // before dumping HTML back to the client
      await getDataFromTree(components);

      // Full React HTML render
      const html = ReactDOMServer.renderToString(components);

      // Render the view with our injected React data.  We'll pass in the
      // Helmet component to generate the <head> tag, as well as our Redux
      // store state so that the browser can continue from the server
      ctx.body = `<!DOCTYPE html>\n${ReactDOMServer.renderToStaticMarkup(
        <Html
          html={html}
          head={Helmet.rewind()}
          window={{
            webpackManifest: chunkManifest,
            __STATE__: store.getState(),
          }}
          scripts={scripts}
          css={manifest['browser.css']} />,
      )}`;
    }); 

    // Create WebSocket listener server
    const websocketServer = createServer((request, response) => {
      response.writeHead(404);
      response.end();
    });
    // Bind it to port and start listening
    websocketServer.listen(5000, () => console.log(
      `Websocket Server is now running on port 5000`
    ));
    const subscriptionsServer = new SubscriptionServer(
      {
        subscriptionManager: subscriptionManager
      },
      {
        server: websocketServer
      }
    );
  
  // Start Koa

  const app = new Koa();
  app.keys = ['your-session-secret']
  app.use(session(cookieConfig, app))
  app.use(bodyParser())
  app.use(koaBody())
  // Preliminary security for HTTP headers
  app.use(koaHelmet())
  // Passport 설정 실행 및 각 로컬 및 소셜 로그인 Strategy 추가 
  passportConfig(passport);
  app.use(passport.initialize())
  app.use(passport.session())
  const authRoute = passportRoutes(passport);
  app.use(authRoute.routes());
  app.use(authRoute.allowedMethods());
    // Error wrapper.  If an error manages to slip through the middleware
    // chain, it will be caught and logged back here
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (e) {
        // TODO we've used rudimentary console logging here.  In your own
        // app, I'd recommend you implement third-party logging so you can
        // capture errors properly
        console.log('Error', e.message);
        ctx.body = 'There was an error. Please try again later.';
      }
    })

    // It's useful to see how long a request takes to respond.  Add the
    // timing to a HTTP Response header
    app.use(async (ctx, next) => {
      const start = ms.now();
      await next();
      const end = ms.parse(ms.since(start));
      const total = end.microseconds + (end.milliseconds * 1e3) + (end.seconds * 1e6);
      ctx.set('Response-Time', `${total / 1e3}ms`);
    })

    // Serve static files from our dist/public directory, which is where
    // the compiled JS, images, etc will wind up.  Note this is being checked
    // FIRST before any routes -- static files always take priority
    app.use(koaStatic(PATHS.public, {
      // All asset names contain the hashes of their contents so we can
      // assume they are immutable for caching
      maxage: 31536000000,
      // Don't defer to middleware.  If we have a file, serve it immediately
      defer: false,
    }))

    // If the requests makes it here, we'll assume they need to be handled
    // by the router
    app.use(router.routes())
    app.use(router.allowedMethods())
    // Bind to the specified port
    app.listen(PORT, ()=> console.log('Server is now listening on ', PORT));
}());
