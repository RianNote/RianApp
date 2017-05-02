import React, { Component } from 'react';
import css from './home.css';

export default class Home extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<div id={css.home} className="mainWrapper">
				I'm Home
			</div>
		);
	}
}
