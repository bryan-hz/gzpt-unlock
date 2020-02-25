import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Proptypes from 'prop-types';

import { saveInput as saveInputAction } from 'actions/preparation';
import { selectProcessorAddress } from 'selectors/preparation';
import messages from './messages';

const StyledForm = styled.form`
  position: absolute;
  top: 30%;
  left: 40%;
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  outline: none;
  display: block;
  width: 100%;
  padding: 7px;
  border: none;
  border-bottom: 1px solid #ddd;
  background: transparent;
  margin-bottom: 10px;
  font: 21px Arial, Helvetica, sans-serif;
  height: 45px;
  color: white;

  &::-webkit-input-placeholder {
    color: white;
    opacity: 60%;
  }
`;

export class Preparation extends Component {
  static propTypes = {
    saveInput: Proptypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    processorAddress: Proptypes.string.isRequired
  };

  render() {
    const { saveInput } = this.props;

    return (
      <div>
        <StyledForm>
          <p>{messages.input.instruction}</p>
          <StyledInput
            type="text"
            placeholder={messages.input.placeholder}
            onChange={saveInput}
          />
        </StyledForm>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  processorAddress: selectProcessorAddress(state)
});

const mapDispatchToProps = dispatch => ({
  saveInput: event => dispatch(saveInputAction(event.target.value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Preparation);
