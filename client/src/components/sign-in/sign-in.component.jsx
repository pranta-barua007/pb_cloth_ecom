import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions';

import {
  SignInContainer,
  SignInTitle,
  ButtonsBarContainer
} from './sign-in.styles';

//using hooks
const SignIn = ({ emailSignInStart, googleSignInStart }) => {

  const [userCordentials, setCordentials] = useState({
    email: '',
    password: ''
  });

  const { email, password } = userCordentials;

  const handleSubmit = async event => {
    event.preventDefault();
    emailSignInStart(email, password);
  };

  const handleChange = event => {
    const { value, name } = event.target;
    setCordentials({ ...userCordentials, [name]: value });
  };

  return (
    <SignInContainer>
    <SignInTitle>I already have an account</SignInTitle>
    <span>Sign in with your email and password</span>

    <form onSubmit={handleSubmit}>
      <FormInput
        name='email'
        type='email'
        handleChange={handleChange}
        value={email}
        label='email'
        required
      />
      <FormInput
        name='password'
        type='password'
        value={password}
        handleChange={handleChange}
        label='password'
        required
      />
      <ButtonsBarContainer>
        <CustomButton type='submit'> Sign in </CustomButton>
        <CustomButton onClick={googleSignInStart} isGoogleSignIn>
          Sign in with Google
        </CustomButton>
      </ButtonsBarContainer>
    </form>
  </SignInContainer>
  );
}

const mapDispatchToProps = dispatch => (
  {
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
  }
);


export default connect(null, mapDispatchToProps)(SignIn);