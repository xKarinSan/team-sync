"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import { useState, useEffect, useCallback } from "react";
// ==========================import from next==========================
import Image from "next/image";
// ==========================import state management==========================

// ==========================import chakraui components==========================
import {
    Box,
    SimpleGrid,
    useToast,
    Text,
    Link,
    Menu,
    MenuList,
    MenuItem,
    MenuButton,
    Button,
} from "@chakra-ui/react";
import { FiFile, FiFilePlus } from "react-icons/fi";

// ==========================import custom components==========================
import WhiteContainer from "../general/WhiteContainer";
import CustomButton from "../general/CustomButton";
// ==========================import external functions==========================

// ==========================import external variables==========================

// ==========================import types/interfaces==========================

// ==========================etc==========================
import { useDropzone } from "react-dropzone";
import { Heading } from "@chakra-ui/react";
import { title } from "process";
import NoRecordsDisplay from "../general/NoRecordsDisplay";
// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

// folderId is a string
// takes in teamId if its not inside folder
export default function FileDropzone({ folderId }: { folderId: string }) {
    // ===============constants===============
    const toast = useToast();
    // ===============states===============
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [entering, setEntering] = useState<boolean>(false);

    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============
    const onDrop = useCallback((acceptedFiles) => {
        setSelectedFiles(
            acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                    fileId: Math.random().toString(36).substr(2, 9),
                })
            )
        );
        setEntering(false);
    }, []);

    const deleteFile = (id: number) => {
        setSelectedFiles(
            selectedFiles.filter((file) => {
                return file.fileId != id;
            })
        );
    };

    const uploadFiles = () => {
        toast({
            title: "File(s) uploaded",
            status: "success",
        });
        setSelectedFiles([]);
    };
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    const selectedImages = selectedFiles?.map((file) => {
        return (
            <>
                <Menu>
                    <MenuButton
                        as={Button}
                        aria-label="Options"
                        width={"100%"}
                        rightIcon={<FiFile />}
                        background="white"
                        boxShadow={"0 0 4px 0 rgba(0, 0, 0, 0.2)"}
                    >
                        <Text
                            noOfLines={1}
                            textAlign={"left"}
                            overflow="hidden"
                            textOverflow={"ellipsis"}
                        >
                            {file.name}
                        </Text>
                        {/* </WhiteContainer> */}
                    </MenuButton>
                    <MenuList>
                        <Link href={file.preview} target="_blank">
                            <MenuItem>Preview</MenuItem>
                        </Link>
                        <MenuItem
                            onClick={() => {
                                deleteFile(file.fileId);
                            }}
                        >
                            Delete
                        </MenuItem>
                    </MenuList>
                </Menu>
            </>
        );
    });

    // ===============useEffect===============

    return (
        <Box>
            <div
                {...getRootProps()}
                onDragEnter={() => {
                    setEntering(true);
                }}
                onDragLeave={() => setEntering(false)}
            >
                <Box
                    width={["100%"]}
                    background={entering ? "#939393" : "white"}
                    color={entering ? "white" : "black"}
                    boxShadow={"0 0 4px 0 rgba(0, 0, 0, 0.2)"}
                    borderRadius={5}
                    padding={2}
                    margin="auto"
                    marginTop={5}
                    marginBottom={5}
                    minHeight={"40vh"}
                    transition={
                        "background-color 200ms linear, color 200ms linear"
                    }
                >
                    <input {...getInputProps()} />
                </Box>
            </div>
            <Heading fontWeight={"normal"} size="md">
                Files
            </Heading>
            <br />
            <CustomButton
                buttonText={`Upload ${selectedFiles.length} files`}
                clickFunction={uploadFiles}
                LeftButtonIcon={FiFilePlus}
            />{" "}
            <WhiteContainer>
                {selectedFiles.length == 0 ? (
                    <>
                        <Heading fontWeight={"normal"}>
                            No files uploaded, upload some?
                        </Heading>
                    </>
                ) : (
                    <>
                        <SimpleGrid columns={[2, 4, null]} spacing={1}>
                            {selectedImages}{" "}
                        </SimpleGrid>
                    </>
                )}
            </WhiteContainer>
        </Box>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
