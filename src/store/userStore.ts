import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { User } from "../types/User/usertypes";

export const useUser = create(
    persist(
        (set) => ({
            user: null,
            addUser: (currUser: User) =>
                set(() => ({
                    user: currUser,
                })),
            removeUser: () =>
                set(() => ({
                    user: null,
                })),
        }),
        {
            name: "loggedUser", // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        }
    )
);
export default useUser;
