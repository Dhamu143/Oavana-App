import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Color from '../Common/Color';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AlertModal from '../Modal/AlertModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../utils/ApiClient';
import { useDispatch } from 'react-redux';
import { LoginSuceess } from '../Redux/Action/action';
import SafeFastImage from '../utils/SafeFastImage';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Enter valid email').required('Email is required'),

  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignInContent = ({ onSwitch, onClose }) => {
  const dispatch = useDispatch();

  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);

  const socialIcons =
    Platform.OS === 'ios'
      ? [
        {
          icon: require('../assets/images/google.png'),
        },
        {
          icon: require('../assets/images/apple.png'),
          tint: Color.Placeholder,
        },
      ]
      : [
        {
          icon: require('../assets/images/google.png'),
        },
        {
          icon: require('../assets/images/whatsapp.png'),
        },
      ];

  const handleLogin = async (values, resetForm) => {
    try {
      setLoading(true);

      const deviceId = await AsyncStorage.getItem('deviceId');

      const response = await apiClient.post('/auth/signin', {
        email: values.email.toLowerCase(),
        password: values.password,
        deviceid: deviceId,
      });

      const success = response?.data?.success || false;
      const message = response?.data?.message || 'Login success';

      if (success) {
        await AsyncStorage.setItem('authToken', response?.data?.data?.token);

        dispatch(LoginSuceess(true));

        setModalMessage(message);
        setModalSuccess(true);
        setModalVisible(true);

        resetForm();
      } else {
        setModalMessage(message);
        setModalSuccess(false);
        setModalVisible(true);
      }
    } catch (error) {
      const message = error?.response?.data?.message || 'Login failed';

      setModalMessage(message);
      setModalSuccess(false);
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={SignInSchema}
      onSubmit={(values, { resetForm }) => handleLogin(values, resetForm)}>
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          <SafeFastImage
            source={require('../assets/images/Logo1.png')}
            style={styles.logo}
          />

          <Text style={styles.title}>
            Sign in to your{'\n'}
            <Text style={{ fontWeight: '700' }}>Account</Text>
          </Text>

          <Text style={styles.subtitle}>
            Enter your email and password to log in
          </Text>

          <View style={styles.socialRow}>
            {socialIcons.map((item, index) => (
              <TouchableOpacity key={index} style={styles.socialBtn}>
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
            placeholder="Enter email"
            placeholderTextColor={Color.Placeholder}
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            style={[
              styles.input,
              {
                borderColor:
                  touched.email && errors.email ? 'red' : Color.boredrColor,
              },
            ]}
          />

          {touched.email && errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
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
              placeholder="Enter password"
              placeholderTextColor={Color.Placeholder}
              secureTextEntry={secure}
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              style={styles.passwordInput}
            />

            <TouchableOpacity onPress={() => setSecure(!secure)}>
              <SafeFastImage
                source={
                  secure
                    ? require('../assets/images/hide.png')
                    : require('../assets/images/open.png')
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
            style={[styles.loginBtn, { opacity: loading ? 0.7 : 1 }]}
            onPress={handleSubmit}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color={Color.WHITE} />
            ) : (
              <Text style={styles.loginText}>Log In</Text>
            )}
          </TouchableOpacity>

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Don’t have an account?</Text>

            <TouchableOpacity onPress={onSwitch}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
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
                onClose();
              }
            }}
          />
        </View>
      )}
    </Formik>
  );
};

export default SignInContent;
const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },

  closeBtn: {
    position: 'absolute',
    right: 20,
    top: 0,
    zIndex: 10,
  },

  closeText: {
    fontSize: 18,
    color: '#333',
  },

  logo: {
    width: 42,
    height: 42,
    marginVertical: 20,
    alignSelf: 'center',
  },

  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '600',
    color: Color.BLACK,
  },

  subtitle: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
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
    backgroundColor: '#E5E5E5',
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
    borderColor: '#ccc',
    borderRadius: 4,
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

  eyeIcon: {
    width: 22,
    height: 22,
  },

  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
    marginTop: 4,
  },
});
