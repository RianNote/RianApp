import Note from "../models/note.model.js";
import Tag from "../models/tag.model.js";
export const saveNote = (userid, infor) => {
	return new Promise((resolve) => {
		const newNote = new Note({
			userid: userid,
			title: infor.title,
			snippet: infor.snippet,
			tag: infor.tag,
			data: '',
			created_at: infor['final_modified_at'],
			final_modified_at: infor['final_modified_at'],
			publish: false,
		})
		newNote.save((err, saveNote) => {
			if (err) throw err
			resolve()
		})
	})
} 