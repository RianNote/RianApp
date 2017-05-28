import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql, compose } from 'react-apollo';
import { Motion, spring } from 'react-motion';
import { getTagList } from '../../../graphqls/TagGraphQl.js';
import noteCss from '../note.css';
import css from './noteNav.css';

const getTagListQuery = graphql(getTagList, {
  options: props => ({
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
  }

  componentDidMount() {
    console.log('didMount', this.props);
  }

  componentWillUnmount() {
    console.log('UnmountNoteNav');
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
  }

  render() {
  	const { Mode } = this.props;
    let tagList;
    if (this.props.TagData.getTagList) {
      tagList = this.props.TagData.getTagList.map((Tag, index) => (
        <div key={index} className={css.tag} onClick={() => { this.props.changeWhichBar('NoteList'); }}>
          <div className={css.text}>
            {`#${Tag.name}`}
          </div>
        </div>
        ));
    } else {
      tagList = []
      var temp = <div className={css.tag} onClick={() => { this.props.changeWhichBar('NoteList'); }}><div className={css.text}>{`#Loading`}</div></div>
      for (let i = 0; i < 20; i++) {
        tagList.push(temp)
      }
    }
    return (
      <div>
        <Motion style={{ x: spring(this.props.sideBar ? 80 : 0 ) }}>
          { ({ x }) =>
            <div id={css.tagNav} style={{ width: `${x}px` }}>
              <div className={css.tag}>
                <a className={css.facebookButton} href="/auth/facebook">$Facebook</a>
              </div>
              {tagList}
            </div>
        }
        </Motion>
      </div>
    );
  }
}

function mapState(state) {
  return {
  	Mode: state.Note.mode,
    Note: state.Note,
  };
}
