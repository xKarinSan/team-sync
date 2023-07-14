import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useTeam = create(
    persist(
        (set) => ({
            teamId: null,
            addTeam: (teamId: string) =>
                set(() => ({
                    teamId: teamId,
                })),
            removeTeam: () =>
                set(() => ({
                    teamId: null,
                })),
        }),
        {
            name: "currentTeam", // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        }
    )
);
export default useTeam;
