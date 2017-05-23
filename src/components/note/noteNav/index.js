import React, { Component } from 'react';
import { connect } from 'react-redux'
import { gql, graphql, compose } from 'react-apollo';
import { getTagList } from '../../../graphqls/TagGraphQl.js';
import noteCss from '../note.css';
import css from './noteNav.css';

const getTagListQuery = graphql(getTagList, { 
  options: (props) => ({
    variables: {
      userId: "5923b81861322804b81cecb6" //임시 키
    },
    ssr: false, 
  }),
  name: "TagData",
})

@compose(getTagListQuery)
@connect(mapState)
export default class NoteNav extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    console.log('didMount', this.props)
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps)
  }

  render() {
  	const { Mode } = this.props;
    let tagList
    if (this.props.TagData.getTagList) {
      tagList = this.props.TagData.getTagList.map((Tag, index) => {
        return (
          <div className={noteCss.tag} > 
            <div className={noteCss.icon} /> 
            <div className={noteCss.text}>
              {Tag.name}
            </div>
          </div>
        )
      })
    } 
    return (
      <div className={noteCss.left}>
        <div className={noteCss.firstTag} />
        <div className={noteCss.tag}>
          <div className={noteCss.icon} /> 
          <a className={css.facebookButton} href="/auth/facebook">Facebook</a>
        </div>
      {tagList && tagList}
      {!tagList && 
        <div className={noteCss.tag} > 
            <div className={noteCss.icon} /> 
            <div className={noteCss.text}>
              Loading
            </div>
        </div> 
      }
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
