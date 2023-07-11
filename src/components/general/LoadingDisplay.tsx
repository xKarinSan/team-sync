import { Box, CircularProgress, Heading } from "@chakra-ui/react";
interface loadingDisplayProps {
    displayText: string;
    width: number;
}
export default function LoadingDisplay({
    displayText,
    width,
}: loadingDisplayProps) {
    return (
        <Box
            background="white"
            margin={"10px auto"}
            p={5}
            borderRadius={5}
            width={`${width ? width : 100}%`}
            display="grid"
            alignSelf="center"
        >
            <CircularProgress isIndeterminate={true} margin={"auto"}color="#0239C8" />
            <Heading textAlign="center">{displayText}</Heading>
        </Box>
    );
}
