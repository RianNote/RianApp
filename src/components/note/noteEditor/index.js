// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FroalaEditor from 'react-froala-wysiwyg';
import 'froala-editor/js/froala_editor.pkgd.min';
import screenfull from 'screenfull';
import css from '../note.css';
import './froalaEditor.global.css';
import './fontawesome.global.css';
import './titleTag.global.css';
import './totalLayout.global.css';

// Note that Froala Editor has to be required separately

import { mockContent } from './mock';
// import { XYruler } from './util';

const mapState = state => ({
  Mode: state.Note.mode,
  Note: state.Note,
});

type DefaultProps = {
  sideBar: number
};

type Props = {
  sideBar: number
};

type State = {
  title: string,
  tag: string,
  initControls: string,
  content: string,
  typewrite: boolean
};

@connect(mapState)
class NoteEditor extends Component<DefaultProps, Props, State> {
  static defaultProps = {
    sideBar: 0,
  };

  constructor(props: Props) {
    super(props);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleController = this.handleController.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.fullScreen = this.fullScreen.bind(this);
    this.typeWrite = this.typeWrite.bind(this);
  }

  state = {
    title: 'Lorem ipsum dolor sit amet',
    tag: '#Latin',
    options: {},
    initControls: '',
    content: mockContent,
    typewrite: false,
  };

  componentDidMount() {
    this.initControls.initialize();
    this.initControls.getEditor()('toolbar.hide');
  }

  handleModelChange: Function;
  handleController: Function;
  handleTitleChange: Function;
  handleTagChange: Function;
  fullScreen: Function;
  typeWrite: Function;
  initControls: any;

  handleModelChange(model: string) {
    this.setState(() => ({ content: model }));
  }

  handleController(initControls: any) {
    this.initControls = initControls;
  }

  handleTitleChange(event: Event & { currentTarget: { value: string } }) {
    this.setState({ title: event.currentTarget.value });
  }

  handleTagChange(event: Event & { currentTarget: { value: string } }) {
    this.setState({ tag: event.currentTarget.value });
  }

  fullScreen() {
    if (screenfull.enabled) {
      screenfull.request();
    } else {
      // Ignore or do something else
    }
  }

  typeWrite() {
    this.setState(prevState => ({
      typewrite: !prevState.typewrite,
    }));
  }

  render() {
    const config = {
      spellcheck: false,
      width: '100%',
      toolbarVisibleWithoutSelection: true,
      editorClass: 'mainEditor',
      charCounterCount: false,
      toolbarInline: true,
      toolbarButtons: [
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        '|',
        'paragraphFormat',
        'align',
        'formatOL',
        'formatUL',
        'outdent',
        'indent',
        'quote',
        '-',
        'insertLink',
        'insertImage',
        '|',
        'insertHR',
        '|',
        'print',
        'html',
        '|',
      ],
      paragraphFormat: {
        N: 'Normal',
        H3: 'Head 3',
        H2: 'Head 2',
        H1: 'Head 1',
      },
    };

    return (
      <div
        className={css.paper}
        style={{ paddingLeft: this.props.sideBar && '500px' }}
      >
        <div className="left-editor">
          {!this.state.typewrite &&
            <div className="head">
              <textarea
                className="title"
                placeholder="title"
                value={this.state.title}
                onChange={this.handleTitleChange}
              />
              <textarea
                className="tag"
                placeholder="tag"
                value={this.state.tag}
                onChange={this.handleTagChange}
              />
            </div>}
          <FroalaEditor
            tag="mainwriting"
            model={this.state.content}
            config={config}
            onModelChange={this.handleModelChange}
            onManualControllerReady={this.handleController}
          />
        </div>
        <div className="right-tool">
          <div
            className="fa fa-etsy richstyle fa-lg"
            aria-hidden="true"
            onClick={this.typeWrite}
          />
          <div
            className="fa fa-square-o mode fa-lg"
            aria-hidden="true"
            onClick={this.fullScreen}
          />
        </div>
      </div>
    );
  }
}

export default NoteEditor;
