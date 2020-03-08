import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Line from 'images/line_0_0.svg';

const StyledLine = styled.img`
  position: absolute;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
`;

const Link0Degree = ({ left, top }) => (
  <StyledLine left={left} top={top} src={Line} alt="line" />
);

Link0Degree.propTypes = {
  left: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
};

export default Link0Degree;
