import React, {useState} from 'react';
import {Modal, View, StyleSheet, Dimensions} from 'react-native';
import Color from '../Common/Color';
import SignInContent from './SignInContent';
import SignUpContent from './SignUpContent';
import ForgotPasswordContent from './ForgotPasswordContent';

const {height} = Dimensions.get('window');

const AuthModal = ({visible, onClose}) => {
  const [screen, setScreen] = useState('signin');

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {screen === 'signin' && (
            <SignInContent
              onSwitch={() => setScreen('signup')}
              onForgot={() => setScreen('forgot')}
              onClose={onClose}
            />
          )}

          {screen === 'signup' && (
            <SignUpContent
              onSwitch={() => setScreen('signin')}
              onClose={onClose}
            />
          )}

          {screen === 'forgot' && (
            <ForgotPasswordContent
              onBack={() => setScreen('signin')}
              onClose={onClose}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default AuthModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: Color.WHITE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingTop: 40,
    maxHeight: height * 0.95,
  },
});
