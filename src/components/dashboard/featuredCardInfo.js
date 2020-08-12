import React from 'react';
import PropTypes from 'prop-types';
import {  numberToMoneyString } from '../../utils/viewUtils';

export default function FeaturedCardInfo({ icon, title, metricValue }) {
  return (
    <div className="icon-wrapper">
      {icon}
      <div className="value-wrapper">
        <div className="label-small">{title}</div>
        <div className="digit value-locked">{numberToMoneyString(metricValue)}</div>
      </div>
    </div>
  )
};

FeaturedCardInfo.propTypes = {
  icon: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  metricValue: PropTypes.number.isRequired
}
