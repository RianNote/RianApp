const Note = `
	type Note {
		objectId: ID!
		createdAt: String!
		finalModifiedAt: String!
		tag: [String]
		preview: [Preview]
		content: [Content]
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