import React from "react";
import PropTypes from "prop-types";

import {
	BackgroundImage,
	AvatarProfile,
	WrapperProfile,
	InnerWrapper,
} from "./ProfileStyled";

const Profile = ({ userName }) => {
	return (
		<WrapperProfile>
			<BackgroundImage
				src="https://via.placeholder.com/1200x200/f98506/FFFFFF"
				alt="profile background"
			/>
			<AvatarProfile
				src="https://via.placeholder.com/100"
				alt="avatar"
				size={120}
			/>
			<InnerWrapper>
				<h2>{userName}</h2>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero,
					totam.
				</p>
			</InnerWrapper>
		</WrapperProfile>
	);
};

Profile.propTypes = {
	userName: PropTypes.string.isRequired,
};

export default Profile;
