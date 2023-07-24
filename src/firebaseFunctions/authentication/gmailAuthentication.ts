import { auth } from "@/config/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { User } from "@/types/User/usertypes";
import { addUser } from "../users/usersAdd";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
export const gmailLogin = async ({
    setUser,
    toast,
    router,
}: {
    setUser: (userId: string, username: string, profilePic: string) => void;
    toast: any;
    router: AppRouterInstance;
}) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then(async (result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const user = result.user;
            if (user) {
                const { uid, displayName, email, photoURL } = user;
                const currentUser: User = {
                    userId: uid,
                    username: displayName || "",
                    email: email || "",
                    profilePic: photoURL || "",
                };
                await addUser(currentUser);
                // const { userId, username } = currentUser;
                setUser(uid, displayName || "", photoURL || "");
                toast({
                    title: "Auth successful.",
                    description: "Gmail Login Successful!",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                router.replace("/home");
            }
        })
        .catch((e) => {
            toast({
                title: "Error.",
                description: e.message,
                status: "error",
            });
        });
};
