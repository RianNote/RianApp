import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from '../note.css';


@connect(mapState)
export default class NoteEditor extends Component {
  constructor(props) {
    super(props);
  }
  render() {
  	const { Mode } = this.props;
    return (
      <div className={css.right}>
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
