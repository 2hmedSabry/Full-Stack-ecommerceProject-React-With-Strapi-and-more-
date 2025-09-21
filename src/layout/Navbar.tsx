"use client";

import {
  Box,
  Flex,
  Avatar,
  Button,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  HStack,
} from "@chakra-ui/react";
import { BsMoon, BsSun } from "react-icons/bs";
import { Link as RouterLink } from "react-router-dom";
import CookiesService from "../services/CookiesService";

const Links = ["Dashboard", "Products", "About"];

const NavLink = ({ children }: { children: string }) => {
  return (
    <Link
      as={RouterLink}
      to={children.toLowerCase()}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      {children}
    </Link>
  );
};

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const token = CookiesService.getCookie("jwt");

  const logouthHandler = () => {
    CookiesService.removeCookie("jwt");
    window.location.reload();
  };
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <RouterLink to="/">My App</RouterLink>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <BsMoon /> : <BsSun />}
              </Button>
              {token ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>Username</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Your Servers</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem onClick={logouthHandler}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Button as={RouterLink} to="/login">
                  Login In
                </Button>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
