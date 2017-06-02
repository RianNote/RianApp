// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { Motion, spring } from 'react-motion';
import TimelineSnippet from './TimelineSnippet/index';
import { getNotelineNumber } from '../../../graphqls/TimelineGraphQl';
import css from './noteTimeline.css';
import expandingItemIcon from './expanding-item-icon.svg';

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
    this.deleteTagInList = this.deleteTagInList.bind(this);
  }

  state = {
    selectedTag: ['만약', '수정'],
    searchInput: '',
  };

  handleSearchInputChange: Function;
  addTagInList: Function;
  deleteTagInList: Function;

  handleSearchInputChange(value: string) {
    this.setState({
      searchInput: value,
    });
  }

  addTagInList(tagName: string) {
    this.setState((prevState: State) => ({
      selectedTag: prevState.selectedTag.concat(tagName),
      searchInput: '',
    }));
  }

  deleteTagInList() {
    this.setState((prevState: State) => ({
      selectedTag: prevState.selectedTag.slice(
        0,
        prevState.selectedTag.length - 1,
      ),
    }));
  }

  render() {
    return (
      <Motion style={{ x: spring(this.props.sideBar ? 260 : 0) }}>
        {({ x }) => (
          <div className={css.noteList} style={{ width: `${x}px` }}>
            <div className={css.timelineSearch}>
              <div className={css.timelineSearchBar}>
                <div className={css.tagContent}>
                  <div className={css.selectedTagList}>
                    {this.state.selectedTag.map(
                      (tag: string, index: number) => (
                        <div key={index} className={css.oneOfTag}>
                          {tag}
                        </div>
                      ),
                    )}
                  </div>
                  <input
                    value={this.state.searchInput}
                    onChange={({
                      currentTarget,
                    }: { currentTarget: { value: string } }) => {
                      this.handleSearchInputChange(currentTarget.value);
                    }}
                    onKeyUp={({
                      keyCode,
                      currentTarget,
                    }: {
                      keyCode: number,
                      currentTarget: { value: string }
                    }) => {
                      if (keyCode === 8 && currentTarget.value === '') {
                        return this.deleteTagInList();
                      }
                      if (keyCode === 32 || keyCode === 13) {
                        if (currentTarget.value === ' ') {
                          // 공백에서 스페이스 or Enter를 치면 다시 공백으로 돌린다
                          return this.handleSearchInputChange('');
                        }
                        // 그 외의 경우 태그 추가
                        return this.addTagInList(currentTarget.value);
                      }
                      // because eslint
                      return undefined;
                    }}
                    className={css.tagSearchInput}
                  />
                </div>
                <img
                  className={css.expandingIcon}
                  src={expandingItemIcon}
                  alt="alt"
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
