import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Linking,
  Alert,
} from 'react-native';
import Color from '../../Common/Color';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {LoginSuceess, SkipLogin} from '../../Redux/Action/action';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AlertModal from '../../Modal/AlertModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../../utils/ApiClient';
import SafeFastImage from '../../utils/SafeFastImage';
import appleAuth, {
  AppleButton,
  AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication';

const {width} = Dimensions.get('window');

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Enter valid email').required('Email is required'),

  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignInScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);

  const extractTokenFromUrl = url => {
    try {
      const parsedUrl = new URL(url);
      let token = parsedUrl.searchParams.get('token');
      if (token) return token;
      const hash = parsedUrl.hash;
      if (hash) {
        const match = hash.match(/token=([^&]+)/);
        return match ? match[1] : null;
      }

      return null;
    } catch (e) {
      //  console.warn('Error parsing token from URL:', e);
      return null;
    }
  };

  useEffect(() => {
    const handleDeepLink = async event => {
      try {
        //   console.log('Deep link event:', event);
        if (!event || !event.url) {
          //  console.log('No event.url found');
          return;
        }
        const token = extractTokenFromUrl(event.url);

        // console.log('Login With whatsapp Token', token);
      } catch (err) {
        //console.error('Error in handleDeepLink:', err);
      }
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);
    (async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        // console.log('App launched with URL:', initialUrl);
        const token = extractTokenFromUrl(initialUrl);
        //  console.log('Initial token:', token);
      }
    })();

    return () => {
      subscription.remove();
    };
  }, []);

  const handelSkipLogin = () => {
    dispatch(SkipLogin(true));
    navigation.replace('MaindashboardDrawer');
  };

  const socialIcons =
    Platform.OS === 'ios'
      ? [
          {type: 'google', icon: require('../../assets/images/google.png')},
          {
            type: 'apple',
            icon: require('../../assets/images/apple.png'),
            tint: Color.Placeholder,
          },
        ]
      : [
          {type: 'google', icon: require('../../assets/images/google.png')},
          {type: 'whatsapp', icon: require('../../assets/images/whatsapp.png')},
        ];

  const handleAppleLogin = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      if (!appleAuthRequestResponse.identityToken) {
        //   console.log('Apple Sign-In failed - no identity token returned');
        return;
      }

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
        // console.log('User is authorized');
      }
    } catch (err) {
      //   console.log('Apple login failed:', err);
    }
  };

  // const handalWhatsappLogin = async () => {
  //   const phoneNumber = '+15557720200';
  //   const message = 'Login';
  //   const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
  //     message,
  //   )}`;

  //   const canOpen = await Linking.canOpenURL(url);
  //   if (canOpen) {
  //     await Linking.openURL(url);
  //   } else {
  //     Alert.alert(
  //       'WhatsApp Not Installed',
  //       'Please install WhatsApp to continue.',
  //     );
  //   }
  // };

  const handalWhatsappLogin = async () => {
    const phoneNumber = '+15557720200';
    const message = 'Login';

    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message,
    )}`;
    const whatsappBusinessUrl = `whatsapp-business://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message,
    )}`;

    try {
      const canOpenWhatsapp = await Linking.canOpenURL(whatsappUrl);

      if (canOpenWhatsapp) {
        await Linking.openURL(whatsappUrl);
        return;
      }

      const canOpenBusiness = await Linking.canOpenURL(whatsappBusinessUrl);

      if (canOpenBusiness) {
        await Linking.openURL(whatsappBusinessUrl);
        return;
      }

      Alert.alert(
        'WhatsApp Not Installed',
        'Please install WhatsApp or WhatsApp Business to continue.',
      );
    } catch (error) {
      // console.log('WhatsApp open error:', error);
    }
  };

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validationSchema={SignInSchema}
      onSubmit={async (values, {resetForm}) => {
        try {
          setLoading(true);

          const deviceId = await AsyncStorage.getItem('deviceId');

          const response = await apiClient.post('/auth/signin', {
            email: values.email.toLowerCase(),
            password: values.password,
            deviceid: deviceId,
          });

          const message = response?.data?.message || 'Login success';
          const success = response?.data?.success || false;

          // console.log('response', response);

          if (success) {
            await AsyncStorage.setItem(
              'authToken',
              response?.data?.data?.token,
            );
            dispatch(LoginSuceess(true));
            setModalMessage(message);
            setModalSuccess(success);
            setModalVisible(true);
            resetForm();
          }
        } catch (error) {
          const message = error?.response?.data?.message || 'Login failed';

          setModalMessage(message);
          setModalSuccess(false);
          setModalVisible(true);
        } finally {
          setLoading(false);
        }
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <SafeAreaView style={{flex: 1, backgroundColor: Color.GREEN}}>
          <StatusBar backgroundColor={Color.GREEN} barStyle="light-content" />

          <View style={{flex: 1, backgroundColor: Color.WHITE}}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={{flex: 1}}>
              <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                showsVerticalScrollIndicator={false}>
                <View style={styles.greenHeader}>
                  <TouchableOpacity
                    style={styles.skipBtn}
                    onPress={handelSkipLogin}>
                    <Text style={styles.skipText}>Skip</Text>
                  </TouchableOpacity>

                  <SafeFastImage
                    source={require('../../assets/images/Logo_icon.png')}
                    style={styles.logo}
                  />

                  <Text style={styles.title}>
                    Sign in to your{'\n'}
                    <Text style={{fontWeight: '700'}}>Account</Text>
                  </Text>

                  <Text style={styles.subtitle}>
                    Enter your email and password to log in
                  </Text>
                </View>

                <View style={styles.card}>
                  <View style={styles.socialRow}>
                    {socialIcons.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.socialBtn}
                        onPress={() => {
                          if (item.type === 'google') {
                            //  console.log('Google login');
                          } else if (item.type === 'apple') {
                            handleAppleLogin();
                          } else if (item.type === 'whatsapp') {
                            handalWhatsappLogin();
                          }
                        }}>
                        <SafeFastImage
                          source={item.icon}
                          style={styles.socialIcon}
                          tintColor={item.tint}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>

                  <View style={styles.dividerRow}>
                    <View style={styles.line} />
                    <Text style={styles.orText}>Or login with</Text>
                    <View style={styles.line} />
                  </View>

                  <TextInput
                    placeholder="Loisbecket@gmail.com"
                    style={[
                      styles.input,
                      {
                        borderColor:
                          touched.email && errors.email
                            ? 'red'
                            : Color.boredrColor,
                      },
                    ]}
                    placeholderTextColor={Color.Placeholder}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                  />

                  {touched.email && errors.email && (
                    <Text style={[styles.errorText, {marginTop: 0}]}>
                      {errors.email}
                    </Text>
                  )}

                  <View
                    style={[
                      styles.passwordWrapper,
                      {
                        borderColor:
                          touched.password && errors.password
                            ? 'red'
                            : Color.boredrColor,
                      },
                    ]}>
                    <TextInput
                      placeholder="*******"
                      secureTextEntry={secure}
                      style={styles.passwordInput}
                      placeholderTextColor={Color.Placeholder}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                    />

                    <TouchableOpacity onPress={() => setSecure(!secure)}>
                      <SafeFastImage
                        source={
                          secure
                            ? require('../../assets/images/hide.png')
                            : require('../../assets/images/open.png')
                        }
                        style={styles.eyeIcon}
                        tintColor={Color.Placeholder}
                      />
                    </TouchableOpacity>
                  </View>

                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}

                  <TouchableOpacity
                    style={[styles.loginBtn, {opacity: loading ? 0.7 : 1}]}
                    onPress={handleSubmit}
                    disabled={loading}>
                    {loading ? (
                      <ActivityIndicator color={Color.WHITE} />
                    ) : (
                      <Text style={styles.loginText}>Log In</Text>
                    )}
                  </TouchableOpacity>

                  <View style={styles.signupRow}>
                    <Text style={styles.signupText}>
                      Don’t have an account?{' '}
                    </Text>

                    <TouchableOpacity
                      onPress={() => navigation.navigate('SignUpScreen')}>
                      <Text style={styles.signupLink}>Sign Up</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>

          <AlertModal
            visible={modalVisible}
            message={modalMessage}
            isSuccess={modalSuccess}
            isError={!modalSuccess}
            onClose={() => setModalVisible(false)}
            onClick={() => {
              setModalVisible(false);

              if (modalSuccess) {
                navigation.replace('MaindashboardDrawer');
              }
            }}
          />
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default SignInScreen;
const styles = StyleSheet.create({
  greenHeader: {
    backgroundColor: Color.GREEN,
    paddingTop: 10,
    paddingBottom: 180,
    alignItems: 'center',
  },

  skipBtn: {
    position: 'absolute',
    right: 20,
    top: 15,
  },

  skipText: {
    color: Color.WHITE,
    fontSize: 14,
    fontWeight: '400',
  },

  logo: {
    width: 42,
    height: 42,
    marginBottom: 20,
    marginTop: 30,
  },

  title: {
    fontSize: 30,
    color: Color.WHITE,
    textAlign: 'center',
    fontWeight: '600',
  },

  subtitle: {
    color: '#E6E6E6',
    marginTop: 10,
    fontSize: 14,
  },

  card: {
    marginTop: -140,
    alignSelf: 'center',
    width: width - 40,
    backgroundColor: Color.WHITE,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Color.boredrColor,
    marginBottom: 30,
  },

  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  socialBtn: {
    flex: 1,
    height: 55,
    marginHorizontal: 5,
    backgroundColor: Color.WHITE,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.boredrColor,
  },

  socialIcon: {
    width: 24,
    height: 24,
  },

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },

  orText: {
    marginHorizontal: 10,
    color: '#888',
    fontSize: 13,
  },

  input: {
    height: 55,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Color.boredrColor,
  },

  passwordWrapper: {
    height: 55,
    borderRadius: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Color.boredrColor,
  },

  passwordInput: {
    flex: 1,
  },

  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 18,
    alignItems: 'center',
  },

  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: Color.boredrColor,
    borderRadius: 3,
    marginRight: 8,
  },

  checkedBox: {
    backgroundColor: Color.GREEN,
  },

  rememberText: {
    fontSize: 14,
    color: '#666',
  },

  forgotText: {
    fontSize: 14,
    color: Color.GREEN,
    fontWeight: '600',
  },

  loginBtn: {
    height: 55,
    backgroundColor: Color.GREEN,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  loginText: {
    color: Color.WHITE,
    fontSize: 16,
    fontWeight: '600',
  },

  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  signupText: {
    fontSize: 14,
    color: '#777',
  },

  signupLink: {
    fontSize: 14,
    color: Color.GREEN,
    fontWeight: '600',
  },

  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
    marginTop: 4,
  },

  eyeIcon: {
    width: 22,
    height: 22,
  },
});
