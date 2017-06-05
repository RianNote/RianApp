// @flow
import React, { Component } from 'react';
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
        <div className={css.icons}>
          icons
        </div>
        <div className={css.signIn}>
          로그인
        </div>
        <div className={css.signUp}>
          회원가입
        </div>
        <div className={css.profileButton}>
          profile
        </div>
      </div>
    );
  }
}

export default NotAuth;
