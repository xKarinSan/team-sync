"use client";
import React, { useState } from "react";
import {
    Box,
    Flex,
    Heading,
    Text,
    Button,
    Stack,
    Container,
    Input,
    Textarea,
    useColorModeValue,
    Icon,
} from "@chakra-ui/react";
import { BiLogoGithub } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";
import { KeyFeature } from "@/types/LandingPage/features";

import FirstPic from "../images/landing/FirstLandingImage.png";
import AboutMePic from "../images/landing/AboutMeImage.png";
import ContactMeImage from "../images/landing/ContactMeImage.png";

import MemberMgmt from "../images/landing/screenshots/MemberMgmt.png";
import DeadlineMgmt from "../images/landing/screenshots/DeadlineMgmt.png";
import VideoConference from "../images/landing/screenshots/VideoConference.png";
import TeamChat from "../images/landing/screenshots/TeamChat.png";
import DocumentsMgmt from "../images/landing/screenshots/DocumentsMgmt.png";

export default function Home() {
    const keyFeatures: KeyFeature[] = [
        {
            featureName: "Team Management",
            featureDesc:
                "Intuitive UI and functionality that allows you to manage your teammates and team activities on the fly!",
            featureImage: MemberMgmt,
        },
        {
            featureName: "Schedule Tracking",
            featureDesc:
                "All important deadlines and meetings organised neatly in one place! Do not worry about forgetting any important stuff!",
            featureImage: DeadlineMgmt,
        },
        {
            featureName: "Live Conferencing",
            featureDesc:
                "Members far apart from one another? No problem! You can conduct your meetings anytime and anywhere with video conferencing and realtime chats!",
            featureImage: VideoConference,
        },
        {
            featureName: "Real-time Team chats",
            featureDesc:
                "Not everyone can meet virtually? No problem! Stay tuned with your team with our real-time team chats!",
            featureImage: TeamChat,
        },
        {
            featureName: "Document Management",
            featureDesc:
                "Worried about where your documents go? Fret not! You can manage your project materials here, safe and sound!",
            featureImage: DocumentsMgmt,
        },
    ];

    return (
        <Box>
            <LandingPageSegment id="home">
                <Flex
                    margin="5px"
                    flexDirection={["column-reverse", null, "row"]}
                >
                    <Box
                        width={["90%", null, "45%"]}
                        display={"grid"}
                        margin="auto"
                    >
                        <Heading size="2xl">
                            Sync your team with{" "}
                            <Text as="span" color="#0239C8">
                                TeamSync
                            </Text>
                        </Heading>
                        <br />
                        <Text fontSize="lg">
                            With{" "}
                            <Text as="span" color="#0239C8">
                                TeamSync
                            </Text>
                            , you can enjoy quick and easy team collaboration
                            and delivery, followed by greater results and
                            enjoyment!
                        </Text>
                        <br />
                        <Link href="/register">
                            <Button
                                display={{ base: "none", md: "inline-flex" }}
                                fontSize={"sm"}
                                color={"white"}
                                bg={"#0239C8"}
                                borderRadius={"5px"}
                                _hover={{
                                    bg: "rgba(2, 57, 200, 0.3)",
                                }}
                                width="50%"
                            >
                                Sign Up
                            </Button>
                        </Link>
                        <br />
                        <Text fontWeight={"bold"} fontSize="sm">
                            *No credit card required
                        </Text>
                    </Box>
                    <Box
                        width={["90%", null, "45%"]}
                        display={"grid"}
                        margin="auto"
                    >
                        <Image src={FirstPic} alt="first pic" />
                    </Box>
                </Flex>
            </LandingPageSegment>
            <LandingPageSegment id="about">
                <Flex margin="5px" flexDirection={["column", null, "row"]}>
                    <Box
                        width={["90%", null, "30%"]}
                        display={"grid"}
                        margin="auto"
                    >
                        <Image src={AboutMePic} alt="about us" />
                    </Box>
                    <Box
                        width={["90%", null, "60%"]}
                        display={"grid"}
                        margin="auto"
                    >
                        <Heading color={"#0239C8"}>About Us</Heading>
                        <br />
                        <Text>
                            {" "}
                            We believe in the power of{" "}
                            <Text as="span" color="#0239C8">
                                collaboration
                            </Text>{" "}
                            and seamless{" "}
                            <Text as="span" color="#0239C8">
                                communication
                            </Text>{" "}
                            to unlock the full potential of group projects. Our
                            app streamlines teamwork, making project
                            coordination efficient and stress-free.{" "}
                        </Text>
                        <br />
                        <Text>
                            {" "}
                            With a{" "}
                            <Text as="span" color="#0239C8">
                                user-friendly
                            </Text>{" "}
                            platform, teams of all sizes and industries can
                            collaborate effortlessly, assign tasks, share ideas,
                            and track progress in real-time.
                        </Text>
                        <br />
                        <Text>
                            {" "}
                            TeamSync eliminates challenges like missed deadlines
                            and miscommunication, fostering a{" "}
                            <Text as="span" color="#0239C8">
                                harmonious work environment
                            </Text>{" "}
                            where every team member remains aligned towards the
                            common goal.
                        </Text>
                    </Box>
                </Flex>
            </LandingPageSegment>
            <LandingPageSegment id="features">
                <Heading color={"#0239C8"}>What We Offer</Heading>

                {keyFeatures.map((feature: KeyFeature, index) => {
                    const { featureName, featureDesc, featureImage } = feature;
                    return (
                        <KeyFeatureCard
                            key={index}
                            index={index}
                            featureName={featureName}
                            featureDesc={featureDesc}
                            featureImage={featureImage}
                        />
                    );
                })}
            </LandingPageSegment>
            <LandingPageSegment id="contact">
                <Flex flexDirection={["column", null, "row"]}>
                    <Box width={["90%", null, null, "65%"]} margin="auto">
                        <ContactUsForm />
                    </Box>
                    <Box width={["90%", null, null, "45%"]}>
                        <Image src={ContactMeImage} alt="Contact me" />
                    </Box>
                </Flex>
            </LandingPageSegment>{" "}
            <Footer />
        </Box>
    );
}

function LandingPageSegment({
    children,
    id,
}: {
    children: React.ReactNode;
    id: string;
}) {
    return (
        <Box width="90vw" margin="10px auto" id={id}>
            {children}
        </Box>
    );
}

function KeyFeatureCard({
    featureName,
    featureImage,
    featureDesc,
    index,
}: any) {
    return (
        <Box margin="10px auto" width="100%">
            <Flex
                flexDirection={[
                    "column-reverse",
                    null,
                    index % 2 == 0 ? "row" : "row-reverse",
                ]}
            >
                <Box width={["90%", null, "45%"]} margin="10px auto">
                    <Image src={featureImage} alt={featureName} />
                </Box>
                <Box width={["90%", null, "45%"]} margin="10px auto">
                    <Heading color="#0239C8" size="lg">
                        {featureName}
                    </Heading>
                    {/* <br /> */}
                    <Text fontSize="md">{featureDesc}</Text>
                </Box>
            </Flex>
        </Box>
    );
}

function ContactUsForm() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    return (
        <Stack
            bg={"gray.50"}
            rounded={"xl"}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
        >
            <Stack spacing={4}>
                <Heading
                    color={"#0239C8"}
                    lineHeight={1.1}
                    fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                >
                    Contact Us
                </Heading>

                <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
                    Have any questions? Feel free to drop us a message!
                </Text>
            </Stack>
            {/* <Box as={"form"} mt={10}> */}
            <Stack spacing={4}>
                <Input
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    placeholder="Name"
                    bg={"gray.100"}
                    border={0}
                    color={"gray.500"}
                    _placeholder={{
                        color: "gray.500",
                    }}
                />
                <Input
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    placeholder="example@email.com"
                    bg={"gray.100"}
                    border={0}
                    color={"gray.500"}
                    _placeholder={{
                        color: "gray.500",
                    }}
                />
                <Textarea
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                    placeholder="Enter your message"
                    bg={"gray.100"}
                    border={0}
                    color={"gray.500"}
                    _placeholder={{
                        color: "gray.500",
                    }}
                />
                <Button
                    fontFamily={"heading"}
                    mt={8}
                    w={"full"}
                    bgGradient="linear(to-r, rgba(2, 57, 200, 0.4),blue.400)"
                    color={"white"}
                    _hover={{
                        bgGradient:
                            "linear(to-r,  rgba(2, 57, 200, 0.4),blue.400)",
                        boxShadow: "md",
                    }}
                >
                    Submit
                </Button>
            </Stack>
        </Stack>
    );
}

function Footer() {
    const clickSourceCode = () => {
        window.open("https://github.com/xKarinSan/team-sync", "_blank");
    };
    return (
        <Box
            height="150px"
            bg="#0131AE"
            color={useColorModeValue("gray.700", "gray.200")}
            display={"grid"}
            alignContent={"end"}
        >
            <Box p={5}>
                <Heading
                    textAlign={"center"}
                    color="white"
                    fontWeight={"light"}
                    size={"md"}
                >
                    Done by{" "}
                    <Heading as="span" fontWeight={"normal"} size="md">
                        Siang Meng
                    </Heading>
                </Heading>
                <br />
                <Box display={"grid"} alignContent={"center"}>
                    <Link
                        href="https://github.com/xKarinSan/team-sync"
                        target="_blank"
                    >
                        <Heading
                            textAlign={"center"}
                            color="white"
                            fontWeight={"bold"}
                            size={"md"}
                        >
                            <Icon as={BiLogoGithub} /> Source Code
                        </Heading>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
}
