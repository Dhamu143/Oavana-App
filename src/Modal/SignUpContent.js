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
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Color from '../Common/Color';

const {width, height} = Dimensions.get('window');

const SignUpContent = ({onSwitch, onClose}) => {
  const [secure, setSecure] = useState(true);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{width: '100%'}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{paddingBottom: 30}}>
          <TouchableOpacity style={styles.backBtn} onPress={onSwitch}>
            <FastImage
              source={require('../assets/images/leftArrow.png')}
              style={styles.backIcon}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.headerIcon}>✕</Text>
          </TouchableOpacity>

          <FastImage
            source={require('../assets/images/Logo1.png')}
            style={styles.logo}
            resizeMode={FastImage.resizeMode.contain}
          />

          <Text style={styles.title}>Sign Up</Text>

          <Text style={styles.subtitle}>
            Already have an account?{' '}
            <Text style={styles.loginLink} onPress={onSwitch}>
              Log In
            </Text>
          </Text>

          <View style={styles.row}>
            <TextInput
              placeholder="Lois"
              style={[styles.input, styles.halfInput]}
              placeholderTextColor={Color.Placeholder}
            />
            <TextInput
              placeholder="Becket"
              style={[styles.input, styles.halfInput]}
              placeholderTextColor={Color.Placeholder}
            />
          </View>

          <TextInput
            placeholder="Loisbecket@gmail.com"
            style={styles.input}
            placeholderTextColor={Color.Placeholder}
          />

          <View style={styles.iconInput}>
            <TextInput
              placeholder="18/03/2024"
              style={styles.flexInput}
              placeholderTextColor={Color.Placeholder}
            />
            <FastImage
              source={require('../assets/images/calender.png')}
              style={styles.smallIcon}
              tintColor={Color.Placeholder}
            />
          </View>

          <View style={styles.iconInput}>
            <View style={styles.countryCode}>
              <Text>🇩🇰</Text>
              <Text style={{marginLeft: 5}}>+</Text>
            </View>
            <TextInput
              placeholder="(454) 726-0592"
              style={styles.flexInput}
              placeholderTextColor={Color.Placeholder}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.iconInput}>
            <TextInput
              placeholder="*******"
              secureTextEntry={secure}
              style={styles.flexInput}
              placeholderTextColor={Color.Placeholder}
            />
            <TouchableOpacity onPress={() => setSecure(!secure)}>
              <FastImage
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

          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.primaryText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.line} />
            <Text style={styles.orText}>Or</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity style={styles.googleBtn}>
            <FastImage
              source={require('../assets/images/google.png')}
              style={styles.googleIcon}
            />
            <Text style={styles.googleText}>Sign up with Google</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignUpContent;

const styles = StyleSheet.create({
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

  logo: {
    width: 42,
    height: 42,
    marginTop: 20,
    alignSelf: 'center',
  },

  headerIcon: {
    fontSize: 18,
    color: '#333',
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

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  input: {
    height: 55,
    borderRadius: 14,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Color.boredrColor,
  },

  halfInput: {
    width: (width - 70) / 2,
  },

  iconInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.boredrColor,
    borderRadius: 14,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 15,
  },

  flexInput: {
    flex: 1,
  },

  smallIcon: {
    width: 20,
    height: 20,
  },

  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
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

  googleBtn: {
    height: 55,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Color.boredrColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },

  googleText: {
    fontSize: 15,
    fontWeight: '500',
    color: Color.BLACK,
  },
});
