const initialState = {};
export const allReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_APP':
      return initialState;
  }
  return state;
};
export default allReducer;
