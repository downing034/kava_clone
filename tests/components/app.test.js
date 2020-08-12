import React from 'react';
import { shallow } from 'enzyme';
import App from 'components/app';

describe('App', () => {
  it('renders the component', () => {
    let wrapper = shallow(<App />);
    expect(wrapper).toHaveDisplayName('div');

    let dashboard = wrapper.find('Dashboard');
    expect(dashboard).toHaveLength(1);
  });
});
