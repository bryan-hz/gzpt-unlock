import React from 'react';
import { connect } from 'react-redux';
import PasswordPage from 'components/PasswordPage';
import PasswordPattern from 'components/PasswordPattern';
import { selectShowReenter } from 'selectors/password';

class PasswordEntry extends React.PureComponent {
  render() {
    const { showReenter } = this.props;

    return (
      <div>
        <PasswordPage showReenter={showReenter} />
        <PasswordPattern
          buttons={['1', '4', '3', '2']}
          links={['14', '43', '32']}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  showReenter: selectShowReenter(state)
});

export default connect(mapStateToProps)(PasswordEntry);
