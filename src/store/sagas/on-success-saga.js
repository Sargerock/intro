import { saveTokens } from "../../utils";
import { SIGN_IN, SIGN_UP } from "../auth/auth-actions";

// eslint-disable-next-line
export default function* onSuccessSaga(response, action) {
	if (action.type === SIGN_IN || action.type === SIGN_UP) {
		saveTokens(response.data.accessToken, response.data.refreshToken);
	}
	return response;
}
