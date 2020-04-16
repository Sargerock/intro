import {setAlertError, signOut} from "../auth/auth-actions";

export const authInterceptor = ({dispatch}) => (next) => (action) => {
	if (!action.error) {
		next(action);
		return;
	}
	if(action.payload.message === "Network Error"){
		dispatch(setAlertError(action.payload.message));
		return;
	}
	if(action.payload.response?.status === 401) {
		dispatch(signOut());
	}
};