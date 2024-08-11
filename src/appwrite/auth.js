import config from '../config/config.js'
import { Client, Account, ID } from 'appwrite'

export class AuthService{
    client;
    account;

    constructor(){
        this.client = new Client()
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique(),email, password, name);
            if(userAccount){
                this.login({email, password});
            }
            else {
                return userAccount;
            }
        }
        catch(error){
            throw error;
        }
    }
    async login({email, password}){
        try{
            return await this.account.createEmailPasswordSession(email, password);
        }
        catch(error){
            throw error;
        }
    }
    async getCurrentUser(){
        try{
            await this.account.get();
        }
        catch(error){
            throw error;
        }
        throw null;
    }
    async logout(){
        try {
            this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}
const authService = new AuthService()
export default authService
