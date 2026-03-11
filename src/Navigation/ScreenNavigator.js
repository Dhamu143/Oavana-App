import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../Screen/SignInScreen';
import SignUpScreen from '../Screen/SignUpScreen';
import ReferralCodeScreen from '../Screen/ReferralCodeScreen';
import NotificationPermissionScreen from '../Screen/NotificationPermissionScreen';
import ForgotPasswordScreen from '../Screen/ForgotPasswordScreen';
import MyDrawer from './Drawer/Drawer';
import UserProfileScreen from '../Screen/UserProfileScreen';
import EditEmailScreen from '../Screen/EditEmailScreen';
import EmailConfirmationScreen from '../Screen/EmailConfirmationScreen';
import InviteScreen from '../Screen/InviteScreen';
import ContactScreen from '../Screen/ContactScreen';
import SustainabilityCoursesScreen from '../Screen/SustainabilityCoursesScreen';
import CampaignsScreen from '../Screen/CampaignsScreen';
import SplashScreen from '../Screen/SplashScreen';
import FAQScreen from '../Screen/FaqScreen';
import EcommerceHomeScreen from '../Screen/EcommorceHomeScreen';
import CategoryListScreen from '../Screen/Ecommerce/CategoryListScreen';
import CategoryProductsScreen from '../Screen/Ecommerce/CategoryProductsScreen';
import ProductDetailsScreen from '../Screen/Ecommerce/ProductDetailsScreen';
import CartScreen from '../Screen/Ecommerce/CartScreen';
import CheckoutScreen from '../Screen/Ecommerce/CheckoutScreen';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
        detachInactiveScreens: true,
      }}>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="ReferralCodeScreen"
        component={ReferralCodeScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="NotificationPermissionScreen"
        component={NotificationPermissionScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="MaindashboardDrawer"
        component={MyDrawer}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="EditEmailScreen"
        component={EditEmailScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="EmailConfirmationScreen"
        component={EmailConfirmationScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="InviteScreen"
        component={InviteScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />

      <Stack.Screen
        name="SustainabilityCoursesScreen"
        component={SustainabilityCoursesScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />

      <Stack.Screen
        name="CampaignsScreen"
        component={CampaignsScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="FAQScreen"
        component={FAQScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="EcommerceHomeScreen"
        component={EcommerceHomeScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />

      <Stack.Screen
        name="CategoryListScreen"
        component={CategoryListScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />

      <Stack.Screen
        name="CategoryProductsScreen"
        component={CategoryProductsScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />

      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />

      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />

      <Stack.Screen
        name="CheckoutScreen"
        component={CheckoutScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
}

export default MyStack;
