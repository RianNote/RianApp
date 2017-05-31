import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { Motion, spring } from 'react-motion';
import { getTagList } from '../../../graphqls/TagGraphQl';
import css from './noteNav.css';

/* <div className={css.tag}>
              <a className={css.facebookButton} href="/auth/facebook">
                $Facebook
              </a>
            </div>*/

const mapState = state => ({
  Mode: state.Note.mode,
  Note: state.Note,
});

const getTagListQuery = graphql(getTagList, {
  options: () => ({
    variables: {
      userId: '5923b81861322804b81cecb6', // 임시 키
    },
    ssr: false,
  }),
  name: 'TagData',
});

@compose(getTagListQuery)
@connect(mapState)
export default class NoteNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let tagList;
    if (this.props.TagData.getTagList) {
      tagList = this.props.TagData.getTagList.map((Tag, index) => (
        <div
          key={index}
          className={css.tag}
          onClick={() => {
            this.props.changeWhichBar('NoteList');
          }}>
          <div className={css.text}>
            {`#${Tag.name}`}
          </div>
        </div>
      ));
    } else {
      tagList = [
        '강의',
        '고향',
        '감자',
        '고구마',
        '강남',
        '고요한날',
        '고마움',
        '기도',
        '걱정',
        '감사',
        '고뇌',
        '감탄',
        '그리움',
        '고난과역경',
      ];
      tagList = tagList.map((data, index) => (
        <div
          key={index}
          className={css.tag}
          onClick={() => {
            this.props.changeWhichBar('NoteList');
          }}>
          <div className={css.text}>{`#${data}`}</div>
        </div>
      ));
    }
    return (
      <Motion style={{ x: spring(this.props.sideBar ? 70 : 0) }}>
        {({ x }) => (
          <div id={css.tagNav} style={{ width: `${x}px` }}>
            {tagList}
          </div>
        )}
      </Motion>
    );
  }
}

NoteNav.propTypes = {
  TagData: PropTypes.object.isRequired,
  changeWhichBar: PropTypes.func.isRequired,
  sideBar: PropTypes.bool.isRequired,
};

NoteNav.defaultProps = {
  TagData: {},
  changeWhichBar: () => {},
  sideBar: false,
};
