import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// type TeamStorage = {
//     teamId: string;
//     teamName: string;
//     creatorId: string;
// };
export const useTeam = create(
    persist(
        // <TeamStorage>
        (set: any) => ({
            teamId: "",
            teamName: "",
            creatorId: "",
            setTeam: (teamId: string, teamName: string, creatorId: string) =>
                set(() => ({
                    teamId,
                    teamName,
                    creatorId,
                })),
            removeTeam: () =>
                set(() => ({
                    teamId: "",
                    teamName: "",
                    creatorId: "",
                })),
        }),
        {
            name: "currentTeam", // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        }
    )
);
export default useTeam;
