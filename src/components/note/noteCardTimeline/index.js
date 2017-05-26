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
           			<CardSnippet title='지금 이 순간에 존재하는 방법들에 관하여' preview='현재에 감사하고 경의를 표하라. 지금이 근본이 되고 중요한 구심점이 될 때 삶은 여유롭게 풀리기 시작한다.' tag={['개발과 함께하는 그대의 시간', '영성', '수양']} />
           			<CardSnippet title='그대와 나의 역할에 관하여' preview='현재에 감사하고 경의를 표하라. 지금이 근본이 되고 중요한 구심점이 될 때 삶은 여유롭게 풀리기 시작한다.' tag={['감상']} />
           			<CardSnippet title='컴퓨터 공학 개론과 당신의 운명' preview='현재에 감사하고 경의를 표하라. 지금이 근본이 되고 중요한 구심점이 될 때 삶은 여유롭게 풀리기 시작한다.' tag={['수업', '개발']} />
           			<CardSnippet title='딥러닝 개론' preview='현재에 감사하고 경의를 표하라. 지금이 근본이 되고 중요한 구심점이 될 때 삶은 여유롭게 풀리기 시작한다.' tag={['음악', '가사']} />
           			<CardSnippet title='I want to hold your hand' preview='현재에 감사하고 경의를 표하라. 지금이 근본이 되고 중요한 구심점이 될 때 삶은 여유롭게 풀리기 시작한다.' tag={['개발', '영성', '수양']} />
           			<CardSnippet title='It is not your fault' preview='현재에 감사하고 경의를 표하라. 지금이 근본이 되고 중요한 구심점이 될 때 삶은 여유롭게 풀리기 시작한다.' tag={['개발', '영성', '수양']} />
           			<CardSnippet title='오늘의 하루는 맑음' preview='현재에 감사하고 경의를 표하라. 지금이 근본이 되고 중요한 구심점이 될 때 삶은 여유롭게 풀리기 시작한다.' tag={['개발', '영성', '수양']} />
           			<CardSnippet title='오늘의 요리법' preview='현재에 감사하고 경의를 표하라. 지금이 근본이 되고 중요한 구심점이 될 때 삶은 여유롭게 풀리기 시작한다.' tag={['개발', '영성', '수양']} />
           			<CardSnippet title='내일 해야할 것들' preview='현재에 감사하고 경의를 표하라. 지금이 근본이 되고 중요한 구심점이 될 때 삶은 여유롭게 풀리기 시작한다.' tag={['개발', '영성', '수양']} />
           			<CardSnippet title='#일기' preview='현재에 감사하고 경의를 표하라. 지금이 근본이 되고 중요한 구심점이 될 때 삶은 여유롭게 풀리기 시작한다.' tag={['개발', '영성', '수양']} />
           			<CardSnippet title='내가 사랑하는 음악들' preview='현재에 감사하고 경의를 표하라. 지금이 근본이 되고 중요한 구심점이 될 때 삶은 여유롭게 풀리기 시작한다.' tag={['개발', '영성', '수양']} />
           			<CardSnippet title='일일 운동 목표량' preview='현재에 감사하고 경의를 표하라. 지금이 근본이 되고 중요한 구심점이 될 때 삶은 여유롭게 풀리기 시작한다.' tag={['개발', '영성', '수양']} />
                <CardSnippet title='지금 이 순간에 존재하는 방법들에 관하여' preview='현재에 감사하고 경의를 표하라. 지금이 근본이 되고 중요한 구심점이 될 때 삶은 여유롭게 풀리기 시작한다.' tag={['개발', '영성', '수양']} />
                <CardSnippet title='그대와 나의 역할에 관하여' preview='현재에 감사하고 경의를 표하라. 지금이 근본이 되고 중요한 구심점이 될 때 삶은 여유롭게 풀리기 시작한다.' tag={['감상']} />
                <CardSnippet title='컴퓨터 공학 개론과 당신의 운명' preview='현재에 감사하고 경의를 표하라. 지금이 근본이 되고 중요한 구심점이 될 때 삶은 여유롭게 풀리기 시작한다.' tag={['수업', '개발']} />
                <CardSnippet title='딥러닝 개론' preview='현재에 감사하고 경의를 표하라. 지금이 근본이 되고 중요한 구심점이 될 때 삶은 여유롭게 풀리기 시작한다.' tag={['음악', '가사']} />
                <CardSnippet title='I want to hold your hand' preview='현재에 감사하고 경의를 표하라. 지금이 근본이 되고 중요한 구심점이 될 때 삶은 여유롭게 풀리기 시작한다.' tag={['개발', '영성', '수양']} />
                <CardSnippet title='It is not your fault' preview='현재에 감사하고 경의를 표하라. 지금이 근본이 되고 중요한 구심점이 될 때 삶은 여유롭게 풀리기 시작한다.' tag={['개발', '영성', '수양']} />
                <CardSnippet title='오늘의 하루는 맑음' preview='현재에 감사하고 경의를 표하라. 지금이 근본이 되고 중요한 구심점이 될 때 삶은 여유롭게 풀리기 시작한다.' tag={['개발', '영성', '수양']} />
                <CardSnippet title='오늘의 요리법' preview='현재에 감사하고 경의를 표하라. 지금이 근본이 되고 중요한 구심점이 될 때 삶은 여유롭게 풀리기 시작한다.' tag={['개발', '영성', '수양']} />
                <CardSnippet title='내일 해야할 것들' preview='현재에 감사하고 경의를 표하라. 지금이 근본이 되고 중요한 구심점이 될 때 삶은 여유롭게 풀리기 시작한다.' tag={['개발', '영성', '수양']} />
                <CardSnippet title='#일기' preview='현재에 감사하고 경의를 표하라. 지금이 근본이 되고 중요한 구심점이 될 때 삶은 여유롭게 풀리기 시작한다.' tag={['개발', '영성', '수양']} />
                <CardSnippet title='내가 사랑하는 음악들' preview='현재에 감사하고 경의를 표하라. 지금이 근본이 되고 중요한 구심점이 될 때 삶은 여유롭게 풀리기 시작한다.' tag={['개발', '영성', '수양']} />
                <CardSnippet title='일일 운동 목표량' preview='현재에 감사하고 경의를 표하라. 지금이 근본이 되고 중요한 구심점이 될 때 삶은 여유롭게 풀리기 시작한다.' tag={['개발', '영성', '수양']} />
           		</div>
			</div>
		)
	}


}