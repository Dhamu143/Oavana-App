import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Image} from 'react-native';
import Color from '../../Common/Color';
import {useSelector} from 'react-redux';

const SplashScreen = ({navigation}) => {
  const {skiplogin} = useSelector(reducer => reducer.allReducer);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (skiplogin) {
        navigation.replace('MaindashboardDrawer');
      } else {
        navigation.replace('SignInScreen');
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Color.WHITE} />
      <Image
        source={require('../../assets/images/Logo1.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.WHITE,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
});

export default SplashScreen;
