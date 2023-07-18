import { User } from "@/types/User/usertypes";
import { auth } from "@/config/firebaseConfig";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { addUser } from "../users/usersAdd";

// if successful, return the user
// else return null
export const emailLogin = async ({
    email,
    password,
    setUser,
    toast,
    router,
}: any) => {
    await signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed in
            const user = userCredential.user;
            if (user) {
                const { uid, displayName, email, photoURL } = user;
                const currentUser: User = {
                    userId: uid,
                    username: displayName,
                    email: email,
                    profilePic: photoURL,
                };
                await addUser(user);
                setUser(currentUser);
                toast({
                    title: "Logged In.",
                    description: "Login Successful!",
                    status: "success",
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

// if successful, return the user
// else return null
export const emailRegistration = async ({
    email,
    username,
    password,
    setUser,
    toast,
    router,
}: any) => {
    await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, {
                    displayName: username,
                });
            }
            if (user) {
                const { uid, displayName, email, photoURL } = user;
                const currentUser: User = {
                    userId: uid,
                    username: displayName,
                    email: email,
                    profilePic: photoURL ? photoURL : "",
                };

                await addUser(currentUser);
                setUser(currentUser);
            }
            toast({
                title: "Registered.",
                description: "Registration Successful!",
                status: "success",
            });
            router.replace("/home");
        })
        .catch((e) => {
            toast({
                title: "Error.",
                description: e.message,
                status: "error",
            });
        });
};
