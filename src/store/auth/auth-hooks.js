import { useSelector } from "react-redux";

export const useProfile = () => {
	const userId = useSelector(state => state.auth.profile.userId);
	const userName = useSelector(state => state.auth.profile.userName);

	return { userId, userName };
};
