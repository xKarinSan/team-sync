import { folderRef, folderRefWithId } from "./folderRefs";
import { remove } from "firebase/database";

// ================== simple modular functions ==================

export const deleteFolderRecord = async (folderId: string) => {
    try {
        //  remove document
        await remove(folderRefWithId(folderId));
        return true;
    } catch (e) {
        return false;
    }
};
