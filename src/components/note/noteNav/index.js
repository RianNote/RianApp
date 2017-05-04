import React, { Component } from 'react';
import { connect } from 'react-redux';
import noteCss from '../note.css';
import css from './noteNav.css';

@connect(mapState)
export default class NoteNav extends Component {
  constructor(props) {
    super(props);
  }
  render() {
  	const { Mode } = this.props;
    return (
      <div className={noteCss.left}>
        <div className={noteCss.firstTag} />
        <div className={noteCss.tag}>
          <div className={noteCss.icon} /> 
          <a className={css.facebookButton} href="/auth/facebook">Facebook</a>
        </div>
        <div className={noteCss.tag} > 
          <div className={noteCss.icon} /> 
          <div className={noteCss.text}>
            Notes
          </div>
        </div>
        <div className={noteCss.tag} > 
          <div className={noteCss.icon} /> 
          <div className={noteCss.text}>
            Trash
          </div>
        </div>
        <div className={noteCss.tag} > 
          <div className={noteCss.icon} /> 
          <div className={noteCss.text}>
            EXAMPLETAGGTTASDASDJLASDLJASKDJASKJDKJASKDASD
          </div>
        </div>
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
