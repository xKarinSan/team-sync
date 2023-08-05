import { DocumentRecord } from "../Documents/documentTypes";

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

export type FolderRecord = {
    // name of folder
    // name as main (if new team)
    folderName: string;
    // date which folder is made
    createdDate: any;
    // children (other folders)
    children: Folder[];
    // files inside
    files: DocumentRecord[];
};
