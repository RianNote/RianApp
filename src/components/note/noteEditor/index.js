// @flow
import React, { Component } from 'react';
import 'froala-editor/js/froala_editor.pkgd.min';
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

  screenfull: any;
  handleModelChange: Function;
  handleController: Function;
  handleTitleChange: Function;
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
      editorClass: 'mainEditor',
      width: '100%',
      charCounterCount: false,
      tabSpaces: 8,
      toolbarInline: true,
      toolbarVisibleWithoutSelection: false,
      toolbarButtonsSM: [
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
        '-',
        'insertLink',
        '|',
        'insertHR',
        '|',
        'print',
        'html',
        '|',
      ],
      toolbarButtonsXS: [
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
        '-',
        'insertLink',
        '|',
        'insertHR',
        '|',
        'print',
        'html',
        '|',
      ],
      toolbarButtonsMD: [
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
        '-',
        'insertLink',
        '|',
        'insertHR',
        '|',
        'print',
        'html',
        '|',
      ],

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
        '-',
        'insertLink',
        '|',
        'insertHR',
        '|',
        'print',
        'html',
        '|',
      ],
      paragraphFormat: {
        N: 'Normal',
        H4: 'Code',
        H3: 'Head 3',
        H2: 'Head 2',
        H1: 'Head 1',
      },
    };

    return (
      <div className={css.paper}>
        <div className={totalCss.container}>
          <div className={totalCss.mainBox}>
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
          {/* <div className={totalCss.optionBox}>
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
          </div>*/}
        </div>
      </div>
    );
  }
}

export default NoteEditor;
