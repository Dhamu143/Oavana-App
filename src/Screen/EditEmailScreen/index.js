import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import Color from '../../Common/Color';

const EditEmailScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FastImage
              source={require('../../assets/images/back.png')}
              style={styles.backIcon}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>

          <FastImage
            source={require('../../assets/images/Logo1.png')}
            style={styles.logo}
            resizeMode={FastImage.resizeMode.contain}
          />

          <View style={{width: 22}} />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Edit Email</Text>
          <Text style={styles.subtitle}>Enter your valid email address.</Text>

          <View style={styles.currentEmailBox}>
            <Text style={styles.label}>Current Email</Text>
            <Text style={styles.currentEmail}>patelyash9712@gmail.com</Text>
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Enter new email address"
              placeholderTextColor={Color.Placeholder}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            {marginBottom: insets.bottom > 0 ? insets.bottom : 20},
          ]}
          onPress={() => {
            navigation.navigate('EmailConfirmationScreen');
          }}>
          <Text style={styles.buttonText}>Save Email</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditEmailScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.WHITE,
  },

  container: {
    flex: 1,
    backgroundColor: Color.WHITE,
    paddingHorizontal: 20,
  },

  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logo: {
    width: 55,
    height: 55,
  },

  backIcon: {
    width: 22,
    height: 22,
  },

  content: {
    marginTop: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Color.BLACK,
  },

  subtitle: {
    fontSize: 14,
    color: '#7D7D7D',
    marginTop: 6,
    marginBottom: 30,
  },

  currentEmailBox: {
    marginBottom: 30,
  },

  label: {
    fontSize: 13,
    color: '#8E8E93',
    marginBottom: 6,
  },

  currentEmail: {
    fontSize: 15,
    fontWeight: '500',
    color: Color.BLACK,
  },

  inputLabel: {
    fontSize: 15,
    color: '#8E8E93',
    marginBottom: 5,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: Color.boredrColor,
    fontSize: 16,
    paddingVertical: 8,
    color: Color.BLACK,
  },

  button: {
    backgroundColor: Color.GREEN,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
  },

  buttonText: {
    color: Color.WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
});
