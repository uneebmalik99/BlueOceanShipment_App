import {View, Text} from 'react-native';
import React from 'react';
import {
  AnimatedTabBarNavigator,
  DotSize,
} from 'react-native-animated-nav-tab-bar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, SIZES} from '../constants/theme';
import CustomerContainer from '../screens/Authorized/CustomerScreens/BottomTabs/CustomerContainer';
import CustomerDashboard from '../screens/Authorized/CustomerScreens/BottomTabs/CustomerDashboard';
import CustomerVehicle from '../screens/Authorized/CustomerScreens/BottomTabs/CustomerVehicle';
import CustomerInvoice from '../screens/Authorized/CustomerScreens/BottomTabs/CustomerInvoices';

const Tab = AnimatedTabBarNavigator();
export default function CustomerBottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarLabel: ({focused}) => {
          return (
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: focused ? COLORS.primary : 'grey',
                left: 3,
              }}>
              {route.name}
            </Text>
          );
        },
        tabBarIcon: ({focused}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-variant';
          } else if (route.name === 'Container') {
            iconName = 'apps-box';
          } else if (route.name === 'Vehicle') {
            iconName = 'car';
          } else if (route.name === 'Invoice') {
            iconName = 'file-document';
          }

          const iconColor = focused ? COLORS.primary : 'grey';

          return <Icon name={iconName} size={25} color={iconColor} />;
        },
        headerShown: false,
      })}
      tabBarOptions={{}}
      appearance={{
        activeTabBackgrounds: 'rgba(25, 112, 221, 0.3)',
        // dotSize: 20,
        floating: true,
        tabBarBackground: '#D3D3D3',
        // whenActiveShow: 'both',
        // whenInactiveShow: 'both',
      }}>
      <Tab.Screen name="Home" component={CustomerDashboard} />
      <Tab.Screen name="Container" component={CustomerContainer} />
      <Tab.Screen name="Vehicle" component={CustomerVehicle} />
      <Tab.Screen name="Invoice" component={CustomerInvoice} />
    </Tab.Navigator>
  );
}
