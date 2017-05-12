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
import { XYruler } from './util.js'

@connect(mapState)
export default class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Lorem Ipsum',
      tag: '#Latin',
      options: { },
      initControls: '',
      content: mockContent,
      typewrite: false,
    }
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleController = this.handleController.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.fullScreen = this.fullScreen.bind(this);
    this.typeWrite = this.typeWrite.bind(this);
    
  }

  componentDidMount() {
    console.log(this.state);
    this.initControls.initialize();
    const textEditor = this.initControls.getEditor()();
    this.initControls.getEditor()('toolbar.hide');
    console.log(textEditor)
    textEditor[0].spellcheck = false
  }


  handleModelChange(model) {
    this.setState((prevState, props) => ({ content: model }));
  }


  handleController(initControls) {
    this.initControls = initControls;
    console.log('create', initControls);
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

  typeWrite(){
    this.setState((prevState, props) => ({
      typewrite: !prevState.typewrite
    }))
  }

  render() {
    const { Mode } = this.props;
    const config = {
              spellcheck: false,
              width: '100%',
              editorClass: 'mainEditor',
              spellcheck: false,
              charCounterCount: false,
              toolbarInline: true,
              toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', '|', 'insertHR', '|', 'print',  'html', '|'],
              paragraphFormat: {
                N: 'Normal',
                H3: 'Head 3',
                H2: 'Head 2',
                H1: 'Head 1',
              }
    }

    // if (this.state.typewrite) {
    //   const adjustScrollTop = (argu) => {
    //       console.log(window.getSelection().getRangeAt(0), window.getSelection().getRangeAt(0).getClientRects())
    //       if (window.getSelection().getRangeAt(0).getClientRects()[0].top > window.innerHeight/2) {
    //             document.getElementsByClassName(css.right)[0].scrollTop = 
    //                 document.getElementsByClassName(css.right)[0].scrollTop 
    //                   - (window.innerHeight/2 - window.getSelection().getRangeAt(0).getClientRects()[0].top)
    //       } else if (window.getSelection().getRangeAt(0).getClientRects()[0].top < window.innerHeight/2) {
    //             document.getElementsByClassName(css.right)[0].scrollTop = 
    //                 document.getElementsByClassName(css.right)[0].scrollTop 
    //                   + (window.getSelection().getRangeAt(0).getClientRects()[0].bottom - window.innerHeight/2)
    //       }
    //       console.log(window.innerHeight/2, window.getSelection().getRangeAt(0).getClientRects()[0].bottom)
    //   }
      


    //   $('.fr-view').click(e => {
    //     adjustScrollTop()
    //   })

    //   this.initControls.getEditor()('events.on', 'keydown', e => {

    //       if (e.which == '13' || e.which == '10') {
    //         adjustScrollTop()
    //       }
    //       if (e.which == '8') {
    //         adjustScrollTop()
    //       }
    //       if (e.which == '38') {
    //         adjustScrollTop()
    //       }
    //       if (e.which == '40') {
    //         adjustScrollTop()
    //       }

    //   }, true);


    // }

    return (
      <div className={css.right}>
        <div className="left-editor" >
          {!this.state.typewrite &&
            <div className="head">
              <textarea className="title" placeholder="title" value={this.state.title} onChange={this.handleTitleChange} />
              <textarea className="tag" placeholder="tag" value={this.state.tag} onChange={this.handleTagChange} />
            </div>
          }
          <FroalaEditor
            tag="mainwriting"
            model={this.state.content}
            config={config}
            onModelChange={this.handleModelChange}
            onManualControllerReady={this.handleController} />  
        </div>
        <div className="right-tool">
          <div className="fa fa-etsy richstyle fa-lg" aria-hidden="true" onClick={this.typeWrite}/>
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


