"use client";
// ===================================all imports===================================

// ==========================import from react==========================

// ==========================import from next==========================
import Image from "next/image";
import NextLink from "next/link";

// ==========================import state management==========================

// ==========================import chakraui components==========================
import { Box, Text } from "@chakra-ui/react";

// ==========================import custom components==========================
import CustomGrid from "../custom/CustomGrid";
// ==========================import external functions==========================

// ==========================import external variables==========================

// ==========================import types/interfaces==========================
import { MenuOption } from "@/types/HomePage/menuOptions";

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function MainMenu({
    menuOptions,
}: {
    menuOptions: MenuOption[];
}) {
    // ===============constants===============

    // ===============states===============

    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============

    // ===============useEffect===============

    return (
        <Box>
            {menuOptions ? (
                <>
                    <CustomGrid gridCols={[1, 2, null, 4]} spacing={10}>
                        {menuOptions.map(
                            (
                                { label, icon, path }: MenuOption,
                                index: number
                            ) => {
                                return (
                                    <NextLink href={path} key={index}>
                                        <Box
                                            background="white"
                                            p={5}
                                            borderRadius={5}
                                            height="100%"
                                            display={"grid"}
                                            alignItems={"center"}
                                        >
                                            <Image alt={label} src={icon} />
                                            <Text
                                                textAlign={"center"}
                                                fontSize={[
                                                    null,
                                                    null,
                                                    "lg",
                                                    "xl",
                                                ]}
                                            >
                                                {label}
                                            </Text>
                                        </Box>
                                    </NextLink>
                                );
                            }
                        )}
                    </CustomGrid>
                </>
            ) : (
                <></>
            )}
        </Box>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
