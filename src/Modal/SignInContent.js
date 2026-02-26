import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Color from '../Common/Color';

const {width, height} = Dimensions.get('window');

const SignInContent = ({onSwitch, onClose, onForgot}) => {
  const [remember, setRemember] = useState(false);
  const [secure, setSecure] = useState(true);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      <FastImage
        source={require('../assets/images/Logo1.png')}
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

      <View style={styles.socialRow}>
        {[
          require('../assets/images/google.png'),
          require('../assets/images/apple.png'),
          require('../assets/images/whatsapp.png'),
        ].map((icon, index) => (
          <TouchableOpacity key={index} style={styles.socialBtn}>
            <FastImage source={icon} style={styles.socialIcon} />
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
                ? require('../assets/images/hide.png')
                : require('../assets/images/open.png')
            }
            style={styles.eyeIcon}
            tintColor={Color.Placeholder}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.optionsRow}>
        <TouchableOpacity
          style={styles.rememberRow}
          onPress={() => setRemember(!remember)}>
          <View style={[styles.checkbox, remember && styles.checkedBox]} />
          <Text style={styles.rememberText}>Remember me</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onForgot}>
          <Text style={styles.forgotText}>Forgot Password ?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>

      <View style={styles.signupRow}>
        <Text style={styles.signupText}>Don’t have an account? </Text>
        <TouchableOpacity onPress={onSwitch}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    fontSize: 26,
    textAlign: 'center',
    fontWeight: '600',
    color: '#000',
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
    width: (width - 100) / 3,
    height: 55,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
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
    borderRadius: 14,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  passwordWrapper: {
    height: 55,
    borderRadius: 14,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E5E5',
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
