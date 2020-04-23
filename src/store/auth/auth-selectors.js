import { useSelector } from "react-redux";

export const useAuthorization = () => {
	return useSelector(state => state.auth);
};
