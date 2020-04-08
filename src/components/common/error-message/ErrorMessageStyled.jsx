import styled from "styled-components";

export const WrapperErrorMessage = styled.div`
	text-align: center;
	margin: ${({ margin }) => margin};
	border-radius: 3px;
	padding: 10px;
	border: ${({ withBorder }) => (withBorder ? "2px solid #ffb5b5" : "none")};
`;
