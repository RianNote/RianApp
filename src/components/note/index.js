import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from './note.css';
import NoteNav from './noteNav';
import NoteTimeLine from './noteTimeline';
import NoteEditor from './noteEditor';

@connect(mapState)
export default class Note extends Component {
  constructor(props) {
    super(props);
  }
  render() {
  	const { Mode } = this.props;
    return (
      <div id={css[`note-${Mode}`]}>
        <NoteNav />
        <NoteTimeLine />
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
