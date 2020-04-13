import styled from "styled-components";

export const WrapperPost = styled.div`
	display: flex;
	background-color: #fff;
	border: 1px solid #e6ecf0;
	position: relative;
`;

export const PostBody = styled.div`
	width: 100%;
	padding: 10px;
`;

export const PostMessage = styled.div`
	word-break: break-word;
	white-space: pre-wrap;
	margin-bottom: 40px;
	margin-right: 40px;
	padding: 10px 0;

	a {
		color: #5f55af;
	}
`;
