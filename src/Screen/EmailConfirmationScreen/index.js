import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Color from '../../Common/Color';
import SafeFastImage from '../../utils/SafeFastImage';

const EmailConfirmationScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <SafeFastImage
      source={require('../../assets/images/back.png')}
      style={styles.backIcon}
    />
          </TouchableOpacity>

           <SafeFastImage
    source={require('../../assets/images/Logo1.png')}
    style={styles.logo}
  />
          <View style={{width: 22}} />
        </View>

        <SafeFastImage
  source={require('../../assets/images/EmailConformation.png')}
  style={styles.illustration}
/>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Check your email for confirmation</Text>

          <Text style={styles.description}>
            We've sent confirmation link on
          </Text>

          <Text style={styles.email}>patelyash9712@gmail.com</Text>

          <Text style={styles.spam}>(also check the Spam folder).</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            {marginBottom: insets.bottom > 0 ? insets.bottom : 20},
          ]}>
          <Text style={styles.buttonText}>Open Email</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EmailConfirmationScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.WHITE,
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: Color.WHITE,
  },

  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backIcon: {
    width: 22,
    height: 22,
  },

  logo: {
    width: 40,
    height: 40,
  },

  illustration: {
    width: '100%',
    height: 250,
    marginTop: 60,
  },

  textContainer: {
    alignItems: 'center',
    marginTop: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    color: Color.BLACK,
    marginBottom: 15,
  },

  description: {
    fontSize: 14,
    color: '#6E6E73',
    textAlign: 'center',
  },

  email: {
    fontSize: 14,
    fontWeight: '600',
    color: Color.BLACK,
    marginTop: 4,
    textAlign: 'center',
  },

  spam: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
    textAlign: 'center',
  },

  button: {
    marginTop: 'auto',
    backgroundColor: Color.GREEN,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: Color.WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
});
