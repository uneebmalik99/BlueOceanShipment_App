import 'react-native-gesture-handler';
import {View, Text, Image} from 'react-native';
import React from 'react';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from '../screens/UnauthorizedScreens/Login';
import ContactUs from '../screens/UnauthorizedScreens/LoginDrawerScreens/ContactUs';
import OurServices from '../screens/UnauthorizedScreens/LoginDrawerScreens/OurServices';
import VehicleSearch from '../screens/UnauthorizedScreens/LoginDrawerScreens/VehicleSearch';
import ContainerSearch from '../screens/UnauthorizedScreens/LoginDrawerScreens/ContainerSearch';
import Welcome from '../screens/UnauthorizedScreens/Welcome';
import {COLORS, SIZES, TEXT} from '../constants/theme';

const DrawerNav = createDrawerNavigator();

export default function UnAuthDrawer() {
  return (
    <DrawerNav.Navigator
      initialRouteName="Welcome"
      screenOptions={{headerShown: false}}
      drawerContent={({navigation}) => (
        <View style={{paddingLeft: 20}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: SIZES.radius,
            }}>
            <Image
              source={require('../assets/logo2.png')}
              resizeMode="contain"
              style={{height: 50, width: 50, borderRadius: 50}}
            />
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                left: 10,
                fontWeight: 'bold',
              }}>
              {TEXT.title}
            </Text>
          </View>

          <View style={{marginTop: 40}}>
            <DrawerItem
              icon={() => (
                <View>
                  <Icon
                    name="phone-in-talk"
                    size={SIZES.radius}
                    color={COLORS.primary}
                  />
                </View>
              )}
              label="Contact Us"
              labelStyle={{color: 'grey', fontSize: 16, right: 15}}
              pressColor={'green'}
              onPress={() => navigation.navigate('ContactUs')}
            />

            <DrawerItem
              icon={() => (
                <View>
                  <Icon
                    name="miscellaneous-services"
                    size={SIZES.radius}
                    color={COLORS.primary}
                  />
                </View>
              )}
              label="Our Services"
              labelStyle={{color: 'grey', fontSize: 16, right: 15}}
              pressColor={'green'}
              onPress={() => navigation.navigate('OurServices')}
            />

            <DrawerItem
              icon={() => (
                <View>
                  <IconCommunity
                    name="file-table-box-outline"
                    size={SIZES.radius}
                    color={COLORS.primary}
                  />
                </View>
              )}
              label="Search Container"
              labelStyle={{color: 'grey', fontSize: 16, right: 15}}
              pressColor={'green'}
              onPress={() => navigation.navigate('SearchContainer')}
            />

            <DrawerItem
              icon={() => (
                <View>
                  <Ionicons
                    name="car-sport-sharp"
                    size={SIZES.radius}
                    color={COLORS.primary}
                  />
                </View>
              )}
              label="Search Vehicle"
              labelStyle={{color: 'grey', fontSize: 16, right: 15}}
              pressColor={'green'}
              onPress={() => navigation.navigate('SearchVehicle')}
            />
          </View>
        </View>
      )}>
      <DrawerNav.Screen name="Welcome" component={Welcome} />
      <DrawerNav.Screen name="Login" component={Login} />
      <DrawerNav.Screen name="ContactUs" component={ContactUs} />
      <DrawerNav.Screen name="OurServices" component={OurServices} />
      <DrawerNav.Screen name="SearchVehicle" component={VehicleSearch} />
      <DrawerNav.Screen name="SearchContainer" component={ContainerSearch} />
    </DrawerNav.Navigator>
  );
}
