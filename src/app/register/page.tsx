"use client";
import React from "react";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AuthenticationForm from "@/components/authentication/AuthenticationForm";
import { emailRegistration } from "@/firebaseFunctions/authentication/emailAuthentication";
import useUser from "@/store/userStore";
export default function Home() {
    const { addUser } = useUser();
    return (
        <Box>
            <AuthenticationForm
                isLogin={false}
                submitFunction={emailRegistration}
                setUser={addUser}
            />
        </Box>
    );
}
