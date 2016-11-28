import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow, mount} from 'enzyme';
import SignUpForm, {PasswordConfirmationInput} from './teamSignUp'

describe("<PasswordConfirmationInput> component", () => {
  
  it ('should be able to tell if the form is empty', () => {
    const wrapper=shallow(<PasswordConfirmationInput value={''}/>);
    var errorMessage = wrapper.find('.error-missing').text();
    expect(errorMessage).toEqual("please confirm your password");
  });

  it('should be able to tell if the form is not empty', () => {
    const wrapper=shallow(<PasswordConfirmationInput value={'the form is not empty'}/>);
    var errorMessage = wrapper.find('.error-missing').length;
    expect(errorMessage).toEqual(0);
  })
  
  it ('should be able to tell if the passwords do not match', ()  => {
     const wrapper=shallow(<PasswordConfirmationInput value={'hi'} password={'not-a-match'}/>)
     var passwordsMatch = wrapper.find('.error-mismatched').text();
     expect(passwordsMatch).toEqual("passwords don't match");
  });

  it('should be able to tell if the passwords match', () => {
      const wrapper=shallow(<PasswordConfirmationInput value={'match'} password={'match'}/>)
      var passwordsMatch = wrapper.find('.error-mismatched').length;
      expect(passwordsMatch).toEqual(0);
  })
})
