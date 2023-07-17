import { folderRef } from "./folderRefs";
import { folderEntry, Folder } from "@/types/Folders/folderTypes";
import { push } from "firebase/database";

export const addFolder = async (folder: folderEntry) => {
    try {
        // console.log("folder", folder);
        const res = await push(folderRef, folder);
        // console.log("res", res);
        if (res) {
            return res.key;
        }
        return null;
    } catch (e) {
        // console.log("e", e);
        return null;
    }
};
