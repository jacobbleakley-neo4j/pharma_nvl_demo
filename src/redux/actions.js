export const SET_NODE_POSITIONS = 'SET_NODE_POSITIONS';
export const SET_INITIAL_NODE_POSITIONS = 'SET_INITIAL_NODE_POSITIONS';
export const SET_VIEW_MODE = 'SET_VIEW_MODE';

export const setViewMode = (viewMode) => ({
  type: SET_VIEW_MODE,
  payload: viewMode,
});

export const setTempNodePositions = (positions) => ({
  type: SET_NODE_POSITIONS,
  payload: positions,
});

export const setInitialNodePositions = (positions) => ({
  type: SET_INITIAL_NODE_POSITIONS,
  payload: positions,
});
