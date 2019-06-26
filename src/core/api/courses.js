import axios from 'axios';

const baseURL = 'https://trainings-management.firebaseio.com/courses';

export const getCourses = async () => {
  return axios.get(`${baseURL}.json`);
};

export const getCourse = async (courseId) => {
  return axios.get(`${baseURL}/${courseId}.json`);
};

export const addCourse = async (courseInfo) => {
  return axios.post(`${baseURL}.json`, courseInfo);
};

export const updateCourse = async (updatedCourse) => {
  return axios.put(`${baseURL}/${updatedCourse.courseId}.json`, { ...updatedCourse, courseId: updatedCourse.courseId});
}

export const deleteCourse = async (courseId) => {
  return axios.delete(`${baseURL}/${courseId}.json`);
}