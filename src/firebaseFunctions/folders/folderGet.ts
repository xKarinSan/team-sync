import { storage, realtimeDB } from "@/config/firebaseConfig";
import { get, query, orderByChild, equalTo } from "firebase/database";

import { onValue } from "firebase/database";
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
        if (snapshot.exists()) {
            const data = snapshot.val();
            let dataIds = Object.keys(data);
            const res: any[] = [];
            dataIds.forEach((id: string) => {
                if (data[id].parentId === parentId) {
                    res.push({ ...data[id], id });
                }
            });

            setCurrentData(res);
        }
    });
};
