import { getDocumentRef, getFileRef } from "./documentRefs";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import { push } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

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
    fileArr: any[],
    uploaderId: string
) => {
    const promises: Promise<any>[] = [];

    fileArr.forEach(async (file) => {
        const extension = file.name.substring(
            file.name.lastIndexOf(".") + 1,
            file.name.length
        );
        const newFileName = uuidv4() + "." + extension;
        const docRef = getDocumentRef(teamId, newFileName);
        promises.push(
            await uploadBytes(docRef, file).then(async () => {
                await getDownloadURL(docRef).then(async (url) => {
                    await addFileRecord(teamId, {
                        url,
                        uploaderId,
                        parentId: teamId,
                        uploadDate: new Date(),
                        fileName: file.name,
                    });
                });
            })
        );
    });

    const res = await Promise.all(promises);
    return res;
};