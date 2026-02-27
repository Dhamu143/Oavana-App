const initialState = {
  skiplogin: false,
  userLogin: false,
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
    case 'ADD_USER_LOGIN':
      return {
        ...state,
        userLogin: action.userLogin,
      };
  }
  return state;
};
export default allReducer;
