import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import SafeFastImage from '../utils/SafeFastImage';

const AppHeader = ({navigation}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.menuBtn}
        onPress={() => navigation.goBack()}>
        <SafeFastImage
          source={require('../assets/images/leftArrow.png')}
          style={styles.menuIcon}
        />
      </TouchableOpacity>

      <SafeFastImage
        source={require('../assets/images/Logo1.png')}
        style={styles.logo}
      />
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuBtn: {
    position: 'absolute',
    left: 0,
    backgroundColor: '#F2F2F2',
    padding: 10,
    borderRadius: 10,
  },
  menuIcon: {
    width: 20,
    height: 20,
  },

  logo: {
    width: 70,
    height: 40,
  },
});
