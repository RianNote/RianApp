import mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const Tag = new Schema({
	userid: { type: Schema.Types.ObjectId, ref: 'Users'},
	notes: [{ type: Schema.Types.ObjectId, ref: 'Notes'}],
	name: { type: String, default: true }
})