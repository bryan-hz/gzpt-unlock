import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Circle from 'images/enter_circle.svg';

const StyledButton = styled.img`
  position: absolute;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  height: 186px;
  width: 186px;
`;

const Button = ({ left, top }) => (
  <StyledButton left={left} top={top} src={Circle} alt="circle" />
);

Button.propTypes = {
  left: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
};

export default Button;
