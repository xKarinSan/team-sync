import { realtimeDB } from "../../config/firebaseConfig";
import { ref, push } from "firebase/database";
import { getUserbyUserId } from "./usersGet";
import { userRef } from "./userRefs";
import { User } from "@/types/User/usertypes";
export const addUser = async (createdUser: User) => {
    const { username, userId, profilePic } = createdUser;
    try {
        // cannot add duplicate
        const userFound = await getUserbyUserId(userId);
        if (userFound.length > 0) {
            return false;
        }
        const res = await push(userRef, {
            username,
            userId,
            profilePic,
        });

        if (res) {
            return true;
        }
        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
};
