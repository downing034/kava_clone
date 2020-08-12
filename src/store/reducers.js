import { combineReducers } from 'redux';
import bnb from '../modules/bnb';
import kava from '../modules/kava';
import rewards from '../modules/rewards';
import cdps from '../modules/cdps';

export default combineReducers({
  bnb,
  kava,
  rewards,
  cdps
});
