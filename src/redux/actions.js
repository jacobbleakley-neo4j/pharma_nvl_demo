// actions.js
export const SET_NODE_POSITIONS = 'SET_NODE_POSITIONS';

export const setNodePositions = (positions) => ({
  type: SET_NODE_POSITIONS,
  payload: positions,
});
