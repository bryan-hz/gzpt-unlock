import React from 'react';
import { connect } from 'react-redux';
import CompletePage from 'components/CompletePage';

class Completed extends React.PureComponent {
  render() {
    return (
      <>
        <CompletePage />
      </>
    );
  }
}

export default connect()(Completed);
