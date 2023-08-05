import { folderRef, parentFolderRef, newChildFolderRef } from "./folderRefs";
import { FolderRecord } from "@/types/Folders/folderTypes";
import { push, set } from "firebase/database";

export const addFolder = async (teamId: string, folder: FolderRecord) => {
    try {
        await set(parentFolderRef([teamId]), folder);
        return 1;
    } catch (e) {
        return null;
    }
};

export const addChildFolder = async (
    parents: string[],
    folder: FolderRecord
) => {
    try {
        await push(newChildFolderRef(parents), folder);
        return "OK";
    } catch (e) {
        return null;
    }
};
