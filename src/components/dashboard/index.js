import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'react-bootstrap';

import LockedAssetsCard from './lockedAssetsCard';
import TotalLoansCard from './totalLoansCard';
import TopAssetsTable from './topAssetsTable';

// modules
import { getBnbSupplyData, getBnbPriceData } from '../../modules/bnb';
import { getKavaData } from '../../modules/kava';
import { getRewardsPeriodData, getRewardsParamsData } from '../../modules/rewards';
import { getCdpData, getCdpParamsData } from '../../modules/cdps';

export default function Dashboard() {
  // get the data from the apis
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBnbSupplyData())
      .then(dispatch(getBnbPriceData()))
      .then(dispatch(getKavaData()))
      .then(dispatch(getRewardsPeriodData()))
      .then(dispatch(getRewardsParamsData()))
      .then(dispatch(getCdpData()))
      .then(dispatch(getCdpParamsData()))
  }, [dispatch]);

  // selectors
  let kavaDataLoaded = useSelector(state => state.kava.kavaDataLoaded)
  let bnbSupplyDataLoaded = useSelector(state => state.bnb.bnbSupplyDataLoaded)
  let bnbPriceDataLoaded = useSelector(state => state.bnb.bnbPriceDataLoaded)
  let rewardsPeriodDataLoaded = useSelector(state => state.rewards.rewardsPeriodDataLoaded)
  let rewardsParamsDataLoaded = useSelector(state => state.rewards.rewardsParamsDataLoaded)
  let cdpDataLoaded = useSelector(state => state.cdps.cdpDataLoaded)
  let cdpParamsDataLoaded = useSelector(state => state.cdps.cdpParamsDataLoaded)


  // don't show the component until data has loaded. Probably a good spot for a
  // loading spinner or css transition
  let hasLoadedData = kavaDataLoaded && bnbSupplyDataLoaded &&
    bnbPriceDataLoaded && rewardsPeriodDataLoaded && rewardsParamsDataLoaded &&
    cdpDataLoaded && cdpParamsDataLoaded;

  if(!hasLoadedData) return (<span />)

  return (
    <div>
      <div className="header-container">
        <h1 className="heading-1">Assets</h1>
        <div className="text-medium hero overview">Overview</div>
      </div>

      <div className="panel-data-container">
        <Row>
          <Col id="locked-card" lg={6}>
            <LockedAssetsCard />
          </Col>
          <Col id="loans-card" lg={6}>
            <TotalLoansCard />
          </Col>
        </Row>
        <Row className="table-container">
          <TopAssetsTable />
        </Row>
      </div>
    </div>
  )
}
