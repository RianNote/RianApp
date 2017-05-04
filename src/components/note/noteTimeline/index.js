import React, { Component } from 'react';
import Infinite from 'react-infinite';
import { connect } from 'react-redux';
import noteCss from '../note.css';
import css from './noteTimeline.css';
import MockNote from '../MOCKNOTE';
import NoteSnippet from './NoteSnippet';

@connect(mapState)
export default class NoteTimeLine extends Component {
  constructor(props) {
    super(props);
    const MockList = MockNote.map((data, index) => (
      <NoteSnippet
        key={index}
        title={data.title}
        final_modified_at={data.final_modified_at}
        snippet={data.snippet}
        tag={data.tag}
      />
    )); 
    this.state = {
      List: MockList,
      browserSize: window.innerHeight - 50
    };

    window.addEventListener("resize", () => {
      this.setState((prevState, props) => {
        return {
          browserSize: window.innerHeight - 50
        };
      })
    })
  }
  render() {
    return (
      <div className={noteCss.middle}>
        <div className={css.timelineSearch}>
          <div className={css.timelineSearchBar}>
          </div>
          <div className={css.timelineSearchButton}>
          </div>
        </div>
        <Infinite
          className={css.infiniteContainer}
          containerHeight={this.state.browserSize}
          elementHeight={150}
          timeScrollStateLastsForAfterUserScrolls={0}
        >
          {this.state.List}
        </Infinite>
      </div>
    );
  }
}

function mapState(state) {
  return {
    Note: state.Note
  };
}
