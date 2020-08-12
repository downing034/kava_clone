import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as kavaModule from 'modules/kava';

import { KavaDataPayload } from '../factories/kavaResponse';

jest.mock('axios');

describe('kavaModule', () => {
  const mockStore = configureStore([thunk])
  const store = mockStore({ kavaData: {} })
  const initialState = { kavaDataLoaded: false, kavaData: {} };

  afterEach(() => {
    jest.unmock('axios')
    store.clearActions()
  })

  describe('actions', () => {
    it('should RECEIVE_KAVA_DATA_STARTED', () => {
      expect(kavaModule.receiveKavaDataStarted())
        .toEqual({ type: 'RECEIVE_KAVA_DATA_STARTED'});
    });

    it('should RECEIVE_KAVA_DATA', () => {
      expect(kavaModule.receiveKavaData('yay, you did it'))
        .toEqual({ type: 'RECEIVE_KAVA_DATA', data: 'yay, you did it' });
    });

    it('should KAVA_DATA_ERROR', () => {
      expect(kavaModule.kavaDataError('You in trouble now'))
        .toEqual({type: 'KAVA_DATA_ERROR', data: 'You in trouble now' });
    });
  });

  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(kavaModule.default(undefined, {})).toEqual(initialState);
    });

    it('should not modify state when RECEIVE_KAVA_DATA_STARTED action sent', () => {
      const startedAction = kavaModule.receiveKavaDataStarted();
      const state = kavaModule.default(initialState, startedAction);

      const expectedOutcome = { kavaDataLoaded: false, kavaData: {} };
      expect(state).toEqual(expectedOutcome);
    });

    it('should update state when RECEIVE_KAVA_DATA action sent', () => {
      const startedAction = kavaModule.receiveKavaData({'abc': '123'});
      const state = kavaModule.default(initialState, startedAction);

      const expectedOutcome = { kavaDataLoaded: true, kavaData: {'abc': '123'} };
      expect(state).toEqual(expectedOutcome);
    });

    it('should return error when KAVA_DATA_ERROR action sent', () => {
      const errorAction = kavaModule.kavaDataError('broken');
      const state = kavaModule.default(initialState, errorAction);

      const expectedOutcome = { kavaDataLoaded: false, kavaData: {}, error: 'broken' };
      expect(state).toEqual(expectedOutcome);
    });

    it('should take the default state path', () => {
      const unknownAction = { type: 'FOO' }
      const state = kavaModule.default(initialState, unknownAction);

      const expectedOutcome = { kavaDataLoaded: false, kavaData: {}};
      expect(state).toEqual(expectedOutcome);
    });
  });

  describe('services', () => {
    it('should getKavaData and successfully dispatch to the store', () => {
      axios.get.mockImplementation(() => Promise.resolve(KavaDataPayload))

      const startedAction = { type: "RECEIVE_KAVA_DATA_STARTED" };
      const receiveAction = kavaModule.receiveKavaData(KavaDataPayload.data);

      return store.dispatch(kavaModule.getKavaData()).then(() => {
        expect(store.getActions()).toEqual([startedAction, receiveAction]);
      })
    });

    it('should getKavaData and catch error and reject promise', () => {
      const error = 'Unauthorized'

      const startedAction = { type: "RECEIVE_KAVA_DATA_STARTED" };
      const failedAction = kavaModule.kavaDataError(error);

      axios.get.mockImplementation(() => Promise.reject(error))
      return store.dispatch(kavaModule.getKavaData()).then(() => {
        expect(store.getActions()).toEqual([startedAction, failedAction]);
      })
    });
  });
})
