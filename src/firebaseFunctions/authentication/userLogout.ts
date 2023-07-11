import { auth } from "@/config/firebaseConfig";
import { signOut } from "firebase/auth";
interface LogoutUserProps {
    toast: any;
    removeUser: any;
    router: any;
}
export const logoutUser = async ({
    toast,
    removeUser,
    router,
}: LogoutUserProps) => {
    await signOut(auth)
        .then(() => {
            removeUser();
            toast({
                title: "Logged Out.",
                description: "Logout Successful!",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            router.replace("/login");
        })
        .catch(() => {
            toast({
                title: "Error",
                description: "Please try again later!",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        });
};
