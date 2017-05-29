import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { Motion, spring } from 'react-motion';
import PropTypes from 'prop-types';
import { getNotelineNumber } from '../../../graphqls/TimelineGraphQl';
import css from './noteTimeline.css';

const mapState = state => ({
  Note: state.Note,
  userId: state.User._id,
});

const getTimelineQuery = graphql(getNotelineNumber, {
  options: () => ({
    variables: {
      userId: '5923b81861322804b81cecb6', // 임시 키
    },
    ssr: false,
  }),
  name: 'noteData',
});

@compose(getTimelineQuery)
@connect(mapState)

export default class NoteTimeLine extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <Motion style={{ x: spring(this.props.sideBar ? 300 : 0) }}>
          {({ x }) =>
            <div className={css.noteList} style={{ width: `${x}px` }}>
              <div className={css.timelineSearch}>
                <input className={css.timelineSearchBar} placeholder="SEARCH TAG" />
              </div>
              <div className={css.autoSizer} />
            </div>
          }
        </Motion>
      </div>
    );
  }
}

NoteTimeLine.propTypes = {
  sideBar: PropTypes.number.isRequired,
};

NoteTimeLine.defaultProps = {
  sideBar: 0,
};
