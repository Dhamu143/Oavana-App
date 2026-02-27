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
  StatusBar,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Color from '../../Common/Color';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SkipLogin} from '../../Redux/Action/action';
import {useDispatch} from 'react-redux';
import CountryPicker from 'react-native-country-picker-modal';
import DateTimePicker from '@react-native-community/datetimepicker';

const {width} = Dimensions.get('window');

const SignUpScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [secure, setSecure] = useState(true);

  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [countryCode, setCountryCode] = useState('IN');
  const [visibleCountry, setVisibleCountry] = useState(false);
  const [callingCode, setCallingCode] = useState('+91');
  const [countryName, setCountryName] = useState('India');

  const handelSkipLogin = () => {
    dispatch(SkipLogin(true));
    navigation.replace('MaindashboardDrawer');
  };

  const onSelectCountry = country => {
    setCountryCode(country.cca2);
    setCountryName(country.name);

    if (country.callingCode?.length > 0) {
      setCallingCode('+' + country.callingCode[0]);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);

    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const formatDate = date => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

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
                onPress={() => {
                  navigation.goBack();
                }}>
                <FastImage
                  source={require('../../assets/images/leftArrow.png')}
                  style={styles.icon22}
                  resizeMode={FastImage.resizeMode.contain}
                  tintColor={Color.WHITE}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.skipBtn}
                onPress={handelSkipLogin}>
                <Text style={styles.skipText}>Skip</Text>
              </TouchableOpacity>

              <Text style={styles.title}>Sign Up</Text>

              <Text style={styles.subtitle}>
                Already have an account?{' '}
                <Text
                  style={styles.loginLink}
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  Log In
                </Text>
              </Text>
            </View>

            <View style={styles.card}>
              <View style={styles.row}>
                <TextInput
                  placeholder="Lois"
                  placeholderTextColor={Color.Placeholder}
                  style={[styles.input, styles.halfInput, {marginRight: 10}]}
                />
                <TextInput
                  placeholder="Becket"
                  placeholderTextColor={Color.Placeholder}
                  style={[styles.input, styles.halfInput]}
                />
              </View>

              <TextInput
                placeholder="Loisbecket@gmail.com"
                placeholderTextColor={Color.Placeholder}
                style={[styles.input, {marginBottom: 15}]}
              />

              <TouchableOpacity
                style={styles.iconInput}
                onPress={() => setShowDatePicker(true)}>
                <Text
                  style={{flex: 1, color: date ? '#000' : Color.Placeholder}}>
                  {date ? formatDate(date) : 'Select Date'}
                </Text>

                <FastImage
                  source={require('../../assets/images/calender.png')}
                  style={styles.icon20}
                  resizeMode={FastImage.resizeMode.contain}
                  tintColor={Color.Placeholder}
                />
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={date || new Date()}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={onChangeDate}
                  maximumDate={new Date()}
                />
              )}

              <View style={styles.iconInput}>
                <TouchableOpacity
                  onPress={() => setVisibleCountry(true)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 10,
                  }}>
                  <CountryPicker
                    countryCode={countryCode}
                    withFilter
                    withFlag
                    withCallingCode
                    withAlphaFilter
                    withCallingCodeButton
                    visible={visibleCountry}
                    onSelect={onSelectCountry}
                    onClose={() => setVisibleCountry(false)}
                  />

                  {/* <Text style={{marginLeft: 5}}>{callingCode}</Text> */}
                </TouchableOpacity>

                <TextInput
                  placeholder="Enter phone number"
                  placeholderTextColor={Color.Placeholder}
                  keyboardType="phone-pad"
                  style={{flex: 1}}
                />
              </View>

              <View style={styles.iconInput}>
                <TextInput
                  placeholder="*******"
                  placeholderTextColor={Color.Placeholder}
                  secureTextEntry={secure}
                  style={{flex: 1}}
                />
                <TouchableOpacity onPress={() => setSecure(!secure)}>
                  <FastImage
                    source={
                      secure
                        ? require('../../assets/images/hide.png')
                        : require('../../assets/images/open.png')
                    }
                    style={styles.icon22}
                    resizeMode={FastImage.resizeMode.contain}
                    tintColor={Color.Placeholder}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.signupBtn}>
                <Text style={styles.signupBtnText}>Sign Up</Text>
              </TouchableOpacity>

              <View style={styles.dividerRow}>
                <View style={styles.line} />
                <Text style={styles.orText}>Or</Text>
                <View style={styles.line} />
              </View>

              <TouchableOpacity style={styles.googleBtn}>
                <FastImage
                  source={require('../../assets/images/google.png')}
                  style={styles.icon20}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <Text style={styles.googleText}>Sign up with Google</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  greenHeader: {
    backgroundColor: Color.GREEN,
    paddingTop: 30,
    paddingBottom: 260,
    alignItems: 'center',
  },

  backBtn: {
    position: 'absolute',
    left: 20,
    top: 30,
  },

  skipBtn: {
    position: 'absolute',
    right: 20,
    top: 30,
  },

  skipText: {
    color: Color.WHITE,
    fontSize: 14,
  },

  title: {
    fontSize: 30,
    color: Color.WHITE,
    fontWeight: '600',
  },

  subtitle: {
    marginTop: 8,
    color: '#E6E6E6',
  },

  loginLink: {
    textDecorationLine: 'underline',
    color: Color.WHITE,
    fontWeight: '500',
  },

  card: {
    marginTop: -220,
    alignSelf: 'center',
    width: width - 40,
    backgroundColor: Color.WHITE,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Color.boredrColor,
    marginBottom: 30,
  },

  row: {
    flexDirection: 'row',
    marginBottom: 15,
  },

  halfInput: {
    flex: 1,
  },

  input: {
    height: 55,
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: Color.boredrColor,
  },

  iconInput: {
    height: 55,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.boredrColor,
  },

  phoneLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },

  signupBtn: {
    height: 55,
    backgroundColor: Color.GREEN,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },

  signupBtnText: {
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
    backgroundColor: '#E0E0E0',
  },

  orText: {
    marginHorizontal: 10,
    color: '#888',
    fontSize: 13,
  },

  googleBtn: {
    height: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Color.boredrColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  googleText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },

  icon22: {
    width: 22,
    height: 22,
  },

  icon20: {
    width: 20,
    height: 20,
  },
});
