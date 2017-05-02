import React, { Component } from 'react';
import css from './note.css';

export default class Note extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<div id={css.note} className="mainWrapper">
				I'm Note
			</div>
		);
	}
}
