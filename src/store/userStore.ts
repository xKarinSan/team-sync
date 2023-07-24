import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useUser = create(
    persist(
        (set: any) => ({
            userId: "",
            username: "",
            profilePic: "",
            addUser: (userId: string, username: string, profilePic: string) =>
                set(() => ({
                    userId,
                    username,
                    profilePic,
                })),
            removeUser: () =>
                set(() => ({
                    userId: "",
                    username: "",
                    profilePic: "",
                })),
        }),
        {
            name: "loggedUser", // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        }
    )
);
export default useUser;
