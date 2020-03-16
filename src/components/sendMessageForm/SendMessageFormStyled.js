import styled from "styled-components";

export default styled.div`
	display: flex;
	background-color: #e7f5fd;
	padding: 10px;
	border: 1px solid #e6ecf0;

	& form {
		display: flex;
		flex-direction: column;
		width: 100%;

		> input,
		textarea {
			display: block;
			margin: 5px 0;
			padding: 10px;
			border: 2px solid #bae0f9;
			border-radius: 15px;
		}

		> input {
			width: 200px;
		}

		> textarea {
			height: 70px;
			resize: none;
		}

		> button {
			align-self: flex-end;
		}
	}
`;
