/* eslint-disable react-hooks/rules-of-hooks */
import { path } from "../paths/paths";

export const setLocalStorage = async (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalStorageItem = (key) => {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
};

export const removeLocalStorage = async () => {
  await localStorage.clear();
};

export const errorMessage = (error) => {
  const message =
    error?.response?.data?.message || error?.message || error.toString();
  return message;
};

export const authCheck = async (error,isAdmin=false) => {
  console.log(error, "auth-check");
  if (error?.response?.status === 401) {
    await removeLocalStorage();
    if(isAdmin){

      window.location.href = path.admin;
    }else{

      window.location.href = path.auth;
    }
  }
};
