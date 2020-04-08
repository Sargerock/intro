import styled from "styled-components";
import Avatar from "../common/avatar/Avatar";

export const WrapperProfile = styled.div`
	position: relative;
	background-color: #fff;
`;

export const InnerWrapper = styled.div`
	padding: 0 40px 40px 40px;
`;

export const BackgroundImage = styled.img`
	height: 200px;
	width: 100%;
	margin-bottom: 100px;
`;

export const AvatarProfile = styled(Avatar)`
	position: absolute;
	margin: 0;
	border: 4px solid #fff;
	top: ${({ size }) => 200 - size / 2}px;
	left: 20px;
`;
