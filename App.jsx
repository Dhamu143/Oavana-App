import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import store, {persistor} from './src/Redux/Store/store';
import {navigationRef} from './src/Navigation/NavigationService';
import MyStack from './src/Navigation/ScreenNavigator';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RootStack = createNativeStackNavigator();

function App() {
  useEffect(() => {
    getDeviceId();
  }, []);

  const getDeviceId = async () => {
    const deviceId = await DeviceInfo.getUniqueId();
    await AsyncStorage.setItem('deviceId', deviceId);
    // console.log('DeviceID App Screen', deviceId);
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          {/* <ForgotPasswordScreen /> */}
          <NavigationContainer ref={navigationRef}>
            <RootStack.Navigator screenOptions={{headerShown: false}}>
              <RootStack.Screen name="MyStack" component={MyStack} />
            </RootStack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
