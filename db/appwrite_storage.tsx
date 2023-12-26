import { Client, ID, Storage } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6504c902cef3dc9b138c');

const storage = new Storage(client);

export class AppwriteStorageService {

    // upload file
    async uploadImage (pic:any) {
        try {
            const result = storage.createFile('650d2f3abd9c8148bda2', ID.unique(),pic);
            return result
        } catch (error) {
            console.log(error)
        }
    }

    // upload file
    async uploadProfile (pic:any) {
        try {
            const result = storage.createFile('658477e7eef2f71d1693', ID.unique(),pic);
            return result
        } catch (error) {
            console.log(error)
        }
    }


    // upload file
    async uploadGenerated (pic:any) {
        try {
            const result = storage.createFile('6584a911a70baf1b4a58', ID.unique(),pic);
            return result
        } catch (error) {
            console.log(error)
        }
    }
    

    // view file
    async viewFile (view:{bucket:string,id:string}) {
        try {
            const result = storage.getFileView(view.bucket, view.id);
            return result
        } catch (error) {
            console.log(error)
        }
    }


    // view file
    async previewFile (view:{bucket:string,id:string}) {
        try {
            const result = storage.getFilePreview(view.bucket, view.id);
            return result
        } catch (error) {
            console.log(error)
        }
    }
    
    // download file
    async downloadFile () {
        try {
            const result = storage.getFileDownload('650d2f3abd9c8148bda2', '650d2ffc5182a242dd32');
            console.log(result)
            return result
        } catch (error) {
            console.log(error)
        }
    }

}

const appwriteStorageService = new AppwriteStorageService

export default appwriteStorageService