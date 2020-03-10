import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import PasswordPage from 'components/PasswordPage';
import PasswordPattern from 'components/PasswordPattern';
import {
  selectShowReenter,
  selectShowIncorrect,
  selectShowCorrect,
  selectActiveButtons,
  selectActiveLinks
} from 'selectors/password';


class PasswordEntry extends React.PureComponent {
  static propTypes = {
    showReenter: PropTypes.bool.isRequired,
    activeButtons: PropTypes.arrayOf(PropTypes.string).isRequired,
    activeLinks: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  render() {

    const { showReenter, showIncorrect, showCorrect, activeButtons, activeLinks} = this.props;
    return (
      <div>
        <PasswordPage showReenter={showReenter} />

        <PasswordPage showIncorrect={showIncorrect} />
        <PasswordPage showCorrect={showCorrect} />
        <PasswordPattern
          buttons={['1', '4', '3', '2']}
          links={['14', '43', '32']}
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
  activeButtons: selectActiveButtons(state),
  activeLinks: selectActiveLinks(state)
});

export default connect(mapStateToProps)(PasswordEntry);
