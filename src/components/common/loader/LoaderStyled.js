import styled from "styled-components";

export const LoaderWrapper = styled.div`
	text-align: center;

	& > img {
		height: ${({ height }) => height};
	}
`;
