import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { Motion, spring } from 'react-motion';
import { getTagList } from '../../../graphqls/TagGraphQl';
import css from './noteNav.css';

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
      tagList = [];
      const temp = (
        <div
          className={css.tag}
          onClick={() => {
            this.props.changeWhichBar('NoteList');
          }}>
          <div className={css.text}>{'#Loading'}</div>
        </div>
      );
      for (let i = 0; i < 20; i++) {
        tagList.push(temp);
      }
    }
    return (
      <div>
        <Motion style={{ x: spring(this.props.sideBar ? 80 : 0) }}>
          {({ x }) => (
            <div id={css.tagNav} style={{ width: `${x}px` }}>
              <div className={css.tag}>
                <a className={css.facebookButton} href="/auth/facebook">
                  $Facebook
                </a>
              </div>
              {tagList}
            </div>
          )}
        </Motion>
      </div>
    );
  }
}

NoteNav.propTypes = {
  TagData: PropTypes.object.isRequired,
  changeWhichBar: PropTypes.func.isRequired,
  sideBar: PropTypes.number.isRequired,
};

NoteNav.defaultProps = {
  TagData: {},
  changeWhichBar: () => {},
  sideBar: 0,
};
