// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import screenfull from 'screenfull';
import { modeChange } from '../../../actions/NoteActions';
import css from './nav.css';
import trashIcon from './icons/TrashIcon.svg';
import trashIconHover from './icons/TrashIcon-hover.svg';
import noteListIcon from './icons/NoteListIcon.svg';
import noteListIconHover from './icons/NoteListIcon-hover.svg';
import star from './icons/Star.svg';
import starHover from './icons/Star-hover.svg';

// <HoverNav/> Component
import HoverNav from './hoverNav';

// <NoteTimeline /> Component
import NoteTimeline from '../../note/noteTimeline';

const mapState = (state: { Note: { mode: "List" | "Card" } }) => ({
  Mode: state.Note.mode,
});

const mapDispatch = dispatch => ({
  changeMode(mode: "List" | "Card") {
    dispatch(modeChange(mode));
  },
});

type DefaultProps = {
  sideBar: boolean,
  Mode: "List" | "Card"
};

type Props = {
  changeMode: Function,
  Mode: "List" | "Card"
};

type State = {
  sideBar: boolean,
  starHover: boolean,
  noteListHover: boolean,
  trashHover: boolean
};

@connect(mapState, mapDispatch)
class NoteSideBar extends Component<DefaultProps, Props, State> {
  static defaultProps = {
    sideBar: false,
    Mode: 'Card',
  };

  constructor(props: Props) {
    super(props);
    this.screenfull = screenfull;
    this.changeSideBar = this.changeSideBar.bind(this);
    this.changeStarHover = this.changeStarHover.bind(this);
    this.changeListHover = this.changeListHover.bind(this);
    this.changeTrashHover = this.changeTrashHover.bind(this);
    this.fullScreen = this.fullScreen.bind(this);
  }

  state = {
    sideBar: false,
    starHover: false,
    noteListHover: false,
    trashHover: false,
  };

  screenfull: any;
  fullScreen: Function;
  changeSideBar: Function;
  changeStarHover: Function;
  changeListHover: Function;
  changeTrashHover: Function;

  fullScreen() {
    if (this.screenfull.enabled) {
      this.screenfull.request();
    } else {
      // Ignore or do something else
    }
  }

  changeSideBar(argu: boolean) {
    this.setState({
      sideBar: argu,
    });
  }
  changeStarHover() {
    this.setState((prevState: State) => ({
      starHover: !prevState.starHover,
    }));
  }

  changeListHover() {
    this.setState((prevState: State) => ({
      noteListHover: !prevState.noteListHover,
    }));
  }

  changeTrashHover() {
    this.setState((prevState: State) => ({
      trashHover: !prevState.trashHover,
    }));
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
      <div
        className={css.nav}
        onMouseOver={() => {
          if (!this.state.sideBar) {
            this.changeSideBar(true);
          }
        }}
        onMouseOut={() => {
          this.changeSideBar(false);
        }}
      >
        <div className={css.menu}>
          <div className={css.head}>
            <div className={css.logo} onClick={this.fullScreen}>R</div>
          </div>
          <div className={css.sort}>
            <div className={css.how}>최신</div>
            <div className={css.how}>갯수</div>
            <div
              className={css.how}
              onMouseOver={this.changeStarHover}
              onMouseOut={this.changeStarHover}
            >
              <img
                className={css.howIcon}
                src={!this.state.starHover ? star : starHover}
                alt="alt"
              />
            </div>
          </div>
          <div className={css.tool}>
            <div className={css.border} />
            <img
              className={css.toolIcon}
              src={!this.state.noteListHover ? noteListIcon : noteListIconHover}
              onClick={() => {
                this.props.changeMode(ModeSelect);
              }}
              onMouseOver={this.changeListHover}
              onMouseOut={this.changeListHover}
              alt="alt"
            />
            <img
              className={css.toolIcon}
              src={!this.state.trashHover ? trashIcon : trashIconHover}
              onMouseOver={this.changeTrashHover}
              onMouseOut={this.changeTrashHover}
              alt="alt"
            />
          </div>
          <div className={css.move}>
            <div className={css.border} />
            <div className={css.moveIcon}>N-LIST</div>
            <div className={css.moveIcon}>SOCIAL</div>
          </div>
        </div>
        <HoverNav sideBar={this.state.sideBar} />
        <NoteTimeline sideBar={this.state.sideBar} mode={Mode} />
      </div>
    );
  }
}

export default NoteSideBar;
