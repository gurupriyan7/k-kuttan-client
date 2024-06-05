import axios from "axios"
import { appConfig } from "../config/appConfig";

const API = axios.create({ baseURL: appConfig.apiUrl });

export const logIn=(formdata)=>API.post("/user/login",formdata)
export const AuthorLogin=(formdata)=>API.post("/user/author/login",formdata)
export const signUp=(formdata)=>API.post("/user",formdata)
export const AuthorSignUp=(formdata)=>API.post("/user/author",formdata)