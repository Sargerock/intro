import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { useSpring } from "react-spring";

import { Title, ToastOuterWrapper, ToastInnerWrapper } from "./ToastStyled";

const Toast = props => {
	const { title, text, callback } = props;
	const element = document.createElement("div");
	element.id = "TOAST";

	const animation = useSpring({ top: "5px", from: { top: "-100px" } });

	useEffect(() => {
		document.body.appendChild(element);
		return () => {
			document.body.removeChild(element);
		};
	}, [element]);

	const onClickHandle = async e => {
		callback();
		document.body.removeChild(element);
	};

	return createPortal(
		<ToastOuterWrapper>
			<ToastInnerWrapper style={animation} onClick={onClickHandle}>
				<Title>{title}</Title>
				<p>{text}</p>
			</ToastInnerWrapper>
		</ToastOuterWrapper>,
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
