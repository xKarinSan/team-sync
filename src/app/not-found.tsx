"use client";
import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import NotFoundImage from "../images/errorpage/NotFound.png";
export default function NotFound() {
    const router = useRouter();
    return (
        <Box>
            <Box width="80%" m="0 auto">
                <Box w={["90%", null, "50%"]} m="0 auto">
                    <Image src={NotFoundImage} alt="Not found" />
                </Box>
                <Text textAlign={"center"}>
                    We can't find anything here. Click{" "}
                    <NextLink href={"/"}>
                        <Text as="span" color="#0239C8" fontWeight={"bold"}>
                            here
                        </Text>
                    </NextLink>{" "}
                    to go back.
                </Text>
            </Box>{" "}
        </Box>
    );
}
