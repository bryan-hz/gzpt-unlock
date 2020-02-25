import { SAVE_INPUT } from 'constants/preparation';

const initialState = {
  processorAddress: ''
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVE_INPUT: {
      return {
        ...state,
        processorAddress: payload
      };
    }

    default:
      return state;
  }
};
