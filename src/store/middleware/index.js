import {setAlertMessage, signOut} from "../auth/auth-actions";

export const authInterceptor = ({dispatch}) => (next) => (action) => {
	if (!action.error) {
		return next(action);
	}
	if (action.payload.message === "Network Error") {
		dispatch(setAlertMessage(action.payload.message));
		return next(action);
	}
	if (action.payload.response?.status === 401) {
		return dispatch(signOut());
	}
	return next(action);
};