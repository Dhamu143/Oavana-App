import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Color from '../Common/Color';
import {useNavigation} from '@react-navigation/native';

const AccountTab = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>First name</Text>
          <Text style={styles.value}>Yash Patel</Text>
        </View>

        <TouchableOpacity>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>patelyash9712@gmail.com</Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('EditEmailScreen')}>
          <Text style={styles.actionText}>Change</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Phone number</Text>
          <Text style={styles.value}>+91 7041099374</Text>
        </View>

        <TouchableOpacity>
          <Text style={styles.actionText}>Change</Text>
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
});
