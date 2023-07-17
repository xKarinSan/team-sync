import { folderRefWithId, folderRef } from "./folderRefs";
import { set } from "firebase/database";
import { Folder } from "@/types/Folders/folderTypes";

export const updateFolderRecord = async (
    folderId: string,
    folderName: string,
    folder: Folder
) => {
    try {
        await set(folderRefWithId(folderId), {
            ...folder,
            folderName,
        });
        return true;
    } catch (e) {
        return false;
    }
};
