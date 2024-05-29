const setLocalStorageItem = (key: string, value: unknown) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting localStorage item", error);
  }
};

const getLocalStorageItem = (key: string) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  } catch (error) {
    console.error("Error getting localStorage item", error);
  }
};
export { setLocalStorageItem, getLocalStorageItem };
