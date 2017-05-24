import React, { Component } from 'react';
import { connect } from 'react-redux'
import { gql, graphql, compose } from 'react-apollo';
import {Motion, spring} from 'react-motion';
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
    this.state = {
      sideBar: false
    }
    this.changeSideBar = this.changeSideBar.bind(this)
  }

  changeSideBar(argu){
    this.setState({
      sideBar: argu
    })
    console.log('true', argu)
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
          <div className={css.tag} > 
            <div className={css.icon} /> 
            <div className={css.text}>
              {Tag.name}
            </div>
          </div>
        )
      })
    } 
    return (
      <div>
        <div className={css.hover} onMouseEnter={ ()=>{this.changeSideBar(true);} } onMouseLeave={ ()=>{this.changeSideBar(false);} } />
        <Motion style={{x: spring(this.state.sideBar ? 150 : 0)}}>
        { ({x}) =>
          <div id={css.left} style={{width: `${x}px`}}>
            <div className={css.firstTag} />
            <div className={css.tag}>
              <div className={css.icon} /> 
              <a className={css.facebookButton} href="/auth/facebook">Facebook</a>
            </div>
              {tagList && tagList}
              {!tagList && 
                <div className={css.tag}> 
                    <div className={css.icon} /> 
                    <div className={css.text}>
                      Loading
                    </div>
                </div> 
              }
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
