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
      sideBar: false
    }
    this.changeSideBar = this.changeSideBar.bind(this)
  }

  changeSideBar(argu){
    this.setState({
      sideBar: argu
    })
    console.log('true', argu)
  }

  render() {
  	const { Mode } = this.props;
    return (
      <div id={css[`note-${Mode}`]}>
        <NoteNav />
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
