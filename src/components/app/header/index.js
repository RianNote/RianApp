import React, { Component } from 'react';
import css from './header.css';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<div id={css.header}>
				<NavLink to="/"> Home </NavLink>
				<NavLink to="/note"> Note </NavLink>
			</div>
		);
	}
}
