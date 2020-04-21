import styled from "styled-components";
import PropTypes from "prop-types";
import {Field, Form} from "formik";
import Modal from "react-modal";
import {Link, NavLink} from "react-router-dom";

import Avatar from "components/common/Avatar";

export const MainWrapper = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	border-left: 1px solid #ececec;
	border-right: 1px solid #ececec;
	border-bottom: 1px solid #ececec;
	
`;

export const ButtonStyled = styled.button`
	width: ${({width}) => width};
	background-color: #6699ff;
	border: 2px solid #6699ff;
	color: #fff;
	font-weight: bolder;
	border-radius: 50px;
	padding: 7px 30px;
	cursor: pointer;
	margin: ${({margin}) => margin};
	align-self: ${({alignSelf}) => alignSelf};

	&:disabled {
		background-color: #bfe1fb;
		border: 2px solid #bfe1fb;
	}

	&:active {
		background-color: #acc6fb;
	}
`;

ButtonStyled.propTypes = {
	margin: PropTypes.string,
	width: PropTypes.string,
	alignSelf: PropTypes.string,
};
ButtonStyled.defaultProps = {
	margin: "0",
	width: "fit-content",
	alignSelf: "auto",
};

export const FieldStyled = styled(Field)`
	display: block;
	width: ${({width}) => width};
	margin: 5px 0;
	padding: 10px;
	border: 2px solid #bae0f9;
	border-radius: 15px;
`;

FieldStyled.propTypes = {
	width: PropTypes.string,
};
FieldStyled.defaultProps = {
	width: "auto",
};

export const FlexWrapper = styled.div`
	display: flex;
	align-items: center;
	width: ${({width}) => width};
	justify-content: ${({justifyContent}) => justifyContent};
`;

FlexWrapper.propTypes = {
	width: PropTypes.string,
	justifyContent: PropTypes.string,
};
FlexWrapper.defaultProps = {
	width: "auto",
	justifyContent: "flex-start",
};

export const ErrorMessages = styled.div`
	white-space: pre-wrap;
`;

export const ModalStyled = styled(Modal)`
	background-color: rgba(0, 0, 0, 0.5);
	position: fixed;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const WrapperSign = styled(MainWrapper)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 80vh;
`;

export const FormSign = styled(Form)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 400px;
`;

export const LinkSign = styled(Link)`
	text-decoration: none;
	color: #0195f6;
	
	&:hover{
		text-decoration: underline;
	}
`;

export const LinkNavBar = styled(NavLink)`
	margin: 0 5px;
	padding: 10px 20px;
	border-radius: 20px;
	transition: all 0.2s;
	
	&.active{
		font-weight: bold;
	}
	
	&:hover{
	  color: #0195f6;
	  background-color: #f3f3f3;
	}
`;

export const WrapperErrorMessage = styled.div`
	text-align: center;
	margin: ${({margin}) => margin};
	border-radius: 3px;
	padding: 10px;
	border: ${({withBorder}) => (withBorder ? "2px solid #ffb5b5" : "none")};
`;
WrapperErrorMessage.propTypes = {
	withBorder: PropTypes.bool,
};
WrapperErrorMessage.defaultProps = {
	withBorder: false,
};

export const LoaderWrapper = styled.div`
	text-align: center;

	& > img {
		height: ${({height}) => height};
	}
`;

export const WrapperNotFound = styled.div`
	height: 80vh;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const WrapperCreatePost = styled.div`
	display: flex;
	width: 100%;
	background-color: #e7f5fd;
	padding: 10px;
	border: 1px solid #e6ecf0;
`;

export const WrapperEditPost = styled(WrapperCreatePost)`
	width: 1200px;
`;

export const FormCreatePost = styled(Form)`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const ButtonCreatePost = styled(ButtonStyled)`
	align-self: flex-end;
`;

export const WrapperNavBar = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: 0 20px;
	align-items: center;
	height: 80px;
	background-color: #fff;
	border-bottom: 1px solid #c4c9cc;
`;

export const Logo = styled.img`
	height: 40px;
	margin: 10px;
	width: auto;
`;

export const WrapperProfile = styled.div`
	position: relative;
	background-color: #fff;
`;

export const InnerWrapperProfile = styled.div`
	padding: 0 40px 40px 40px;
`;

export const BackgroundImageProfile = styled.img`
	height: 200px;
	width: 100%;
	margin-bottom: 100px;
`;

export const AvatarProfile = styled(Avatar)`
	position: absolute;
	margin: 0;
	border: 4px solid #fff;
	top: ${({size}) => 200 - size / 2}px;
	left: 20px;
`;

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

export const NavBarProfile = styled.div`
	display: flex;
	justify-content: space-around;
	transition: all 0.2s;
	background-color: #fff;
`;

export const NavLinkProfile = styled(NavLink)`
	width: 100%;
	text-align: center;
	padding: 15px 0;
	border-bottom: 2px solid #fff;
	
	&.active{
		color: #0195f6;
		border-bottom: 2px solid #0195f6;
	}
	
	&:hover{
	  color: #0195f6;
	  background-color: #f3f3f3;
	}
`;

export const WrapperSettings = styled.div`
	padding: 50px 50px 200px 50px;
`;
