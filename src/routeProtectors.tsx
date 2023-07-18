import { User } from "./types/User";
import { memmberInTeam } from "./firebaseFunctions/memberships/membershipGet";
import { Router } from "next/router";
// kicks uer out to login page
export const userLoginProtection = (user: User, router: Router) => {
    if (!user) {
        router.replace("/login");
    }
};

// redirects user to homepage if logged in
export const userLoggedProtection = (user: User, router: Router) => {
    if (user) {
        router.replace("/home");
    }
};

// check if member belongs to team
export const isMemberProtection = async (
    user: User,
    teamId: string,
    router: Router
) => {
    userLoginProtection(user, router);
    const { userId } = user;
    const userIsMember = await memmberInTeam(teamId, userId);
    if (!userIsMember) {
        router.replace("/home");
    }
};
