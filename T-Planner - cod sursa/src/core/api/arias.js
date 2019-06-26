import axios from 'axios';

const baseURL = 'https://trainings-management.firebaseio.com/arias';

export const getArias = async () => {
  return axios.get(`${baseURL}.json`);
};

export const getAria = async (ariaId) => {
  return axios.get(`${baseURL}/${ariaId}.json`);
};

export const addAria = async (ariaInfo) => {
  return axios.post(`${baseURL}.json`, ariaInfo);
};

export const updateAria = async (updatedAria) => {
  return axios.put(`${baseURL}/${updatedAria.ariaId}.json`, { ...updatedAria, ariaId: updatedAria.ariaId});
}
