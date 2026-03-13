import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Color from '../../Common/Color';
import SafeFastImage from '../../utils/SafeFastImage';
import apiClient from '../../utils/ApiClient';
import AlertModal from '../../Modal/AlertModal';
import AppHeader from '../../Components/AppHeader';

const ContactSchema = Yup.object().shape({
  username: Yup.string().min(2, 'Too short').required('User name is required'),

  email: Yup.string().email('Invalid email').required('Email is required'),

  subject: Yup.string().min(3, 'Too short').required('Subject is required'),

  message: Yup.string()
    .min(5, 'Description too short')
    .required('Description is required'),
});

const ContactScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [focused, setFocused] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmitForm = async (values, {resetForm}) => {
    try {
      setLoading(true);

      const response = await apiClient.post('/contact', {
        username: values?.username,
        email: values?.email,
        subject: values?.subject,
        message: values?.message,
      });

      //  console.log('response', response);

      if (response?.status === 200 || response?.data?.success) {
        resetForm();

        setModalMessage('Your message has been sent successfully.');
        setModalSuccess(true);
        setModalVisible(true);
      } else {
        setModalMessage('Unable to send message. Please try again.');
        setModalSuccess(false);
        setModalVisible(true);
      }
    } catch (error) {
      let errorMessage = 'Something went wrong. Please try again.';

      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      setModalMessage(errorMessage);
      setModalSuccess(false);
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLink = url => {
    Linking.openURL(url).catch(err => console.log('Failed to open link:', err));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Color.WHITE} />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContainer,
            {paddingBottom: insets.bottom + 20},
          ]}>
          <AppHeader navigation={navigation} />

          <Formik
            initialValues={{
              username: '',
              email: '',
              subject: '',
              message: '',
            }}
            validationSchema={ContactSchema}
            onSubmit={handleSubmitForm}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.formContainer}>
                <Text style={styles.title}>Contact Us</Text>
                <Text style={styles.subtitle}>We love to hear from you.</Text>

                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>User Name</Text>

                  <TextInput
                    value={values.username}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    placeholder="User Name"
                    placeholderTextColor="#9E9E9E"
                    style={[
                      styles.input,
                      {
                        borderBottomColor:
                          focused === 'name' ? Color.GREEN : '#ababab',
                      },
                    ]}
                    onFocus={() => setFocused('name')}
                  />

                  {touched.username && errors.username && (
                    <Text style={styles.errorText}>{errors.username}</Text>
                  )}
                </View>

                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>Email Address</Text>

                  <TextInput
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    placeholder="Email Address"
                    placeholderTextColor="#9E9E9E"
                    keyboardType="email-address"
                    style={[
                      styles.input,
                      {
                        borderBottomColor:
                          focused === 'email' ? Color.GREEN : '#ababab',
                      },
                    ]}
                    onFocus={() => setFocused('email')}
                  />

                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>

                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>Subject</Text>

                  <TextInput
                    value={values.subject}
                    onChangeText={handleChange('subject')}
                    onBlur={handleBlur('subject')}
                    placeholder="Subject"
                    placeholderTextColor="#9E9E9E"
                    style={[
                      styles.input,
                      {
                        borderBottomColor:
                          focused === 'subject' ? Color.GREEN : '#ababab',
                      },
                    ]}
                    onFocus={() => setFocused('subject')}
                  />

                  {touched.subject && errors.subject && (
                    <Text style={styles.errorText}>{errors.subject}</Text>
                  )}
                </View>

                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>Description</Text>

                  <TextInput
                    value={values.message}
                    onChangeText={handleChange('message')}
                    onBlur={handleBlur('message')}
                    placeholder="Description"
                    placeholderTextColor="#9E9E9E"
                    multiline
                    style={[
                      styles.input,
                      styles.textArea,
                      {
                        borderBottomColor:
                          focused === 'description' ? Color.GREEN : '#ababab',
                      },
                    ]}
                    onFocus={() => setFocused('description')}
                  />

                  {touched.message && errors.message && (
                    <Text style={styles.errorText}>{errors.message}</Text>
                  )}
                </View>

                <TouchableOpacity
                  style={styles.sendBtn}
                  onPress={handleSubmit}
                  disabled={loading}>
                  {loading ? (
                    <ActivityIndicator size="small" color={Color.WHITE} />
                  ) : (
                    <Text style={styles.sendText}>Send Message</Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </Formik>

          <View style={styles.socialSection}>
            <Text style={styles.connectText}>Let’s Connect</Text>

            <View style={styles.iconRow}>
              <TouchableOpacity
                onPress={() =>
                  handleLink('https://www.facebook.com/greenearthtoken')
                }>
                <SafeFastImage
                  source={require('../../assets/images/facebook.png')}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  handleLink('https://www.instagram.com/green.earth.token')
                }>
                <SafeFastImage
                  source={require('../../assets/images/instagram.png')}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  handleLink(
                    'https://www.linkedin.com/company/green-earth-token',
                  )
                }>
                <SafeFastImage
                  source={require('../../assets/images/linkedin.png')}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleLink('https://x.com/TokenEarth2025')}>
                <SafeFastImage
                  source={require('../../assets/images/twitter.png')}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <AlertModal
        visible={modalVisible}
        message={modalMessage}
        isSuccess={modalSuccess}
        isError={!modalSuccess}
        onClose={() => setModalVisible(false)}
        onClick={() => {
          setModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.WHITE,
    paddingHorizontal: 24,
  },

  scrollContainer: {
    flexGrow: 1,
  },

  formContainer: {
    marginTop: 5,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Color.BLACK,
  },

  subtitle: {
    fontSize: 15,
    color: '#7A7A7A',
    marginTop: 6,
    marginBottom: 20,
  },

  fieldContainer: {
    marginBottom: 18,
  },

  label: {
    fontSize: 13,
    color: '#444',
    marginBottom: 6,
    fontWeight: '500',
  },

  input: {
    borderBottomWidth: 1,
    fontSize: 16,
    paddingVertical: 6,
    color: Color.BLACK,
  },

  textArea: {
    textAlignVertical: 'top',
  },

  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },

  sendBtn: {
    backgroundColor: Color.GREEN,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  sendText: {
    color: Color.WHITE,
    fontSize: 16,
    fontWeight: '600',
  },

  socialSection: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingTop: 40,
  },

  connectText: {
    fontSize: 15,
    color: '#7A7A7A',
    marginBottom: 20,
  },

  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 220,
  },

  socialIcon: {
    width: 38,
    height: 38,
  },
});
