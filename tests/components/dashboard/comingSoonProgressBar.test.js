import React from 'react';
import { shallow } from 'enzyme';
import ComingSoonProgressBar from 'components/dashboard/comingSoonProgressBar';

describe('ComingSoonProgressBar', () => {
  let props = { assetType: 'Paddys Pub' };

  it('renders the component', () => {
    let wrapper = shallow(<ComingSoonProgressBar {...props} />);
    expect(wrapper).toHaveDisplayName('div');

    let assetLabel = wrapper.find('.digit.asset');
    expect(assetLabel).toHaveText('Paddys Pub');

    let progressBar = wrapper.find('ProgressBar');
    expect(progressBar).toHaveProp('now', 100);
  });
});
