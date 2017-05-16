import React, { Component } from 'react';
import { connect } from 'react-redux';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import List from 'react-virtualized/dist/commonjs/List';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';
import MockNote from '../MOCKNOTE';
import NoteSnippet from './NoteSnippet';

import noteCss from '../note.css';
import css from './noteTimeline.css';

@connect(mapState)
export default class NoteTimeLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      List: MockNote,
    };
    this._rowRenderer = this._rowRenderer.bind(this);
    this._isRowLoaded = this._isRowLoaded.bind(this);
    this._loadMoreRows = this._loadMoreRows.bind(this);
  }

  _rowRenderer({ index, isScrolling, key, style }) {
    const data = this.state.List[index];
    return (
      <NoteSnippet
        style={style}
        key={index}
        title={data.title}
        final_modified_at={data.final_modified_at}
        snippet={data.snippet}
        tag={data.tag} />
    );
  }

  _isRowLoaded({ index }){

  }

  _loadMoreRows({ startIndex, stopIndex }){

    console.log('index', startIndex, stopIndex)

    return new Promise((resolve) => {
      resolve()
    })
  }

  render() {
    return (
      <div className={noteCss.middle}>
        <div className={css.timelineSearch}>
          <div className={css.timelineSearchBar} />
          <div className={css.timelineSearchButton} />
        </div>
        <div className={css.autoSizer}>
          <InfiniteLoader
            isRowLoaded={this._isRowLoaded}
            loadMoreRows={this._loadMoreRows}
            rowCount={1000}
          >
            {({ onRowsRendered, registerChild }) => (
              <AutoSizer>
                {({ height, width }) => (
                  <List
                    height={height}
                    rowHeight={150}
                    onRowsRendered={onRowsRendered}
                    ref={registerChild}
                    rowRenderer={this._rowRenderer}
                    rowCount={this.state.List.length}
                    width={width} />
                )}
              </AutoSizer>
            )}
          </InfiniteLoader>
        </div>
      </div>

    );
  }
}

function mapState(state) {
  return {
    Note: state.Note,
  };
}

