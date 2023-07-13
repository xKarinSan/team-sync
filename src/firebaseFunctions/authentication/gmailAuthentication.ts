import { auth } from "@/config/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { User } from "@/types/User/usertypes";
export const gmailLogin = async ({ setUser, toast, router }: any) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const user = result.user;
            if (user) {
                const { uid, displayName, email, photoURL } = user;
                const currentUser: User = {
                    userId: uid,
                    username: displayName,
                    email: email,
                    profilePic: photoURL,
                };
                setUser(currentUser);
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
