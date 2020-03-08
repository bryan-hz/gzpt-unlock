import React from 'react';
import PasswordpageIMG from 'images/password_page.svg';
import PasswordReenter from 'images/reenter_prompt.svg';
import styled from 'styled-components';

const StyledPrompt = styled.img`
  position: absolute;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  z-index: 999;
  opacity: ${props => props.opacity};
`;

export default ({ showReenter }) => (
  <div>
    <StyledPrompt
      left={0}
      top={401}
      opacity={showReenter}
      src={PasswordReenter}
      alt="password reenter"
    />
    <img src={PasswordpageIMG} alt="password entry" />
  </div>
);
