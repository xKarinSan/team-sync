import { getFileRef } from "./documentRefs";
import { set } from "firebase/database";
import { DocumentRecord } from "@/types/Documents/documentTypes";
export const updateDocument = async (
    parentId: string,
    docId: string,
    fileName: string,
    file: DocumentRecord
) => {
    try {
        await set(getFileRef(parentId + "/" + docId), {
            ...file,
            fileName,
        });
        return true;
    } catch (e) {
        return false;
    }
};
