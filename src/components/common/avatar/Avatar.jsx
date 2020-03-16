import PropTypes from "prop-types";
import styled from "styled-components";

const Avatar = styled.img`
	border-radius: 50%;
	height: ${({ size }) => size}px;
	width: ${({ size }) => size}px;
	margin: ${({ margin }) => margin}px;
`;

Avatar.propTypes = {
	size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	margin: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

Avatar.defaultProps = {
	size: 80,
	margin: 10
};

export default Avatar;
