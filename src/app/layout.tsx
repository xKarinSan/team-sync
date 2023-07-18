"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "@/components/general/Navbar";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ChakraProvider
                    toastOptions={{
                        defaultOptions: { duration: 3000, isClosable: true },
                    }}
                >
                    <Navbar>{children}</Navbar>
                </ChakraProvider>
            </body>
        </html>
    );
}
