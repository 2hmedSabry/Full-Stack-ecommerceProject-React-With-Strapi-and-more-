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
import { useDispatch, useSelector } from "react-redux";
import { selectLogin, userLogin } from "../app/features/loginSlice";
import type { AppDispatch } from "../app/store";
import { Navigate } from "react-router-dom";


interface User {
  identifier: string;
  password: string;
}




export default function Login({ isAuthenticated }: { isAuthenticated: boolean }) {


  
  const dispatch = useDispatch<AppDispatch>();
  const {loading } = useSelector(selectLogin);

  const [user, setUser] = useState<User>({
    identifier: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [isidentifierValid, setIsidentifierValid] = useState<boolean>(false);
  const bgFlex = useColorModeValue("gray.50", "gray.800")
  const bgFlex2 = useColorModeValue("white", "gray.900")
      


  if(isAuthenticated) return (<Navigate to={'/'} replace />)

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);

    if (!user.identifier) {
      setIsidentifierValid(true);
    } else {
      setIsidentifierValid(false);
    }
    if (!user.password) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }

    console.log(
      "isInidentifierValid",
      isidentifierValid,
      "inInPasswordValid",
      isPasswordValid
    );

     if (!isidentifierValid && !isPasswordValid ) {
      dispatch(userLogin(user ));
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
    bg={bgFlex}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          as="form"
          rounded={"lg"}
          bg={bgFlex2}
          boxShadow={"lg"}
          p={8}
          onSubmit={submitHandler}
        >
          <Stack spacing={4}>
            <FormControl id="identifier">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                isInvalid={isidentifierValid}
                errorBorderColor="crimson"
                value={user.identifier}
                name="identifier"
                onChange={onChangeHandler}
              />
              {isidentifierValid && (
                <FormHelperText color={"crimson"}>
                  Please enter a valid identifier
                </FormHelperText>
              )}
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  isInvalid={isPasswordValid}
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
              {isPasswordValid && (
                <FormHelperText color={"crimson"}>
                  Please enter a valid password
                </FormHelperText>
              )}
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
                bg={isidentifierValid || isPasswordValid ? "red.400" : "blue.400"}
                color={"white"}
                _hover={
                  isidentifierValid || isPasswordValid
                    ? {
                        bg: "red.500",
                      }
                    : {
                        bg: "blue.600",
                      }
                }
                type="submit"
                
                isLoading={loading}
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
