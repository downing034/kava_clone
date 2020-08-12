import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';

import { MockStore } from '../../factories/mockStore';

import TotalLoansCard from 'components/dashboard/totalLoansCard';

describe('TotalLoansCard', () => {
  const mockStore = configureStore([thunk])
  const store = mockStore(MockStore)

  let wrapper = mount(
    <Provider store={store}>
      <TotalLoansCard />
    </Provider>
  );

  describe('TotalLoansCard', () => {
    it('renders components and metrics', () => {

      const featuredCard = wrapper.find('FeaturedCardInfo')
      expect(featuredCard).toHaveProp('title', 'Total Value Borrowed')
      expect(featuredCard).toHaveProp('metricValue', 7250000)

      const arrowDown = wrapper.find('ArrowDownLabel')
      expect(arrowDown).toHaveProp('labelText', 'Top Borrowed Assets')

      const progrssBar = wrapper.find('ProgressBarPanel')
      expect(progrssBar).toHaveProp('type', 'USDX')
      expect(progrssBar).toHaveProp('supply', 7250000)
      expect(progrssBar).toHaveProp('limit', 7250000)
      expect(progrssBar).toHaveProp('limitPercent', 100)

      const comingSoonBinance = wrapper.find('ComingSoonProgressBar')
      expect(comingSoonBinance).toHaveLength(1)

      const usdxSavingsRate = wrapper.find('.usdx-savings-rate')
      expect(usdxSavingsRate).toHaveText('4.5%')

      const usdxMinted = wrapper.find('.rewards-distributed')
      expect(usdxMinted).toHaveText('7,250,000 USDX')
    });
  });
});
