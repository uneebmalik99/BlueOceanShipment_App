import 'react-native-gesture-handler';
import {View, Text, Image, ImageBackground} from 'react-native';
import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES, TEXT} from '../constants/theme';
import AllVehicle from '../screens/Authorized/Admin/Vehicle/AllVehicle';
import AllShipments from '../screens/Authorized/Admin/Shipment/AllShipments';

const DrawerNav = createDrawerNavigator();

export default function AdminDrawer() {
  return (
    <DrawerNav.Navigator
      initialRouteName="All Vehicles"
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: COLORS.draweritems,
        drawerInactiveBackgroundColor: COLORS.white,
        drawerActiveTintColor: COLORS.white,
        drawerInactiveTintColor: COLORS.draweritems,
        drawerLabelStyle: {marginLeft: -20},
        drawerItemStyle: {
          borderRadius: 20,
          shadowColor: 'grey',
          elevation: 3,
          // marginTop: 10,
        },
        overlayColor: 'rgba(30, 138, 225, 0.5)',
      }}
      drawerContent={({...props}) => (
        <View style={{flex: 1, backgroundColor: '#D6E3F3'}}>
          <ImageBackground
            source={require('../assets/images/customerDrawer.png')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: SIZES.windowHeight / 8,
              marginTop: 30,
            }}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <View>
                <Image
                  source={require('../assets/images/model.jpg')}
                  resizeMode="contain"
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                    borderWidth: 1,
                    borderColor: COLORS.white,
                    marginLeft: 10,
                  }}
                />
              </View>

              <View style={{paddingLeft: 10}}>
                <Text style={{color: COLORS.white, fontSize: 14}}>
                  Master Admin
                </Text>
                <Text style={{color: COLORS.white, fontSize: 14}}>
                  masteradmin@gmail.com
                </Text>
              </View>
            </View>
          </ImageBackground>

          <DrawerContentScrollView {...props} contentContainerStyle={{flex: 1}}>
            <View style={{paddingTop: 30}}>
              <DrawerItemList {...props} />
            </View>
          </DrawerContentScrollView>
        </View>
      )}>
      <DrawerNav.Screen
        name="All Vehicles"
        component={AllVehicle}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="car-sport-sharp" size={25} color={color} />
          ),
        }}
      />
      <DrawerNav.Screen
        name="All Shipments"
        component={AllShipments}
        options={{
          drawerIcon: ({color}) => (
            <IconCommunity
              name="truck-cargo-container"
              size={25}
              color={color}
            />
          ),
        }}
      />
    </DrawerNav.Navigator>
  );
}
