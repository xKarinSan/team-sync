import { getFileRef, getDocumentRef } from "./documentRefs";
import { remove } from "firebase/database";
import { deleteObject } from "firebase/storage";

// ================== simple modular functions ==================
// ==============delete the file from storage================
// takes in the document identifier (generated when creating the file in storage)
export const deleteDocumentFile = async (
    parentId: string,
    docId: string,
    extension: string
) => {
    try {
        //  remove document
        await deleteObject(getDocumentRef(parentId, docId + "." + extension));
        return true;
    } catch (e) {
        return false;
    }
};

// ==============delete the record from database================
// takes in the parentId from the storage
// takes in the databaseId from the storage (autogen)
export const deleteDocumentRecord = async (
    parentId: string,
    documentId: string
) => {
    try {
        //  remove document
        await remove(getFileRef(parentId + "/" + documentId));
        return true;
    } catch (e) {
        return false;
    }
};

// ================== complex functions ==================
// parentId => recordId(db) => documentId => extension
export const deleteDocument = async (
    parentId: string,
    docId: string,
    documentId: string,
    extension: string
) => {
    return (
        (await deleteDocumentFile(parentId, docId, extension)) &&
        (await deleteDocumentRecord(parentId, documentId))
    );
};
