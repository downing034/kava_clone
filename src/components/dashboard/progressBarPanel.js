import React from 'react';
import PropTypes from 'prop-types';

import {
  numberToMoneyNoDecimal,
  formatPercentages
} from '../../utils/viewUtils';

import { ProgressBar } from 'react-bootstrap';


export default function ProgressBarPanel({ type, supply, limit, limitPercent }) {
  // calculations
  const lockOverLimitText = `${numberToMoneyNoDecimal(supply)} / ${numberToMoneyNoDecimal(limit)}`

  return (
    <div>
      <div className="digit asset">{type}</div>
      <div className="percent-container">
        <div className="progress-bar-container">
          <ProgressBar
            now={Number(limitPercent).toFixed(2)}
            max={100}
            min={0}
            />
           <div className="text-block-15">{lockOverLimitText}</div>
        </div>
        <div className="percent-status-container">
          <div className="digit percent binance-coin-percent">{formatPercentages(limitPercent, 2)}</div>
        </div>
      </div>
    </div>
  );
};

ProgressBarPanel.propTypes = {
  type: PropTypes.string.isRequired,
  supply: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  limitPercent: PropTypes.number.isRequired
}
