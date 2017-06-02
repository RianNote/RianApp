// @flow
import React, { Component } from 'react';
import 'froala-editor/js/froala_editor.pkgd.min';
import NoteAuth from '../noteAuth';
import FroalaEditor from 'react-froala-wysiwyg';
import screenfull from 'screenfull';
import TagBar from './TagBar/index';
import css from '../note.css';
import totalCss from './totalLayout.css';
import './etc.global.css';
import './froalaEditor.global.css';
import './fontawesome.global.css';
import { mockContent } from './mock';
// import { XYruler } from './util';

type DefaultProps = {
  sideBar: boolean
};

type Props = {
  sideBar: boolean
};

type State = {
  title: string,
  initControls: string,
  content: string,
  typewrite: boolean,
  selectedTag: Array<string>
};

class NoteEditor extends Component<DefaultProps, Props, State> {
  static defaultProps = {
    sideBar: false,
  };

  constructor(props: Props) {
    super(props);
    this.screenfull = screenfull;
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleController = this.handleController.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.fullScreen = this.fullScreen.bind(this);
    this.typeWrite = this.typeWrite.bind(this);
  }

  state = {
    title: '자바 프로그래밍과 객체지향',
    options: {},
    initControls: '',
    content: mockContent,
    typewrite: false,
    selectedTag: ['수명', '자바'],
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
    if (this.screenfull.enabled) {
      this.screenfull.request();
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
      <div className={css.paper}>
        <NoteAuth />
        <div className={totalCss.leftEditor}>
          {!this.state.typewrite &&
            <div className={totalCss.head}>
              <textarea
                className={totalCss.title}
                placeholder="title"
                value={this.state.title}
                onChange={this.handleTitleChange}
              />
              <TagBar />
            </div>}
          <FroalaEditor
            tag="mainwriting"
            model={this.state.content}
            config={config}
            onModelChange={this.handleModelChange}
            onManualControllerReady={this.handleController}
          />
        </div>
        <div className={totalCss.rightTool}>
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
