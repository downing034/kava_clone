import React from 'react';
import { shallow } from 'enzyme';
import TopAssetsTableRow from 'components/dashboard/topAssetsTableRow';

describe('TopAssetsTableRow', () => {
  let props = {
    icon: {'name': 'frank reynolds'},
    assetName: 'charlie work',
    totalValue: 234.26,
    totalBorrow: 50.01,
    stabilityFee: 5.0,
    apy: 74.24
  };

  it('renders the component', () => {
    let wrapper = shallow(<TopAssetsTableRow {...props} />);
    expect(wrapper).toHaveDisplayName('tr');

    let assetLabel = wrapper.childAt(0);
    expect(assetLabel).toHaveText('charlie work');

    let totalValue = wrapper.childAt(1);
    expect(totalValue).toHaveText('$234.26M');

    let totalBorrow = wrapper.childAt(2);
    expect(totalBorrow).toHaveText('$50.01M');

    let stabilityFee = wrapper.childAt(3);
    expect(stabilityFee).toHaveText('5%');

    let apy = wrapper.childAt(4);
    expect(apy).toHaveText('74.24%')
  });
});
