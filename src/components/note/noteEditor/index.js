import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from '../note.css';
import './froalaEditor.global.css';
import './fontawesome.global.css';
import './titleTag.global.css';
import './totalLayout.global.css';
// Note that Froala Editor has to be required separately
import 'froala-editor/js/froala_editor.pkgd.min.js';

import FroalaEditor from 'react-froala-wysiwyg';
import { mockContent } from './mock.js'
import screenfull from 'screenfull'
@connect(mapState)
export default class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      tag: '',
      options: { },
      initControls: '',
      content: mockContent
    }
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleController = this.handleController.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.fullScreen = this.fullScreen.bind(this);
  }

  componentDidMount() {
    console.log(this.state);
    this.initControls.initialize();
    const textEditor = this.initControls.getEditor()();


    this.initControls.getEditor()('toolbar.hide');
    // this.initControls.getEditor()('events.on', 'keydown', e => {
    //   if (e.which == '13' || e.which == '10') {
   
    //     // console.log($(window.getSelection()))
    //     // $(window.getSelection()).animate({top: 10}, '500')
    //   }
    //   if (e.which == '38') {
         
        
    //   }
    //   if (e.which == '40') {


    //   }
    // }, true);

 
  }


  handleModelChange(model) {
    this.setState((prevState, props) => ({ content: model }));
  }


  handleController(initControls) {
    this.initControls = initControls;
    console.log('create', initControls);
    const backToTypeWriting = () => {
      this.state.initTypeControls.getEditor()('html.set', '');
      this.state.initTypeControls.getEditor()('events.focus');
    };
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleTagChange(e) {
    this.setState({ tag: e.target.value });
  }

  fullScreen(){
    if (screenfull.enabled) {
    screenfull.request();
    } else {
      // Ignore or do something else
    }
  }


  render() {
    const { Mode } = this.props;
    const config = {
              spellcheck: false,
              width: '100%',
              editorClass: 'mainEditor',
              placeholder: 'Fuck you',
              charCounterCount: false,
              toolbarInline: true,
              toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', '|', 'insertHR', '|', 'print', 'help', 'html', '|', 'undo', 'redo'],
              fontSizeDefaultSelection: '20',
    }
    return (
      <div className={css.right}>
        <div className="left-editor">
          <div className="head">
            <textarea className="title" placeholder="title" value={this.state.title} onChange={this.handleTitleChange} />
            <textarea className="tag" placeholder="tag" value={this.state.tag} onChange={this.handleTagChange} />
          </div>
          <FroalaEditor
            tag="mainwriting"
            model={this.state.content}
            config={config}
            onModelChange={this.handleModelChange}
            onManualControllerReady={this.handleController} />
        </div>
        <div className="right-tool">
          <div className="fa fa-etsy richstyle fa-lg" aria-hidden="true" />
          <div className="fa fa-square-o mode fa-lg" aria-hidden="true" onClick={this.fullScreen}/>
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
