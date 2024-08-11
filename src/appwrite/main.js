import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client;
    databases;
    bucket;

    constructor(){
        this.client = new Client()
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }
    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.error("Appwrite Service:: Create Error :: ", error);       
        }
    }
    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.error("Appwrite Service:: Update Error :: ", error);           
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.error("Appwrite Service:: Delete Error :: ", error);
            return false;
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.error("Appwrite Service:: Get Error :: ", error);
            return null;
        }
    }
    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.error("Appwrite Service:: Get Posts Error :: ", error);
            return null;
        }
    }
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.error("Appwrite Service:: Upload File Error :: ", error);
            return null;
        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId,
            )
            return true;
        } catch (error) {
            console.error("Appwrite Service:: Delete File Error :: ", error);
            return false;
        }
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId,
        )
    }
}

const service = new Service()
export default service