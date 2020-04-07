import React from "react";
import PropTypes from "prop-types";

import {
	BackgroundImage,
	AvatarProfile,
	WrapperProfile,
	InnerWrapper,
} from "./ProfileStyled";

const Profile = (props) => {
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
				<h2>Name</h2>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero,
					totam.
				</p>
			</InnerWrapper>
		</WrapperProfile>
	);
};

Profile.propTypes = {};

export default Profile;
