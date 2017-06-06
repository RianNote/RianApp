// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { Motion, spring } from 'react-motion';
import TimelineSnippet from './TimelineSnippet/index';
import TagSearch from './TagSearch/index';
import { getNotelineNumber } from '../../../graphqls/TimelineGraphQl';
import css from './noteTimeline.css';

const mapState = state => ({
  Note: state.Note,
  // userId: state.User._id,
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

type DefaultProps = {
  sideBar: boolean
};

type Props = {
  sideBar: boolean
};

type State = {};

@compose(getTimelineQuery)
@connect(mapState)
class NoteTimeLine extends Component<DefaultProps, Props, State> {
  static defaultProps = {
    sideBar: false,
  };

  constructor(props: Props) {
    super(props);
  }

  state = {};

  render() {
    return (
      <Motion
        style={{
          x: spring(this.props.sideBar && this.props.mode === 'List' ? 240 : 0),
        }}
      >
        {({ x }) => (
          <div className={css.noteList} style={{ width: `${x}px` }}>
            <TagSearch />
            <div className={css.timelineList}>
              <TimelineSnippet
                title={'The Flash Tutorial'}
                preview={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
            </div>
          </div>
        )}
      </Motion>
    );
  }
}

export default NoteTimeLine;
