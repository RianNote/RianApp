import React from "react";
import css from './noteTimeline.css';
const NoteSnippet = ({ title, final_modified_at, snippet, tag, style}) => {
	return (
		<div 
			className={css.snippetContainer}
			style={style}
		>
			<div className={css.snippetSide}>
				1d
			</div>
			<div className={css.snippetBody}>
				<div className={css.snippetTitle}>{title}</div>
				<div className={css.snippetSnippet}>{snippet}</div>
			</div>
		</div>
	);
};

export default NoteSnippet;