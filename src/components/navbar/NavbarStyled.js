import styled from "styled-components";
import { MainWrapper } from "../common/styles";

export const WrapperNavbar = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: 0 20px;
	align-items: center;
	height: 80px;
	background-color: #fff;
	border-bottom: 1px solid #c4c9cc;
`;

export const FlexMainWrapper = styled(MainWrapper)`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const Logo = styled.img`
	height: 40px;
	margin: 10px;
	width: auto;
`;
