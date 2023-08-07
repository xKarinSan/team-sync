"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import { useEffect, useState } from "react";
// ==========================import from next==========================
import { useRouter } from "next/navigation";
import NextLink from "next/link";

// ==========================import state management==========================
import useUser from "@/store/userStore";
import useTeam from "@/store/teamStore";
// ==========================import chakraui components==========================
import {
    Box,
    Heading,
    Menu,
    MenuItem,
    MenuButton,
    Text,
    MenuList,
    Link,
    Input,
    IconButton,
    useToast,
    useDisclosure,
    Breadcrumb,
    BreadcrumbItem,
    Tooltip,
    Icon,
    Image,
} from "@chakra-ui/react";
import { FiMoreVertical, FiFolderPlus, FiFolder, FiFile } from "react-icons/fi";

// ==========================import custom components==========================
import CustomContainer from "../custom/CustomContainer";
import FileDropzone from "./FileDropzone";
import CustomButton from "../custom/CustomButton";
import CustomFormInput from "../custom/CustomFormInput";
import LoadingDisplay from "../general/LoadingDisplay";
import CustomGrid from "../custom/CustomGrid";
import CustomDialog from "../custom/CustomDialog";
// ==========================import external functions==========================

// =============team=============
import { getTeamById } from "@/firebaseFunctions/teams/teamGet";

// =============folder features=============
import {
    realtimeFolderChanges,
    getFolderById,
} from "@/firebaseFunctions/folders/folderGet";
import { addFolder } from "@/firebaseFunctions/folders/folderAdd";
import { updateFolderRecord } from "@/firebaseFunctions/folders/folderPut";
import { deleteFolderRecord } from "@/firebaseFunctions/folders/folderDelete";

// =============document features=============
import { updateDocument } from "@/firebaseFunctions/documents/documentPut";
import { deleteDocument } from "@/firebaseFunctions/documents/documentDelete";
import { realtimeFileChanges } from "@/firebaseFunctions/documents/documentGet";

// ==========================import external variables==========================

// ==========================import types/interfaces==========================
import { DocumentRecord } from "@/types/Documents/documentTypes";
import { Folder } from "@/types/Folders/folderTypes";

// ==========================etc==========================
import FilePic from "@/images/teampage/DocumentsImage.png";
// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function DocumentPageTemplate({
    folderId,
}: {
    folderId?: string;
}) {
    // ===============constants===============
    const toast = useToast();
    const { userId } = useUser();
    const { teamId } = useTeam();
    const { isOpen, onOpen, onClose } = useDisclosure();

    // ===============states===============
    const [currentPlace, setCurrentPlace] = useState<string>("");
    const [parentDest, setParentDest] = useState<string>("");
    const [folderName, setFolderName] = useState<string>("");
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    // ===============helper functions (will not be directly triggered)===============
    const getCurrentPlace = async () => {
        if (folderId) {
            const folder = await getFolderById(folderId);
            const { parentId, folderName } = folder;
            setParentDest(parentId);
            setCurrentPlace(folderName);
        } else {
            const team = await getTeamById(teamId);
            setCurrentPlace(team.teamName);
        }
    };

    // ===============main functions (will be directly triggered)===============
    const createFolder = async () => {
        if (!folderName) {
            toast({
                title: "Folder name cannot be empty",
                status: "error",
            });
        } else {
            const addFolderRes = await addFolder({
                teamId,
                folderName,
                parentId: folderId ? folderId : teamId,
                creatorId: userId,
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

    // ===============useEffect===============
    useEffect(() => {
        setLoading(true);
        getCurrentPlace();
        realtimeFileChanges(folderId && teamId ? folderId : teamId, setFiles);
        realtimeFolderChanges(
            folderId && teamId ? folderId : teamId,
            setFolders
        );
        setLoading(false);
    }, []);

    return (
        <Box>
            <Box width={["100%"]} justifyContent={"center"} margin="auto">
                <Heading fontWeight={"normal"}>
                    Documents in {folderId ? "Folder" : "Team"} {""}{" "}
                    {currentPlace}
                </Heading>
                <br />

                <CustomContainer>
                    {/* use breadcrumbs */}
                    <Breadcrumb separator=">">
                        <BreadcrumbItem>
                            {folderId ? (
                                <NextLink href={`/team/${teamId}/documents/`}>
                                    Back To Team Documents
                                </NextLink>
                            ) : (
                                <NextLink href={`/team/${teamId}/`}>
                                    Back To Team
                                </NextLink>
                            )}
                        </BreadcrumbItem>
                        {folderId && parentDest != teamId ? (
                            <BreadcrumbItem>
                                <NextLink
                                    href={`/team/${teamId}/documents/${parentDest}`}
                                >
                                    Back To Parent
                                </NextLink>{" "}
                            </BreadcrumbItem>
                        ) : null}
                        <BreadcrumbItem>
                            <Text>{currentPlace}</Text>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </CustomContainer>
                <CustomButton
                    margin={0}
                    buttonText="Add Folder"
                    clickFunction={onOpen}
                    LeftButtonIcon={FiFolderPlus}
                />
                <FileDropzone folderId={folderId ? folderId : teamId}>
                    <Box>
                        {folders.length > 0 ? (
                            <>
                                <Heading fontWeight={"normal"} size="md">
                                    Folders
                                </Heading>
                                <CustomGrid gridCols={[2, null, 3, 4]}>
                                    {folders.map((folder: Folder, index) => {
                                        return (
                                            <FolderContainer
                                                folder={folder}
                                                key={index}
                                            />
                                        );
                                    })}
                                </CustomGrid>
                            </>
                        ) : (
                            <></>
                        )}
                        {files.length > 0 ? (
                            <>
                                {" "}
                                <Heading fontWeight={"normal"} size="md">
                                    Files
                                </Heading>
                                <CustomGrid gridCols={[2, null, 3, 4]}>
                                    {" "}
                                    {files.map(
                                        (file: DocumentRecord, index) => {
                                            return (
                                                <FileContainer
                                                    file={file}
                                                    key={index}
                                                />
                                            );
                                        }
                                    )}
                                </CustomGrid>
                            </>
                        ) : (
                            <></>
                        )}
                    </Box>
                </FileDropzone>
                <AddFileDialog
                    isOpen={isOpen}
                    onClose={onClose}
                    setCurrentFolderName={setFolderName}
                    currentFolderName={folderName}
                    onSubmitFunction={createFolder}
                />
            </Box>
        </Box>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components

export function FolderContainer({ folder }: { folder: Folder }) {
    const { folderName, parentId, teamId } = folder;
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
    const handleDoubleClick = (e: any) => {
        if (e.detail === 2 && !editing) {
            window.open(`/team/${teamId}/documents/${folder.id}`);
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
        <Box
            display={"inline-flex"}
            width={"100%"}
            justifyContent={"space-between"}
            alignContent={"center"}
            _hover={{ cursor: "pointer", background: "gray.200" }}
            background="white"
            borderWidth={"1px"}
            padding={2}
            onClick={handleDoubleClick}
        >
            <Tooltip hasArrow label={folderName}>
                <Text
                    noOfLines={2}
                    textAlign={"left"}
                    overflow="hidden"
                    textOverflow={"ellipsis"}
                    marginTop={"auto"}
                    marginBottom={"auto"}
                >
                    <Icon as={FiFolder} marginRight={2} />
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
            </Tooltip>
            <Menu>
                <Tooltip hasArrow label="More actions">
                    <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<FiMoreVertical />}
                        top={"0"}
                        right={"0"}
                        width={"fit-content"}
                        alignSelf={"center"}
                        borderRadius={"50%"}
                        background={"none"}
                    />
                </Tooltip>
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
                            <NextLink
                                href={`/team/${teamId}/documents/${folder.id}`}
                            >
                                <MenuItem>Go to folder</MenuItem>
                            </NextLink>
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
    );
}

export function FileContainer({ file }: { file: DocumentRecord }) {
    const { fileName, fileExtension, url } = file;
    const toast = useToast();
    const [currFileName, setCurrFileName] = useState<string>(fileName);
    const [editing, setEditing] = useState<boolean>(false);
    const fileExtensions = [
        "pdf",
        "doc",
        "docx",
        "ppt",
        "pptx",
        "xls",
        "xlsx",
        "jpg",
        "jpeg",
        "png",
        "gif",
        "bmp",
        "ico",
        "svg",
        "webp",
        "tiff",
        "psd",
        "ai",
        "eps",
        "raw",
        "mp4",
        "mov",
        "avi",
        // Add more file extensions as needed
    ];

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

    const handleDoubleClick = (e: any) => {
        if (e.detail === 2 && !editing) {
            window.open(url);
        }
    };
    return (
        <Box
            _hover={{ cursor: "pointer", background: "gray.200" }}
            background="white"
            borderWidth={"1px"}
            padding={2}
            onClick={handleDoubleClick}
        >
            <Box
                display={"inline-flex"}
                width={"100%"}
                justifyContent={"space-between"}
            >
                <Tooltip hasArrow label={`${fileName}.${fileExtension}`}>
                    <Box overflow={"hidden"}>
                        <Text
                            noOfLines={2}
                            textAlign={"left"}
                            overflow="scroll"
                            textOverflow={"ellipsis"}
                            fontWeight={"light"}
                            margin="auto"
                        >
                            <Icon as={FiFile} marginRight={2} />
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
                                <Text as="span">{fileName}</Text>
                            )}
                            .{fileExtension}
                        </Text>
                    </Box>
                </Tooltip>
                <Menu>
                    <Tooltip hasArrow label="More actions">
                        <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<FiMoreVertical />}
                            top={"0"}
                            right={"0"}
                            width={"fit-content"}
                            alignSelf={"center"}
                            borderRadius={"50%"}
                            background={"none"}
                        />
                    </Tooltip>
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
            <Box
                background="white"
                margin="0 auto"
                height={"200px"}
                padding="10px"
                borderRadius={"5px"}
                overflow={"hidden"}
            >
                {fileExtension == "mov" ? (
                    <>
                        <video width={"100%"} height={"100%"}>
                            <source src={url} />
                        </video>
                    </>
                ) : (
                    <>
                        {fileExtensions.includes(fileExtension) ? (
                            <>
                                {" "}
                                <object
                                    // type={fileExtension}
                                    style={{ objectFit: "cover" }}
                                    data={url}
                                    width={"100%"}
                                    height={"100%"}
                                    onLoad={()=>{
                                        
                                    }}
                                ></object>
                            </>
                        ) : (
                            <>
                                <Image
                                    src={FilePic.src}
                                    width="100%"
                                    margin="0 auto"
                                />
                            </>
                        )}
                    </>
                )}
                {/* <Image src={url} width={"100%"} /> */}
            </Box>
        </Box>
    );
}

export function AddFileDialog({
    isOpen,
    currentFolderName,
    setCurrentFolderName,
    onSubmitFunction,
    onClose,
}: {
    isOpen: boolean;
    currentFolderName: string;
    setCurrentFolderName: (value: string) => void;
    onSubmitFunction: () => void | Promise<void>;
    onClose: () => void;
}) {
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
        <>
            <CustomDialog
                dialogTitle="Add Folder"
                isOpen={isOpen}
                onSubmit={triggerSubmit}
                onCancel={cancelSubmit}
                onClose={onClose}
                submitText="Create folder"
            >
                <CustomFormInput
                    formLabel="New Folder Name"
                    placeholder="Enter Folder Name"
                    formId={"addFolder"}
                    value={currentFolderName}
                    changeHandler={setCurrentFolderName}
                />
            </CustomDialog>
        </>
    );
}
