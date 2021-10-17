import React from "react";

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

import { SignInAndRegisterContainer } from "./sign-in-and-register.styles";

const SignInAndRegister = () => (
  <SignInAndRegisterContainer>
    <SignIn />
    <SignUp />
  </SignInAndRegisterContainer>
);

export default SignInAndRegister;
