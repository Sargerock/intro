import React from "react";
import PropTypes from "prop-types";

import {
	BackgroundImageProfile,
	AvatarProfile,
	WrapperProfile,
	InnerWrapperProfile,
} from "./styles";

const UsersProfile = ({ userName }) => {
	return (
		<WrapperProfile>
			<BackgroundImageProfile
				src="https://via.placeholder.com/1200x200/f98506/FFFFFF"
				alt="profile background"
			/>
			<AvatarProfile
				src="https://via.placeholder.com/100"
				alt="avatar"
				size={120}
			/>
			<InnerWrapperProfile>
				<h2>{userName}</h2>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero,
					totam.
				</p>
			</InnerWrapperProfile>
		</WrapperProfile>
	);
};

UsersProfile.propTypes = {
	userName: PropTypes.string.isRequired,
};

export default UsersProfile;
