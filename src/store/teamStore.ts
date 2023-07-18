import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useTeam = create(
    persist(
        (set) => ({
            teamId: null,
            teamName: null,
            creatorId: null,
            setTeam: (teamId: string, teamName: string, creatorId: string) =>
                set(() => ({
                    teamId,
                    teamName,
                    creatorId,
                })),
            removeTeam: () =>
                set(() => ({
                    teamId: null,
                    teamName: null,
                    creatorId: null,
                })),
        }),
        {
            name: "currentTeam", // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        }
    )
);
export default useTeam;
