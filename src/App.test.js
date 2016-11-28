import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {RequiredInput} from './TeamSignUp';
import {shallow} from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it("if user hasnt entered a name", () => {
      const wrapper = shallow(<RequiredInput value={''} errorMessage={"we need to know your name"}  />);
      expect(wrapper.find('.error-missing').text()).toEqual("we need to know your name");

});

it("if user hasnt entered a password", () => {
      const wrapper = shallow(<RequiredInput value={''} errorMessage={"your password can't be blank"}  />);
      expect(wrapper.find('.error-missing').text()).toEqual("your password can't be blank");

});

it("if user has entered a password or name", () => {
      const wrapper = shallow(<RequiredInput value={'Hey'} />);
      expect(wrapper.find('.error-missing').length).toEqual(0);

});