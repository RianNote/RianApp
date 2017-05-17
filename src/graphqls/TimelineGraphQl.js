import gql from "graphql-tag";
export const getNotelineNumber = gql`
	query getNoteQuery($userId: ID!) {
      	noteTimeline(userId: $userId) {
	          _id
	          created_at
	          final_modified_at
	          tag
	    	  preview {
	    	  	title 
	    	  	snippet
	    	  }
 		}
}`