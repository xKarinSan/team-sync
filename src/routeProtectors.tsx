import { User } from "./types/User/usertypes";
import { memmberInTeam } from "./firebaseFunctions/memberships/membershipGet";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
// kicks uer out to login page
export const userLoginProtection = (
    userId: string,
    router: AppRouterInstance
) => {
    if (!userId) {
        router.replace("/login");
    }
};

// redirects user to homepage if logged in
export const userLoggedProtection = (
    userId: string,
    router: AppRouterInstance
) => {
    if (userId) {
        router.replace("/home");
    }
};

// check if member belongs to team
export const isMemberProtection = async (
    userId: string,
    teamId: string,
    router: AppRouterInstance
) => {
    userLoginProtection(userId, router);
    const userIsMember = await memmberInTeam(teamId, userId);
    if (!userIsMember) {
        router.replace("/home");
    }
};
