import React from 'react';
import { shallow } from 'enzyme';
import ArrowDownLabel from 'components/dashboard/arrowDownLabel';

describe('ArrowDownLabel', () => {
  let props = { labelText: 'Wolf Cola' };

  it('renders the component', () => {
    let wrapper = shallow(<ArrowDownLabel {...props} />);
    expect(wrapper).toHaveDisplayName('div');

    let label = wrapper.find('div.label-small');
    expect(label).toHaveText('Wolf Cola')
  });
});
