// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from './note.css';
import NoteNav from './noteNav';
import NoteSideBar from './noteSideBar';
import NoteTimeLine from './noteTimeline';
import NoteCardTimeline from './noteCardTimeline';
import NoteEditor from './noteEditor';
import { modeChange } from '../../actions/NoteActions';

const mapState = (state: { Note: { mode: "List" | "Card", Note: any } }) => ({
  Mode: state.Note.mode,
  Note: state.Note,
});

const mapDispatch = dispatch => ({
  changeMode(mode: "List" | "Card") {
    dispatch(modeChange(mode));
  },
});

type DefaultProps = {
  Mode: "List" | "Card",
  changeMode: Function
};

type Props = {
  Mode: "List" | "Card",
  changeMode: Function
};

type State = {
  sideBar: boolean
};

@connect(mapState, mapDispatch)
class Note extends Component<DefaultProps, Props, State> {
  static defaultProps = {
    Mode: 'List',
    changeMode: () => {},
  };

  constructor(props: Props) {
    super(props);
    this.changeSideBar = this.changeSideBar.bind(this);
  }

  state = {
    sideBar: false,
  };

  changeSideBar: Function;

  changeSideBar(argu: boolean) {
    this.setState({
      sideBar: argu,
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
          }}
        >
          <NoteSideBar
            changeMode={() => {
              this.props.changeMode(ModeSelect);
            }}
          />
          <NoteNav sideBar={this.state.sideBar} />
          <NoteTimeLine sideBar={this.state.sideBar} />
        </div>
        {!SERVER && this.props.Mode === 'List'
          ? <NoteEditor sideBar={this.state.sideBar} />
          : <NoteCardTimeline />}
      </div>
    );
  }
}

export default Note;
