import User from 'database/models/user.model.js';
import moment from 'moment';
import { PORT, IP_ENV } from './project';
import { Strategy as FacebookStrategy } from "passport-facebook";

// import authConfig from '../config/oauth'
export default function passportConfig(passport){
	passport.serializeUser((user, done)=>{
	  done(null, user.id)
	})
	passport.deserializeUser((id, done)=>{
		User.findById(id, (err, user)=>{
			done(err, user);
		});
	})
	// var LocalStrategy = require('passport-local').Strategy
	// passport.use(new LocalStrategy(function(username, password, done) {
	// 	console.log("user", user);
	// 	// retrieve user ...
	// 	if (username === 'test' && password === 'test') {
	// 		done(null, user)
	// 	} else {
	// 		done(null, false)
	// 	}
	// }))
	passport.use(new FacebookStrategy({
	  clientID: '183216738826974', // your App ID
	  clientSecret: '8b227a26867fdc7ce8cc43f6a989733f', // your App Secret
	  callbackURL: `http://${IP_ENV}:${PORT}/auth/facebook/callback`,
	  profileFields   : ["email","id", "first_name", "gender", "last_name", "picture"]
	}, (token, tokenSecret, profile, done) => {
	  process.nextTick(()=>{
			// find the user in the database based on their facebook id
			User.findOne({ "facebook_id" : profile.id }, (err, user)=>{
				if (err) throw (err);
				if (user) {
					// 유저를 찾았다면 라스트 로그인을 갱신시키고 로그인을 한다
					user.last_login = Date.now();
					user.save((err, updatedUser)=>{
						if (err) throw err;
						done(null, updatedUser);
					});
				} else {
					// 유저를 못찾았다면 유저를 만든다
					var newUser = new User({
						facebook_id: profile.id,
						token: token,
						name: `${profile.name.givenName} ${profile.name.familyName}`,
						email: profile.email || profile.emails[0].value || "null",
						picture: profile.photos[0].value
					});

					newUser.save((err, updatedUser)=>{
						if (err) throw err;
						done(null, updatedUser);
					});			
				}
			});
		})
		})
	)
}


// var TwitterStrategy = require('passport-twitter').Strategy
// passport.use(new TwitterStrategy({
//     consumerKey: 'authConfig.twitter.consumerKey',
//     consumerSecret: 'authConfig.twitter.consumerSecret',
//     callbackURL: 'http://127.0.0.1:' + (process.env.PORT || 1337) + '/auth/twitter/callback'
//   },
//   function(token, tokenSecret, profile, done) {
//     // retrieve user ...
//     done(null, user)
//   }
// ))

// var GoogleStrategy = require('passport-google-auth').Strategy
// passport.use(new GoogleStrategy({
//     clientId: 'authConfig.google.clientID',
//     clientSecret: 'authConfig.google.clientSecret',
//     callbackURL: 'http://127.0.0.1:' + (process.env.PORT || 1337) + '/auth/google/callback'
//   },
//   function(token, tokenSecret, profile, done) {
//     // retrieve user ...
//     done(null, user)
//   }
// ))

// import authConfig from '../config/oauth'
// router.post('/login', async(ctx, next) => {
//   console.log("login");
//   await passport.authenticate('local', {
//     successRedirect: '/about',
//     failureRedirect: '/'
//   })
//   return next();
// })
