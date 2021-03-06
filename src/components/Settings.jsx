import React from 'react';

import ChangePassword from "./ChangePassword";

import {WrapperSettings} from "./styles";
import ChangeAvatar from "./ChangeAvatar";

const Settings = () => {
	return (
		<WrapperSettings>
			<ChangeAvatar/>
			<ChangePassword/>
		</WrapperSettings>
	);
};

export default Settings;
