export type folderEntry = {
    // name of folder
    folderName: string;
    // id of team
    teamId: string;
    // another folderId or folderName
    parentId: string;
    // userId of whoever that created it
    creatorId: string;
    // date which folder is created
    createdDate: any;
};

export interface Folder extends folderEntry {
    // database generated Id
    id: string;
}
