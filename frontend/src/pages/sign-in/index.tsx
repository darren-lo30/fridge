import UserAPI from "src/apiLayer/UserAPI";
import { Text, Heading, Stack, Box } from "@chakra-ui/react"
import CenteredForm from "@components/CenteredForm";
import {FridgeButton} from "@components/FridgeButton";
import {InputWithError} from "@components/InputWithError";
import Password from "@components/Password";
import { useUser } from "@contexts/UserProvider";
import { getAPIError, isAPIError } from "src/utils/errors";
import { NextPage } from "next"
import { useRouter } from "next/router";
import { useForm } from 'src/utils/forms';

type SignInForm = {
  email: string,
  password: string
}

type FormError = {
  formError: string,
}

const SignIn: NextPage = () => {
  const { setUser } = useUser();
  const {
    handleSubmit,
    register,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data: SignInForm) => {
    const { email, password} = data;
    try {
      const user = await UserAPI.signIn(email, password);
      await setUser(user);
      await router.push('/', );

      reset();
    } catch (error) {
      if(isAPIError(error)) {
        const errorData = getAPIError(error);

        if(errorData.statusCode === 401) {
          setError('formError', { type: 'custom', message: 'The email or password is invalid.' });
        }
      }
    }
  }
  


  return (
    <CenteredForm>
      { process.env.API_URL }
      <Heading my='5' textAlign='center'>
        Sign In
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={'1'}>
          <InputWithError
            type='email'
            placeholder='Email'
            errorMessage={errors.email && errors.email.message}
            isRequired={true}
            {...register('email', {
              required: 'Email is required'
            })}
          /> 

          <Password 
            errorMessage={errors.password && errors.password.message}
            isRequired={true}          
            {...register('password', {
              required: 'Password is required',
            })}
          />

          { errors.formError?.message ? (
            <Box bg='red.100' p='3' rounded='5'>
              <Text fontSize='sm' color='red.700'>
                { errors.formError.message }
              </Text>
            </Box>
          ) : null }

          <FridgeButton
            type={'submit'}
          >
            Sign In
          </FridgeButton>
        </Stack>
      </form>
        
    </CenteredForm>
  )
}

export default SignIn;


