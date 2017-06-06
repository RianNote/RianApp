// @flow
import React from 'react';
import css from './photoCardSnippet.css';
import heartIcon from '../src/heart.svg';
const makeTagToElement = (tagSet: Array<string>) => {
  const SumTagSet = tagSet.reduce((a: string, b: string) => `${a}#${b}`, '');
  return <p className={css.tagInstance}>{SumTagSet}</p>;
};
type Props = {
  title: string,
  preview: string,
  time?: string,
  tag: Array<string>,
  photo: string,
  publish?: boolean | number
};

const CardSnippet = ({
  title = '',
  preview = '',
  time = '2017.08.24',
  tag = [],
  photo = '',
  publish = false,
}: Props) => (
  <div className={css.container}>
    <div className={css.head}>
      <div className={css.title}>
        <div className={css.block} />
        <div className={css.text}>{title}</div>
      </div>
    </div>
    <div className={css.middle}>
      {preview}
    </div>
    <div className={css.footer}>
      <div className={css.left}>
        {publish &&
          <div className={css.share}>
            <img src={heartIcon} alt="alt" />
            <p className={css.number}>{publish}</p>
          </div>}
      </div>
      <div className={css.right}>
        <div className={css.time}>
          {time}
        </div>
        <div className={css.tag}>
          {makeTagToElement(tag)}
        </div>
      </div>
    </div>
  </div>
);

export default CardSnippet;
