"use client";
// ===================================all imports===================================

// ==========================import from react==========================

// ==========================import from next==========================

// ==========================import state management==========================

// ==========================import chakraui components==========================
import { Button, Text } from "@chakra-ui/react";

// ==========================import custom components==========================

// ==========================import external functions==========================

// ==========================import external variables==========================

// ==========================import types/interfaces==========================

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function CustomButton({
    LeftButtonIcon,
    RightButtonIcon,
    clickFunction,
    buttonText,
    textColor,
    buttonColor,
    buttonWidth,
    margin,
    buttonTextAlignment,
}: {
    LeftButtonIcon?: any;
    RightButtonIcon?: any;
    clickFunction?: () => void;
    buttonText: string;
    textColor?: string;
    buttonColor?: string;
    buttonWidth?: string;
    margin?: number;
    buttonTextAlignment?: string;
}) {
    // ===============constants===============

    // ===============states===============

    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============

    // ===============useEffect===============

    return (
        <Button
            borderRadius={5}
            background={buttonColor ? buttonColor : "#0239C8"}
            color={textColor ? textColor : "white"}
            leftIcon={LeftButtonIcon ? <LeftButtonIcon /> : null}
            rightIcon={RightButtonIcon ? <RightButtonIcon /> : null}
            margin={margin}
            width={buttonWidth ? buttonWidth : "auto"}
            onClick={() => {
                clickFunction ? clickFunction() : null;
            }}
            variant={"outline"}
            justifyContent={
                buttonTextAlignment ? buttonTextAlignment : "center"
            }
            textAlign={"left"}
        >
            {" "}
            <Text overflow={"hidden"} textOverflow={"ellipsis"}>
                {buttonText}
            </Text>
        </Button>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
