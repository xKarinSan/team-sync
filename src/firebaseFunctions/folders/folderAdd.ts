import { folderRef } from "./folderRefs";
import { folderEntry } from "@/types/Folders/folderTypes";
import { push } from "firebase/database";

export const addFolder = async (folder: folderEntry) => {
    try {
        const res = await push(folderRef, folder);
        if (res) {
            return res.key;
        }
        return null;
    } catch (e) {
        return null;
    }
};
