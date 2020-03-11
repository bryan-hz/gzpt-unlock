import React from 'react';
import PropTypes from 'prop-types';
import PasswordpageIMG from 'images/password_page.svg';
import PasswordReenter from 'images/reenter_prompt.svg';
import PasswordInCorrectFrame from 'images/password_incorrect_frame.svg';
import PasswordInCorrect from 'images/password_incorrect.svg';
import PasswordCorrectFrame from 'images/password_correct_frame.svg';
import PasswordCorrect from 'images/password_correct.svg';
import RegisterMismatch from 'images/register_missmatch.svg';

import styled from 'styled-components';

const StyledPrompt = styled.img`
  position: absolute;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  opacity: ${props => (props.showPrompt ? 100 : 0)}%;
  z-index: 999;
`;

const Message = styled.p`
  color: red;
  position: absolute;
  font-size: 50px;
  line-height: 56px;
  letter-spacing: -0.015em;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const RemainingTrialsMessage = styled(Message)`
  left: 890px;
  top: 493px;
  opacity: ${props => (props.showPrompt ? 100 : 0)}%;
  z-index: 999;
`;

const PenaltyTimeMessage = styled(Message)`
  left: 1500px;
  top: 493px;
  opacity: ${props => (props.showPrompt ? 100 : 0)}%;
  z-index: 999;
`;

const PasswordPage = ({
  showReenter,
  showIncorrect,
  showCorrect,
  showMismatch,
  remainingTrials,
  nextPenaltyTime
}) => (
  <div>
    <StyledPrompt
      left={0}
      top={401}
      src={PasswordReenter}
      showPrompt={showReenter}
      alt="password reenter"
    />
    <StyledPrompt
      left={413}
      top={-3}
      src={PasswordInCorrectFrame}
      showPrompt={showIncorrect || showMismatch}
      alt="password incorrect frame"
    />
    <StyledPrompt
      left={0}
      top={401}
      src={PasswordInCorrect}
      showPrompt={showIncorrect}
      alt="password incorrect"
    />
    <RemainingTrialsMessage showPrompt={showIncorrect}>
      {remainingTrials}
    </RemainingTrialsMessage>
    <PenaltyTimeMessage showPrompt={showIncorrect}>
      {' '}
      {`${nextPenaltyTime} sec`}
    </PenaltyTimeMessage>
    <StyledPrompt
      left={0}
      top={401}
      src={RegisterMismatch}
      showPrompt={showMismatch}
      alt="password mismatch"
    />
    <StyledPrompt
      left={413}
      top={-3}
      src={PasswordCorrectFrame}
      showPrompt={showCorrect}
      alt="password correct frame"
    />
    <StyledPrompt
      left={0}
      top={401}
      src={PasswordCorrect}
      showPrompt={showCorrect}
      alt="password correct"
    />
    <img src={PasswordpageIMG} alt="password entry" />
  </div>
);

PasswordPage.propTypes = {
  showReenter: PropTypes.bool.isRequired,
  showIncorrect: PropTypes.bool.isRequired,
  remainingTrials: PropTypes.number.isRequired,
  nextPenaltyTime: PropTypes.number.isRequired,
  showCorrect: PropTypes.bool.isRequired,
  showMismatch: PropTypes.bool.isRequired
};

export default PasswordPage;
