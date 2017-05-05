import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from '../note.css';
import './froala.global.css';
import './fontawesome.global.css';

// Note that Froala Editor has to be required separately
import "froala-editor/js/froala_editor.pkgd.min.js";

import FroalaEditor from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

@connect(mapState)
export default class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '<span>My Document\'s Title</span>',
    }
    this.handleModelChange = this.handleModelChange.bind(this)
  }


  handleModelChange(model) {
      this.setState({content: model});
  }


  render() {
  	const { Mode } = this.props;
    return (
      <div className={css.right}>
       <FroalaEditor
            model={this.state.content}
            onModelChange={this.handleModelChange}
       />
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
