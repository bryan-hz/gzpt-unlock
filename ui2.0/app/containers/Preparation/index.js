/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import _isUndefined from 'lodash/isUndefined';
import {
  faSpinner,
  faCheckCircle,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import Proptypes from 'prop-types';

import {
  saveInput as saveInputAction,
  tryConnect as tryConnectAction
} from 'actions/preparation';
import {
  selectProcessorAddress,
  selectConnecting,
  selectVerified,
  selectCalibrationCountdown
} from 'selectors/preparation';
import messages from './messages';

library.add(faSpinner, faCheckCircle, faTimesCircle);

const Status = styled.div`
  display: inline-flex;
  opacity: 80%;
`;
const StatusMessage = styled.div`
  margin-left: 5px;
`;

const Spinner = () => <FontAwesomeIcon icon="spinner" spin />;
const ConnectingMessage = () => (
  <Status>
    <Spinner />
    <StatusMessage> {messages.input.status.connecting}</StatusMessage>
  </Status>
);

const SUCCESS_COLOR = '#7EC850';
const CheckCircle = () => (
  <FontAwesomeIcon icon="check-circle" style={{ color: SUCCESS_COLOR }} />
);
const VerifiedMessage = () => (
  <Status style={{ color: SUCCESS_COLOR }}>
    <CheckCircle />
    <StatusMessage style={{ color: SUCCESS_COLOR }}>
      {messages.input.status.verified}
    </StatusMessage>
  </Status>
);

const ERROR_COLOR = '#ff0022';
const TimeCircle = () => (
  <FontAwesomeIcon icon="times-circle" style={{ color: ERROR_COLOR }} />
);
const ErrorMessage = () => (
  <Status>
    <TimeCircle />
    <StatusMessage style={{ color: ERROR_COLOR }}>
      {messages.input.status.error}
    </StatusMessage>
  </Status>
);

// eslint-disable-next-line react/prop-types
const Instruction = ({ className }) => (
  <div style={{ marginTop: '5%' }} className={className}>
    <h3 style={{ marginLeft: '100px' }}> {messages.instruction.title}</h3>
    <div>{messages.instruction.body}</div>
    <h4 style={{ marginLeft: '40px' }}>{messages.instruction.footer}</h4>
  </div>
);

const StyledInstruction = styled(Instruction)`
  position: fixed;
  left: 37%;
  white-space: pre-line;
  line-height: 1.5;
`;

const Countdown = styled.div`
  font-size: 100px;
  margin-top: 5%;
`;

const StyledLog = styled.h1`
  margin-top: 8%;
  left: 39%;
  position: fixed;
  text-align: center;
`;

// eslint-disable-next-line react/prop-types
const SystemLog = ({ countdown }) => (
  <StyledLog>
    <div>{messages.calibration.instruction}</div>
    {!_isUndefined(countdown) && (
      <Countdown>{countdown || <Spinner />}</Countdown>
    )}
  </StyledLog>
);

const StyledForm = styled.form`
  position: absolute;
  top: ${props => (props.verified ? '10%' : '30%')};
  left: 40%;
  transition-duration: 2s;
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  outline: none;
  display: block;
  width: 100%;
  padding: 7px;
  border: none;
  border-bottom: 1px solid #ddd;
  background: transparent;
  margin-bottom: 10px;
  font: 21px Arial, Helvetica, sans-serif;
  height: 45px;
  color: white;

  &::-webkit-input-placeholder {
    color: white;
    opacity: 60%;
  }
`;

export class Preparation extends Component {
  static propTypes = {
    saveInput: Proptypes.func.isRequired,
    tryConnect: Proptypes.func.isRequired,
    processorAddress: Proptypes.string.isRequired,
    connecting: Proptypes.bool.isRequired,
    verified: Proptypes.bool,
    calibrationCountdown: Proptypes.number
  };

  render() {
    const {
      saveInput,
      calibrationCountdown,
      tryConnect,
      processorAddress,
      connecting,
      verified
    } = this.props;

    return (
      <div>
        <StyledForm
          onSubmit={event => {
            event.preventDefault();
            tryConnect(processorAddress);
          }}
          verified={verified}
        >
          <p>{messages.input.instruction}</p>
          <StyledInput
            type="text"
            placeholder={messages.input.placeholder}
            onChange={saveInput}
            disabled={connecting || verified}
            value={processorAddress}
          />
          {connecting && <ConnectingMessage />}
          {!_isUndefined(verified) &&
            (verified ? <VerifiedMessage /> : <ErrorMessage />)}
          {!verified ? (
            <StyledInstruction />
          ) : (
            <SystemLog countdown={calibrationCountdown} />
          )}
        </StyledForm>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  processorAddress: selectProcessorAddress(state),
  connecting: selectConnecting(state),
  verified: selectVerified(state),
  calibrationCountdown: selectCalibrationCountdown(state)
});

const mapDispatchToProps = dispatch => ({
  saveInput: event => dispatch(saveInputAction(event.target.value)),
  tryConnect: address => dispatch(tryConnectAction(address))
});

export default connect(mapStateToProps, mapDispatchToProps)(Preparation);
