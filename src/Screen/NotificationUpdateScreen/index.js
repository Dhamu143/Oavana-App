import React from 'react';
import {View, Text, StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import Color from '../../Common/Color';
import AppHeader from '../../Components/AppHeader';

const NotificationUpdateScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={Color.WHITE} barStyle="dark-content" />
      <View style={styles.header}>
        <AppHeader navigation={navigation} />
      </View>

      <View style={styles.container}>
        <Text style={styles.text}>This is Notification Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default NotificationUpdateScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.WHITE,
  },
  header: {
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: Color.BLACK,
  },
});
