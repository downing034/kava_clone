import React from 'react';
import { shallow } from 'enzyme';
import FeaturedCardInfo from 'components/dashboard/featuredCardInfo';

describe('FeaturedCardInfo', () => {
  let foo = {'name': 'charlie day'};
  let props = {
    icon: {'name': 'charlie day'},
    title: 'Paddys Pub',
    metricValue: 123456
  };

  it('renders the component', () => {
    let wrapper = shallow(<FeaturedCardInfo {...props} />);
    expect(wrapper).toHaveDisplayName('div');

    let title = wrapper.find('.label-small');
    expect(title).toHaveText('Paddys Pub');

    let progressBar = wrapper.find('.value-locked');
    expect(title).toHaveText('Paddys Pub');
  });
});
