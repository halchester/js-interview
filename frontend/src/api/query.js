import axios from '../api/index';
import { QueryClient } from 'react-query';

export const queryClient = new QueryClient();

export const getAllData = async () => {
	const response = await axios.get('/fetch');
	console.log(response);
};
