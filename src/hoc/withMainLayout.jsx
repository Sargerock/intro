import React from "react";

import NavBar from "../components/NavBar";

import {MainWrapper} from "../components/styles";


const withMainLayout = (Component) => (props) => {
	return <>
		<NavBar/>
		<MainWrapper>
			<Component {...props}/>
		</MainWrapper>
	</>
};

export default withMainLayout;
