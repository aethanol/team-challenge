import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { EmailInput, RequiredInput, BirthdayInput, PasswordConfirmationInput } from './TeamSignUp';
import {shallow} from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});


describe('<BirthdayInput /> component', () => {
  it('should require birthday field', () => {
    const wrapper = shallow(<BirthdayInput value=''/>); // pass in a blank value prop
    expect(wrapper.find('.error-missing').text()).toEqual('we need to know your birthdate')
    && expect(wrapper.find('.error-invalid').length).toEqual(0)
    && expect(wrapper.find('.error-not-old').length).toEqual(0);
  });

  it('should require valid date', () => {
    const wrapper = shallow(<BirthdayInput value='this is a string, not a date'/>); // pass in a blank value prop
    expect(wrapper.find('.error-invalid').text()).toEqual("that isn't a valid date")
    && expect(wrapper.find('.error-missing').length).toEqual(0)
    && expect(wrapper.find('.error-not-old').length).toEqual(0);
  });

  it('should require age of 13 or older', () => {
    const wrapper = shallow(<BirthdayInput value='Mar 25 2015'/>); // pass in a blank value prop
    expect(wrapper.find('.error-not-old').text()).toEqual("sorry, you must be at least 13 to sign up")
    && expect(wrapper.find('.error-missing').length).toEqual(0)
    && expect(wrapper.find('.error-invalid').length).toEqual(0);
  });
})