const initialState = {
  skiplogin: false,
  userLogin: false,
  refCode: '',
  tokenEarn: 0,
  miningRate: 0,
  isPledgeActive: false,
  isMiningEnable:false
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
    case "ADD_REF_CODE":
      return {
        ...state,
        refCode: action.refCode
      }
    case "ADD_TOKEN_AND_RATE":
      return {
        ...state,
        tokenEarn: action.tokenEarn,
        miningRate: action.miningRate
      }
    case "CHECK_PLEDGE_ACTIVE":
      return {
        ...state,
        isPledgeActive: action.isPledgeActive,
        isMiningEnable: action.isMiningEnable
      }
  }
  return state;
};
export default allReducer;
