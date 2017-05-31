import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { Motion, spring } from 'react-motion';
import PropTypes from 'prop-types';
import TimelineSnippet from './TimelineSnippet/index';
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
    this.state = {};
  }

  render() {
    return (
      <Motion style={{ x: spring(this.props.sideBar ? 260 : 0) }}>
        {({ x }) => (
          <div className={css.noteList} style={{ width: `${x}px` }}>
            <div className={css.timelineSearch}>
              <input
                className={css.timelineSearchBar}
                placeholder="SEARCH TAG" />
            </div>
            <div className={css.timelineList}>
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']} />
            </div>
          </div>
        )}
      </Motion>
    );
  }
}

NoteTimeLine.propTypes = {
  sideBar: PropTypes.bool.isRequired,
};

NoteTimeLine.defaultProps = {
  sideBar: false,
};
