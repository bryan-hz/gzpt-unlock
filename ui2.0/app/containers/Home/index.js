import React from 'react';
import { connect } from 'react-redux';
import Homepage from 'components/Homepage';

class Home extends React.PureComponent {
  render() {
    return (
      <>
        <Homepage />
      </>
    );
  }
}

export default connect()(Home);
