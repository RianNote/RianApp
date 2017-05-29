import React from 'react';
import PropTypes from 'prop-types';
import css from './cardSnippet.css';

const makeTagToElement = tagSet =>
  tagSet.map((data, index) => (
    <div key={index} className={css.tagInstance}>{data}</div>
  ));

const CardSnippet = ({ title, preview, tag }) => (
  <div className={css.container}>
    <div className={css.head}>

      <div className={css.title}>
        <div className={css.block} />
        <div className={css.text}>{title}</div>
      </div>
    </div>
    <div className={css.footer}>
      <p className={css.preview}>{preview}</p>
      <div className={css.tag}>
        <img
          className={css.tagImg}
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAABGdBTUEAALGPC/xhBQAAA85JREFUWAnFmGuITVEUx9fa905DSRp55JGUD4QyM8ZMwjQZjyRFPilRCgmhKOKjkFeUmjxCvvognzC43fKaB5mQL8pIxAdKjME95yz/vc89d+bee2bOOfeeYde5e5+11t7rd9de+3EvU0xF7nXMI8fegOGaSWQK6srAoZm/kVA7JRIHeXFdu7bnwE4BBvKwayz97L0AiFUBpoOpbVKJldw871ZyMKsgnaQ6p1NPbyuRTDK2zBl84xQp6SRRn4L6o99Y2O9EPZLEvigik0uOkIGxrBQiMz7r+Cpm6QAvrfkYDNJnIa1tu0mcU0ZSUTGjpAgVwbDax0vqj/e5idBieY8oucWWSZGBimF4L2BO+CFIqmsWkbUdUzIXeosUd5CjTnJTdXfOXnI4RqRyihANf5gGf5j0081EmU4iZwuAavHUk+NsJ7ZfSKpj7UDuQgNFg3lejbw4Bwgsff6AyACaz2BNf0XOjSDmy5LumuoHFWrKosAYJ2IdwERgbH5HlcNreP7Mr1ou6RcniX49B1QVsbUHoh3Gvt9HYIQiw+jBheqyPlo8GP3OjbORwHzN6BzxbLKmbjUoUEkw7rhu5BVl8rzpF0/GVFGkM2o/KWRlwOgRkcwoQpvk0fvhpq1fH72qgmyd+47N06f45lCZMEQJdRorahVyZQb9+fxU0p2XyEFEfvduBdYETN5vSibP+vAggAWlbBiMx4tq0sRyCKsJuwygHMEqkyN4pkCWwarbyQvmvDKu86bOtvOA4oDxvh831h3WaYylfhP1B4B047mOEDRwY+15zw7A03JtlfiYO8vihMk5CNGQ1sfPkFfVgP1CzfXjTIT+G8y9ttUGRoMLXWdmW5nMtzJ3ETr31GZ9NvkfByG+cGgTHB+zyHYumg46ryr5mG4r6vl+FHQTs4p/B5Ox7sNnlfErtJ8b69/qdhIwy42QOfXPIuPCjHH9Ugv84khxi8IqyG5c0uMJh6o201QAQ80N2/r700n9wAiEV8idJ+v7K+NsDwSDRPauZ8adomTFXuwTP5HmGu7KUECFhdFEiptq32APWIOp+zUUUFFgNFDfxtjatgy3uxtI8mEQO9Bt5KUN7lVBW5ZQosJoFzkg/YJfALFBlQJTBBQXVKkwvkDlQpUDMyBQqVDlwgwKFBUqDphAoLBQccGEAgqCihMmNJAvFBOuDvhdTrwLV5fR2gabSIs+mwqPA6ML+ZG3DwX1yd+nCqxjgNEj5t2pC1wUveJPhds48hZC8TKnZPpBrHaUGxlvvEgR8jrpWtLtk+mPGkXJ2tfcxFZ/XTntv1uaNyKE8HLcAAAAAElFTkSuQmCC" />
        {makeTagToElement(tag)}
      </div>
    </div>
  </div>
);

CardSnippet.propTypes = {
  title: PropTypes.string.isRequired,
  tag: PropTypes.array.isRequired,
  preview: PropTypes.string.isRequired,
};

CardSnippet.defaultProps = {
  title: '',
  tag: [],
  preview: '',
};

export default CardSnippet;
