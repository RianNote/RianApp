import { pubsub } from '../pubsub/pubsub.js';
import Note from 'database/models/note.model.js';

export const resolvers = {

  Query: {
    noteTimeline(obj, args, context){
      return Note.find({ userid: args.userId })
             .select('_id created_at final_modified_at')
             .exec((err, note) => {
                return note
             })
    },
  },

  Note: {
    preview(obj, args, context){
      return Note.findById(obj._id)
             .select('title snippet')
             .exec((err, note) => {
                return note
             })
    },
  },

};

