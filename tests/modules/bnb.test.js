import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as bnbModule from 'modules/bnb';

import { BnbPricePayload } from '../factories/bnbPriceResponse';
import { BnbSupplyPayload } from '../factories/bnbSupplyResponse';

jest.mock('axios');

describe('bnbModule', () => {
  const mockStore = configureStore([thunk])
  const store = mockStore({ bnbPriceData: {}, bnbSupplyData: {} })
  const initialState = {
    bnbSupplyDataLoaded: false,
    bnbSupplyData: {},
    bnbPriceDataLoaded: false,
    bnbPriceData: {}
  };

  afterEach(() => {
    jest.unmock('axios')
    store.clearActions()
  })

  describe('actions', () => {
    it('should RECEIVE_BNB_DATA_STARTED', () => {
      expect(bnbModule.receiveBnbDataStarted())
        .toEqual({ type: 'RECEIVE_BNB_DATA_STARTED'});
    });

    it('should RECEIVE_BNB_SUPPLY_DATA', () => {
      expect(bnbModule.receiveBnbSupplyData('yay, you did it'))
        .toEqual({ type: 'RECEIVE_BNB_SUPPLY_DATA', data: 'yay, you did it' });
    });

    it('should RECEIVE_BNB_PRICE_DATA', () => {
      expect(bnbModule.receiveBnbPriceData('yay, you did it'))
        .toEqual({ type: 'RECEIVE_BNB_PRICE_DATA', data: 'yay, you did it' });
    });

    it('should BNB_SUPPLY_DATA_ERROR', () => {
      expect(bnbModule.bnbSupplyDataError('You in trouble now'))
        .toEqual({type: 'BNB_SUPPLY_DATA_ERROR', data: 'You in trouble now' });
    });

    it('should BNB_PRICE_DATA_ERROR', () => {
      expect(bnbModule.bnbPriceDataError('You in trouble now'))
        .toEqual({type: 'BNB_PRICE_DATA_ERROR', data: 'You in trouble now' });
    });
  });

  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(bnbModule.default(undefined, {})).toEqual(initialState);
    });

    it('should not modify state when RECEIVE_BNB_DATA_STARTED action sent', () => {
      const startedAction = bnbModule.receiveBnbDataStarted();
      const state = bnbModule.default(initialState, startedAction);

      const expectedOutcome = initialState;
      expect(state).toEqual(expectedOutcome);
    });

    it('should update state when RECEIVE_BNB_SUPPLY_DATA action sent', () => {
      const startedAction = bnbModule.receiveBnbSupplyData({'abc': '123'});
      const state = bnbModule.default(initialState, startedAction);

      const expectedOutcome = {
        bnbSupplyDataLoaded: true,
        bnbSupplyData: {'abc': '123'},
        bnbPriceDataLoaded: false,
        bnbPriceData: {}
      };
      expect(state).toEqual(expectedOutcome);
    });

    it('should update state when RECEIVE_BNB_PRICE_DATA action sent', () => {
      const startedAction = bnbModule.receiveBnbPriceData({'abc': '123'});
      const state = bnbModule.default(initialState, startedAction);

      const expectedOutcome = {
        bnbSupplyDataLoaded: false,
        bnbSupplyData: {},
        bnbPriceDataLoaded: true,
        bnbPriceData: {'abc': '123'}
      };
      expect(state).toEqual(expectedOutcome);
    });

    it('should return error when BNB_SUPPLY_DATA_ERROR action sent', () => {
      const errorAction = bnbModule.bnbSupplyDataError('broken');
      const state = bnbModule.default(initialState, errorAction);

      const expectedOutcome = {
        bnbSupplyDataLoaded: false,
        bnbSupplyData: {},
        bnbPriceDataLoaded: false,
        bnbPriceData: {},
        error: 'broken'
      };
      expect(state).toEqual(expectedOutcome);
    });

    it('should return error when BNB_PRICE_DATA_ERROR action sent', () => {
      const errorAction = bnbModule.bnbPriceDataError('broken');
      const state = bnbModule.default(initialState, errorAction);

      const expectedOutcome = {
        bnbSupplyDataLoaded: false,
        bnbSupplyData: {},
        bnbPriceDataLoaded: false,
        bnbPriceData: {},
        error: 'broken'
      };
      expect(state).toEqual(expectedOutcome);
    });

    it('should take the default state path', () => {
      const unknownAction = { type: 'FOO' }
      const state = bnbModule.default(initialState, unknownAction);

      const expectedOutcome = initialState;
      expect(state).toEqual(expectedOutcome);
    });
  });

  describe('services', () => {
    it('should getBnbPriceData and successfully dispatch to the store', () => {
      axios.get.mockImplementation(() => Promise.resolve(BnbPricePayload))

      const startedAction = { type: "RECEIVE_BNB_DATA_STARTED" };
      const receiveAction = bnbModule.receiveBnbPriceData(BnbPricePayload.data.result);

      return store.dispatch(bnbModule.getBnbPriceData()).then(() => {
        expect(store.getActions()).toEqual([startedAction, receiveAction]);
      })
    });

    it('should getBnbPriceData and catch error and reject promise', () => {
      const error = 'Unauthorized'

      const startedAction = { type: "RECEIVE_BNB_DATA_STARTED" };
      const failedAction = bnbModule.bnbPriceDataError(error);

      axios.get.mockImplementation(() => Promise.reject(error))
      return store.dispatch(bnbModule.getBnbPriceData()).then(() => {
        expect(store.getActions()).toEqual([startedAction, failedAction]);
      })
    });

    it('should getBnbSupplyData and successfully dispatch to the store', () => {
      axios.get.mockImplementation(() => Promise.resolve(BnbSupplyPayload))

      const startedAction = { type: "RECEIVE_BNB_DATA_STARTED" };
      const receiveAction = bnbModule.receiveBnbSupplyData(BnbSupplyPayload.data.result);

      return store.dispatch(bnbModule.getBnbSupplyData()).then(() => {
        expect(store.getActions()).toEqual([startedAction, receiveAction]);
      })
    });

    it('should getBnbSupplyData and catch error and reject promise', () => {
      const error = 'Unauthorized'

      const startedAction = { type: "RECEIVE_BNB_DATA_STARTED" };
      const failedAction = bnbModule.bnbSupplyDataError(error);

      axios.get.mockImplementation(() => Promise.reject(error))
      return store.dispatch(bnbModule.getBnbSupplyData()).then(() => {
        expect(store.getActions()).toEqual([startedAction, failedAction]);
      })
    });
  });
})
