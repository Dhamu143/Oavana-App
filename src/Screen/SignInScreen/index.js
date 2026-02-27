import React, {useState} from 'react';
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
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Color from '../../Common/Color';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {SkipLogin} from '../../Redux/Action/action';

const {width, height} = Dimensions.get('window');

const SignInScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [remember, setRemember] = useState(false);
  const [secure, setSecure] = useState(true);

  const socialIcons =
    Platform.OS === 'ios'
      ? [
          {
            icon: require('../../assets/images/apple.png'),
            tint: Color.Placeholder,
          },
          {icon: require('../../assets/images/whatsapp.png')},
        ]
      : [
          {icon: require('../../assets/images/google.png')},
          {icon: require('../../assets/images/whatsapp.png')},
        ];

  const handelSkipLogin = () => {
    dispatch(SkipLogin(true));
    navigation.replace('MaindashboardDrawer');
  };

  return (
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

              <FastImage
                source={require('../../assets/images/Logo.png')}
                style={styles.logo}
                resizeMode={FastImage.resizeMode.contain}
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
                  <TouchableOpacity key={index} style={styles.socialBtn}>
                    <FastImage
                      source={item.icon}
                      style={styles.socialIcon}
                      resizeMode={FastImage.resizeMode.contain}
                      tintColor={item.tint || null}
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
                style={styles.input}
                placeholderTextColor={Color.Placeholder}
              />

              <View style={styles.passwordWrapper}>
                <TextInput
                  placeholder="*******"
                  secureTextEntry={secure}
                  style={styles.passwordInput}
                  placeholderTextColor={Color.Placeholder}
                />
                <TouchableOpacity onPress={() => setSecure(!secure)}>
                  <FastImage
                    source={
                      secure
                        ? require('../../assets/images/hide.png')
                        : require('../../assets/images/open.png')
                    }
                    style={styles.eyeIcon}
                    resizeMode={FastImage.resizeMode.contain}
                    tintColor={Color.Placeholder}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.optionsRow}>
                <TouchableOpacity
                  style={styles.rememberRow}
                  onPress={() => setRemember(!remember)}>
                  <View
                    style={[styles.checkbox, remember && styles.checkedBox]}
                  />
                  <Text style={styles.rememberText}>Remember me</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                  <Text style={styles.forgotText}>Forgot Password ?</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginText}>Log In</Text>
              </TouchableOpacity>

              <View style={styles.signupRow}>
                <Text style={styles.signupText}>Don’t have an account? </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SignUpScreen')}>
                  <Text style={styles.signupLink}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
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
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
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
    fontSize: 13,
    color: '#777',
  },

  signupLink: {
    fontSize: 13,
    color: Color.GREEN,
    fontWeight: '600',
  },

  eyeIcon: {
    width: 22,
    height: 22,
  },
});
