// @flow
import React, { Component } from 'react';
import ContainerCss from '../note.css';
import css from './noteAuth.css';

type DefaultProps = {};

type Props = {};

type State = {};

class NotAuth extends Component<DefaultProps, Props, State> {
  static defaultProps = {};

  constructor(props: Props) {
    super(props);
  }

  state = {};

  render() {
    return (
      <div className={css.loginContainer}>
        login
      </div>
    );
  }
}

export default NotAuth;
