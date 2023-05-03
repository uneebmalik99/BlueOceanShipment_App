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
export default function CustomerBottomTabs({route}) {
  // const {params} = route.params;
  // console.log('In Bottom Tabs: ' + JSON.stringify(route.params.userImage));
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarLabel: ({focused}) => {
          return (
            <Text
              style={{
                fontSize: 13,
                fontWeight: 'bold',
                color: focused ? COLORS.white : 'grey',
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
          } else if (route.name === 'Shipment') {
            iconName = 'apps-box';
          } else if (route.name === 'Vehicle') {
            iconName = 'car';
          } else if (route.name === 'Invoice') {
            iconName = 'file-document';
          }

          const iconColor = focused ? COLORS.white : 'grey';

          return <Icon name={iconName} size={20} color={iconColor} />;
        },
        headerShown: false,
      })}
      tabBarOptions={{}}
      appearance={{
        activeTabBackgrounds: COLORS.primary,
        // dotSize: 20,
        floating: true,
        tabBarBackground: '#ECF0F1',
        // whenActiveShow: 'both',
        // whenInactiveShow: 'both',
      }}>
      <Tab.Screen
        name="Home"
        component={CustomerDashboard}
        initialParams={{userImage: route.params.userImage}}
      />
      <Tab.Screen name="Vehicle" component={CustomerVehicle} />
      <Tab.Screen name="Shipment" component={CustomerContainer} />
      <Tab.Screen name="Invoice" component={CustomerInvoice} />
    </Tab.Navigator>
  );
}
