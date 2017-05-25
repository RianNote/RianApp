import React, { Component } from 'react';
import css from './tagInformation.css'


const TagInformation = ({noteCount}) => {
	return (
		<div className={css.container}>
			<p className={css['note-count']}>{noteCount}</p>
			<p className={css['standard']}>Notes</p>
		</div>
	)
}

export default TagInformation