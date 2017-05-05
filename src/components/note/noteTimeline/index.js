import React, { Component } from 'react';
import { connect } from 'react-redux';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import List from 'react-virtualized/dist/commonjs/List';
import MockNote from '../MOCKNOTE';
import NoteSnippet from './NoteSnippet';

import noteCss from '../note.css';
import css from './noteTimeline.css';

@connect(mapState)
export default class NoteTimeLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      List: MockNote
    };    
    this._rowRenderer = this._rowRenderer.bind(this);
  }

  _rowRenderer ({index, isScrolling, key, style}){
    const data = this.state.List[index];
    return (
      <NoteSnippet
        style={style}
        key={index}
        title={data.title}
        final_modified_at={data.final_modified_at}
        snippet={data.snippet}
        tag={data.tag} />
    )
  }

  render() {
    return (
      <div className={noteCss.middle}>
        <div className={css.timelineSearch}>
          <div className={css.timelineSearchBar} />
          <div className={css.timelineSearchButton} />
        </div>
        <div className={css.autoSizer}>
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                rowHeight={150}
                rowRenderer={this._rowRenderer}
                rowCount={this.state.List.length}
                width={width} />
          )}
          </AutoSizer>
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


 // if(SERVER){
 //      return (<div></div>)
 //    } else {
 //      return (
 //        <div className={noteCss.middle}>
 //          <div className={css.timelineSearch}>
 //            <div className={css.timelineSearchBar}>
 //            </div>
 //            <div className={css.timelineSearchButton}>
 //            </div>
 //          </div>
 //          <Infinite
 //            className={css.infiniteContainer}
 //            containerHeight={this.state.browserSize}
 //            elementHeight={150}
 //            timeScrollStateLastsForAfterUserScrolls={0}
 //          >
 //            {this.state.List}
 //          </Infinite>
 //        </div>
 //      )
 //    }
 //  }
