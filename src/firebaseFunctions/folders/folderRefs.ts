import { realtimeDB } from "@/config/firebaseConfig";
import { ref } from "firebase/database";

export const folderRef = ref(realtimeDB, "folders/");

export const folderRefWithId = (folderId: string) => {
    return ref(realtimeDB, `folders/${folderId}`);
};
