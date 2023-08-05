import { realtimeDB } from "@/config/firebaseConfig";
import { ref } from "firebase/database";

export const folderRef = ref(realtimeDB, "folders/");

export const folderRefWithId = (folderId: string) => {
    return ref(realtimeDB, `folders/${folderId}`);
};

export const parentFolderRef = (parents: any[]) => {
    const parentsId: string[] = [];
    parents.forEach((parent) => {
        parentsId.push(parent.id);
    });
    return ref(realtimeDB, `folders/${parentsId.join("/children/")}`);
};

export const newChildFolderRef = (parents: any[]) => {
    const parentsId: string[] = [];
    parents.forEach((parent) => {
        parentsId.push(parent.id);
    });
    return ref(realtimeDB, `folders/${parentsId.join("/children/")}/children/`);
};
