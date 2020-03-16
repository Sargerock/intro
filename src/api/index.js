import axios from "axios";

export const Api = {
	createPost: async post => {
		const result = await axios.post("http://localhost:3001/posts", post);
	}
};
