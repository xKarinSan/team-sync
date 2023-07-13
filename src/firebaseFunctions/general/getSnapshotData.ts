import { DataSnapshot } from "firebase/database";

export const getSnapshotData = (snapshot: DataSnapshot) => {
    if (snapshot.exists()) {
        const res: any[] = [];
        snapshot.forEach((child) => {
            // console.log(child.key, child.val());
            res.push({ ...child.val(), id: child.key });
        });
        return res;
    } else {
        return [];
    }
};
