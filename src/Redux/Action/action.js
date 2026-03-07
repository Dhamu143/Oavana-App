export const RESET_APP = 'RESET_APP';

export const resetApp = () => ({
  type: RESET_APP,
});

export const SkipLogin = skiplogin => ({
  type: 'ADD_SKIP_LOGIN',
  skiplogin: skiplogin,
});

export const LoginSuceess = userLogin => ({
  type: 'ADD_USER_LOGIN',
  userLogin: userLogin,
});

export const AddRefCode = refCode => ({
  type: 'ADD_REF_CODE',
  refCode: refCode,
});
