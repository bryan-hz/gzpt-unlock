import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PromptBG from 'images/password_incorrect.svg';

const StyledPrompt = styled.div`
  position: absolute;
  left: 0px;
  top: 401px;
  opacity: ${props => (props.show ? 100 : 0)}%;
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
  top: 91px;
`;

const PenaltyTimeMessage = styled(Message)`
  left: 1500px;
  top: 91px;
`;

const RejectPrompt = ({ show, remainingTrials, nextPenaltyTime }) => (
  <StyledPrompt show={show}>
    <RemainingTrialsMessage>{remainingTrials}</RemainingTrialsMessage>
    <PenaltyTimeMessage>{`${nextPenaltyTime} sec`}</PenaltyTimeMessage>
    <img src={PromptBG} alt="Reject Prompt" />
  </StyledPrompt>
);

RejectPrompt.propTypes = {
  show: PropTypes.bool.isRequired,
  remainingTrials: PropTypes.number.isRequired,
  nextPenaltyTime: PropTypes.number.isRequired
};

export default RejectPrompt;
