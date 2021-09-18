import React from "react";

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

import "./sign-in-and-register.styles.scss";

const SignInAndRegister = () => (
  <div className='sign-in-and-register'>
    <SignIn />
    <SignUp />
  </div>
);

export default SignInAndRegister;
