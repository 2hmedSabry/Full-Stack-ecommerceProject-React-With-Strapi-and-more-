'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useAppDispatch } from '../app/store'
import { userRegisterAction } from '../app/features/RegisterSlice'
import { Link as RouterLink } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

interface User {
  username: string;
  email: string;
  password: string;
}

export default function Register({isAuthenticated} : {isAuthenticated : boolean}) {

  const [showPassword, setShowPassword] = useState(false)


const dispatch = useAppDispatch();
const [user, setUser] = useState<User>({
  username: "",
  email: "",
  password: "",
});

const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  setUser({
    ...user,
    [e.target.name]: e.target.value,
  });
};

const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  dispatch(userRegisterAction(user))
  console.log(user);
};

const flexBg = useColorModeValue('gray.50', 'gray.800')
const boxBg = useColorModeValue('white', 'gray.700')

    

  if(isAuthenticated) return (<Navigate to={'/'} replace />)
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={flexBg}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Create Your Account Now
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Join Us to enjoy all of our Product ✌️
          </Text>
        </Stack>
        <Box
        as='form'
        minW={'380px'}
          rounded={'lg'}
          bg={boxBg}
          boxShadow={'lg'}
          p={8}
          onSubmit={submitHandler}
          >
          <Stack spacing={4}>
              <Box>
                <FormControl id="username" isRequired>
                  <FormLabel>User Name</FormLabel>
                  <Input type="text" name="username" onChange={onChangeHandler} />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input type="text" name="email" onChange={onChangeHandler} />
                </FormControl>
              </Box>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} name='password' onChange={onChangeHandler}/>
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                type='submit'
                >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link as={RouterLink} to={'/login'} color={'blue.400'} >Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}