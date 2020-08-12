import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as cdpModule from 'modules/cdps';

import { CdpDataPayload } from '../factories/cdpDataResponse';
import { CdpParamsPayload } from '../factories/cdpParamsResponse';

jest.mock('axios');

describe('cdpModule', () => {
  const mockStore = configureStore([thunk])
  const store = mockStore({ cdpData: [], cdpParamsData: {} })
const initialState = {
  cdpDataLoaded: false,
  cdpData: [],
  cdpParamsDataLoaded: false,
  cdpParamsData: {}
};

  afterEach(() => {
    jest.unmock('axios')
    store.clearActions()
  })

  describe('actions', () => {
    it('should RECEIVE_CDP_DATA_STARTED', () => {
      expect(cdpModule.receiveCdpDataStarted())
        .toEqual({ type: 'RECEIVE_CDP_DATA_STARTED'});
    });

    it('should RECEIVE_CDP_DATA', () => {
      expect(cdpModule.receiveCdpData('yay, you did it'))
        .toEqual({ type: 'RECEIVE_CDP_DATA', data: 'yay, you did it' });
    });

    it('should RECEIVE_CDP_PARAMS_DATA', () => {
      expect(cdpModule.receiveCdpParamsData('yay, you did it'))
        .toEqual({ type: 'RECEIVE_CDP_PARAMS_DATA', data: 'yay, you did it' });
    });

    it('should CDP_DATA_ERROR', () => {
      expect(cdpModule.cdpDataError('You in trouble now'))
        .toEqual({type: 'CDP_DATA_ERROR', data: 'You in trouble now' });
    });

    it('should CDP_PARAMS_DATA_ERROR', () => {
      expect(cdpModule.cdpParamsDataError('You in trouble now'))
        .toEqual({type: 'CDP_PARAMS_DATA_ERROR', data: 'You in trouble now' });
    });
  });

  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(cdpModule.default(undefined, {})).toEqual(initialState);
    });

    it('should not modify state when RECEIVE_CDP_DATA_STARTED action sent', () => {
      const startedAction = cdpModule.receiveCdpDataStarted();
      const state = cdpModule.default(initialState, startedAction);

      const expectedOutcome = initialState;
      expect(state).toEqual(expectedOutcome);
    });

    it('should update state when RECEIVE_CDP_DATA action sent', () => {
      const startedAction = cdpModule.receiveCdpData([{ foo: 'bar' }]);
      const state = cdpModule.default(initialState, startedAction);

      const expectedOutcome = {
        cdpDataLoaded: true,
        cdpData: [{ foo: 'bar' }],
        cdpParamsDataLoaded: false,
        cdpParamsData: {}
      };
      expect(state).toEqual(expectedOutcome);
    });

    it('should update state when RECEIVE_CDP_PARAMS_DATA action sent', () => {
      const startedAction = cdpModule.receiveCdpParamsData({'abc': '123'});
      const state = cdpModule.default(initialState, startedAction);

      const expectedOutcome = {
        cdpDataLoaded: false,
        cdpData: [],
        cdpParamsDataLoaded: true,
        cdpParamsData: {'abc': '123'}
      };
      expect(state).toEqual(expectedOutcome);
    });

    it('should return error when CDP_DATA_ERROR action sent', () => {
      const errorAction = cdpModule.cdpDataError('broken');
      const state = cdpModule.default(initialState, errorAction);

      const expectedOutcome = {
        cdpDataLoaded: false,
        cdpData: [],
        cdpParamsDataLoaded: false,
        cdpParamsData: {},
        error: 'broken'
      };
      expect(state).toEqual(expectedOutcome);
    });

    it('should return error when CDP_PARAMS_DATA_ERROR action sent', () => {
      const errorAction = cdpModule.cdpParamsDataError('broken');
      const state = cdpModule.default(initialState, errorAction);

      const expectedOutcome = {
        cdpDataLoaded: false,
        cdpData: [],
        cdpParamsDataLoaded: false,
        cdpParamsData: {},
        error: 'broken'
      };
      expect(state).toEqual(expectedOutcome);
    });

    it('should take the default state path', () => {
      const unknownAction = { type: 'FOO' }
      const state = cdpModule.default(initialState, unknownAction);

      const expectedOutcome = initialState;
      expect(state).toEqual(expectedOutcome);
    });
  });

  describe('services', () => {
    it('should getCdpParamsData and successfully dispatch to the store', () => {
      axios.get.mockImplementation(() => Promise.resolve(CdpParamsPayload))

      const startedAction = { type: "RECEIVE_CDP_DATA_STARTED" };
      const receiveAction = cdpModule.receiveCdpParamsData(CdpParamsPayload.data.result);

      return store.dispatch(cdpModule.getCdpParamsData()).then(() => {
        expect(store.getActions()).toEqual([startedAction, receiveAction]);
      })
    });

    it('should getCdpParamsData and catch error and reject promise', () => {
      const error = 'Unauthorized'

      const startedAction = { type: "RECEIVE_CDP_DATA_STARTED" };
      const failedAction = cdpModule.cdpParamsDataError(error);

      axios.get.mockImplementation(() => Promise.reject(error))
      return store.dispatch(cdpModule.getCdpParamsData()).then(() => {
        expect(store.getActions()).toEqual([startedAction, failedAction]);
      })
    });

    it('should getCdpData and successfully dispatch to the store', () => {
      axios.get.mockImplementation(() => Promise.resolve(CdpDataPayload))

      const startedAction = { type: "RECEIVE_CDP_DATA_STARTED" };
      const receiveAction = cdpModule.receiveCdpData(CdpDataPayload.data.result);

      return store.dispatch(cdpModule.getCdpData()).then(() => {
        expect(store.getActions()).toEqual([startedAction, receiveAction]);
      })
    });

    it('should getCdpData and catch error and reject promise', () => {
      const error = 'Unauthorized'

      const startedAction = { type: "RECEIVE_CDP_DATA_STARTED" };
      const failedAction = cdpModule.cdpDataError(error);

      axios.get.mockImplementation(() => Promise.reject(error))
      return store.dispatch(cdpModule.getCdpData()).then(() => {
        expect(store.getActions()).toEqual([startedAction, failedAction]);
      })
    });
  });
})
