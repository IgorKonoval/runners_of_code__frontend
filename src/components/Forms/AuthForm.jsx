import { useState } from 'react';
import { Formik, Form } from 'formik';
import {
  FormContainer,
  InputContainer,
  InputField,
  LabelField,
  LinkBtn,
  SubmitButton,
  Title,
  ErrorMessages,
  Container,
  Image,
  SvgOpen,
  SvgOpenTwo,
  SvgClose,
  SvgCloseTwo,
  ContainerBackground,
} from './AuthForm.styled';
import { useUsers } from 'hooks/useUsers';
import singIn from 'assets/images/desc/bottle_home_deskx2.png';
// import main2 from 'assets/images/desc/x2.png';

const AuthForm = () => {
  const [formType, setFormType] = useState('signin');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const { signUp, signIn } = useUsers();

  const handleFormTypeChange = (type) => {
    setFormType(type);
    setFormSubmitted(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  return (
    <ContainerBackground>
      <Container>
        <Image src={singIn} />
        <FormContainer>
          <Title signup={formType === 'signup'}>
            {formType === 'signin' ? 'Sign In' : 'Sign Up'}
          </Title>
          <Formik
            initialValues={{
              email: '',
              password: '',
              repeatPassword: '',
            }}
            validate={(values) => {
              const errors = {};
              if (formSubmitted) {
                if (formType === 'signin') {
                  if (!values.email) {
                    errors.email = 'Email is required';
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = 'Some error message';
                  }
                  if (!values.password) {
                    errors.password = 'Password is required';
                  } else if (values.password.length < 8) {
                    errors.password =
                      'Password must be at least 8 characters long';
                  }
                } else if (formType === 'signup') {
                  if (!values.email) {
                    errors.email = 'Email is required';
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = 'Some error message';
                  }
                  if (!values.password) {
                    errors.password = 'Password is required';
                  } else if (values.password.length < 8) {
                    errors.password =
                      'Password must be at least 8 characters long';
                  }
                  if (!values.repeatPassword) {
                    errors.repeatPassword = 'Please repeat your password';
                  } else if (values.password !== values.repeatPassword) {
                    errors.repeatPassword = 'Passwords do not match';
                  }
                }
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              const { email, password } = values;
              if (formType === 'signin') {
                signIn({ email: email, password: password });
              } else {
                signUp({ email: email, password: password });
              }

              setSubmitting(false);
              setSubmitting('values', values);
              resetForm();
            }}
          >
            {({ isSubmitting, errors, resetForm }) => (
              <Form>
                <InputContainer>
                  <LabelField htmlFor="email">Enter your email</LabelField>
                  <InputField
                    error={errors.email}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="E-mail"
                  />

                  <ErrorMessages name="email" component="div" />
                </InputContainer>

                <InputContainer>
                  <LabelField htmlFor="password">
                    Enter your password
                  </LabelField>
                  <InputField
                    error={errors.password}
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Password"
                  />
                  {showPassword ? (
                    <>
                      <SvgClose
                        onClick={togglePasswordVisibility}
                        error={errors.password}
                      />
                    </>
                  ) : (
                    <SvgOpen
                      onClick={togglePasswordVisibility}
                      error={errors.password}
                    />
                  )}
                  <ErrorMessages name="password" component="div" />
                </InputContainer>

                {formType === 'signup' && (
                  <InputContainer>
                    <LabelField htmlFor="repeatPassword">
                      Repeat password
                    </LabelField>
                    <InputField
                      error={errors.repeatPassword}
                      type={showRepeatPassword ? 'text' : 'password'}
                      id="repeatPassword"
                      name="repeatPassword"
                      placeholder="Repeat Password"
                    />
                    {showRepeatPassword ? (
                      <>
                        <SvgCloseTwo
                          onClick={toggleRepeatPasswordVisibility}
                          error={errors.password}
                        />
                      </>
                    ) : (
                      <SvgOpenTwo
                        onClick={toggleRepeatPasswordVisibility}
                        error={errors.password}
                      />
                    )}
                    <ErrorMessages name="repeatPassword" component="div" />
                  </InputContainer>
                )}

                <SubmitButton
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => setFormSubmitted(true)}
                >
                  {formType === 'signin' ? 'Sign In' : 'Sign Up'}
                </SubmitButton>
                <LinkBtn
                  type="button"
                  onClick={() => {
                    resetForm();
                    handleFormTypeChange(
                      formType === 'signin' ? 'signup' : 'signin'
                    );
                  }}
                >
                  {formType === 'signin' ? 'Sign up' : 'Sign in'}
                </LinkBtn>
              </Form>
            )}
          </Formik>
        </FormContainer>
      </Container>
    </ContainerBackground>
  );
};

export default AuthForm;
