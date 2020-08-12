import axios from 'axios';
import { KAVA_API_BASE } from '../utils/constants';

// Actions
export const RECEIVE_REWARDS_DATA_STARTED = 'RECEIVE_REWARDS_DATA_STARTED';
export const RECEIVE_REWARDS_PERIOD_DATA = 'RECEIVE_REWARDS_PERIOD_DATA';
export const RECEIVE_REWARDS_PARAMS_DATA = 'RECEIVE_REWARDS_PARAMS_DATA';
export const REWARDS_PERIOD_DATA_ERROR = 'REWARDS_PERIOD_DATA_ERROR';
export const REWARDS_PARAMS_DATA_ERROR = 'REWARDS_PARAMS_DATA_ERROR';

// Reducer
const initialState = {
  rewardsPeriodDataLoaded: false,
  rewardsPeriodData: {},
  rewardsParamsDataLoaded: false,
  rewardsParamsData: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_REWARDS_DATA_STARTED':
      return {
        ...state,
      }
    case 'RECEIVE_REWARDS_PERIOD_DATA':
      return {
        ...state,
        rewardsPeriodDataLoaded: true,
        rewardsPeriodData: action.data
      }
    case 'RECEIVE_REWARDS_PARAMS_DATA':
      return {
        ...state,
        rewardsParamsDataLoaded: true,
        rewardsParamsData: action.data
      }
    case 'REWARDS_PERIOD_DATA_ERROR':
      return {
        ...state,
        rewardsPeriodDataLoaded: false,
        error: action.data
      }
    case 'REWARDS_PARAMS_DATA_ERROR':
      return {
        ...state,
        rewardsParamsDataLoaded: false,
        error: action.data
      }
    default:
      return state
  };
};

// Action Creators
export const receiveRewardsDataStarted = () => {
  return { type: RECEIVE_REWARDS_DATA_STARTED };
};

export const receiveRewardsPeriodData = (data) => {
  return { type: RECEIVE_REWARDS_PERIOD_DATA, data };
};

export const receiveRewardsParamData = (data) => {
  return { type: RECEIVE_REWARDS_PARAMS_DATA, data };
};

export const rewardsPeriodDataError = (data) => {
  return { type: REWARDS_PERIOD_DATA_ERROR, data };
};

export const rewardsParamsDataError = (data) => {
  return { type: REWARDS_PARAMS_DATA_ERROR, data };
};

// services
export function getRewardsPeriodData() {
  return dispatch => {
    dispatch(receiveRewardsDataStarted());
    let incentivesUrl = KAVA_API_BASE + 'incentive/rewardperiods'
    return axios.get(incentivesUrl)
      .then(res => {
        return dispatch(receiveRewardsPeriodData(res.data.result));
      })
      .catch(error => {
        return dispatch(rewardsPeriodDataError(error));
      })
  };
};

export function getRewardsParamsData() {
  return dispatch => {
    dispatch(receiveRewardsDataStarted());
    let incentiveParamsUrl = KAVA_API_BASE + 'incentive/parameters'
    return axios.get(incentiveParamsUrl)
      .then(res => {
        return dispatch(receiveRewardsParamData(res.data.result));
      })
      .catch(error => {
        return dispatch(rewardsParamsDataError(error));
      })
  };
};
