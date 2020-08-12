import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';

import { MockStore } from '../../factories/mockStore';
import { DataNotLoadedMockStore } from '../../factories/dataNotLoadedStore';

import DashboardIndex from 'components/dashboard/index';

describe('DashboardIndex', () => {
  const mockStore = configureStore([thunk])
  const store = mockStore(MockStore)

  afterEach(() => {
    store.clearActions()
  })

  describe('DashboardIndex', () => {
    it('triggers the dispatch calls', () => {
      // should start with no actions before the component is called
      expect(store.getActions()).toHaveLength(0)

      let wrapper = mount(
        <Provider store={store}>
          <DashboardIndex />
        </Provider>
      );
      // there are 7 api calls
      expect(store.getActions()).toHaveLength(7)
    })

    it('renders component', () => {
      let wrapper = mount(
        <Provider store={store}>
          <DashboardIndex />
        </Provider>
      );
      const lockedAssets = wrapper.find('LockedAssetsCard')
      expect(lockedAssets).toHaveLength(1)

      const totalLoans = wrapper.find('TotalLoansCard')
      expect(totalLoans).toHaveLength(1)

      const table = wrapper.find('TopAssetsTable')
      expect(table).toHaveLength(1)
    });

    it('hides component if data has not loaded', () => {
      const store2 = mockStore(DataNotLoadedMockStore)

      let wrapper = mount(
        <Provider store={store2}>
          <DashboardIndex />
        </Provider>
      );

      const lockedAssets = wrapper.find('LockedAssetsCard')
      expect(lockedAssets).toHaveLength(0)
    });
  });
});
