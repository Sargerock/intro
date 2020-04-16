import React from "react";

import PostsList from "./PostsList";
import Navbar from "./Navbar";

import {MainWrapper} from "./styles";

const Notifications = () => {
	return <>
		<Navbar/>
		<MainWrapper>
			<PostsList/>
		</MainWrapper>
	</>
}

export default Notifications;
