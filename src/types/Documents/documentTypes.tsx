// for the file dropzone
export type DocumentEntry = {
    // temporary ID of file
    fileId: string;
    // relative path of file
    filePath: string;
    // initial of file
    name: string;
    // preview URL
    preview: string;
};

// record in realtime database
export type DocumentRecord = {
    // firebase generated
    id: string;

    // ==================file path==================
    // generated for firebase storage
    docId: string;

    // id of team/folder
    parentId: string;

    // =============================================

    // default file name
    fileName: string;

    // file extension
    fileExtension: string;

    // userId of uploader
    uploaderId: string;

    // inside the fireabse storage
    url: string;
};
