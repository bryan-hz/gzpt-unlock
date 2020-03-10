import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import PasswordPage from 'components/PasswordPage';
import PasswordPattern from 'components/PasswordPattern';
<<<<<<< HEAD
import {
  selectShowReenter,
  selectShowIncorrect,
  selectActiveButtons,
  selectActiveLinks
} from 'selectors/password';
=======
import { selectShowReenter, selectShowIncorrect, selectShowCorrect } from 'selectors/password';
>>>>>>> Task: Add two frames for correct and incorrect pw state

class PasswordEntry extends React.PureComponent {
  static propTypes = {
    showReenter: PropTypes.bool.isRequired,
    activeButtons: PropTypes.arrayOf(PropTypes.string).isRequired,
    activeLinks: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  render() {
    const { showReenter, showCorrect, showIncorrect, activeButtons, activeLinks } = this.props;

    return (
      <div>
        <PasswordPage showReenter={showReenter} />
        <PasswordPage showIncorrect={showIncorrect} />
        <PasswordPage showCorrect={showCorrect} />
        <PasswordPattern buttons={activeButtons} links={activeLinks} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  showReenter: selectShowReenter(state),
  activeButtons: selectActiveButtons(state),
  activeLinks: selectActiveLinks(state),
  showIncorrect: selectShowIncorrect(state),
  showCorrect: selectShowCorrect(state)
});

export default connect(mapStateToProps)(PasswordEntry);
