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
import AuthModal from '../../Modal/AuthModal';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width} = Dimensions.get('window');

const ForgotPasswordScreen = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Color.GREEN}}>
      <StatusBar backgroundColor={Color.GREEN} barStyle="light-content" />
      <View style={{flex: 1, backgroundColor: Color.WHITE}}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            <View style={styles.greenHeader}>
              <TouchableOpacity
                style={styles.backBtn}
                onPress={() => navigation.goBack()}>
                <FastImage
                  source={require('../../assets/images/leftArrow.png')}
                  style={styles.backIcon}
                  resizeMode={FastImage.resizeMode.contain}
                  tintColor={Color.WHITE}
                />
              </TouchableOpacity>

              <FastImage
                source={require('../../assets/images/Logo.png')}
                style={styles.logo}
                resizeMode={FastImage.resizeMode.contain}
              />

              <Text style={styles.title}>Forgot password</Text>
              <Text style={styles.subtitle}>Reset your password.</Text>
            </View>

            <View style={styles.card}>
              <TextInput
                placeholder="Loisbecket@gmail.com"
                placeholderTextColor={Color.Placeholder}
                style={styles.input}
              />

              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowModal(true)}>
                <Text style={styles.buttonText}>Send Email</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      <AuthModal visible={showModal} onClose={() => setShowModal(false)} />
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  greenHeader: {
    backgroundColor: Color.GREEN,
    paddingTop: 60,
    paddingBottom: 250,
    alignItems: 'center',
  },

  backBtn: {
    position: 'absolute',
    left: 20,
    top: 10,
  },

  backIcon: {
    width: 22,
    height: 22,
  },

  logo: {
    width: 42,
    height: 42,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Color.WHITE,
    marginTop: 10,
  },

  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#E6E6E6',
  },

  card: {
    marginTop: -210,
    alignSelf: 'center',
    width: width - 40,
    backgroundColor: Color.WHITE,
    borderRadius: 20,
    padding: 20,
    marginBottom: 40,
  },

  input: {
    height: 55,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: Color.boredrColor,
  },

  button: {
    height: 55,
    backgroundColor: Color.GREEN,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: Color.WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
});
