import { getDocumentRef, getFileRef } from "./documentRefs";
import {
    uploadBytes,
    getDownloadURL,
    uploadBytesResumable,
} from "firebase/storage";
import { push } from "firebase/database";
// import { v4 as uuidv4 } from "uuid";

type Document = {
    url: string;
    uploaderId: string;
    parentId: string;
    uploadDate: Date;
    fileName: string;
};

// ================== simple modular functions ==================
export const addFileRecord = async (
    parentId: string,
    newDocument: Document
) => {
    try {
        const res = await push(getFileRef(parentId), newDocument);
        if (res) {
            return res.key;
        }
        return null;
    } catch (e) {
        return null;
    }
};

// ================== complex functions ==================
export const addFilesToTeam = async (
    teamId: string,
    fileArr: File[],
    uploaderId: string,
    setNoOfUploadedFiles: (no: number) => void,
    setNoOfUploadedBytes: (no: number) => void,
    setCurrFileSize: (no: number) => void,
    successfulUpload: () => void,
    failedUpload: () => void
) => {
    const promises: any[] = [];
    let noOfUploadedFilesCounter = 0;
    setNoOfUploadedFiles(noOfUploadedFilesCounter);
    fileArr.forEach(async (file) => {
        const extension = file.name.substring(
            file.name.lastIndexOf(".") + 1,
            file.name.length
        );

        setNoOfUploadedBytes(0);
        setCurrFileSize(0);

        const docId = Math.random().toString(36).substr(2, 9);
        const newFileName = docId + "." + extension;
        const docRef = getDocumentRef(teamId, newFileName);

        const uploadTask = uploadBytesResumable(docRef, file);
        promises.push(uploadTask);

        uploadTask.on(
            "state_changed",
            (snapshot: any) => {
                setNoOfUploadedBytes(snapshot.bytesTransferred);
                setCurrFileSize(snapshot.totalBytes);
            },
            (error: any) => {
                failedUpload();
                return;
            },
            async () => {
                noOfUploadedFilesCounter += 1;
                setNoOfUploadedFiles(noOfUploadedFilesCounter);
                await getDownloadURL(docRef).then(async (url) => {
                    const newDocument: any = {
                        docId,
                        url,
                        uploaderId,
                        parentId: teamId,
                        uploadDate: new Date(),
                        fileName: file.name.substr(
                            0,
                            file.name.lastIndexOf(".")
                        ),
                        fileExtension: extension,
                    };
                    await addFileRecord(teamId, newDocument);
                });
            }
        );
    });
    Promise.all(promises)
        .then(() => {
            successfulUpload();
        })
        .catch((e: any) => {
            console.log("err", e);
            failedUpload();
        });
};
