import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CompletePage from 'components/CompletePage';

import { selectActivateLogoutButton } from 'selectors/complete';

class Completed extends React.PureComponent {
  static propTypes = {
    activateLogoutButton: PropTypes.bool.isRequired
  };

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

export default connect(mapStateToProps)(Completed);
