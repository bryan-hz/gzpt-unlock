import React from 'react';
import PasswordpageIMG from 'images/password_page.svg';
import PasswordReenter from 'images/reenter_prompt.svg';
import styled from 'styled-components';

const StyledPrompt = styled.img`
  position: absolute;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  opacity: ${props => (props.showReenter ? 100 : 0)}%;
  z-index: 999;
  width: 100%;
`;

export default ({ showReenter }) => (
  <div>
    <StyledPrompt
      left={0}
      top={401}
      src={PasswordReenter}
      showReenter={showReenter}
      alt="password reenter"
    />
    <img src={PasswordpageIMG} alt="password entry" />
  </div>
);
