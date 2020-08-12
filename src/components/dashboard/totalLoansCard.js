import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Col, Row } from 'react-bootstrap';

// components
import FeaturedCardInfo from './featuredCardInfo';
import Divider from '../shared/divider';
import ComingSoonProgressBar from './comingSoonProgressBar';
import ArrowDownLabel from './arrowDownLabel';
import ProgressBarPanel from './progressBarPanel';

// images
import { ReactComponent as BorrowedIcon } from '../../images/borrow.svg';
import { ReactComponent as UsdxCoinIcon } from '../../images/usdxCoin.svg';

// utils
import { USDX_SAVINGS_RATE } from '../../utils/constants';
import { usdxToUSDX } from '../../utils/conversions';
import { numberToMoneyNoSymbol } from '../../utils/viewUtils';

export default function TotalLoansCard() {
  // selectors
  let globalDebtLimit = useSelector(state => usdxToUSDX(state.cdps.cdpParamsData.global_debt_limit.amount));

  return (
    <Card className="mr-lg-2" style={{height:"100%"}}>
      <Card.Body>
        <FeaturedCardInfo
          icon={<BorrowedIcon />}
          title="Total Value Borrowed"
          metricValue={globalDebtLimit}
        />
        <Divider />

        <ArrowDownLabel labelText="Top Borrowed Assets" />
        <Divider />

        <ProgressBarPanel
          type="USDX"
          supply={globalDebtLimit} // I'm not sure where in the api this number comes from
          limit={globalDebtLimit}
          limitPercent={100}
        />
        <Divider />

        <ComingSoonProgressBar />


      </Card.Body>
      <Card.Footer>
        <Row>
          <Col className="icon-wrapper center-it">
            <div className="align-self-center usdx-savings">
              <UsdxCoinIcon />
            </div>
            <div className="value-wrapper usdx-savings-wrapper align-self-center">
              <div className="label-smallcaps">USDX Savings Rate</div>
              <div className="digit usdx-savings-rate">{`${USDX_SAVINGS_RATE}%`}</div>
            </div>
          </Col>

          <div className="stats-divider"></div>

          <Col className="text-center align-self-center">
            <div className="label-smallcaps">USDX Minted</div>
            <div className="digit rewards-distributed">{numberToMoneyNoSymbol(globalDebtLimit)} USDX</div>
          </Col>

        </Row>
      </Card.Footer>
    </Card>
  )
}
