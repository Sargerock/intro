import axios from "axios";

const url = "http://localhost:3001";
const itemsPerFetch = 5;

export const Api = {
	createMessage: async post => {
		const result = await axios.post(`${url}/posts`, post);
		return result.data;
	},
	getMessages: async startPosition => {
		const result = await axios.get(
			`${url}/posts?_sort=timestamp&_order=desc&_start=${startPosition}&_limit=${itemsPerFetch}`
		);

		return {
			messages: result.data,
			totalMessages: result.headers["x-total-count"]
		};
	}
};
