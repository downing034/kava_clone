export const MockStore = {
  bnb: {
    bnbSupplyDataLoaded: true,
    bnbPriceDataLoaded: true,
    bnbSupplyData: {
      denom: 'bnb',
      incoming_supply: {
        denom: 'bnb',
        amount: '0'
      },
      outgoing_supply: {
        denom: 'bnb',
        amount: '0'
      },
      current_supply: {
        denom: 'bnb',
        amount: '103158116346152'
      },
      supply_limit: {
        denom: 'bnb',
        amount: '122500000000000'
      }
    },
    bnbPriceData: {
      market_id: 'bnb:usd',
      price: '20.635200000000001097'
    }
  },
  kava: {
    kavaDataLoaded: true,
    kavaData: {
      symbol: 'KAVAUSDT',
      priceChange: '-0.65490000',
      priceChangePercent: '-14.470',
      weightedAvgPrice: '4.05728940',
      prevClosePrice: '4.52420000',
      lastPrice: '3.87090000',
      lastQty: '1691.06000000',
      bidPrice: '3.85570000',
      bidQty: '79.07000000',
      askPrice: '3.86640000',
      askQty: '77.10000000',
      openPrice: '4.52580000',
      highPrice: '4.53740000',
      lowPrice: '3.71620000',
      volume: '7802422.56000000',
      quoteVolume: '31656686.37779300',
      openTime: 1597126413745,
      closeTime: 1597212813745,
      firstId: 3752828,
      lastId: 3842559,
      count: 89732
    }
  },
  rewards: {
    rewardsPeriodDataLoaded: true,
    rewardsPeriodData: [
      {
        denom: 'bnb',
        start: '2020-08-05T14:00:21.148983045Z',
        end: '2020-08-12T14:00:21.148983045Z',
        reward: {
          denom: 'ukava',
          amount: '122354'
        },
        claim_end: '2020-08-26T14:00:21.148983045Z',
        claim_time_lock: '31536000000000000'
      }
    ],
    rewardsParamsDataLoaded: true,
    rewardsParamsData: {
      active: true,
      rewards: [
        {
          active: true,
          denom: 'bnb',
          available_rewards: {
            denom: 'ukava',
            amount: '74000000000'
          },
          duration: '604800000000000',
          time_lock: '31536000000000000',
          claim_duration: '1209600000000000'
        }
      ]
    }
  },
  cdps: {
    cdpDataLoaded: true,
    cdpData: [
      {
        cdp: {
          id: '2',
          owner: 'kava19txnej5reyyun4cadgq3kt7ynwpew364kuvfuu',
          collateral: {
            denom: 'bnb',
            amount: '1499799998000'
          },
          principal: {
            denom: 'usdx',
            amount: '159481744333'
          },
          accumulated_fees: {
            denom: 'usdx',
            amount: '12237928'
          },
          fees_updated: '2020-08-12T06:13:25.432558537Z'
        },
        collateral_value: {
          denom: 'usdx',
          amount: '310660922606'
        },
        collateralization_ratio: '1.947790870864060806'
      },
      {
        cdp: {
          id: '231',
          owner: 'kava1w20u97emzxc257hdyaywdxnyxs0mx586a5nxe2',
          collateral: {
            denom: 'bnb',
            amount: '574537974'
          },
          principal: {
            denom: 'usdx',
            amount: '42565220'
          },
          accumulated_fees: {
            denom: 'usdx',
            amount: '14738'
          },
          fees_updated: '2020-08-12T06:13:11.676382214Z'
        },
        collateral_value: {
          denom: 'usdx',
          amount: '119006866'
        },
        collateralization_ratio: '2.794903315562044975'
      }
    ],
    cdpParamsDataLoaded: true,
    cdpParamsData: {
      collateral_params: [
        {
          denom: 'bnb',
          liquidation_ratio: '1.500000000000000000',
          debt_limit: {
            denom: 'usdx',
            amount: '7250000000000'
          },
          stability_fee: '1.000000001547125958',
          auction_size: '50000000000',
          liquidation_penalty: '0.075000000000000000',
          prefix: 32,
          spot_market_id: 'bnb:usd',
          liquidation_market_id: 'bnb:usd:30',
          conversion_factor: '8'
        }
      ],
      debt_param: {
        denom: 'usdx',
        reference_asset: 'usd',
        conversion_factor: '6',
        debt_floor: '10000000',
        savings_rate: '0.900000000000000000'
      },
      global_debt_limit: {
        denom: 'usdx',
        amount: '7250000000000'
      },
      surplus_auction_threshold: '200000000000',
      surplus_auction_lot: '10000000000',
      debt_auction_threshold: '50000000000',
      debt_auction_lot: '10000000000',
      savings_distribution_frequency: '86400000000000',
      circuit_breaker: false
    }
  }
}
