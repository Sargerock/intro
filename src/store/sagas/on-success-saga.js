import { saveToken, setAuthorizationHeader } from "utils";
import { SIGN_IN, SIGN_UP } from "store/auth/auth-actions";

export default function onSuccessSaga(response, action) {
	if (action.type === SIGN_IN || action.type === SIGN_UP) {
		const accessToken = response.data.accessToken;
		saveToken(accessToken, action.meta);
		setAuthorizationHeader(accessToken);
	}
	return response;
}
