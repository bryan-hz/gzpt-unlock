import React from 'react';
import styled from 'styled-components';

const StyledImg = styled.img`
  position: absolute;
  width: 1184px;
  height: 835px;
  left: 370px;
  top: 22px;
`;

// eslint-disable-next-line react/prop-types
export default ({ src, alt = 'default' }) => <StyledImg src={src} alt={alt} />;
