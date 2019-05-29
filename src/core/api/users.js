import axios from 'axios';

const baseURL = 'https://trainings-management.firebaseio.com/users';

export const getAllUsers = async () => {
  return axios.get(`${baseURL}.json`);
};

export const getUser = async (uid) => {
  return axios.get(`${baseURL}/${uid}.json`);
};

export const updateUser = async (updatedUser) => {
 console.log(updatedUser);
 return axios.put(`${baseURL}/${updatedUser.uid}.json`, updatedUser);
}
