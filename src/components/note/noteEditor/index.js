import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from '../note.css';
import './froalaEditor.global.css';
import './fontawesome.global.css';
import './titleTag.global.css';
import './totalLayout.global.css';
// Note that Froala Editor has to be required separately
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/languages/ko.js';

import FroalaEditor from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import FroalaEditorInput from 'react-froala-wysiwyg/FroalaEditorInput';
import './jquery.caret-master/jquery.caret.js';


@connect(mapState)
export default class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      tag: '',
      options: { },
      initControls: '',
      content: '<span>Fuck you</span>',
    };

    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleController = this.handleController.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
  }

  componentDidMount() {
    console.log(this.state);
    this.initControls.initialize();
    const textEditor = this.initControls.getEditor()();


    this.initControls.getEditor()('toolbar.hide');
    this.initControls.getEditor()('events.on', 'keydown', e => {
      if (e.which == '13' || e.which == '10') {
        e.preventDefault();
        e.stopPropagation();
        console.log($('.fr-view'));
        console.log($('.fr-view').caret());
        // console.log($(window.getSelection()))
        // $(window.getSelection()).animate({top: 10}, '500')
      }
      if (e.which == '38') {
        if ($('.fr-view').caret('position').top - $('.fr-view').caret('position').height <= 0) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
      if (e.which == '40') {


      }
    }, true);
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
    console.log('sdfsdf', e.target.value);
    this.setState({ title: e.target.value });
  }

  handleTagChange(e) {
    this.setState({ tag: e.target.value });
  }


  render() {
  	const { Mode } = this.props;
    return (
      <div className={css.right}>
        <div className="left-editor">
          <div className="head">
            <input className="title" placeholder="title" value={this.state.title} onChange={this.handleTitleChange} />
            <input className="tag" placeholder="tag" value={this.state.tag} onChange={this.handleTagChange} />
          </div>
          <FroalaEditor
            tag="mainwriting"
            model={this.state.content}
            config={{
              height: `${window.innerHeight - (88 + 50)}`,
              width: '100%',
              editorClass: 'mainEditor',
              placeholderText: 'Fuck you',
              enter: $.FroalaEditor.ENTER_DIV,
              toolbarInline: true,
              language: 'ko',
              spellcheck: false,
            }}
            onModelChange={this.handleModelChange}
            onManualControllerReady={this.handleController} />
        </div>
        <div className="right-tool">
          <div className="fa fa-etsy richstyle fa-lg" aria-hidden="true" />
          <div className="fa fa-square-o mode fa-lg" aria-hidden="true" />
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
