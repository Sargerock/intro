import styled from "styled-components";
import { animated } from "react-spring";

export const ToastOuterWrapper = styled.div`
	text-align: center;
	z-index: 1;
	position: absolute;
	top: 5px;
	left: 50%;
`;

export const ToastInnerWrapper = styled(animated.div)`
	position: relative;
	left: -50%;
	width: fit-content;
	padding: 10px 10px 1px 10px;
	background-color: #fff;
	box-shadow: 0 0 10px lightgrey;
	border-radius: 3px;
	cursor: pointer;
`;

export const Title = styled.h3`
	margin: 0;
`;
