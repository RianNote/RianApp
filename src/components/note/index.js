// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from './note.css';
import NoteTimeLine from './noteTimeline';
import NoteCardTimeline from './noteCardTimeline';
import NoteEditor from './noteEditor';

const mapState = (state: { Note: { mode: "List" | "Card" } }) => ({
  Mode: state.Note.mode,
});

type DefaultProps = {
  Mode: "List" | "Card"
};

type Props = {
  Mode: "List" | "Card"
};

type State = {};

@connect(mapState)
class Note extends Component<DefaultProps, Props, State> {
  constructor(props: Props) {
    super(props);
  }

  state = {};

  render() {
    const { Mode } = this.props;
    return (
      <div id={css.note}>
        {Mode === 'List' ? <NoteEditor /> : <NoteCardTimeline />}
      </div>
    );
  }
}

export default Note;
