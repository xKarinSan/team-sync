import { storage, realtimeDB } from "@/config/firebaseConfig";
import { get, query, orderByChild, equalTo } from "firebase/database";

import { ref as stoageRef } from "firebase/storage";
import { ref as databaseRef, onValue } from "firebase/database";
import {
    getSnapshotData,
    getIndividualSnapshotData,
} from "../general/getSnapshotData";
import { folderRef, folderRefWithId } from "./folderRefs";

// ================== simple modular functions ==================
// all folders
export const getAllFolders = async () => {
    const dataSnapshot = await get(folderRef);
    return getSnapshotData(dataSnapshot);
};

// get folder by id
export const getFolderById = async (teamId: string) => {
    const dataSnapshot = await get(folderRefWithId(teamId));
    return getIndividualSnapshotData(dataSnapshot);
};

// get folder by parent
export const getChildrenFolders = async (parentId: string) => {
    const dataSnapshot = await get(
        query(folderRef, orderByChild("parentId"), equalTo(parentId))
    );
    return getSnapshotData(dataSnapshot);
};
// ================== complex modular functions ==================

// ================== listener ==================

export const realtimeFolderChanges = (
    parentId: string,
    setCurrentData: (data: any) => void
) => {
    onValue(folderRef, (snapshot) => {
        // console.log("parentId", parentId);
        // console.log(snapshot.exists());
        if (snapshot.exists()) {
            const data = snapshot.val();
            // console.log("data", data);
            let dataIds = Object.keys(data);
            const res = [];
            dataIds.forEach((id: string) => {
                if (data[id].parentId === parentId) {
                    res.push({ ...data[id], id });
                }
            });
            // console.log("res", res);

            setCurrentData(res);
        }
    });
};
