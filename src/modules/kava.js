import axios from 'axios';

// Actions
export const RECEIVE_KAVA_DATA_STARTED = 'RECEIVE_KAVA_DATA_STARTED';
export const RECEIVE_KAVA_DATA = 'RECEIVE_KAVA_DATA';
export const KAVA_DATA_ERROR = 'KAVA_DATA_ERROR';

// Reducer
const initialState = { kavaDataLoaded: false, kavaData: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_KAVA_DATA_STARTED':
      return {
        ...state,
      }
    case 'RECEIVE_KAVA_DATA':
      return {
        ...state,
        kavaDataLoaded: true,
        kavaData: action.data
      }
    case 'KAVA_DATA_ERROR':
      return {
        ...state,
        kavaDataLoaded: false,
        error: action.data
      }
    default:
      return state
  };
};

// Action Creators
export const receiveKavaDataStarted = () => {
  return { type: RECEIVE_KAVA_DATA_STARTED };
};

export const receiveKavaData = (data) => {
  return { type: RECEIVE_KAVA_DATA, data };
};

export const kavaDataError = (data) => {
  return { type: KAVA_DATA_ERROR, data };
};

// services
export function getKavaData() {
  return dispatch => {
    dispatch(receiveKavaDataStarted());
    return axios.get('https://api.binance.com/api/v3/ticker/24hr?symbol=KAVAUSDT')
      .then(res => {
        return dispatch(receiveKavaData(res.data));
      })
      .catch(error => {
        return dispatch(kavaDataError(error));
      })
  };
};
