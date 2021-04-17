import axios from 'axios';

export const apiEndpoint = 'https://dev.svested.com/interview/api';

export default axios.create({
	baseURL: apiEndpoint,
});
