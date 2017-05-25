import React, { Component } from 'react';
import { connect } from 'react-redux';
import TagInformation from './TagInformation/index.js'
import ContainerCss from '../note.css';
import css from './noteCardTimeline.css'


export default class NoteCardTimeline extends Component {
	constructor(props) {
		super(props);
		this.state = {
	      title: '',
	      noteCount: 10,
    	}
    	this.handleTitleChange = this.handleTitleChange.bind(this)	
	}

	handleTitleChange(e) {
    	this.setState({ title: e.target.value });
  	}


	render(){
		return (
			<div className={ContainerCss['card-List']}>
				<div className={css.head}>
              		<textarea className={css.title} placeholder="search tag" value={this.state.title} onChange={this.handleTitleChange} />
              		<TagInformation noteCount={this.state.noteCount} />
           		 </div>
			</div>
		)
	}


}