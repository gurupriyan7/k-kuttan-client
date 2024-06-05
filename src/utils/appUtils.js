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
