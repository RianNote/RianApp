import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';
import ChatSchema from './Chat/ChatSchema'
import NoteSchema from './Note/NoteSchema'
import { resolvers } from '../resolvers/resolvers.js';

const RootQuery = `
  type Query {
     chatContents(projectid: String!): [Message]
     noteTimeline(userId: ID!): [Note]
  }

  type Mutation {
     sendMessage(projectid: String!, userid: String! name: String!, content: String!, date: String!): Message
  }

  type Subscription {
     chatSubscription(projectid: String!): Message
  }
`

const SchemaDefinition = `
  schema {
     query: Query
     mutation: Mutation
     subscription: Subscription
  }
`;

const schema = makeExecutableSchema({ 
  typeDefs: [SchemaDefinition, RootQuery, ChatSchema, NoteSchema], 
  resolvers 
});
export { schema }