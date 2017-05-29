import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';
import css from './note.css';
import NoteNav from './noteNav';
import NoteSideBar from './noteSideBar'
import NoteTimeLine from './noteTimeline';
import NoteCardTimeline from './noteCardTimeline'
import NoteEditor from './noteEditor';
import { modeChange } from '../../actions/NoteActions';

@connect(mapState, mapDispatch)
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

  changeSideBar(argu) {
    this.setState({
      sideBar: argu
    })
  }

  changeWhichBar(argu) {
    this.setState({
      whichBar: argu
    })
  }

  render() {
    const { Mode } = this.props;
    let ModeSelect
    if (this.props.Mode === 'List') {
      ModeSelect = 'Card'
    }
    if (this.props.Mode === 'Card') {
      ModeSelect = 'List'
    }
    return (
      <div id={css.note}>
        <div className={css.hover} onMouseEnter={() => { this.changeSideBar(true); }} onMouseLeave={() => { this.changeSideBar(false); }}>
          <NoteSideBar changeMode={() => { this.props.changeMode(ModeSelect) }} />
          <NoteNav sideBar={this.state.sideBar} changeWhichBar={this.changeWhichBar} />
          <NoteTimeLine sideBar={this.state.sideBar} />
        </div>
        {
          !SERVER && this.props.Mode === 'List' ? <NoteEditor /> : <NoteCardTimeline />
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

function mapDispatch(dispatch) {
  return {
    changeMode(mode) {
      dispatch(modeChange(mode))
    }
  }
}
