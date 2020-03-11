import React from 'react';
import PropTypes from 'prop-types';
import InstructionPageIMG from 'images/instruction_page.svg';
import GoBackButton from 'images/go_back_button.svg';
import ReadyButton from 'images/i_am_ready_button.svg';
import InputDemoGIF from 'images/input_demo.gif';
import GIF from 'components/GIF';

import styled from 'styled-components';

const StyledButton = styled.img`
  position: absolute;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  opacity: ${props => (props.showButton ? 100 : 0)}%;
  z-index: 999;
  transition-duration: 0.3s;
`;

const LoginInstructionPage = ({
  activateGoBackButton,
  activateReadyButton
}) => (
  <div>
    <img src={InstructionPageIMG} alt="instruction page" />
    <GIF src={InputDemoGIF} alt="input demo gif" />
    <StyledButton
      left={89}
      top={823}
      src={GoBackButton}
      showButton={activateGoBackButton}
      alt="active Go Back"
    />
    <StyledButton
      left={1495}
      top={823}
      src={ReadyButton}
      showButton={activateReadyButton}
      alt="active I'm Ready"
    />
  </div>
);

LoginInstructionPage.propTypes = {
  activateGoBackButton: PropTypes.bool.isRequired,
  activateReadyButton: PropTypes.bool.isRequired
};

export default LoginInstructionPage;
