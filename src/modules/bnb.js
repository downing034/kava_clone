import axios from 'axios';
import { KAVA_API_BASE } from '../utils/constants';

// Actions
export const RECEIVE_BNB_DATA_STARTED = 'RECEIVE_BNB_DATA_STARTED';
export const RECEIVE_BNB_SUPPLY_DATA = 'RECEIVE_BNB_SUPPLY_DATA';
export const RECEIVE_BNB_PRICE_DATA = 'RECEIVE_BNB_PRICE_DATA';
export const BNB_SUPPLY_DATA_ERROR = 'BNB_SUPPLY_DATA_ERROR';
export const BNB_PRICE_DATA_ERROR = 'BNB_PRICE_DATA_ERROR';

// Reducer
const initialState = {
  bnbSupplyDataLoaded: false,
  bnbPriceDataLoaded: false,
  bnbSupplyData: {},
  bnbPriceData: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_BNB_DATA_STARTED':
      return {
        ...state,
      }
    case 'RECEIVE_BNB_SUPPLY_DATA':
      return {
        ...state,
        bnbSupplyDataLoaded: true,
        bnbSupplyData: action.data
      }
    case 'RECEIVE_BNB_PRICE_DATA':
      return {
        ...state,
        bnbPriceDataLoaded: true,
        bnbPriceData: action.data
      }
    case 'BNB_SUPPLY_DATA_ERROR':
      return {
        ...state,
        bnbSupplyDataLoaded: false,
        error: action.data
      }
    case 'BNB_PRICE_DATA_ERROR':
      return {
        ...state,
        bnbPriceDataLoaded: false,
        error: action.data
      }
    default:
      return state
  };
};

// Action Creators
export const receiveBnbDataStarted = () => {
  return { type: RECEIVE_BNB_DATA_STARTED };
};

export const receiveBnbSupplyData = (data) => {
  return { type: RECEIVE_BNB_SUPPLY_DATA, data };
};

export const bnbSupplyDataError = (data) => {
  return { type: BNB_SUPPLY_DATA_ERROR, data };
};

export const receiveBnbPriceData = (data) => {
  return { type: RECEIVE_BNB_PRICE_DATA, data };
};

export const bnbPriceDataError = (data) => {
  return { type: BNB_PRICE_DATA_ERROR, data };
};

// services
export function getBnbSupplyData() {
  return dispatch => {
    dispatch(receiveBnbDataStarted());
    let bnbSupplyUrl = KAVA_API_BASE + 'bep3/supply/bnb';
    return axios.get(bnbSupplyUrl)
      .then(res => {
        return dispatch(receiveBnbSupplyData(res.data.result));
      })
      .catch(error => {
        return dispatch(bnbSupplyDataError(error));
      })
  };
};

export function getBnbPriceData() {
  return dispatch => {
    dispatch(receiveBnbDataStarted());
    let bnbPriceUrl = KAVA_API_BASE + 'pricefeed/price/bnb:usd';
    return axios.get(bnbPriceUrl)
      .then(res => {
        return dispatch(receiveBnbPriceData(res.data.result));
      })
      .catch(error => {
        return dispatch(bnbPriceDataError(error));
      })
  };
};
