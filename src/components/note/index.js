import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import css from './note.css';
import NoteNav from './noteNav';
import NoteSideBar from './noteSideBar';
import NoteTimeLine from './noteTimeline';
import NoteCardTimeline from './noteCardTimeline';
import NoteEditor from './noteEditor';
import { modeChange } from '../../actions/NoteActions';

const mapState = state => ({
  Mode: state.Note.mode,
  Note: state.Note,
});

const mapDispatch = dispatch => ({
  changeMode(mode) {
    dispatch(modeChange(mode));
  },
});

@connect(mapState, mapDispatch)
export default class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBar: false,
      whichBar: 'TagNav',
    };
    this.changeSideBar = this.changeSideBar.bind(this);
    this.changeWhichBar = this.changeWhichBar.bind(this);
  }

  changeSideBar(argu) {
    this.setState({
      sideBar: argu,
    });
  }

  changeWhichBar(argu) {
    this.setState({
      whichBar: argu,
    });
  }

  render() {
    const { Mode } = this.props;
    let ModeSelect;
    if (Mode === 'List') {
      ModeSelect = 'Card';
    }
    if (Mode === 'Card') {
      ModeSelect = 'List';
    }
    return (
      <div id={css.note}>
        <div
          className={css.hover}
          onMouseEnter={() => {
            this.changeSideBar(true);
          }}
          onMouseLeave={() => {
            this.changeSideBar(false);
          }}>
          <NoteSideBar
            changeMode={() => {
              this.props.changeMode(ModeSelect);
            }} />
          <NoteNav
            sideBar={this.state.sideBar}
            changeWhichBar={this.changeWhichBar} />
          <NoteTimeLine sideBar={this.state.sideBar} />
        </div>
        {!SERVER && this.props.Mode === 'List'
          ? <NoteEditor />
          : <NoteCardTimeline />}
      </div>
    );
  }
}

Note.propTypes = {
  Mode: PropTypes.oneOf(['List, Card']),
  changeMode: PropTypes.func,
};

Note.defaultProps = {
  Mode: 'List',
  changeMode: () => {},
};
