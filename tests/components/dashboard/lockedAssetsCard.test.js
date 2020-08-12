import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';

import { MockStore } from '../../factories/mockStore';

import LockedAssetsCard from 'components/dashboard/lockedAssetsCard';

describe('LockedAssetCard', () => {
  const mockStore = configureStore([thunk])
  const store = mockStore(MockStore)

  let wrapper = mount(
    <Provider store={store}>
      <LockedAssetsCard />
    </Provider>
  );

  describe('LockedAssetCard', () => {
    it('renders components and metrics', () => {

      const featuredCard = wrapper.find('FeaturedCardInfo')
      expect(featuredCard).toHaveProp('title', 'Total Asset Value')
      expect(featuredCard).toHaveProp('metricValue', 21286883.62426116)

      const arrowDown = wrapper.find('ArrowDownLabel')
      expect(arrowDown).toHaveProp('labelText', 'Top Locked Assets')

      const progrssBar = wrapper.find('ProgressBarPanel')
      expect(progrssBar).toHaveProp('type', 'Binance Coin')
      expect(progrssBar).toHaveProp('supply', 1031581.16346152)
      expect(progrssBar).toHaveProp('limit', 1225000)
      expect(progrssBar).toHaveProp('limitPercent', 84.21070722134857)

      const comingSoonBinance = wrapper.find('ComingSoonProgressBar').first()
      expect(comingSoonBinance).toHaveProp('assetType', 'Binance USD')

      const comingSoonBitcoin = wrapper.find('ComingSoonProgressBar').last()
      expect(comingSoonBitcoin).toHaveProp('assetType', 'Bitcoin')

      const kavaPrice = wrapper.find('.kava-price')
      expect(kavaPrice).toHaveText('$3.87')

      const kavaPricePercent = wrapper.find('.kava-price-percent')
      expect(kavaPricePercent).toHaveText('-14.47%')
    });
  });
});
