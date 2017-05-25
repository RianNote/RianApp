import React, { Component } from 'react';
import { connect } from 'react-redux';
import TagInformation from './TagInformation/index.js'
import CardSnippet from './CardSnippet/index.js'
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
           		<div className={css.mansory}>
           			<CardSnippet title='지금 이 순간에 존재하는 방법들에 관하여' preview='현재에 감사하고 경의를 표하라. 지금이 근본이 되고 중요한 구심점이 될 때 삶은 여유롭게 풀리기 시작한다.' tag={['개발', '영성', '수양']} />
           		</div>
			</div>
		)
	}


}