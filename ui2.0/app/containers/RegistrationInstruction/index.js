import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RegistrationInstructionPage from 'components/RegistrationInstructionPage';

import {
  selectActivateReadyButton,
  selectActivateGoBackButton
} from 'selectors/instruction';

import { resetInstructionStates } from 'actions/instruction';

class RegistrationInstruction extends React.PureComponent {
  static propTypes = {
    activateGoBackButton: PropTypes.bool.isRequired,
    activateReadyButton: PropTypes.bool.isRequired,

    resetStates: PropTypes.func.isRequired
  };

  componentWillUnmount() {
    const { resetStates } = this.props;
    resetStates();
  }

  render() {
    const { activateGoBackButton, activateReadyButton } = this.props;
    return (
      <div>
        <RegistrationInstructionPage
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

const mapDispatchToProps = dispatch => ({
  resetStates: () => dispatch(resetInstructionStates())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationInstruction);
