import React from 'react';
import PasswordpageIMG from 'images/password_page.svg';
import PasswordReenter from 'images/reenter_prompt.svg';
import PasswordInCorrect from 'images/password_incorrect_frame.svg';
import PasswordCorrect from 'images/password_correct_frame.svg';

import styled from 'styled-components';

const StyledPrompt = styled.img`
  position: absolute;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  opacity: ${props => (props.showReenter ? 100 : 0)}%;
  z-index: 999;
`;
const StyledIncorrect = styled.img`
  position: absolute;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  opacity: ${props => (props.showIncorrect ? 100 : 0)}%;
`;
const StyledCorrect = styled.img`
  position: absolute;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  opacity: ${props => (props.showCorrect ? 100 : 0)}%;
`;

export default ({ showReenter, showIncorrect, showCorrect }) => (
  <div>
    <StyledPrompt
      left={0}
      top={401}
      src={PasswordReenter}
      showReenter={showReenter}
      showIncorrect={showIncorrect}
      showCorrect={showCorrect}
      alt="password reenter"
    />
    <StyledIncorrect
      left={420}
      top={0}
      src={PasswordInCorrect}
      showReenter={showReenter}
      showIncorrect={showIncorrect}
      showCorrect={showCorrect}
      alt="password incorrect"
    />

    <StyledCorrect
      left={420}
      top={0}
      src={PasswordCorrect}
      showReenter={showReenter}
      showIncorrect={showIncorrect}
      showCorrect={showCorrect}
      alt="password correct"
    />
    <img src={PasswordpageIMG} alt="password entry" />
  </div>
);
