"use client";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import LoadingDisplay from "@/components/general/LoadingDisplay";
import useUser from "@/store/userStore";
import { logoutUser } from "@/firebaseFunctions/authentication/userLogout";
import { userLoginProtection } from "@/routeProtectors";
export default function LogoutPage() {
    const router = useRouter();
    const { user, removeUser } = useUser();
    const toast = useToast();
    const checkLogout = async () => {
        userLoginProtection(user, router);
        await logoutUser({ toast, removeUser, router });
    };
    useEffect(() => {
        checkLogout();
    }, []);

    return (
        <>
            <LoadingDisplay displayText="Logging out" width={60} />
        </>
    );
}
