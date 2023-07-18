// const { storage } = require("../firebaseConfig");
import { storage, realtimeDB } from "@/config/firebaseConfig";
import { ref as storageRef } from "firebase/storage";
import { ref as databaseRef } from "firebase/database";

export const getDocumentRef = (destinationId: string, imagePath: string) => {
    return storageRef(storage, `documents/${destinationId}/${imagePath}`);
};

export const getFileRef = (parentId: string) => {
    return databaseRef(realtimeDB, `documents/${parentId}`);
};
