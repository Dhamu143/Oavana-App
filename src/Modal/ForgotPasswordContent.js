import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Color from '../Common/Color';
import SafeFastImage from '../utils/SafeFastImage';

const ForgotPasswordContent = ({onBack, onClose}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
       <SafeFastImage
  source={require('../assets/images/leftArrow.png')}
  style={styles.backIcon}
/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

     <SafeFastImage
  source={require('../assets/images/Logo1.png')}
  style={styles.logo}
/>

      <Text style={styles.title}>Forgot password</Text>

      <Text style={styles.subtitle}>Reset your password.</Text>

      <TextInput
        placeholder="Loisbecket@gmail.com"
        style={styles.input}
        placeholderTextColor={Color.Placeholder}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Send Email</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordContent;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },

  backBtn: {
    position: 'absolute',
    left: 10,
    top: 0,
    zIndex: 10,
  },

  backIcon: {
    width: 22,
    height: 22,
  },

  closeBtn: {
    position: 'absolute',
    right: 10,
    top: 0,
    zIndex: 10,
  },

  closeText: {
    fontSize: 18,
  },

  logo: {
    width: 42,
    height: 42,
    alignSelf: 'center',
    marginVertical: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: Color.BLACK,
  },

  subtitle: {
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
    color: '#666',
  },

  input: {
    height: 55,
    borderRadius: 14,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  button: {
    height: 55,
    backgroundColor: Color.GREEN,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: Color.WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
});
