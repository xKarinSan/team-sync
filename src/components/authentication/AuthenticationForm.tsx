"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import { useState } from "react";

// ==========================import from next==========================
import NextLink from "next/link";
import { useRouter } from "next/navigation";

// ==========================import state management==========================
import { User } from "@/types/User/usertypes";

// ==========================import chakraui components==========================

import {
    Flex,
    Box,
    Stack,
    Heading,
    Text,
    useColorModeValue,
    useToast,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

// ==========================import custom components==========================
import CustomButton from "../general/CustomButton";
import CustomFormInput from "../general/CustomFormInput";

// ==========================import external functions==========================
import { gmailLogin } from "@/firebaseFunctions/authentication/gmailAuthentication";

// ==========================import external variables==========================

// ==========================import types/interfaces==========================

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============
type AuthenticationFormProps = {
    isLogin: boolean;
    submitFunction: (
        props: any,
        setUser: (props: User) => void
        // toast: any
    ) => Promise<void>;
    setUser: (props: User) => void;
};

export default function AuthenticationForm({
    isLogin,
    submitFunction,
    setUser,
}: // submitFunction,
AuthenticationFormProps) {
    // ===============constants===============

    const toast = useToast();
    const router = useRouter();

    // ===============states===============

    // need email, pass
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // username and confirm pass
    const [username, setUsername] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============

    // for login/register
    const onSubmit = async () => {
        let submitProps: any = {};
        let errors = 0;
        // validation
        if (email === "") {
            errors += 1;
        }
        if (password.length < 8) {
            errors += 1;
        }
        if (!isLogin && password != confirmPassword) {
            errors += 1;
        }
        if (!isLogin && username.length == 0) {
            errors += 1;
        }
        if (errors > 0) {
            toast({
                title: "Unsuccessful",
                description: "Please check your input",
                status: "error",
            });
        } else {
            if (isLogin) {
                submitProps = {
                    email,
                    password,
                    setUser,
                    toast,
                    router,
                };
            } else {
                submitProps = {
                    email,
                    password,
                    username,
                    setUser,
                    toast,
                    router,
                };
            }
            await submitFunction(submitProps, setUser);
        }
    };

    const gmailAuth = async () => {
        const submitProps: any = {
            setUser,
            toast,
            router,
        };
        await gmailLogin(submitProps);
    };

    // ===============useEffect===============

    return (
        <Flex align={"center"} justify={"center"}>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"}>
                        {isLogin
                            ? "Sign in to your account"
                            : "Sign up for an account"}
                    </Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                        to enjoy all of our cool stuff!
                    </Text>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <Stack spacing={4}>
                        {isLogin ? null : (
                            <CustomFormInput
                                formId="username"
                                formLabel="Username"
                                placeholder="Eg: John Doe"
                                value={username}
                                changeHandler={setUsername}
                            />
                        )}
                        <CustomFormInput
                            formId="email"
                            formType="email"
                            formLabel="Email address"
                            placeholder="Eg:example@email.com"
                            value={email}
                            changeHandler={setEmail}
                        />
                        <CustomFormInput
                            formId="password"
                            formType="password"
                            formLabel="Password"
                            placeholder="Enter password (min 8 characters)"
                            value={password}
                            changeHandler={setPassword}
                        />
                        {isLogin ? null : (
                            <CustomFormInput
                                formId="confirmPassword"
                                formType="password"
                                formLabel="Confirm Password"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                changeHandler={setConfirmPassword}
                            />
                        )}

                        <CustomButton
                            clickFunction={onSubmit}
                            buttonText={isLogin ? "Login" : "Register"}
                            margin={0}
                        />
                        <Text textAlign={"center"}>Or</Text>
                        <CustomButton
                            clickFunction={gmailAuth}
                            textColor="black"
                            buttonColor="white"
                            LeftButtonIcon={FcGoogle}
                            buttonText={
                                isLogin
                                    ? "Sign In with Google"
                                    : "Sign Up with Google"
                            }
                            margin={0}
                        />
                        <Text textAlign={"center"}>
                            {isLogin ? (
                                <>
                                    Don't have an account? Sign up{" "}
                                    <NextLink href="/register">
                                        <Text as="span" color="#0239C8">
                                            here
                                        </Text>
                                    </NextLink>
                                </>
                            ) : (
                                <>
                                    Already have an account? Sign in{" "}
                                    <NextLink href="/login">
                                        <Text as="span" color="#0239C8">
                                            here
                                        </Text>
                                    </NextLink>
                                </>
                            )}
                        </Text>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
