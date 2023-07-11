import { User } from "./types/User";

// kicks uer out to login page
export const userLoginProtection = (user: User, router) => {
    if (!user) {
        router.replace("/login");
    }
};

// redirects user to homepage if logged in
export const userLoggedProtection = (user: User, router) => {
    if (user) {
        router.replace("/home");
    }
};
