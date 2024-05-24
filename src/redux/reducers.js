// reducers.js
import { combineReducers } from 'redux';
import { SET_NODE_POSITIONS } from './actions';

const initialState = {
  nodePositions: {},
};

const nodePositionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NODE_POSITIONS:
      return {
        ...state,
        nodePositions: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  nodePositions: nodePositionsReducer,
});
