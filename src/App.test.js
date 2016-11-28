import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { EmailInput, RequiredInput, BirthdayInput, PasswordConfirmationInput } from './TeamSignUp';
import {shallow} from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});


describe('<EmailInput /> component', () => {

  it('should error if blank, and not show invalid error', () => {
    const wrapper = shallow(<EmailInput value={''}/>);
    expect(wrapper.find('.error-missing').text()).toEqual('we need to know your email address')
    && expect(wrapper.find('.error-invalid').length).toEqual(0); 
  });

  it('should error if invalid email, and not missing error', () => {
    const wrapper = shallow(<EmailInput value={'THIS WILL ERROR'}/>);
    expect(wrapper.find('.error-invalid').text()).toEqual('this is not a valid email address')
    && expect(wrapper.find('.error-missing').length).toEqual(0);
  });

  it('should not error if valid email', () => {
    const wrapper = shallow(<EmailInput value={'test@gmail.com'}/>);
    expect(wrapper.find('.help-block').length).toEqual(0); // grab the help block class
  });
});

describe('<RequiredInput /> name component', () => {
  it("if user hasnt entered a name", () => {
    const wrapper = shallow(<RequiredInput value={''} errorMessage={"we need to know your name"} />);
    expect(wrapper.find('.error-missing').text()).toEqual("we need to know your name");

  });

  it("if user has entered a name", () => {
    const wrapper = shallow(<RequiredInput value={'Hey'} />);
    expect(wrapper.find('.error-missing').length).toEqual(0);

  });
});

describe('<RequiredInput /> password component', () => {
   it("if user hasnt entered a password", () => {
    const wrapper = shallow(<RequiredInput value={''} errorMessage={"your password can't be blank"} />);
    expect(wrapper.find('.error-missing').text()).toEqual("your password can't be blank");

  });
  
  it("if user has entered a password", () => {
    const wrapper = shallow(<RequiredInput value={'password'} />);
    expect(wrapper.find('.error-missing').length).toEqual(0);

  });


});

