import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';
import SignUpForm, {EmailInput, RequiredInput, BirthdayInput, PasswordConfirmationInput } from './teamSignUp'

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

describe("reset button", () => {
  
  it ('should reset all fields to be empty upon clicking', () => {
    const wrapper=shallow(<SignUpForm email="10@10.com" name="Oorja" dob="sfdsdf" password="fhdsofwe" passwordConf="dslfhwoeh"/>);

    wrapper.find('#resetButton').simulate('click');

    expect(wrapper.state().email.value).toEqual('');
    expect(wrapper.state().name.value).toEqual('');
    expect(wrapper.state().dob.value).toEqual('');
    expect(wrapper.state().password.value).toEqual('');
    expect(wrapper.state().passwordConf.value).toEqual('');

  });

  it ('should be able to call the handle reset function upon clicking', () => {
    var resetSpy = sinon.spy(SignUpForm.prototype, 'handleReset')
    
    const wrapper=shallow(<SignUpForm email="10@10.com" name="Oorja" dob="sfdsdf" password="fhdsofwe" passwordConf="dslfhwoeh"/>);

    wrapper.find('#resetButton').simulate('click');

    expect(resetSpy.called).toEqual(true);
  })
});

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

