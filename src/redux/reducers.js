import { combineReducers } from "redux";
import { SET_VIEW_MODE } from "./actions";
import { SET_NODE_POSITIONS } from "./actions";
import { SET_INITIAL_NODE_POSITIONS } from "./actions";

const initialState = {
  viewMode: "graph",
  initialNodePositions: {},
  nodePositions: {}
};

const viewModeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIEW_MODE:
      return {
        ...state,
        viewMode: action.payload,
      };
    default:
      return state;
  }
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

const initialNodePositionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIAL_NODE_POSITIONS:
      return {
        ...state,
        initialNodePositions: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  viewMode: viewModeReducer,
  nodePositions: nodePositionsReducer,
  initialNodePositions: initialNodePositionsReducer,
});
