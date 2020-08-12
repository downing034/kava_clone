import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Table } from 'react-bootstrap';
import TopAssetsTableRow from './topAssetsTableRow';

// images
import { ReactComponent as BinanceCoin } from '../../images/binanceCoin.svg';
import { ReactComponent as BinanceUSDCoin } from '../../images/binanceUSDCoin.svg';
import { ReactComponent as BitcoinCoin } from '../../images/bitcoinCoin.svg';

// utils
import { BINANCE_COIN_STABILITY_FEE } from '../../utils/constants';
import { nanoSecondsToSeconds, bnbToBNB, ukavaToKAVA } from '../../utils/conversions';

export default function TopAssetsTable() {
  // selectors
  let cdps = useSelector(state => state.cdps.cdpData);
  let reward = useSelector(state => state.rewards.rewardsParamsData.rewards.find(r => r.denom === 'bnb'));
  let duration = nanoSecondsToSeconds(reward.duration);
  // seconds in year of duration of reward period
  let rewardPeriodsInYear = 31536000 / duration
  let kavaReward = ukavaToKAVA(reward.available_rewards.amount);
  let kavaLastPrice = useSelector(state => state.kava.kavaData.lastPrice);
  let bnbPrice = useSelector(state => state.bnb.bnbPriceData.price);



  // calculations
  let totalValueBorrowed = cdps.reduce(
    (acc, cur) => acc + bnbToBNB(Number(cur.cdp.collateral.amount)), 0
  );
  // amount of kava in USD given in rewards per year
  const USDYearlyRewardsGiven = rewardPeriodsInYear * kavaReward * kavaLastPrice;
  const apy = (USDYearlyRewardsGiven / (totalValueBorrowed * bnbPrice)) *100;

  return (
    <Card className="table-card">
      <Card.Header className="label-large">Top Assets</Card.Header>
      <Card.Body className="table-card-body">
        <Table striped size="sm">
          <thead>
            <tr>
              <th className="label-smallcaps asset-left" colSpan={2}>Asset</th>
              <th className="label-smallcaps data-right">Total Value</th>
              <th className="label-smallcaps data-right">Total Borrow</th>
              <th className="label-smallcaps data-right">Stability Fee</th>
              <th className="label-smallcaps data-right">
              <span role="img" aria-label="fire">🔥</span> Est. Rewards (APY)</th>
            </tr>
          </thead>
          <tbody>
          <TopAssetsTableRow
            icon={<BinanceCoin />}
            assetName='Binance Coin'
            totalValue={21.66} // not sure where this value comes from
            totalBorrow={7.25} // not sure where this value comes from
            stabilityFee={BINANCE_COIN_STABILITY_FEE}
            apy={apy}
          />
          <TopAssetsTableRow
            icon={<BinanceUSDCoin />}
            assetName='Binance USD'
            totalValue="-"
            totalBorrow="-"
            stabilityFee="-"
            apy="-"
          />
          <TopAssetsTableRow
            icon={<BitcoinCoin />}
            assetName='Bitcoin'
            totalValue="-"
            totalBorrow="-"
            stabilityFee="-"
            apy="-"
          />
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}
