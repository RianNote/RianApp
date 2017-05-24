import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Motion, spring} from 'react-motion';
import css from './note.css';
import NoteNav from './noteNav';
import NoteTimeLine from './noteTimeline';
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
    console.log('true', argu)
  }

  changeWhichBar(argu){
    this.setState({
      whichBar: argu
    })
    console.log('whichBar', argu)
  }

  render() {
  	const { Mode } = this.props;
    return (
      <div id={css[`note-${Mode}`]}>
        <div className={css.hover} onMouseEnter={ ()=>{this.changeSideBar(true);} } onMouseLeave={ ()=>{this.changeSideBar(false);} }>
          {
            this.state.whichBar === 'TagNav' ? 
            <NoteNav sideBar={this.state.sideBar} changeWhichBar={this.changeWhichBar} /> : 
            <NoteTimeLine sideBar={this.state.sideBar} changeWhichBar={(argu)=>{this.changeWhichBar(argu);}} />
          }
        </div>  
        {!SERVER && <NoteEditor />}
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
