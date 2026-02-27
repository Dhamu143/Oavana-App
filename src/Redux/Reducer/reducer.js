const initialState = {
  skiplogin: false,
};
export const allReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_APP':
      return initialState;
    case 'ADD_SKIP_LOGIN':
      return {
        ...state,
        skiplogin: action.skiplogin,
      };
  }
  return state;
};
export default allReducer;
