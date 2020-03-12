import React from 'react';
import PropTypes from 'prop-types';
import CompletepageIMG from 'images/demo_complete.svg';
import LogoutButton from 'images/log_out_button.svg';

import styled from 'styled-components';

const StyledButton = styled.img`
  position: absolute;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  opacity: ${props => (props.showButton ? 100 : 0)}%;
  z-index: 999;
  transition-duration: 0.3s;
`;
const CompletePage = ({ activateLogoutButton }) => (
  <div>
    <img src={CompletepageIMG} alt="demo complete" />
    <StyledButton
      left={818}
      top={540}
      src={LogoutButton}
      showButton={activateLogoutButton}
      alt="active Log Out"
    />
  </div>
);

CompletePage.propTypes = {
  activateLogoutButton: PropTypes.bool.isRequired
};

export default CompletePage;
