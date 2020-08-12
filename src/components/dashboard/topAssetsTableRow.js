import React from 'react';
import PropTypes from 'prop-types';

// utils
import { formatPercentages, numberToMoneyForTable } from '../../utils/viewUtils';

export default function TopAssetsTableRow({icon, assetName, totalValue, totalBorrow, stabilityFee, apy }) {
  return (
    <tr>
      <td colSpan={2}>
        <span id="table-icon">{icon}</span>{assetName}
      </td>
      <td className="align-middle asset data-right">{numberToMoneyForTable(totalValue)}</td>
      <td className="align-middle asset data-right">{numberToMoneyForTable(totalBorrow)}</td>
      <td className="align-middle asset data-right">{formatPercentages(stabilityFee, 0)}</td>
      <td className="align-middle asset data-right">{formatPercentages(apy, 2)}</td>
    </tr>
  )
}

TopAssetsTableRow.propTypes = {
  icon: PropTypes.object.isRequired,
  assetName: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  totalValue: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  totalBorrow: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  stabilityFee: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  apy: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ])
}
