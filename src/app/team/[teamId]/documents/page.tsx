"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import { useEffect, useState, useRef } from "react";

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
    useDisclosure,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Toast,
} from "@chakra-ui/react";
import { FiFile, FiMoreVertical, FiFolderPlus } from "react-icons/fi";

// ==========================import custom components==========================
import WhiteContainer from "@/components/general/WhiteContainer";
import FileDropzone from "@/components/documents/FileDropzone";
import CustomButton from "@/components/general/CustomButton";
import CustomFormInput from "@/components/general/CustomFormInput";

// ==========================import external functions==========================
import { userLoginProtection } from "@/routeProtectors";
import { realtimeFileChanges } from "@/firebaseFunctions/documents/documentGet";
import { updateDocument } from "@/firebaseFunctions/documents/documentPut";
import { deleteDocument } from "@/firebaseFunctions/documents/documentDelete";
import { addFolder } from "@/firebaseFunctions/folders/folderAdd";
import { realtimeFolderChanges } from "@/firebaseFunctions/folders/folderGet";
import { updateFolderRecord } from "@/firebaseFunctions/folders/folderPut";
import { deleteFolderRecord } from "@/firebaseFunctions/folders/folderDelete";
// ==========================import external variables==========================

// ==========================import types/interfaces==========================
import { DocumentRecord } from "@/types/Documents/documentTypes";
import { Folder } from "@/types/Folders/folderTypes";
// ==========================etc==========================

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function TeamDocumentPage({
    params,
}: {
    params: { teamId: string };
}) {
    // ===============constants===============
    const toast = useToast();
    const { user } = useUser();
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();

    // ===============states===============
    const [folderName, setFolderName] = useState<string>("");
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    // ===============helper functions (will not be directly triggered)===============
    const createFolder = async () => {
        if (!folderName) {
            toast({
                title: "Folder name cannot be empty",
                status: "error",
            });
        } else {
            const addFolderRes = await addFolder({
                teamId: params.teamId,
                folderName,
                parentId: params.teamId,
                creatorId: user.userId,
                createdDate: new Date(),
            });
            if (addFolderRes) {
                toast({
                    title: "Folder Added",
                    status: "success",
                });
            } else {
                toast({
                    title: "Folder failed to add",
                    status: "error",
                });
            }
        }
    };

    // ===============main functions (will be directly triggered)===============

    // ===============useEffect===============
    useEffect(() => {
        setLoading(true);
        userLoginProtection(user, router);
        realtimeFileChanges(params.teamId, setFiles);
        realtimeFolderChanges(params.teamId, setFolders);
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
            <CustomButton
                buttonText="Add Folder"
                clickFunction={onOpen}
                LeftButtonIcon={FiFolderPlus}
            />
            <AddFileDialog
                isOpen={isOpen}
                onClose={onClose}
                setCurrentFolderName={setFolderName}
                currentFolderName={folderName}
                onSubmitFunction={createFolder}
            />
            {/* <br /> */}
            <WhiteContainer>
                {loading ? (
                    <></>
                ) : (
                    <SimpleGrid columns={[2, null, 3, 4, 6]} spacing={1}>
                        {" "}
                        {folders.length > 0 ? (
                            <>
                                {" "}
                                {folders.map((folder: Folder, index) => {
                                    return (
                                        <FolderContainer
                                            folder={folder}
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
            <Heading fontWeight={"nomral"} size="md">
                Files
            </Heading>
            <WhiteContainer>
                {loading ? (
                    <></>
                ) : (
                    <SimpleGrid columns={[2, null, 3, 4, 6]} spacing={1}>
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

export function FolderContainer({ folder }: { folder: Folder }) {
    const { folderName, parentId } = folder;
    const toast = useToast();

    const [currFolderName, setCurrFolderName] = useState<string>(folderName);
    const [editing, setEditing] = useState<boolean>(false);

    // cancel updating file name
    const cancelUpdating = () => {
        setCurrFolderName(folderName);
        setEditing(false);
    };

    // update file name
    const updateFolder = async () => {
        toast({
            title: "Updating document...",
            status: "info",
        });
        const { parentId, id } = folder;
        const successfullyUpdated = await updateFolderRecord(
            id,
            currFolderName,
            folder
        );
        if (successfullyUpdated) {
            setEditing(false);
            toast({
                title: "Folder name updated",
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
    const deleteFolder = async () => {
        toast({
            title: "Deleting folder...",
            status: "info",
        });
        const { id } = folder;
        const successfullyDeleted = await deleteFolderRecord(id);
        if (successfullyDeleted) {
            setEditing(false);
            toast({
                title: "Folder deleted",
                status: "success",
            });
        } else {
            toast({
                title: "Failed to delete folder",
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
                                value={currFolderName}
                                onChange={(e) => {
                                    setCurrFolderName(e.target.value);
                                }}
                            />
                        </>
                    ) : (
                        <>{folderName}</>
                    )}
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
                                        updateFolder();
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
                                <MenuItem>Go to folder</MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        setEditing(true);
                                    }}
                                >
                                    Rename Folder
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        deleteFolder();
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

export function AddFileDialog({
    isOpen,
    // cancelRef,
    currentFolderName,
    setCurrentFolderName,
    onSubmitFunction,
    onClose,
}: {
    isOpen: boolean;
    // cancelRef: any;
    currentFolderName: string;
    setCurrentFolderName: (value: string) => void;
    onSubmitFunction: () => Promise<void>;
    onClose: () => void;
}) {
    const cancelRef = useRef();

    const triggerSubmit = async () => {
        if (onSubmitFunction) {
            await onSubmitFunction();
        }
        setCurrentFolderName("");
        onClose();
    };

    const cancelSubmit = () => {
        setCurrentFolderName("");
        onClose();
    };
    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Add Folder
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        <CustomFormInput
                            formLabel="New Folder Name"
                            placeholder="Enter Folder Name"
                            formId={"addFolder"}
                            value={currentFolderName}
                            changeHandler={setCurrentFolderName}
                        />
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <CustomButton
                            buttonColor="grey"
                            clickFunction={cancelSubmit}
                            buttonText="Cancel"
                        />

                        <CustomButton
                            // buttonColor="grey"
                            clickFunction={triggerSubmit}
                            buttonText="Add"
                        />
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
}
