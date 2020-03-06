import React from 'react';
import { connect } from 'react-redux';
import PasswordPage from 'components/PasswordPage';
import PasswordPattern from 'components/PasswordPattern';

class PasswordEntry extends React.PureComponent {
  render() {
    return (
      <div>
        <PasswordPage />
        <PasswordPattern
          buttons={['1', '4', '3', '2']}
          links={['14', '43', '32']}
        />
      </div>
    );
  }
}

export default connect()(PasswordEntry);
