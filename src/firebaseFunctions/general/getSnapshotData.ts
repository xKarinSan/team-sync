import { DataSnapshot } from "firebase/database";

export const getSnapshotData = (snapshot: DataSnapshot) => {
    if (snapshot.exists()) {
        const res: any[] = [];
        snapshot.forEach((child) => {
            res.push({ ...child.val(), id: child.key });
        });
        return res;
    } else {
        return [];
    }
};

export const getIndividualSnapshotData = (snapshot: DataSnapshot) => {
    if (snapshot.exists()) {
        return { ...snapshot.val(), id: snapshot.key };
    } else {
        return [];
    }
};
