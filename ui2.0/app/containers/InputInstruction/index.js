import React from 'react';
import { connect } from 'react-redux';
import LoginInstructionPage from 'components/LoginInstructionPage';

class InputInstruction extends React.PureComponent {
  render() {
    return (
      <div>
        <LoginInstructionPage />
      </div>
    );
  }
}

export default connect()(InputInstruction);
