// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { Motion, spring } from 'react-motion';
import TimelineSnippet from './TimelineSnippet/index';
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

type State = {
  selectedTag: Array<string>,
  searchInput: string
};

@compose(getTimelineQuery)
@connect(mapState)
class NoteTimeLine extends Component<DefaultProps, Props, State> {
  static defaultProps = {
    sideBar: false,
  };

  constructor(props: Props) {
    super(props);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.addTagInList = this.addTagInList.bind(this);
  }

  state = {
    selectedTag: ['만약', '수정'],
    searchInput: '',
  };

  handleSearchInputChange: Function;
  addTagInList: Function;

  handleSearchInputChange(event: Event & { currentTarget: { value: string } }) {
    this.setState({
      searchInput: event.currentTarget.value,
    });
  }

  addTagInList(tagName: string) {
    this.setState((prevState: State) => ({
      selectedTag: prevState.selectedTag.concat(tagName),
      searchInput: '',
    }));
  }

  render() {
    return (
      <Motion style={{ x: spring(this.props.sideBar ? 260 : 0) }}>
        {({ x }) => (
          <div className={css.noteList} style={{ width: `${x}px` }}>
            <div className={css.timelineSearch}>
              <div className={css.timelineSearchBar}>
                <div className={css.selectedTagList}>
                  {this.state.selectedTag.map((tag: string, index: number) => (
                    <div key={index} className={css.oneOfTag}>
                      {tag}
                    </div>
                  ))}
                </div>
                <input
                  value={this.state.searchInput}
                  onChange={this.handleSearchInputChange}
                  onKeyDown={(e) => {
                    if (e.keyCode === 32) {
                      this.addTagInList(e.target.value);
                    }
                  }}
                  className={css.tagSearchInput}
                />
              </div>
            </div>
            <div className={css.timelineList}>
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
                  'Welcome To Desiclassifieds Free Classifieds Free Ads Free Advertisement'
                }
                tag={['전공', 'math']}
              />
              <TimelineSnippet
                title={'The Flash Tutorial'}
                snippet={
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
