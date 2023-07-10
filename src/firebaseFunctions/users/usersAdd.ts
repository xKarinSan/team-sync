import { realtimeDB } from "../../config/firebaseConfig";
import { ref, push } from "firebase/database";

export const addUser = async (name: any) => {
    // try{
    const userRef = ref(realtimeDB, "users/");
    // set(ref(db, "users/" + userId), {
    //     username: name,
    //     email: email,
    //     profile_picture: imageUrl,
    // });

    const user = {
        userId: "0",
        name,
    };

    const res = await push(userRef, user);
    if (res) {
        return true;
    }
    return false;

    // return addUserReq.
    // }
    // catch(e){
    //     return e
    // }
};
