"using client";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Center,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { User } from "@/types/User/usertypes";
import { gmailLogin } from "@/firebaseFunctions/authentication/gmailAuthentication";
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
    const toast = useToast();
    const router = useRouter();

    // need email, pass
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // username and confirm pass
    const [username, setUsername] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
                duration: 3000,
                isClosable: true,
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
                            <FormControl id="username">
                                <FormLabel>Username</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="Eg:John Doe"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </FormControl>
                        )}
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                placeholder="Eg:example@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="Enter password (min 8 characters)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        {isLogin ? null : (
                            <FormControl id="confirmPassword">
                                <FormLabel>Confirm Password</FormLabel>
                                <Input
                                    type="password"
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </FormControl>
                        )}

                        <Button
                            bg={"blue.400"}
                            color={"white"}
                            _hover={{
                                bg: "blue.500",
                            }}
                            onClick={() => {
                                onSubmit();
                            }}
                        >
                            {isLogin ? "Login" : "Register"}
                        </Button>
                        <Text textAlign={"center"}>Or</Text>
                        <Button
                            w={"full"}
                            maxW={"md"}
                            variant={"outline"}
                            leftIcon={<FcGoogle />}
                            onClick={() => {
                                gmailAuth();
                            }}
                        >
                            <Center>
                                <Text>
                                    {isLogin ? "Sign In" : "Sign Up"} with
                                    Google
                                </Text>
                            </Center>
                        </Button>

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
