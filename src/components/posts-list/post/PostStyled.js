import styled from "styled-components";

export const WrapperPost = styled.div`
	display: flex;
	background-color: #fff;
	border: 1px solid #e6ecf0;
	position: relative;
`;

export const PostMessage = styled.p`
	word-break: break-word;
	white-space: pre-wrap;
`;

export const ButtonPost = styled.button`
	position: absolute;
	top: 0;
	right: 0;
	height: 35px;
	width: 35px;
	margin: 5px;
	border: none;
	border-radius: 50%;
	background-color: #fff;

	&:hover {
		cursor: pointer;
		background-color: #bae0f9;
	}
`;
