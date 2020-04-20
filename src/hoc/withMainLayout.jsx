import React from "react";

import Navbar from "../components/Navbar";

import {MainWrapper} from "../components/styles";


const withMainLayout = (Component) => (props) => {
	return <>
		<Navbar/>
		<MainWrapper>
			<Component {...props}/>
		</MainWrapper>
	</>
};

export default withMainLayout;
