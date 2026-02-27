import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Color from '../../Common/Color';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SkipLogin} from '../../Redux/Action/action';
import {useDispatch} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AlertModal from '../../Modal/AlertModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../../utils/ApiClient';

const {width} = Dimensions.get('window');

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Enter valid email').required('Email is required'),

  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignUpScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [secure, setSecure] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handelSkipLogin = () => {
    dispatch(SkipLogin(true));
    navigation.replace('MaindashboardDrawer');
  };

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validationSchema={SignUpSchema}
      onSubmit={async (values, {resetForm}) => {
        try {
          setLoading(true);

          const deviceId = await AsyncStorage.getItem('deviceId');

          const response = await apiClient.post('/auth/register', {
            email: values?.email.toLowerCase(),
            password: values?.password,
            deviceid: deviceId,
          });

          const message = response?.data?.message || 'Success';
          const success = response?.data?.success || false;

          setModalMessage(message);
          setModalSuccess(success);
          setModalVisible(true);

          if (success) {
            resetForm();
          }
        } catch (error) {
          const message =
            error?.response?.data?.message || 'Something went wrong';

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
              style={{flex: 1}}
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
              <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                showsVerticalScrollIndicator={false}>
                <View style={styles.greenHeader}>
                  <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => navigation.goBack()}>
                    <FastImage
                      source={require('../../assets/images/leftArrow.png')}
                      style={styles.icon22}
                      resizeMode={FastImage.resizeMode.contain}
                      tintColor={Color.WHITE}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.skipBtn}
                    onPress={handelSkipLogin}>
                    <Text style={styles.skipText}>Skip</Text>
                  </TouchableOpacity>

                  <Text style={styles.title}>Sign Up</Text>

                  <Text style={styles.subtitle}>
                    Already have an account?{' '}
                    <Text
                      style={styles.loginLink}
                      onPress={() => navigation.goBack()}>
                      Log In
                    </Text>
                  </Text>
                </View>

                <View style={styles.card}>
                  <TextInput
                    placeholder="Loisbecket@gmail.com"
                    placeholderTextColor={Color.Placeholder}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    style={[
                      styles.input,
                      {
                        borderColor:
                          touched.email && errors.email
                            ? 'red'
                            : Color.boredrColor,
                      },
                    ]}
                  />

                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}

                  <View
                    style={[
                      styles.iconInput,
                      {
                        borderColor:
                          touched.password && errors.password
                            ? 'red'
                            : Color.boredrColor,
                        marginTop: 20,
                      },
                    ]}>
                    <TextInput
                      placeholder="*******"
                      placeholderTextColor={Color.Placeholder}
                      secureTextEntry={secure}
                      style={{flex: 1}}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                    />

                    <TouchableOpacity onPress={() => setSecure(!secure)}>
                      <FastImage
                        source={
                          secure
                            ? require('../../assets/images/hide.png')
                            : require('../../assets/images/open.png')
                        }
                        style={styles.icon22}
                        resizeMode={FastImage.resizeMode.contain}
                        tintColor={Color.Placeholder}
                      />
                    </TouchableOpacity>
                  </View>

                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}

                  <TouchableOpacity
                    style={[styles.signupBtn, {opacity: loading ? 0.7 : 1}]}
                    onPress={handleSubmit}
                    disabled={loading}>
                    {loading ? (
                      <ActivityIndicator color={Color.WHITE} size="small" />
                    ) : (
                      <Text style={styles.signupBtnText}>Sign Up</Text>
                    )}
                  </TouchableOpacity>

                  <View style={styles.dividerRow}>
                    <View style={styles.line} />
                    <Text style={styles.orText}>Or</Text>
                    <View style={styles.line} />
                  </View>

                  <TouchableOpacity style={styles.googleBtn}>
                    <FastImage
                      source={require('../../assets/images/google.png')}
                      style={styles.icon20}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                    <Text style={styles.googleText}>Sign up with Google</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.googleBtn, {marginTop: 15}]}>
                    <FastImage
                      source={require('../../assets/images/whatsapp.png')}
                      style={styles.icon20}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                    <Text style={styles.googleText}>Sign up with whatsapp</Text>
                  </TouchableOpacity>
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
                navigation.goBack();
              }
            }}
          />
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginTop: 5,
  },

  greenHeader: {
    backgroundColor: Color.GREEN,
    paddingTop: 60,
    paddingBottom: 260,
    alignItems: 'center',
  },

  backBtn: {
    position: 'absolute',
    left: 20,
    top: 30,
  },

  skipBtn: {
    position: 'absolute',
    right: 20,
    top: 30,
  },

  skipText: {
    color: Color.WHITE,
    fontSize: 14,
  },

  title: {
    fontSize: 30,
    color: Color.WHITE,
    fontWeight: '600',
  },

  subtitle: {
    marginTop: 8,
    color: '#E6E6E6',
  },

  loginLink: {
    textDecorationLine: 'underline',
    color: Color.WHITE,
    fontWeight: '500',
  },

  card: {
    marginTop: -220,
    alignSelf: 'center',
    width: width - 40,
    backgroundColor: Color.WHITE,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Color.boredrColor,
    marginBottom: 30,
  },

  input: {
    height: 55,
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: Color.boredrColor,
  },

  iconInput: {
    height: 55,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.boredrColor,
  },

  signupBtn: {
    height: 55,
    backgroundColor: Color.GREEN,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },

  signupBtnText: {
    color: Color.WHITE,
    fontSize: 16,
    fontWeight: '600',
  },

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
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

  googleBtn: {
    height: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Color.boredrColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  googleText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },

  icon22: {
    width: 22,
    height: 22,
  },

  icon20: {
    width: 25,
    height: 25,
  },
});
