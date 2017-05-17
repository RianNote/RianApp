import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';
import NoteSchema from './Note/NoteSchema'
import { resolvers } from '../resolvers/resolvers.js';

const RootQuery = `
  type Query {
     noteTimeline(userId: ID!): [Note]
  }
`

const SchemaDefinition = `
  schema {
     query: Query
  }
`;

const schema = makeExecutableSchema({ 
  typeDefs: [SchemaDefinition, RootQuery, NoteSchema], 
  resolvers 
});
export { schema }