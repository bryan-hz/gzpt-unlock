import React from 'react';
import { connect } from 'react-redux';
import PasswordPage from 'components/PasswordPage';

class PasswordEntry extends React.PureComponent {
  render() {
    return (
      <>
        <PasswordPage />
      </>
    );
  }
}

export default connect()(PasswordEntry);
