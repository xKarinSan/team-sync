import { realtimeDB } from "../../config/firebaseConfig";
import { ref, get, orderByChild, equalTo, query } from "firebase/database";
import { userRefById, userRef } from "./userRefs";
import { getSnapshotData } from "../general/getSnapshotData";

export const getUserbyUserId = async (userId: string) => {
    const dataSnapshot = await get(
        query(userRef, orderByChild("userId"), equalTo(userId))
    );
    return getSnapshotData(dataSnapshot);
};

export const getAllUsers = async () => {
    const snapshot = await get(userRef);
    return getSnapshotData(snapshot);
};
