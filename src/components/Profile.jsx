import React from "react";
import PropTypes from "prop-types";

import {
	BackgroundImageProfile,
	AvatarProfile,
	WrapperProfile,
	InnerWrapperProfile,
} from "./styles";

const Profile = ({profile}) => {
	const {userName, avatarUrl} = profile;

	return (
		<WrapperProfile>
			<BackgroundImageProfile
				src="https://via.placeholder.com/1200x200/f98506/FFFFFF"
				alt="profile background"
			/>
			<AvatarProfile
				src={process.env.REACT_APP_BASE_URL + avatarUrl}
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

Profile.propTypes = {
	profile: PropTypes.shape({
		userName: PropTypes.string,
		avatarUrl: PropTypes.string
	})
}

export default Profile;
