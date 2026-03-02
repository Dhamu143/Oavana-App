import React, { useState } from 'react';
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
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import Color from '../Common/Color';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AlertModal from '../Modal/AlertModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../utils/ApiClient';
import SafeFastImage from '../utils/SafeFastImage';

const { width } = Dimensions.get('window');

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Enter valid email').required('Email is required'),

  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignUpContent = ({ onSwitch, onClose }) => {
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);

  const handleSignUp = async (values, resetForm) => {
    try {
      setLoading(true);

      const deviceId = await AsyncStorage.getItem('deviceId');

      const response = await apiClient.post('/auth/register', {
        email: values.email.toLowerCase(),
        password: values.password,
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
      const message = error?.response?.data?.message || 'Something went wrong';

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
      validationSchema={SignUpSchema}
      onSubmit={(values, { resetForm }) => handleSignUp(values, resetForm)}>
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ width: '100%' }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ paddingBottom: 30 }}>
              <TouchableOpacity style={styles.backBtn} onPress={onSwitch}>
                <SafeFastImage
                  source={require('../assets/images/leftArrow.png')}
                  style={styles.backIcon}
                />

              </TouchableOpacity>

              <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                <Text style={styles.headerIcon}>✕</Text>
              </TouchableOpacity>

              <SafeFastImage
                source={require('../assets/images/Logo1.png')}
                style={styles.logo}
              />

              <Text style={styles.title}>Sign Up</Text>

              <Text style={styles.subtitle}>
                Already have an account?{' '}
                <Text style={styles.loginLink} onPress={onSwitch}>
                  Log In
                </Text>
              </Text>

              <TextInput
                placeholder="Enter email"
                placeholderTextColor={Color.Placeholder}
                style={[
                  styles.input,
                  {
                    borderColor:
                      touched.email && errors.email ? 'red' : Color.boredrColor,
                  },
                ]}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
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
                  },
                ]}>
                <TextInput
                  placeholder="Enter password"
                  placeholderTextColor={Color.Placeholder}
                  secureTextEntry={secure}
                  style={styles.flexInput}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                />

                <TouchableOpacity onPress={() => setSecure(!secure)}>
                  <SafeFastImage
                    source={
                      secure
                        ? require('../assets/images/hide.png')
                        : require('../assets/images/open.png')
                    }
                    style={styles.smallIcon}
                    tintColor={Color.Placeholder}
                  />
                </TouchableOpacity>
              </View>

              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <TouchableOpacity
                style={[styles.primaryBtn, { opacity: loading ? 0.7 : 1 }]}
                onPress={handleSubmit}
                disabled={loading}>
                {loading ? (
                  <ActivityIndicator color={Color.WHITE} size="small" />
                ) : (
                  <Text style={styles.primaryText}>Sign Up</Text>
                )}
              </TouchableOpacity>

              <View style={styles.dividerRow}>
                <View style={styles.line} />
                <Text style={styles.orText}>Or</Text>
                <View style={styles.line} />
              </View>

              <View style={styles.iconRow}>
                <TouchableOpacity style={styles.iconOnlyBtn}>
                  <SafeFastImage
                    source={require('../assets/images/google.png')}
                    style={styles.iconOnly}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconOnlyBtn}>
                  <SafeFastImage
                    source={require('../assets/images/apple.png')}
                    style={styles.iconOnly}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconOnlyBtn}>
                  <SafeFastImage
                    source={require('../assets/images/whatsapp.png')}
                    style={styles.iconOnly}
                  />
                </TouchableOpacity>
              </View>
            </ScrollView>

            <AlertModal
              visible={modalVisible}
              message={modalMessage}
              isSuccess={modalSuccess}
              isError={!modalSuccess}
              onClose={() => setModalVisible(false)}
              onClick={() => {
                setModalVisible(false);

                if (modalSuccess) {
                  onSwitch();
                }
              }}
            />
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      )}
    </Formik>
  );
};

export default SignUpContent;

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginTop: 5,
  },

  backBtn: {
    position: 'absolute',
    left: 10,
    top: 0,
    zIndex: 10,
  },

  closeBtn: {
    position: 'absolute',
    right: 10,
    top: 0,
    zIndex: 10,
  },

  backIcon: {
    width: 22,
    height: 22,
  },

  headerIcon: {
    fontSize: 18,
    color: '#333',
  },

  logo: {
    width: 42,
    height: 42,
    marginTop: 20,
    alignSelf: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: Color.BLACK,
    marginTop: 10,
  },

  subtitle: {
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
    color: '#666',
  },

  loginLink: {
    color: Color.GREEN,
    fontWeight: '600',
  },

  input: {
    height: 55,
    borderRadius: 14,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
  },

  iconInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 5,
  },

  flexInput: {
    flex: 1,
  },

  smallIcon: {
    width: 20,
    height: 20,
  },

  primaryBtn: {
    height: 55,
    backgroundColor: Color.GREEN,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  primaryText: {
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
    backgroundColor: '#E5E5E5',
  },

  orText: {
    marginHorizontal: 10,
    color: '#888',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  iconOnlyBtn: {
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

  iconOnly: {
    width: 24,
    height: 24,
  },
});
