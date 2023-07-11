"use client";
import { MenuOption } from "@/types/HomePage/menuOptions";
import { SimpleGrid, Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
export default function MainMenu({ menuOptions }: MenuOption[]) {
    // console.log("menuOptions", menuOptions);
    return (
        <>
            {menuOptions ? (
                <>
                    <SimpleGrid columns={[1, 2, null, 4]} width="100%">
                        {menuOptions.map(
                            (
                                { label, icon, path }: MenuOption,
                                index: number
                            ) => {
                                return (
                                    <NextLink href={path} key={index}>
                                        <Box
                                            margin="10px"
                                            background="white"
                                            p={5}
                                            borderRadius={5}
                                        >
                                            <Image alt={label} src={icon} />
                                            <Text textAlign={"center"}>
                                                {label}
                                            </Text>
                                        </Box>
                                    </NextLink>
                                );
                            }
                        )}
                    </SimpleGrid>
                </>
            ) : (
                <></>
            )}
        </>
    );
}
