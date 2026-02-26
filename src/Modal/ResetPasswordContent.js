import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Color from '../Common/Color';

const ResetPasswordContent = ({onClose}) => {
  const [secure1, setSecure1] = useState(true);
  const [secure2, setSecure2] = useState(true);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      <FastImage
        source={require('../assets/images/logo1.png')}
        style={styles.logo}
        resizeMode={FastImage.resizeMode.contain}
      />

      <Text style={styles.title}>Reset password</Text>

      <Text style={styles.subtitle}>Reset your password.</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="*******"
          secureTextEntry={secure1}
          style={styles.input}
          placeholderTextColor={Color.Placeholder}
        />
        <TouchableOpacity onPress={() => setSecure1(!secure1)}>
          <FastImage
            source={
              secure1
                ? require('../assets/images/hide.png')
                : require('../assets/images/open.png')
            }
            style={styles.eyeIcon}
            tintColor={Color.Placeholder}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="*******"
          secureTextEntry={secure2}
          style={styles.input}
          placeholderTextColor={Color.Placeholder}
        />
        <TouchableOpacity onPress={() => setSecure2(!secure2)}>
          <FastImage
            source={
              secure2
                ? require('../assets/images/hide.png')
                : require('../assets/images/open.png')
            }
            style={styles.eyeIcon}
            tintColor={Color.Placeholder}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Send Email</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPasswordContent;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },

  closeBtn: {
    position: 'absolute',
    right: 10,
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

  inputWrapper: {
    height: 55,
    borderRadius: 14,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Color.boredrColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  input: {
    flex: 1,
  },

  eyeIcon: {
    width: 20,
    height: 20,
  },

  button: {
    height: 55,
    backgroundColor: Color.GREEN,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: Color.WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
});
