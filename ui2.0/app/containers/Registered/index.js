import React from 'react';
import { connect } from 'react-redux';
import RegisteredPage from 'components/RegisteredPage';

class Registered extends React.PureComponent {
  render() {
    return (
      <>
        <RegisteredPage />
      </>
    );
  }
}

export default connect()(Registered);
