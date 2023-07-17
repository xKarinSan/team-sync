"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import { useEffect, useState } from "react";

// ==========================import from next==========================
import { useRouter } from "next/navigation";
import NextLink from "next/link";

// ==========================import state management==========================
import useUser from "@/store/userStore";

// ==========================import chakraui components==========================
import {
    Box,
    Heading,
    SimpleGrid,
    Menu,
    MenuItem,
    MenuButton,
    Button,
    Text,
    MenuList,
    Link,
} from "@chakra-ui/react";
import { FiFile, FiFilePlus, FiTrash } from "react-icons/fi";

// ==========================import custom components==========================
import WhiteContainer from "@/components/general/WhiteContainer";
import FileDropzone from "@/components/documents/FileDropzone";
// ==========================import external functions==========================
import { userLoginProtection } from "@/routeProtectors";
import { realtimeFileChanges } from "@/firebaseFunctions/documents/documentGet";
// ==========================import external variables==========================

// ==========================import types/interfaces==========================

// ==========================etc==========================

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function TeamDocumentPage({
    params,
}: {
    params: { teamId: string };
}) {
    // ===============constants===============
    const { user } = useUser();
    const router = useRouter();
    // ===============states===============
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============

    // ===============useEffect===============
    useEffect(() => {
        setLoading(true);
        userLoginProtection(user, router);
        realtimeFileChanges(params.teamId, setFiles);
        setLoading(false);
    }, []);

    return (
        <Box>
            <Heading fontWeight={"nomral"}>Documents</Heading>
            <br />

            <WhiteContainer>
                <NextLink href={`/team/${params.teamId}`}>Back</NextLink>{" "}
            </WhiteContainer>
            <Heading fontWeight={"nomral"} size="md">
                Folders
            </Heading>
            <WhiteContainer></WhiteContainer>
            <Heading fontWeight={"nomral"} size="md">
                Files
            </Heading>
            <WhiteContainer>
                {loading ? (
                    <></>
                ) : (
                    <SimpleGrid columns={[2, 4, null]} spacing={1}>
                        {" "}
                        {files.length > 0 ? (
                            <>
                                {" "}
                                {files.map((file, index) => {
                                    console.log("file", file);
                                    return (
                                        <FileContainer file={file} key={file.id} />
                                        // <WhiteContainer key={index}>
                                        //     <NextLink
                                        //         href={file.url}
                                        //         target="_blank"
                                        //     >
                                        //         {file.fileName}
                                        //     </NextLink>
                                        // </WhiteContainer>
                                    );
                                })}
                            </>
                        ) : (
                            <></>
                        )}
                    </SimpleGrid>
                )}
            </WhiteContainer>

            <FileDropzone folderId={params.teamId} />
        </Box>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components

export function FileContainer({file}) {
    return (
        <Menu key={file.fileId}>
            <MenuButton
                as={Button}
                aria-label="Options"
                width={"100%"}
                rightIcon={<FiFile />}
                background="white"
                boxShadow={"0 0 4px 0 rgba(0, 0, 0, 0.2)"}
            >
                <Text
                    textAlign={"left"}
                    overflow="hidden"
                    textOverflow={"ellipsis"}
                >
                    {file.fileName}
                </Text>
            </MenuButton>
            <MenuList>
                <Link href={file.url} target="_blank">
                    <MenuItem>Preview</MenuItem>
                </Link>
                <MenuItem
                    onClick={() => {
                        // deleteFile(file.fileId);
                    }}
                >
                    Remove
                </MenuItem>
            </MenuList>
        </Menu>
    );
}
