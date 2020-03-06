import React from 'react';
import PropTypes from 'prop-types';
import _map from 'lodash/map';
import _keys from 'lodash/keys';

import Buttons from './Buttons';
import Links from './Links';

const PasswordPattern = ({ buttons, links }) => (
  <div>
    {[
      ..._map(buttons, button => Buttons[button]()),
      ..._map(links, link => Links[link]())
    ]}
  </div>
);

PasswordPattern.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.oneOf(_keys(Buttons))),
  links: PropTypes.arrayOf(PropTypes.oneOf(_keys(Links)))
};

PasswordPattern.defaultProps = {
  buttons: [],
  links: []
};

export default PasswordPattern;
