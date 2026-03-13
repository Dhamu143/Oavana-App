import React from 'react';
import {View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AppHeader from '../../Components/AppHeader';
import YourTeams from '../YourTeams';
import Leaderboard from '../Leaderboard';
import Color from '../../Common/Color';

const Tab = createMaterialTopTabNavigator();

const MyTeamsScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <AppHeader navigation={navigation} />
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: Color.GREEN,
          tabBarInactiveTintColor: '#9E9E9E',

          tabBarIndicatorStyle: {
            backgroundColor: Color.GREEN,
            height: 3,
          },

          tabBarLabelStyle: {
            fontWeight: 'bold',
            fontSize: 16,
            textTransform: 'none',
          },

          tabBarStyle: {
            backgroundColor: Color.WHITE,
          },
        }}>
        <Tab.Screen name="Your Teams" component={YourTeams} />
        <Tab.Screen name="Leaderboard" component={Leaderboard} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default MyTeamsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.WHITE,
  },
  header: {
    marginHorizontal: 10,
  },
});
