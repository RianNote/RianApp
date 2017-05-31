import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noteCss from '../note.css';
import css from './noteSideBar.css';
import trashIcon from './TrashIcon.svg';
import trashIconHover from './TrashIcon-hover.svg';
import noteListIcon from './NoteListIcon.svg';
import noteListIconHover from './NoteListIcon-hover.svg';
import star from './Star.svg';

class NoteSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteListHover: false,
      trashHover: false,
    };
    this.changeListHover = this.changeListHover.bind(this);
    this.changeTrashHover = this.changeTrashHover.bind(this);
  }

  changeListHover() {
    this.setState(prevState => ({
      noteListHover: !prevState.noteListHover,
    }));
  }

  changeTrashHover() {
    this.setState(prevState => ({
      trashHover: !prevState.trashHover,
    }));
  }

  render() {
    return (
      <div className={noteCss.fixedBar}>
        <div className={css.head}>
          <div className={css.logo}>R</div>
        </div>
        <div className={css.sort}>
          <div className={css.how}>최신</div>
          <div className={css.how}>갯수</div>
          <div className={css.how}>
            <img className={css.howIcon} src={star} alt="alt" />
          </div>
        </div>
        <div className={css.tool}>
          <div className={css.border} />
          <img
            className={css.toolIcon}
            src={!this.state.noteListHover ? noteListIcon : noteListIconHover}
            onClick={this.props.changeMode}
            onMouseOver={this.changeListHover}
            onMouseOut={this.changeListHover}
            alt="alt" />
          <img
            className={css.toolIcon}
            src={!this.state.trashHover ? trashIcon : trashIconHover}
            onMouseOver={this.changeTrashHover}
            onMouseOut={this.changeTrashHover}
            alt="alt" />
        </div>
        <div className={css.move}>
          <div className={css.border} />
          <div className={css.moveIcon}>N-LIST</div>
          <div className={css.moveIcon}>SOCIAL</div>
        </div>
      </div>
    );
  }
}

NoteSideBar.propTypes = {
  changeMode: PropTypes.func.isRequired,
};

NoteSideBar.defaultProps = {
  changeMode: () => {},
};

export default NoteSideBar;
