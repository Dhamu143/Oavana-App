import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './DrawerContent.js';
import MainDashBoard from '../../Screen/MainDashBoard/index.js';
import Color from '../../Common/Color.js';
import MyTabs from '../TabNavigation.js';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      id="drawer"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: Color.WHITE,
          width: '70%',
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="MyTabs" component={MyTabs} />
      <Drawer.Screen name="MainDashBoard" component={MainDashBoard} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;
