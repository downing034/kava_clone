import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-bootstrap';

export default function ComingSoonProgressBar({ assetType }) {
  return (
    <div>
      <div className="digit asset">{assetType}</div>
      <div className="percent-container">
        <div className="progress-bar-container progress-bar-disabled">
          <ProgressBar now={100} />
        </div>
        <div className="percent-status-container">
          <div className="digit percent coming-soon">
            Coming
            <br/>
            Soon
          </div>
        </div>
      </div>
    </div>
  );
}

ComingSoonProgressBar.propTypes = { assetType: PropTypes.string }
