import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginInstructionPage from 'components/LoginInstructionPage';

import {
  selectActivateReadyButton,
  selectActivateGoBackButton
} from 'selectors/loginInstruction';

class InputInstruction extends React.PureComponent {
  static propTypes = {
    activateGoBackButton: PropTypes.bool.isRequired,
    activateReadyButton: PropTypes.bool.isRequired
  };

  render() {
    const { activateGoBackButton, activateReadyButton } = this.props;
    return (
      <div>
        <LoginInstructionPage
          activateGoBackButton={activateGoBackButton}
          activateReadyButton={activateReadyButton}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activateGoBackButton: selectActivateGoBackButton(state),
  activateReadyButton: selectActivateReadyButton(state)
});

export default connect(mapStateToProps)(InputInstruction);
