import { SET_INITIAL_NODE_POSITIONS } from "./actions";
import { SET_NODE_VIEW_IMG } from "./actions";
import { SET_VIEW_MODE } from "./actions";

const initialState = {
  initialNodePositions: {},
  nodeViewImg: true,
  viewMode: "graph",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIAL_NODE_POSITIONS:
      return {
        ...state,
        initialNodePositions: action.payload,
      };
    case SET_VIEW_MODE:
      return {
        ...state,
        viewMode: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
