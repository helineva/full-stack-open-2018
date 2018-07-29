import React from 'react';
import { shallow } from 'enzyme';
import { LoginForm } from '../components/LoginForm';
import { Form, Button } from 'semantic-ui-react';
jest.mock('../services/login');
jest.mock('../reducers/loginReducer');

describe('<LoginForm />', () => {
  it('login form is not shown at first', () => {
    const loginFormComponent = shallow(<LoginForm />);
    const form = loginFormComponent.find(Form);
    expect(form.length).toBe(0);
  });

  it('login form is shown after clicking', () => {
    const loginFormComponent = shallow(<LoginForm />);
    const loginButton = loginFormComponent.find(Button);
    expect(loginButton.length).toBe(1);
    loginButton.simulate('click');
    const form = loginFormComponent.find(Form);
    expect(form.length).toBe(1);
  });

  it('login form is not shown after clicking twice', () => {
    const loginFormComponent = shallow(<LoginForm />);
    const loginButton = loginFormComponent.find(Button);
    expect(loginButton.length).toBe(1);
    loginButton.simulate('click');
    const buttons = loginFormComponent.find(Button);
    expect(buttons.length).toBe(2);
    buttons.at(1).simulate('click', {
      preventDefault: () => {}
    });
    const form = loginFormComponent.find(Form)
    expect(form.length).toBe(0);
  });
});
