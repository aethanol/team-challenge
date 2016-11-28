import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow, mount} from 'enzyme';

import SignUpForm from './TeamSignUp';
import { EmailInput, RequiredInput, BirthdayInput, PasswordConfirmationInput } from './TeamSignUp';
import sinon from 'sinon';

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
  it("should show error if user hasnt entered a name", () => {
    const wrapper = shallow(<RequiredInput value={''} errorMessage={"we need to know your name"} />);
    expect(wrapper.find('.error-missing').text()).toEqual("we need to know your name");

  });

  it("should NOT show error if user has entered a name", () => {
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


describe("<PasswordConfirmationInput /> component", () => {
  
  it ('should be able to tell if the form is empty', () => {
    const wrapper=shallow(<PasswordConfirmationInput value={''}/>);
    var errorMessage = wrapper.find('.error-missing').text();
    expect(errorMessage).toEqual("please confirm your password");
  });

  it('should be able to tell if the form is not empty', () => {
    const wrapper=shallow(<PasswordConfirmationInput value={'the form is not empty'}/>);
    expect(wrapper.find('.error-missing').length).toEqual(0);
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
  });
});

describe('Submit button', () => {
  it('should be disabled if any of the forms are invalid, but not if they are valid', () => {
    const wrapper=mount(<SignUpForm />);
    // valid email consts
    const email = 'valid@gmail.com';
    const name = 'validname';
    const dob = '1';
    const password = 'password';

    wrapper.find('#email').simulate('change', {target:{value: email}});
    wrapper.find('#name').simulate('change', {target:{value: name}});
    wrapper.find('#dob').simulate('change', {target:{value: dob}}); 
    wrapper.find('#password').simulate('change', {target:{value: password}});
    wrapper.find("#passwordConf").simulate('change', {target:{value: password}});
    expect(wrapper.find('#submitButton').prop('disabled')).toEqual(false);
    
    // check email field
    wrapper.find('#email').simulate('change', {target:{value:'INVALID EMAIL'}});
    expect(wrapper.find('#submitButton').prop('disabled')).toEqual(true);
    wrapper.find('#email').simulate('change', {target:{value: email}}); // change back to be valid
    
    // check name field
    wrapper.find('#name').simulate('change', {target:{value: ''}});
    expect(wrapper.find('#submitButton').prop('disabled')).toEqual(true);
    wrapper.find('#name').simulate('change', {target:{value: name}}); // change back to be valid
    
    // check dob field
    wrapper.find('#dob').simulate('change', {target:{value: 'HI CAMERON'}});
    expect(wrapper.find('#submitButton').prop('disabled')).toEqual(true);
    wrapper.find('#dob').simulate('change', {target:{value: dob}}); // change back to be valid

    // check password field
    wrapper.find('#password').simulate('change', {target:{value: ''}});
    expect(wrapper.find('#submitButton').prop('disabled')).toEqual(true);
    wrapper.find('#password').simulate('change', {target:{value: password}}); // change back to be valid
    
    // check password conf field
    wrapper.find("#passwordConf").simulate('change', {target:{value: 'eh'}});
    expect(wrapper.find('#submitButton').prop('disabled')).toEqual(true);
    wrapper.find("#passwordConf").simulate('change', {target:{value: password}}); // change back to be valid

    //
    // console.log(wrapper.state());
    
  });

  it('should handle clicks properly', () => {
    
    //const handleSubmitSpy = sinon.spy(SignUpForm.prototype, 'handleSubmit');

    const clickSpy = sinon.spy();
    const wrapper=mount(<SignUpForm handleSubmit={clickSpy}/>);
    // valid email consts
    const email = 'valid@gmail.com';
    const name = 'validname';
    const dob = '1';
    const password = 'password';

    wrapper.find('#email').simulate('change', {target:{value: email}});
    wrapper.find('#name').simulate('change', {target:{value: name}});
    wrapper.find('#dob').simulate('change', {target:{value: dob}}); 
    wrapper.find('#password').simulate('change', {target:{value: password}});
    wrapper.find("#passwordConf").simulate('change', {target:{value: password}});
    wrapper.find('#submitButton').simulate('click');
    //expect(wrapper.find('#submitButton').prop('disabled')).toEqual(false);
    //console.log(param);
    expect(clickSpy.called).toEqual(true);
    
  });
});

