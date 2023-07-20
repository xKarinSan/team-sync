"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import { useEffect, useState } from "react";
// ==========================import from next==========================
import { Inter } from "next/font/google";
import { useRouter, usePathname } from "next/navigation";

// ==========================import state management==========================
import useUser from "@/store/userStore";
import useTeam from "@/store/teamStore";

// ==========================import chakraui components==========================
import { ChakraProvider } from "@chakra-ui/react";

// ==========================import custom components==========================
import Navbar from "@/components/general/Navbar";

// ==========================import external functions==========================
import {
    isMemberProtection,
    userLoggedProtection,
    userLoginProtection,
} from "@/routeProtectors";
import LoadingDisplay from "@/components/general/LoadingDisplay";
// ==========================import external variables==========================

// ==========================import types/interfaces==========================

// ==========================etc==========================

import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

// ===================================main component===================================
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathName = usePathname();
    const router = useRouter();
    const { userId } = useUser();
    const { teamId } = useTeam();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        // at homepage
        if (
            pathName !== "/" &&
            pathName != "/register" &&
            pathName != "/login"
        ) {
            userLoginProtection(userId, router);
        }
        // at login or register
        if (pathName === "/register" || pathName === "/login") {
            userLoggedProtection(userId, router);
        }
        // at any team-related
        if (pathName.includes("/team/")) {
            isMemberProtection(userId, teamId, router);
        }

        setLoading(false);
    }, [userId, pathName]);
    return (
        <html lang="en">
            <body className={inter.className}>
                <ChakraProvider
                    toastOptions={{
                        defaultOptions: { duration: 3000, isClosable: true },
                    }}
                >
                    <Navbar>
                        {loading ? <LoadingDisplay /> : <>{children}</>}
                    </Navbar>
                </ChakraProvider>
            </body>
        </html>
    );
}
