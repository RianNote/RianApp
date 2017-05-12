import mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const Note = new Schema({
	userid: { type: Schema.Types.ObjectId, ref: 'Users'},
	title: String,
	snippet: String,
	tag: [String],
	data: String,
	created_at: String,
	final_modified_at: String,
	publish: { type: Boolean, required: true },
})
