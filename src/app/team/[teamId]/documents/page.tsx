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
    Input,
    IconButton,
    useToast,
} from "@chakra-ui/react";
import { FiFile, FiMoreVertical } from "react-icons/fi";

// ==========================import custom components==========================
import WhiteContainer from "@/components/general/WhiteContainer";
import FileDropzone from "@/components/documents/FileDropzone";
// ==========================import external functions==========================
import { userLoginProtection } from "@/routeProtectors";
import { realtimeFileChanges } from "@/firebaseFunctions/documents/documentGet";
import { updateDocument } from "@/firebaseFunctions/documents/documentPut";
import { deleteDocument } from "@/firebaseFunctions/documents/documentDelete";
// ==========================import external variables==========================

// ==========================import types/interfaces==========================
import { DocumentRecord } from "@/types/Documents/documentTypes";
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
            <Heading fontWeight={"normal"} size="md">
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
                                {files.map((file: DocumentRecord, index) => {
                                    // console.log("file", file);
                                    return (
                                        <FileContainer
                                            file={file}
                                            key={index}
                                        />
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

export function FileContainer({ file }: { file: DocumentRecord }) {
    const { fileName, fileExtension, url } = file;
    const toast = useToast();

    const [currFileName, setCurrFileName] = useState<string>(fileName);
    const [editing, setEditing] = useState<boolean>(false);

    // cancel updating file name
    const cancelUpdating = () => {
        setCurrFileName(fileName);
        setEditing(false);
    };

    // update file name
    const updateFile = async () => {
        toast({
            title: "Updating document...",
            status: "info",
        });
        const { parentId, id } = file;
        const successfullyUpdated = await updateDocument(
            parentId,
            id,
            currFileName,
            file
        );
        if (successfullyUpdated) {
            setEditing(false);
            toast({
                title: "File name updated",
                status: "success",
            });
        } else {
            toast({
                title: "Failed to update",
                status: "error",
            });
        }
    };

    // delete the file entirely
    const deleteFile = async () => {
        toast({
            title: "Deleting document...",
            status: "info",
        });
        const { parentId, docId, id, fileExtension } = file;
        const successfullyDeleted = await deleteDocument(
            parentId,
            docId,
            id,
            fileExtension
        );
        if (successfullyDeleted) {
            setEditing(false);
            toast({
                title: "Document deleted",
                status: "success",
            });
        } else {
            toast({
                title: "Failed to delete document",
                status: "error",
            });
        }
    };
    return (
        <WhiteContainer>
            <Box
                display={"flex"}
                width={"100%"}
                justifyContent={"space-between"}
            >
                <Text
                    noOfLines={2}
                    textAlign={"left"}
                    overflow="hidden"
                    textOverflow={"ellipsis"}
                >
                    {editing ? (
                        <>
                            <Input
                                placeholder="New file name"
                                value={currFileName}
                                onChange={(e) => {
                                    setCurrFileName(e.target.value);
                                }}
                            />
                        </>
                    ) : (
                        <>{fileName}</>
                    )}
                    {"."}
                    {fileExtension}
                </Text>
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<FiMoreVertical />}
                        background="white"
                        boxShadow={"0 0 4px 0 rgba(0, 0, 0, 0.2)"}
                        right={"0"}
                    ></MenuButton>
                    <MenuList>
                        {editing ? (
                            <>
                                <MenuItem
                                    onClick={() => {
                                        updateFile();
                                    }}
                                >
                                    Save
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        cancelUpdating();
                                    }}
                                >
                                    Cancel
                                </MenuItem>
                            </>
                        ) : (
                            <>
                                {" "}
                                <Link href={url} target="_blank">
                                    <MenuItem>View</MenuItem>
                                </Link>
                                <MenuItem
                                    onClick={() => {
                                        setEditing(true);
                                    }}
                                >
                                    Rename File
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        deleteFile();
                                    }}
                                >
                                    Remove
                                </MenuItem>
                            </>
                        )}
                    </MenuList>
                </Menu>
            </Box>
        </WhiteContainer>
    );
}
