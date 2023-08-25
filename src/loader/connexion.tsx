import DataUser from "../services/DataUser";

export const loaderUsers = async () => {
  const data = DataUser.getInstance();
  return data.loadUsers();
};