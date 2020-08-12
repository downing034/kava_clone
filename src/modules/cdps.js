import axios from 'axios';
import { KAVA_API_BASE } from '../utils/constants';

// Actions
export const RECEIVE_CDP_DATA_STARTED = 'RECEIVE_CDP_DATA_STARTED';
export const RECEIVE_CDP_DATA = 'RECEIVE_CDP_DATA';
export const RECEIVE_CDP_PARAMS_DATA = 'RECEIVE_CDP_PARAMS_DATA';
export const CDP_PARAMS_DATA_ERROR = 'CDP_PARAMS_DATA_ERROR';
export const CDP_DATA_ERROR = 'CDP_DATA_ERROR';

// Reducer
const initialState = {
  cdpDataLoaded: false,
  cdpData: [],
  cdpParamsDataLoaded: false,
  cdpParamsData: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_CDP_DATA_STARTED':
      return {
        ...state,
      }
    case 'RECEIVE_CDP_DATA':
      return {
        ...state,
        cdpDataLoaded: true,
        cdpData: action.data
      }
    case 'RECEIVE_CDP_PARAMS_DATA':
      return {
        ...state,
        cdpParamsDataLoaded: true,
        cdpParamsData: action.data
      }
    case 'CDP_DATA_ERROR':
      return {
        ...state,
        cdpDataLoaded: false,
        error: action.data
      }

      case 'CDP_PARAMS_DATA_ERROR':
      return {
        ...state,
        cdpParamsDataLoaded: false,
        error: action.data
      }
    default:
      return state
  };
};

// Action Creators
export const receiveCdpDataStarted = () => {
  return { type: RECEIVE_CDP_DATA_STARTED };
};

export const receiveCdpData = (data) => {
  return { type: RECEIVE_CDP_DATA, data };
};

export const cdpDataError = (data) => {
  return { type: CDP_DATA_ERROR, data };
};

export const receiveCdpParamsData = (data) => {
  return { type: RECEIVE_CDP_PARAMS_DATA, data };
};

export const cdpParamsDataError = (data) => {
  return { type: CDP_PARAMS_DATA_ERROR, data };
};

// services
export function getCdpData() {
  return dispatch => {
    dispatch(receiveCdpDataStarted());
    let cdpDataUrl = KAVA_API_BASE + 'cdp/cdps/denom/bnb'
    return axios.get(cdpDataUrl)
      .then(res => {
        return dispatch(receiveCdpData(res.data.result));
      })
      .catch(error => {
        return dispatch(cdpDataError(error));
      })
  };
};

export function getCdpParamsData() {
  return dispatch => {
    dispatch(receiveCdpDataStarted());
    let cdpParamsDataUrl = KAVA_API_BASE + 'cdp/parameters'
    return axios.get(cdpParamsDataUrl)
      .then(res => {
        return dispatch(receiveCdpParamsData(res.data.result));
      })
      .catch(error => {
        return dispatch(cdpParamsDataError(error));
      })
  };
};
