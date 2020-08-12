import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as ArrowDownIcon } from '../../images/arrowDown.svg';

export default function ArrowDownLabel({ labelText }) {
  return (
    <div className="label-small-wrapper">
      <div className="label-small">{labelText}</div>
      <div className="arrow-down">
        <ArrowDownIcon />
      </div>
    </div>
  );
}

ArrowDownLabel.propTypes = {
  labelText: PropTypes.string.isRequired
}
