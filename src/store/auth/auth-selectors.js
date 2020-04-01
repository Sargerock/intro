import { useSelector } from "react-redux";

export const useProfile = () => {
	return useSelector(state => state.auth.profile) || {};
};
export const useAuthorization = () => {
	return useSelector(state => state.auth);
};
