import { storage, realtimeDB } from "@/config/firebaseConfig";
import { ref as stoageRef } from "firebase/storage";
import { ref as databaseRef, onValue } from "firebase/database";
import { getFileRef } from "./documentRefs";

export const realtimeFileChanges = (
    parentId: string,
    setCurrentData: (data: any) => void
) => {
    const currentFileRef = getFileRef(parentId);
    // console.log("parentId", parentId);
    onValue(currentFileRef, (snapshot) => {
        // console.log("snapshot", snapshot.exists());
        if (snapshot.exists()) {
            const data = snapshot.val();
            // console.log("data", data);
            let dataIds = Object.keys(data);
            const res = [];
            dataIds.forEach((id: string) => {
                res.push({ ...data[id], id });
            });

            setCurrentData(res);
        }
    });
};
