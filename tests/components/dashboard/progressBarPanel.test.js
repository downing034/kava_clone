import React from 'react';
import { shallow } from 'enzyme';
import ProgressBarPanel from 'components/dashboard/progressBarPanel';

describe('ProgressBarPanel', () => {
  let props = {
    type: 'money money',
    supply: 123.13,
    limit: 234.26,
    limitPercent: 50.00
  };

  it('renders the component', () => {
    let wrapper = shallow(<ProgressBarPanel {...props} />);
    expect(wrapper).toHaveDisplayName('div');

    let assetLabel = wrapper.find('.digit.asset');
    expect(assetLabel).toHaveText('money money');

    let progressBar = wrapper.find('ProgressBar');
    expect(progressBar).toHaveProp('now', '50.00');
    expect(progressBar).toHaveProp('max', 100);
    expect(progressBar).toHaveProp('min', 0);

    let lockOverLimit = wrapper.find('.text-block-15');
    expect(lockOverLimit).toHaveText('123 / 234')

    let percentageDisplay = wrapper.find('.binance-coin-percent');
    expect(percentageDisplay).toHaveText('50.00%');
  });
});
