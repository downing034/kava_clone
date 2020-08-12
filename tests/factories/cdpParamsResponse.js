export const CdpParamsPayload = {
  data: {
    height: "779679",
    result: {
      collateral_params: [
        {
          denom: "bnb",
          liquidation_ratio: "1.500000000000000000",
          debt_limit: {
            denom: "usdx",
            amount: "7250000000000"
          },
          stability_fee: "1.000000001547125958",
          auction_size: "50000000000",
          liquidation_penalty: "0.075000000000000000",
          prefix: 32,
          spot_market_id: "bnb:usd",
          liquidation_market_id: "bnb:usd:30",
          conversion_factor: "8"
        }
      ],
      debt_param: {
        denom: "usdx",
        reference_asset: "usd",
        conversion_factor: "6",
        debt_floor: "10000000",
        savings_rate: "0.900000000000000000"
      },
      global_debt_limit: {
        denom: "usdx",
        amount: "7250000000000"
      },
      surplus_auction_threshold: "200000000000",
      surplus_auction_lot: "10000000000",
      debt_auction_threshold: "50000000000",
      debt_auction_lot: "10000000000",
      savings_distribution_frequency: "86400000000000",
      circuit_breaker: false
    }
  }
}
