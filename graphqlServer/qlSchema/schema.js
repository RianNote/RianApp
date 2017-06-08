import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';
import NoteSchema from './Note/NoteSchema'
import TagSchema from './Tag/TagSchema'
import { resolvers } from '../resolvers/resolvers.js';

const RootQuery = `
  type Query {
     noteTimeline(userId: ID!): [Note]
     getTagList(userId: ID!): [Tag]
  }
`

const SchemaDefinition = `
  schema {
     query: Query
  }
`;

const schema = makeExecutableSchema({ 
  typeDefs: [SchemaDefinition, RootQuery, NoteSchema, TagSchema], 
  resolvers 
});
export { schema }