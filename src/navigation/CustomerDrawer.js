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
import Customer from '../screens/Authorized/CustomerScreens/CustomerDrawer/Customer';
import CustomerBottomTabs from '../navigation/CustomerBottomTabs';
import ContainerTracking from '../screens/Authorized/CustomerScreens/ContainerScreens/ContainerTracking';

const DrawerNav = createDrawerNavigator();

export default function CustomerDrawer() {
  return (
    <DrawerNav.Navigator
      initialRouteName="CustomerBottoms"
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
        name="CustomerBottoms"
        component={CustomerBottomTabs}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="dashboard" size={25} color={color} />
          ),
          drawerItemStyle: {display: 'none'},
        }}
      />
      <DrawerNav.Screen
        name="Customers"
        component={Customer}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="people" size={25} color={color} />
          ),
        }}
      />
      <DrawerNav.Screen
        name="Track Container"
        component={ContainerTracking}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="md-boat-sharp" size={25} color={color} />
          ),
        }}
      />
    </DrawerNav.Navigator>
  );
}
