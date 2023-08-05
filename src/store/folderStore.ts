import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
const goBackFolder = (folders: any[], targetFolderId: string) => {
    const res: any = [];
    folders.forEach((folder) => {
        const { folderid } = folder;
        if (folderid === targetFolderId) {
            return res;
        }
    });
    return res;
};

export const useFolders = create(
    persist(
        (set: any) => ({
            folders: [],
            addFolder: (newFolderId: string, newFolderName: string) =>
                set((state: any) => ({
                    folders: [
                        ...state.folders,
                        { folderId: newFolderId, folderName: newFolderName },
                    ],
                })),
            removeFolder: (targetFolderId: string) =>
                set((state: any) => ({
                    folders: goBackFolder(state.folders, targetFolderId),
                })),
            clearFolders: () => {
                set(() => ({
                    folders: [],
                }));
            },
        }),
        {
            name: "currentFolders", // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        }
    )
);
export default useFolders;
