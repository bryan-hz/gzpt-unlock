import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CompletePage from 'components/CompletePage';

import { selectActivateLogoutButton } from 'selectors/complete';
import { resetCompleteStates } from 'actions/complete';

class Completed extends React.PureComponent {
  static propTypes = {
    activateLogoutButton: PropTypes.bool.isRequired,

    resetStates: PropTypes.func.isRequired
  };

  componentWillUnmount() {
    const { resetStates } = this.props;
    resetStates();
  }

  render() {
    const { activateLogoutButton } = this.props;
    return (
      <div>
        <CompletePage activateLogoutButton={activateLogoutButton} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activateLogoutButton: selectActivateLogoutButton(state)
});

const mapDispatchToProps = dispatch => ({
  resetStates: () => dispatch(resetCompleteStates())
});

export default connect(mapStateToProps, mapDispatchToProps)(Completed);
