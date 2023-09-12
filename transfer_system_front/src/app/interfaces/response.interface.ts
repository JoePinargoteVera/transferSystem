import { LoginI } from "./login.interface";
import { UserI } from "./user.interface";

export interface ResponseI{
    status:string;
    user:UserI;
    token:string;
}