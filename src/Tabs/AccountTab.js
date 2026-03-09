
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Color from '../Common/Color';

import * as Yup from 'yup';
import CountryPicker from 'react-native-country-picker-modal';

const nameSchema = Yup.object().shape({
  name: Yup.string().required('Please enter name'),
});

const phoneSchema = Yup.object().shape({
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
    .required('Please enter mobile number'),
});

const AccountTab = ({ user, updateUser }) => {


  const [editName, setEditName] = useState(false);
  const [editPhone, setEditPhone] = useState(false);

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');

  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [countryCode, setCountryCode] = useState('IN');
  const [visibleCountry, setVisibleCountry] = useState(false);
  const [callingCode, setCallingCode] = useState('+91');


  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }

    if (user?.mobile) {
      const mobileValue = user.mobile;
      const numberWithoutPlus = mobileValue.replace('+', '');
      const phoneNumber = numberWithoutPlus.slice(-10);
      const country = '+' + numberWithoutPlus.slice(0, -10);

      setCallingCode(country);
      setMobile(phoneNumber);
    }
  }, [user]);


  const onSelect = country => {
    setCountryCode(country.cca2);

    if (country.callingCode?.length > 0) {
      setCallingCode('+' + country.callingCode[0]);
    }
  };

  const updateName = async () => {
    try {
      await nameSchema.validate({ name });

      setNameError('');

      await updateUser({
        name,
      });

      setEditName(false);

    } catch (error) {
      if (error?.message) {
        setNameError(error.message);
      }
    }
  };

  const updateMobile = async () => {
    try {
      await phoneSchema.validate({ mobile });

      setPhoneError('');

      await updateUser({
        mobile: `${callingCode}${mobile}`,
      });

      setEditPhone(false);

    } catch (error) {
      if (error?.message) {
        setPhoneError(error.message);
      }
    }
  };

  return (
    <View style={styles.container}>



      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>First name</Text>

          {editName ? (
            <>
              <TextInput
                style={styles.input}
                value={name}
                placeholder="Enter name"
                onChangeText={setName}
              />

              {nameError ? (
                <Text style={styles.error}>{nameError}</Text>
              ) : null}
            </>
          ) : (
            <Text style={styles.value}>{user?.name || 'Not Added'}</Text>
          )}
        </View>

        <TouchableOpacity
          onPress={() => {
            if (editName) {
              updateName();
            } else {
              setName(user?.name || '');
              setEditName(true);
            }
          }}>
          <Text style={styles.actionText}>
            {editName ? 'Save' : 'Edit'}
          </Text>
        </TouchableOpacity>
      </View>



      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user?.email}</Text>
        </View>
      </View>



      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Phone number</Text>

          {editPhone ? (
            <>
              <View style={styles.phoneRow}>
                <TouchableOpacity
                  style={styles.countryBox}
                  onPress={() => setVisibleCountry(true)}>

                  <CountryPicker
                    countryCode={countryCode}
                    withFilter
                    withFlag
                    withCallingCode
                    visible={visibleCountry}
                    onSelect={onSelect}
                    onClose={() => setVisibleCountry(false)}
                  />

                  <Text style={styles.codeText}>{callingCode}</Text>
                </TouchableOpacity>

                <TextInput
                  style={styles.phoneInput}
                  keyboardType="number-pad"
                  placeholder="Enter number"
                  value={mobile}
                  maxLength={10}
                  onChangeText={text => setMobile(text.replace(/[^0-9]/g, ''))}
                />
              </View>

              {phoneError ? (
                <Text style={styles.error}>{phoneError}</Text>
              ) : null}
            </>
          ) : (
            <Text style={styles.value}>{user?.mobile || 'Not Added'}</Text>
          )}
        </View>

        <TouchableOpacity
          onPress={() => {
            if (editPhone) {
              updateMobile();
            } else {
              setEditPhone(true);
            }
          }}>
          <Text style={styles.actionText}>
            {editPhone ? 'Save' : 'Change'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.WHITE,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  row: {
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  label: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 6,
  },

  value: {
    fontSize: 16,
    fontWeight: '600',
    color: Color.BLACK,
  },

  actionText: {
    fontSize: 15,
    fontWeight: '600',
    color: Color.GREEN,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 10,
  },

  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  countryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 8,
    height: 40,
  },

  codeText: {
    marginLeft: 5,
    fontSize: 14,
  },

  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },

  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});