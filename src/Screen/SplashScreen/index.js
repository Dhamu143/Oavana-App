import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import Color from '../../Common/Color';
import {useSelector} from 'react-redux';
import SafeFastImage from '../../utils/SafeFastImage';

const SplashScreen = ({navigation}) => {
  const {skiplogin, userLogin} = useSelector(reducer => reducer.allReducer);

 useEffect(() => {
  const timer = setTimeout(() => {
    navigation.replace(
      skiplogin || userLogin
        ? 'MaindashboardDrawer'
        : 'SignInScreen'
    );
  }, 1200);

  return () => clearTimeout(timer);
}, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Color.WHITE} />

      <SafeFastImage
        source={require('../../assets/images/Logo1.png')}
        style={styles.logo}
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
