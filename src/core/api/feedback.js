import axios from 'axios';

const baseURL = 'https://trainings-management.firebaseio.com/feedback';

export const postFeedbackFromTrainer = async (feedback) => {
  return axios.post(`${baseURL}/fromTrainers.json`, feedback);
};

export const postFeedbackFromParticipant = async (feedback) => {
    return axios.post(`${baseURL}/fromStudents.json`, feedback);
  };

export const getFeedback = async () => {
    return axios.get(`${baseURL}.json`)
}
