import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as rewardsModule from 'modules/rewards';

import { RewardsParamsPayload } from '../factories/rewardsParamsResponse';
import { RewardsPeriodPayload } from '../factories/rewardsPeriodResponse';

jest.mock('axios');

describe('rewardsModule', () => {
  const mockStore = configureStore([thunk])
  const store = mockStore({ rewardsPeriodData: {}, rewardsParamsData: {} })
const initialState = {
  rewardsPeriodDataLoaded: false,
  rewardsPeriodData: {},
  rewardsParamsDataLoaded: false,
  rewardsParamsData: {}
};

  afterEach(() => {
    jest.unmock('axios')
    store.clearActions()
  })

  describe('actions', () => {
    it('should RECEIVE_REWARDS_DATA_STARTED', () => {
      expect(rewardsModule.receiveRewardsDataStarted())
        .toEqual({ type: 'RECEIVE_REWARDS_DATA_STARTED'});
    });

    it('should RECEIVE_REWARDS_PERIOD_DATA', () => {
      expect(rewardsModule.receiveRewardsPeriodData('yay, you did it'))
        .toEqual({ type: 'RECEIVE_REWARDS_PERIOD_DATA', data: 'yay, you did it' });
    });

    it('should RECEIVE_REWARDS_PARAMS_DATA', () => {
      expect(rewardsModule.receiveRewardsParamData('yay, you did it'))
        .toEqual({ type: 'RECEIVE_REWARDS_PARAMS_DATA', data: 'yay, you did it' });
    });

    it('should REWARDS_PERIOD_DATA_ERROR', () => {
      expect(rewardsModule.rewardsPeriodDataError('You in trouble now'))
        .toEqual({type: 'REWARDS_PERIOD_DATA_ERROR', data: 'You in trouble now' });
    });

    it('should REWARDS_PARAMS_DATA_ERROR', () => {
      expect(rewardsModule.rewardsParamsDataError('You in trouble now'))
        .toEqual({type: 'REWARDS_PARAMS_DATA_ERROR', data: 'You in trouble now' });
    });
  });

  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(rewardsModule.default(undefined, {})).toEqual(initialState);
    });

    it('should not modify state when RECEIVE_REWARDS_DATA_STARTED action sent', () => {
      const startedAction = rewardsModule.receiveRewardsDataStarted();
      const state = rewardsModule.default(initialState, startedAction);

      const expectedOutcome = initialState;
      expect(state).toEqual(expectedOutcome);
    });

    it('should update state when RECEIVE_REWARDS_PERIOD_DATA action sent', () => {
      const startedAction = rewardsModule.receiveRewardsPeriodData({'abc': '123'});
      const state = rewardsModule.default(initialState, startedAction);

      const expectedOutcome = {
        rewardsPeriodDataLoaded: true,
        rewardsPeriodData: {'abc': '123'},
        rewardsParamsDataLoaded: false,
        rewardsParamsData: {}
      };
      expect(state).toEqual(expectedOutcome);
    });

    it('should update state when RECEIVE_REWARDS_PARAMS_DATA action sent', () => {
      const startedAction = rewardsModule.receiveRewardsParamData({'abc': '123'});
      const state = rewardsModule.default(initialState, startedAction);

      const expectedOutcome = {
        rewardsPeriodDataLoaded: false,
        rewardsPeriodData: {},
        rewardsParamsDataLoaded: true,
        rewardsParamsData: {'abc': '123'}
      };
      expect(state).toEqual(expectedOutcome);
    });

    it('should return error when REWARDS_PERIOD_DATA_ERROR action sent', () => {
      const errorAction = rewardsModule.rewardsPeriodDataError('broken');
      const state = rewardsModule.default(initialState, errorAction);

      const expectedOutcome = {
        rewardsPeriodDataLoaded: false,
        rewardsPeriodData: {},
        rewardsParamsDataLoaded: false,
        rewardsParamsData: {},
        error: 'broken'
      };
      expect(state).toEqual(expectedOutcome);
    });

    it('should return error when REWARDS_PARAMS_DATA_ERROR action sent', () => {
      const errorAction = rewardsModule.rewardsParamsDataError('broken');
      const state = rewardsModule.default(initialState, errorAction);

      const expectedOutcome = {
        rewardsPeriodDataLoaded: false,
        rewardsPeriodData: {},
        rewardsParamsDataLoaded: false,
        rewardsParamsData: {},
        error: 'broken'
      };
      expect(state).toEqual(expectedOutcome);
    });

    it('should take the default state path', () => {
      const unknownAction = { type: 'FOO' }
      const state = rewardsModule.default(initialState, unknownAction);

      const expectedOutcome = initialState;
      expect(state).toEqual(expectedOutcome);
    });
  });

  describe('services', () => {
    it('should getRewardsParamsData and successfully dispatch to the store', () => {
      axios.get.mockImplementation(() => Promise.resolve(RewardsParamsPayload))

      const startedAction = { type: "RECEIVE_REWARDS_DATA_STARTED" };
      const receiveAction = rewardsModule.receiveRewardsParamData(RewardsParamsPayload.data.result);

      return store.dispatch(rewardsModule.getRewardsParamsData()).then(() => {
        expect(store.getActions()).toEqual([startedAction, receiveAction]);
      })
    });

    it('should getRewardsParamsData and catch error and reject promise', () => {
      const error = 'Unauthorized'

      const startedAction = { type: "RECEIVE_REWARDS_DATA_STARTED" };
      const failedAction = rewardsModule.rewardsParamsDataError(error);

      axios.get.mockImplementation(() => Promise.reject(error))
      return store.dispatch(rewardsModule.getRewardsParamsData()).then(() => {
        expect(store.getActions()).toEqual([startedAction, failedAction]);
      })
    });

    it('should getRewardsPeriodData and successfully dispatch to the store', () => {
      axios.get.mockImplementation(() => Promise.resolve(RewardsPeriodPayload))

      const startedAction = { type: "RECEIVE_REWARDS_DATA_STARTED" };
      const receiveAction = rewardsModule.receiveRewardsPeriodData(RewardsPeriodPayload.data.result);

      return store.dispatch(rewardsModule.getRewardsPeriodData()).then(() => {
        expect(store.getActions()).toEqual([startedAction, receiveAction]);
      })
    });

    it('should getRewardsPeriodData and catch error and reject promise', () => {
      const error = 'Unauthorized'

      const startedAction = { type: "RECEIVE_REWARDS_DATA_STARTED" };
      const failedAction = rewardsModule.rewardsPeriodDataError(error);

      axios.get.mockImplementation(() => Promise.reject(error))
      return store.dispatch(rewardsModule.getRewardsPeriodData()).then(() => {
        expect(store.getActions()).toEqual([startedAction, failedAction]);
      })
    });
  });
})
