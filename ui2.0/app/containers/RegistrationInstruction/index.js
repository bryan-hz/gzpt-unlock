import React from 'react';
import { connect } from 'react-redux';
import RegistrationInstructionPage from 'components/RegistrationInstructionPage';

class RegistrationInstruction extends React.PureComponent {
  render() {
    return (
      <>
        <RegistrationInstructionPage />
      </>
    );
  }
}

export default connect()(RegistrationInstruction);
