import React from 'react';
import { shallow } from 'enzyme';
import Divider from 'components/shared/divider';

describe('Divider', () => {

  it('renders the component', () => {
    let wrapper = shallow(<Divider />);
    expect(wrapper).toHaveDisplayName('div');
  });
});
