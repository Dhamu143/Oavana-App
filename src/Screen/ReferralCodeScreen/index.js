import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Color from '../../Common/Color';
import SafeFastImage from '../../utils/SafeFastImage';

const {width} = Dimensions.get('window');

const ReferralCodeScreen = () => {
  const insets = useSafeAreaInsets();
  const [code, setCode] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Color.WHITE} />

      <View style={styles.content}>
        <SafeFastImage
          source={require('../../assets/images/handshake.png')}
          style={styles.image}
         
        />

        <Text style={styles.title}>Welcome to Green Earth Token</Text>

        <Text style={styles.subtitle}>
          Boost your rewards!{'\n'}
          Enter referral code to unlock{'\n'}
          higher mining rate and earn faster
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Referral Code</Text>

          <TextInput
            value={code}
            onChangeText={setCode}
            placeholder="Code"
            placeholderTextColor="#A0A0A0"
            style={styles.input}
          />
        </View>
      </View>

      <View
        style={[
          styles.bottomContainer,
          {paddingBottom: insets.bottom > 0 ? insets.bottom + 15 : 25},
        ]}>
        <TouchableOpacity style={styles.proceedButton}>
          <Text style={styles.proceedText}>Proceed with referral code</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton}>
          <Text style={styles.skipText}>Skip this step for now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ReferralCodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.WHITE,
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 40,
  },
  image: {
    width: width * 0.65,
    height: width * 0.55,
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Color.BLACK,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#8A8A8A',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
  },
  inputContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 13,
    color: '#555',
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: Color.boredrColor,
    fontSize: 15,
    paddingVertical: 8,
    color: Color.BLACK,
  },
  bottomContainer: {
    paddingHorizontal: 20,
  },
  proceedButton: {
    backgroundColor: Color.GREEN,
    paddingVertical: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 12,
  },
  proceedText: {
    color: Color.WHITE,
    fontSize: 15,
    fontWeight: '600',
  },
  skipButton: {
    backgroundColor: '#E1E6EF',
    paddingVertical: 15,
    borderRadius: 6,
    alignItems: 'center',
  },
  skipText: {
    color: Color.BLACK,
    fontSize: 15,
    fontWeight: '500',
  },
});
