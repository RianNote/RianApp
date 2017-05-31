import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql, compose } from 'react-apollo';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import List from 'react-virtualized/dist/commonjs/List';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';
import NoteSnippet from './NoteSnippet';
import { getNotelineNumber } from '../../../graphqls/TimelineGraphQl.js';
import noteCss from '../note.css';
import css from './noteTimeline.css';

const getTimelineQuery = graphql(getNotelineNumber, { 
  options: (props) => ({
    variables: {
      userId: "591aa1f5e366280be6db7f58" //임시 키
    },
    ssr: false, 
  }),
  name: "noteData",
})
@compose(getTimelineQuery)
@connect(mapState)

export default class NoteTimeLine extends Component {
  constructor(props) {
    super(props);
    this._rowRenderer = this._rowRenderer.bind(this);
    this._isRowLoaded = this._isRowLoaded.bind(this);
    this._loadMoreRows = this._loadMoreRows.bind(this);
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  _rowRenderer({ index, isScrolling, key, style }) {
    const data = this.props.noteData.noteTimeline[index];
    return (
      <NoteSnippet
        style={style}
        key={index}
        title={data.preview.title}
        final_modified_at={data.final_modified_at}
        snippet={data.preview.snippet}
        />
    );
  }

  _isRowLoaded({ index }) {

  }

  _loadMoreRows({ startIndex, stopIndex }) {

    return new Promise(resolve => {
      resolve();
    });
  }

  render() {
    return (
      <div className={noteCss.middle}>
        <div className={css.timelineSearch}>
          <div className={css.timelineSearchBar} />
          <div className={css.timelineSearchButton} />
        </div>
        <div className={css.autoSizer}>
          {this.props.noteData.noteTimeline &&
            <InfiniteLoader
              isRowLoaded={this._isRowLoaded}
              loadMoreRows={this._loadMoreRows}
              rowCount={this.props.noteData.noteTimeline.length}>
              {({ onRowsRendered, registerChild }) => (
                <AutoSizer>
                  {({ height, width }) => (
                    <List
                      height={height}
                      rowHeight={150}
                      onRowsRendered={onRowsRendered}
                      ref={registerChild}
                      rowRenderer={this._rowRenderer}
                      rowCount={this.props.noteData.noteTimeline.length}
                      width={width} />
                  )}
                </AutoSizer>
              )}
            </InfiniteLoader>
          }
        </div>
      </div>

    );
  }
}

function mapState(state) {
  return {
    Note: state.Note,
    userId: state.User._id,
  };
}

