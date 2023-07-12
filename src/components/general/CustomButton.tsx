import { Button, Text } from "@chakra-ui/react";

export default function CustomButton({
    LeftButtonIcon,
    RightButtonIcon,
    clickFunction,
    buttonText,
    textColor,
    buttonColor,
    buttonWidth,
    margin,
}: {
    LeftButtonIcon?: any;
    RightButtonIcon?: any;
    clickFunction?: () => void;
    buttonText: string;
    textColor?: string;
    buttonColor?: string;
    buttonWidth?: string;
    margin?: number;
}) {
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
        >
            {" "}
            <Text>{buttonText}</Text>
        </Button>
    );
}
