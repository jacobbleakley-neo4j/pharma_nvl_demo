export const SET_INITIAL_NODE_POSITIONS = 'SET_INITIAL_NODE_POSITIONS';
export const SET_VIEW_MODE = 'SET_VIEW_MODE';
export const SET_NODE_VIEW_IMG = 'SET_NODE_VIEW_IMG';

export const setViewMode = (viewMode) => ({
  type: SET_VIEW_MODE,
  payload: viewMode,
});

export const setInitialNodePositions = (positions) => ({
  type: SET_INITIAL_NODE_POSITIONS,
  payload: positions,
});


