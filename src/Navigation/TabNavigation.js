import React from 'react';
import {View, Text, StyleSheet, Dimensions, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import MainDashBoard from '../Screen/MainDashBoard';
import Color from '../Common/Color';
import SafeFastImage from '../utils/SafeFastImage';
import MyTeamsScreen from '../Screen/MyTeamsScreen';
import NotificationUpdateScreen from '../Screen/NotificationUpdateScreen';

const Tab = createBottomTabNavigator();
const {width} = Dimensions.get('window');

const TAB_HEIGHT = Platform.OS === 'ios' ? 110 : 110;

const CustomIcon = ({icon, color, title, subtitle}) => {
  return (
    <View style={styles.tabItem}>
      <View style={[styles.iconContainer, {backgroundColor: color}]}>
        <SafeFastImage
          source={icon}
          style={styles.icon}
          tintColor={Color.WHITE}
        />
      </View>

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <Text style={styles.subtitle} numberOfLines={1}>
        {subtitle}
      </Text>
    </View>
  );
};

const TabScreens = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}} edges={['bottom']}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: styles.tabBar,
            tabBarItemStyle: {flex: 1},
          }}>
          <Tab.Screen
            name="Home"
            component={MainDashBoard}
            options={{
              tabBarIcon: () => (
                <CustomIcon
                  icon={require('../assets/images/home.png')}
                  color="#228B22"
                  title="Home"
                  subtitle="Dashboard"
                />
              ),
            }}
          />

          <Tab.Screen
            name="Team"
            component={MyTeamsScreen}
            options={{
              tabBarIcon: () => (
                <CustomIcon
                  icon={require('../assets/images/group.png')}
                  color="#FF7F50"
                  title="My Team"
                  subtitle="Connections"
                />
              ),
            }}
          />

          <Tab.Screen
            name="Notifications"
            component={NotificationUpdateScreen}
            options={{
              tabBarIcon: () => (
                <CustomIcon
                  icon={require('../assets/images/notification.png')}
                  color="#4973FF"
                  title="Notification"
                  subtitle="Updates"
                />
              ),
            }}
          />
        </Tab.Navigator>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default TabScreens;
const styles = StyleSheet.create({
  tabBar: {
    height: TAB_HEIGHT,
    backgroundColor: Color.WHITE,
    paddingTop: 40,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: Color.BLACK,
    shadowOffset: {width: 0, height: -3},
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 3,
  },

  iconContainer: {
    width: width * 0.13,
    height: width * 0.13,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },

  icon: {
    width: width * 0.06,
    height: width * 0.06,
  },

  title: {
    fontSize: width * 0.035,
    fontWeight: '700',
    color: Color.BLACK,
  },

  subtitle: {
    fontSize: width * 0.028,
    color: '#777',
  },
});
