import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import PasswordPage from 'components/PasswordPage';
import PasswordPattern from 'components/PasswordPattern';
import {
  selectShowReenter,
  selectShowIncorrect,
  selectShowCorrect,
  selectShowMismatch,
  selectActiveButtons,
  selectActiveLinks
} from 'selectors/password';

class PasswordEntry extends React.PureComponent {
  static propTypes = {
    showReenter: PropTypes.bool.isRequired,
    showIncorrect: PropTypes.bool.isRequired,
    showCorrect: PropTypes.bool.isRequired,
    showMismatch: PropTypes.bool.isRequired,
    activeButtons: PropTypes.arrayOf(PropTypes.string).isRequired,
    activeLinks: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  render() {
    const {
      showReenter,
      showIncorrect,
      showCorrect,
      showMismatch,
      activeButtons,
      activeLinks
    } = this.props;
    return (
      <div>
        <PasswordPage
          showReenter={showReenter}
          showIncorrect={showIncorrect}
          showCorrect={showCorrect}
          showMismatch={showMismatch}
        />
        <PasswordPattern buttons={activeButtons} links={activeLinks} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  showReenter: selectShowReenter(state),
  showIncorrect: selectShowIncorrect(state),
  showCorrect: selectShowCorrect(state),
  showMismatch: selectShowMismatch(state),
  activeButtons: selectActiveButtons(state),
  activeLinks: selectActiveLinks(state)
});

export default connect(mapStateToProps)(PasswordEntry);
