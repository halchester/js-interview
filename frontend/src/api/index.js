import axios from 'axios';

export const apiEndpoint = 'https://dev.svested.com/interview/api';
// const apiEndpoint = 'http://localhost:8000/api';

export default axios.create({
	baseURL: apiEndpoint,
});
