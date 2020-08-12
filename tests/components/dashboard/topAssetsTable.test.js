import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';

import { MockStore } from '../../factories/mockStore';

import TopAssetsTable from 'components/dashboard/topAssetsTable';

describe('TopAssetsTable', () => {
  const mockStore = configureStore([thunk])
  const store = mockStore(MockStore)

  let wrapper = mount(
    <Provider store={store}>
      <TopAssetsTable />
    </Provider>
  );

  describe('TopAssetsTable', () => {
    it('renders components and metrics', () => {

      const tableRows = wrapper.find('TopAssetsTableRow')
      expect(tableRows).toHaveLength(3)

      const binanceCoinRow = tableRows.first()
      expect(binanceCoinRow).toHaveProp('assetName', 'Binance Coin')
      expect(binanceCoinRow).toHaveProp('totalValue', 21.66)
      expect(binanceCoinRow).toHaveProp('totalBorrow', 7.25)
      expect(binanceCoinRow).toHaveProp('stabilityFee', 5)
      expect(binanceCoinRow).toHaveProp('apy', 4824.253592016007)

      const bitcoinRow = tableRows.last()
      expect(bitcoinRow).toHaveProp('assetName', 'Bitcoin')
      expect(bitcoinRow).toHaveProp('totalValue', '-')
      expect(bitcoinRow).toHaveProp('totalBorrow', '-')
      expect(bitcoinRow).toHaveProp('stabilityFee', '-')
      expect(bitcoinRow).toHaveProp('apy', '-')
    });
  });
});
