export const RESET_APP = 'RESET_APP';

export const resetApp = () => ({
  type: RESET_APP,
});

export const SkipLogin = skiplogin => ({
  type: 'ADD_SKIP_LOGIN',
  skiplogin: skiplogin,
});

export const OnboardingScreenCheck = checkOnboardingScreen => ({
  type: 'CHECK_ONBOARDING_SCREEN',
  checkOnboardingScreen: checkOnboardingScreen,
});

export const LoginSuceess = userLogin => ({
  type: 'ADD_USER_LOGIN',
  userLogin: userLogin,
});

export const AddRefCode = refCode => ({
  type: 'ADD_REF_CODE',
  refCode: refCode,
});

export const addTokenAndRate = (tokenEarn, miningRate) => ({
  type: 'ADD_TOKEN_AND_RATE',
  tokenEarn: tokenEarn,
  miningRate: miningRate,
});

export const IsPledgeActive = (isPledgeActive, isMiningEnable) => ({
  type: 'CHECK_PLEDGE_ACTIVE',
  isPledgeActive: isPledgeActive,
  isMiningEnable: isMiningEnable,
});
