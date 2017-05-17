const Note = `
	type Note {
		_id: ID!
		created_at: String!
		final_modified_at: String!
		tag: [String]
		preview: Preview
		content: Content
	}

	type Preview {
		title: String!
		snippet: String!
	}

	type Content {
		data: String!
		publish: Boolean!
	}
`

export default () => [Note]