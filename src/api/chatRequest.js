import axios from "axios"
import { appConfig } from "../config/appConfig";

const API = axios.create({ baseURL: appConfig.apiUrl });

// export const userChats=(id)=>API. 
