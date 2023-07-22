import { storage, realtimeDB } from "@/config/firebaseConfig";
import { ref as stoageRef } from "firebase/storage";
import { onValue } from "firebase/database";
import { getFileRef } from "./documentRefs";

export const realtimeFileChanges = (
    parentId: string,
    setCurrentData: (data: any) => void
) => {
    const currentFileRef = getFileRef(parentId);
    onValue(currentFileRef, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            let dataIds = Object.keys(data);
            const res: any[] = [];
            dataIds.forEach((id: string) => {
                res.push({ ...data[id], id });
            });

            setCurrentData(res);
        }
    });
};
