import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useSafeAreaInsets, SafeAreaView} from 'react-native-safe-area-context';
import Color from '../../Common/Color';
import SafeFastImage from '../../utils/SafeFastImage';

const {width} = Dimensions.get('window');

const NotificationPermissionScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Color.WHITE} />

      <View style={styles.content}>
       <SafeFastImage
  source={require('../../assets/images/PushNotification.png')}
  style={styles.image}
 
/>
        <Text style={styles.title}>Get updates on your mining status!</Text>

        <Text style={styles.subtitle}>
          Allow push notifications to get real-time{'\n'}
          updates on your order status.
        </Text>
      </View>

      <View
        style={[
          styles.bottomContainer,
          {paddingBottom: insets.bottom > 0 ? insets.bottom + 15 : 25},
        ]}>
        <TouchableOpacity style={styles.allowButton}>
          <Text style={styles.allowText}>Yes, allow notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dontAllowButton}>
          <Text style={styles.dontAllowText}>Don't allow</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NotificationPermissionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.WHITE,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  image: {
    width: width * 0.65,
    height: width * 0.65,
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
  },
  bottomContainer: {
    paddingHorizontal: 20,
  },
  allowButton: {
    backgroundColor: Color.GREEN,
    paddingVertical: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 12,
  },
  allowText: {
    color: Color.WHITE,
    fontSize: 15,
    fontWeight: '600',
  },
  dontAllowButton: {
    backgroundColor: '#E1E6EF',
    paddingVertical: 15,
    borderRadius: 6,
    alignItems: 'center',
  },
  dontAllowText: {
    color: Color.BLACK,
    fontSize: 15,
    fontWeight: '500',
  },
});
