import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from '../note.css';


@connect(mapState)
export default class NoteTimeLine extends Component {
  constructor(props) {
    super(props);
  }
  render() {
  	const { Mode } = this.props;
    console.log(css, "NOTECSS");
    return (
      <div className={css.middle}>
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
