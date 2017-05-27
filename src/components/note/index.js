import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Motion, spring} from 'react-motion';
import css from './note.css';
import NoteNav from './noteNav';
import NoteSideBar from './noteSideBar'
import NoteTimeLine from './noteTimeline';
import NoteCardTimeline from './noteCardTimeline'
import NoteEditor from './noteEditor';

@connect(mapState)
export default class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBar: false,
      whichBar: 'TagNav'
    }
    this.changeSideBar = this.changeSideBar.bind(this)
    this.changeWhichBar = this.changeWhichBar.bind(this)
  }

  changeSideBar(argu){
    this.setState({
      sideBar: argu
    })
  }

  changeWhichBar(argu){
    this.setState({
      whichBar: argu
    })
  }

  render() {
  	const { Mode } = this.props;
    return (
      <div id={css[`note-${Mode}`]}>
        <div className={css.hover} onMouseEnter={ ()=>{this.changeSideBar(true);} } onMouseLeave={ ()=>{this.changeSideBar(false);} }>
          <NoteSideBar />
          {
            this.state.whichBar === 'TagNav' && this.props.Mode === 'List' ? 
            <NoteNav sideBar={this.state.sideBar} changeWhichBar={this.changeWhichBar} /> : 
            <NoteTimeLine sideBar={this.state.sideBar} changeWhichBar={(argu)=>{this.changeWhichBar(argu);}} />
          }
        </div>  
          {
            !SERVER && this.props.Mode === 'List' ? <NoteCardTimeline /> :  <NoteEditor />
          }
			</div>
    );
  }
}

function mapState(state) {
  return {
  	Mode: state.Note.mode,
    Note: state.Note,
  };
}
