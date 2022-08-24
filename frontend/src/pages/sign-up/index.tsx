import UserAPI from "src/apiLayer/UserAPI";
import { Box, Heading, Stack } from "@chakra-ui/react"
import CenteredForm from "@components/CenteredForm";
import {FridgeButton} from "@components/FridgeButton";
import { InputWithError } from "@components/InputWithError";
import Password from "@components/Password";
import { getAPIError, isAPIError } from "src/utils/errors";
import { NextPage } from "next"
import {  useForm } from 'src/utils/forms';
import { useRouter } from "next/router";


type SignUpForm = {
  fullName: string,
  email: string,
  password: string,
  passwordConfirmation: string,
}

const SignUp: NextPage = () => {
  const {
    handleSubmit,
    register,
    setError,
    reset,
    formState: { errors },
  } = useForm<SignUpForm>();

  const router = useRouter();

  const onSubmit = async (data : SignUpForm) => {
    const { fullName, email, password, passwordConfirmation} = data;

    if(password !== passwordConfirmation) {
      setError('passwordConfirmation', {message: 'The password confirmation does not match.'})
    }
    
    try {
       await UserAPI.signUp(fullName, email, password);
      reset();
      await router.push('/sign-in');

    } catch (error) {
      if(isAPIError(error)) {
        const errorData = getAPIError(error);

        if(errorData.statusCode === 409) {
          setError('email', { message: 'A user with that email already exists.'});
        }
      }
    }
  }

  return (
    <CenteredForm>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading my={'5'} textAlign={'center'}>
          Sign Up
        </Heading>
        <Stack gap={'1'}>
          <InputWithError 
            type='text'
            placeholder='Full Name'
            isRequired={true}
            errorMessage={errors.fullName && errors.fullName.message}
            {...register('fullName', {
              required: 'Full name is required.'
            })}
          />

          <InputWithError
            type='email'
            isRequired={true}
            placeholder='Email'
            errorMessage={errors.email && errors.email.message}
            {...register('email', {
              required: 'Email is required.'
            })}
          />

          <Password 
            placeholder="Password"
            isRequired={true}
            errorMessage={errors.password && errors.password.message}
            {...register('password', {
              required: 'Password is required.',
              minLength: {value: 5, message: 'Password must be atleast 5 characters long'}
            })}
          />

          <Password 
            placeholder="Password Confirmation"
            isRequired={true}
            errorMessage={errors.passwordConfirmation && errors.passwordConfirmation.message}
            {...register('passwordConfirmation', {
              required: 'Password confirmation is required.'
            })}
          />

          <Box py='5'>
            <FridgeButton
              width={'100%'}
              type='submit'
            >
              Sign Up
            </FridgeButton>
          </Box>
        </Stack>
      </form>
    </CenteredForm>
  )
}

export default SignUp;
