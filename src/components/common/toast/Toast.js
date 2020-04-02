import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";

import { ToastWrapper, Title } from "./ToastStyled";

const Toast = props => {
	const { title, text, callback } = props;
	const element = document.createElement("div");
	element.id = "TOAST";

	useEffect(() => {
		console.log("here");
		document.body.appendChild(element);
		return () => {
			document.body.removeChild(element);
		};
	}, [element]);

	const onClickHandle = () => {
		callback();
		document.body.removeChild(element);
	};

	return createPortal(
		<ToastWrapper onClick={onClickHandle}>
			<Title>{title}</Title>
			<p>{text}</p>
		</ToastWrapper>,
		element
	);
};

Toast.propTypes = {
	title: PropTypes.string,
	text: PropTypes.string,
	callback: PropTypes.func
};

Toast.defaultProps = {
	title: "",
	text: "",
	callback: () => {}
};

export default Toast;
