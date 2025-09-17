"use client";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  FormHelperText,
} from "@chakra-ui/react";
import { useState } from "react";

interface User {
  email: string;
  password: string;
}


export default function Login() {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);

    if(!user.email){
      setIsEmailValid(true)
    } else{
           setIsEmailValid(false)
    }
    if(!user.password){
      setIsPasswordValid(true)
    }else{
          setIsPasswordValid(false)
    }

        console.log('isInEmailValid' ,isEmailValid, 'inInPasswordValid', isPasswordValid);


  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          as="form"
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          onSubmit={submitHandler}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                isInvalid={isEmailValid}
                errorBorderColor="crimson"
                value={
                  user.email
                }
                name="email"
                onChange={onChangeHandler}
              />
              {
                isEmailValid
                && (
                  <FormHelperText color={"crimson"}>
                    Please enter a valid email
                  </FormHelperText>
                )
              }
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  isInvalid={
                    isPasswordValid
                  }
                  
                  errorBorderColor="crimson"
                  value={user.password}
                  name="password"
                  onChange={onChangeHandler}
                />

                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {
                isPasswordValid
                && (
                  <FormHelperText color={"crimson"}>
                    Please enter a valid password
                  </FormHelperText>
                )
              }
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.400"}>Forgot password?</Text>
              </Stack>
              <Button
                bg={
                    isEmailValid || isPasswordValid ? "red.400" : "blue.400"
                }
                color={"white"}
                _hover={
                    isEmailValid || isPasswordValid
                    ? {
                        bg: "red.500",
                      }
                    : {
                        bg: "blue.600",
                      }
                }
                type="submit"
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
