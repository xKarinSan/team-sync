import { realtimeDB } from "../../config/firebaseConfig";
import { ref, get } from "firebase/database";

export const allUsers = async () => {
    const userRef = ref(realtimeDB, "users/");
    const dataSnapshot = await get(userRef);
    if (dataSnapshot.exists()) {
        const res:any[] = [];
        dataSnapshot.forEach((child) => {
            // console.log(child.key, child.val());
            res.push(child.val());
        });
        return res;
    } else {
        console.log("No data available");
        return [];
    }
};
