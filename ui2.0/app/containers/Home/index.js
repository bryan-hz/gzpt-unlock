import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Homepage from 'components/Homepage';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import LoginButton from 'images/log_in_button.svg';
import { selectLoadingLogin, selectLoadingReset } from 'selectors/home';

library.add(faCircleNotch);

const CircleNotch = () => (
  <FontAwesomeIcon
    icon="circle-notch"
    spin
    color="#9A9999"
    style={{
      position: 'absolute',
      top: '840px',
      left: '1500px',
      fontSize: '70px'
    }}
  />
);

const StyledCircleNotch = styled(CircleNotch)`
  position: absolute;
  top: 500px;
  left: 1500px;
  color: red;
`;

const StyledLoginButton = styled.img`
  position: absolute;
  top: 540px;
  left: 809px;
  opacity: ${props => (props.show ? 100 : 0)}%;
  transition-duration: 0.3s;
`;

class Home extends React.PureComponent {
  static propTypes = {
    loadingLogin: PropTypes.bool.isRequired,
    loadingReset: PropTypes.bool.isRequired
  };

  render() {
    const { loadingLogin, loadingReset } = this.props;
    return (
      <div>
        <Homepage />
        {loadingReset && <StyledCircleNotch />}
        <StyledLoginButton
          show={loadingLogin}
          src={LoginButton}
          alt="login button"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loadingLogin: selectLoadingLogin(state),
  loadingReset: selectLoadingReset(state)
});

export default connect(mapStateToProps)(Home);
