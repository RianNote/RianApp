import { pubsub } from '../pubsub/pubsub.js';
import Note from 'database/models/note.model.js';
import Tag from 'database/models/tag.model.js';
export const resolvers = {

  Query: {
    noteTimeline(obj, args, context){
      console.log('obj, args, context', obj, args, context)
      return Note.find({ userid: args.userId })
             .select('_id created_at final_modified_at')
             .exec((err, note) => {
                return note
             })
    },

    getTagList(obj, args, context){
      console.log('tagList', obj, args, context)
      return Tag.find({ userid: args.userId})
             .select('name')
             .exec((err, tag) => {
                console.log('tag', tag)
                return tag
             }) 
    }
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

