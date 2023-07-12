import React from "react";
import { Box } from "@chakra-ui/react";
export default function WhiteContainer({
    children,
    minHeight,
    minWidth,
}: {
    children: React.ReactNode;
    minHeight?: string;
    minWidth?: string;
}) {
    return (
        <Box
            width="100%"
            background="white"
            boxShadow={"0 0 4px 0 rgba(0, 0, 0, 0.2)"}
            borderRadius={5}
            padding={2}
            marginTop={5}
            marginBottom={5}
            minHeight={minHeight ? minHeight : 0}
            minWidth={minWidth ? minWidth : 0}
        >
            {children}
        </Box>
    );
}
