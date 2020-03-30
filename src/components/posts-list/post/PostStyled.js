import styled from "styled-components";
import ContentEditable from "react-contenteditable";

export const WrapperPost = styled.div`
	display: flex;
	background-color: #fff;
	border: 1px solid #e6ecf0;
	position: relative;
`;

export const EditablePostMessage = styled(ContentEditable)`
	word-break: break-word;
	white-space: pre-wrap;
	border-radius: 15px;
	padding: 10px;
	margin-bottom: 10px;
	border: ${({ disabled }) => (disabled ? "none" : "2px dashed #bae0f9")};

	&:focus {
		outline: none;
	}
`;

export const ButtonDeletePost = styled.button`
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

export const ButtonEditPost = styled.span`
	position: absolute;
	bottom: 0;
	right: 0;
	color: gray;
	margin: 5px;
	cursor: pointer;

	> span {
		margin-left: 10px;
	}
`;
