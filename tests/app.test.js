import React from 'react';
import { shallow } from 'enzyme';
import App from 'components/app';

describe('about', () => {
  it('renders app', () => {
    let wrapper = shallow(<App />)
    expect(wrapper).toHaveDisplayName('div')
    expect(wrapper).toHaveClassName('App')
  });
});
