import React from 'react';
import PropTypes from 'prop-types';
import css from './tagInformation.css';

const TagInformation = ({ noteCount }) => (
  <div className={css.container}>
    <span className={css['note-count']}>{noteCount}</span>
    <span className={css.standard}>Notes</span>
  </div>
  );

TagInformation.propTypes = {
  noteCount: PropTypes.number,
};

TagInformation.defaultProps = {
  noteCount: 0,
};

export default TagInformation;
