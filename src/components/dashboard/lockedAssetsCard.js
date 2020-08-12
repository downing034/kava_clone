import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Col, Row } from 'react-bootstrap';

// components
import FeaturedCardInfo from './featuredCardInfo';
import Divider from '../shared/divider';
import ComingSoonProgressBar from './comingSoonProgressBar';
import ArrowDownLabel from './arrowDownLabel';
import ProgressBarPanel from './progressBarPanel';

import {
  numberToMoneyNoSymbol,
  numberToMoneyString,
  formatPercentages,
  percentageDisplayClass
} from '../../utils/viewUtils';

import { bnbToBNB, nanoSecondsToSeconds, ukavaToKAVA } from '../../utils/conversions';

// images
import { ReactComponent as LockedIcon } from '../../images/lock.svg';
import { ReactComponent as KavaCoinIcon } from '../../images/kavaCoin.svg';

export default function LockedAssetsCard() {
  // selectors
  // NOTE: These selectors could be cleaned up since there are duplicates across
  // this card and the table.
  let bnbCurrentSupply = bnbToBNB(useSelector(state => state.bnb.bnbSupplyData.current_supply.amount));
  let bnbPrice = useSelector(state => state.bnb.bnbPriceData.price);
  let bnbSupplyLimit = bnbToBNB(useSelector(state => state.bnb.bnbSupplyData.supply_limit.amount));
  let kavaLastPrice = useSelector(state => state.kava.kavaData.lastPrice);
  let kavaPriceChangePercent = useSelector(state => state.kava.kavaData.priceChangePercent);
  let reward = useSelector(state => state.rewards.rewardsParamsData.rewards.find(r => r.denom === 'bnb'));
  let rewardPeriodStart = useSelector(state => state.rewards.rewardsPeriodData.find(r => r.denom === 'bnb').start);

  // calculated values
  let totalAssetValue = bnbCurrentSupply * bnbPrice;
  let lockOverLimitPercent = (bnbCurrentSupply / bnbSupplyLimit) * 100;
  let duration = nanoSecondsToSeconds(reward.duration);
  let kavaReward = ukavaToKAVA(reward.available_rewards.amount);
  let currentKavaRewardGiven = (1 + ((Date.now() - Date.parse(rewardPeriodStart)) / 10**3) / duration) * kavaReward;
  let rewardsDistributed = currentKavaRewardGiven * kavaLastPrice;

  const pricePercentClass = percentageDisplayClass(kavaPriceChangePercent)

  return (
    <Card className="mr-lg-2" style={{height:"100%"}}>
      <Card.Body>
        <FeaturedCardInfo
          icon={<LockedIcon />}
          title="Total Asset Value"
          metricValue={totalAssetValue}
        />
        <Divider />

        <ArrowDownLabel labelText="Top Locked Assets" />
        <Divider />

        <ProgressBarPanel
          type="Binance Coin"
          supply={bnbCurrentSupply}
          limit={bnbSupplyLimit}
          limitPercent={lockOverLimitPercent}
        />
        <Divider />

        <ComingSoonProgressBar type="Binance USD" />
        <Divider />

        <ComingSoonProgressBar type="Bitcoin" />


      </Card.Body>
      <Card.Footer>
        <Row>
          <Col className="text-center align-self-center">
            <div className="kava-coin-price">
              <KavaCoinIcon />
            </div>
            <div className="digit kava-price">{numberToMoneyString(kavaLastPrice)}</div>
            <div className="digit kava-price-percent" style={{background: pricePercentClass}}>{formatPercentages(kavaPriceChangePercent, 2)}</div>
          </Col>

          <div className="stats-divider"></div>

          <Col className="text-center align-self-center">
            <div className="label-smallcaps">Rewards Distributed</div>
            <div className="digit rewards-distributed">{numberToMoneyNoSymbol(rewardsDistributed)} USD</div>
          </Col>

        </Row>
      </Card.Footer>
    </Card>
  )
}
