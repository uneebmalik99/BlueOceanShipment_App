import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ShippingRates from '../screens/Authorized/CustomerScreens/CustomerDrawer/ShippingRates';
import TowingRates from '../screens/Authorized/CustomerScreens/CustomerDrawer/TowingRates';
import AppBackground from '../components/AppBackground';
import {SIZES, COLORS, SVGBackground, SVGVehicle} from '../constants/theme';
import {SvgXml} from 'react-native-svg';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const Tab = createMaterialTopTabNavigator();

const MyTabs = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: '6%',
          backgroundColor: COLORS.primary,
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '5%',
          }}>
          <TouchableOpacity style={{}} onPress={() => navigation.openDrawer()}>
            <MaterialCommunity name="menu" size={25} color={COLORS.white} />
          </TouchableOpacity>

          <View>
            <Text
              style={{fontSize: 16, color: COLORS.white, fontWeight: 'bold'}}>
              Rate
            </Text>
          </View>
          <View />
        </View>
      </View>
      <Tab.Navigator
        screenOptions={({route}) => ({
          header: () => null,
          tabBarStyle: {backgroundColor: COLORS.primary},
          tabBarActiveTintColor: COLORS.white,
          tabBarInactiveTintColor: COLORS.black,
          tabBarLabelStyle: {
            textTransform: 'capitalize',
            fontSize: 16,
          },
          tabBarIndicatorStyle: {backgroundColor: COLORS.white},
        })}>
        <Tab.Screen name="Shipping Rates" component={ShippingRates} />
        <Tab.Screen name="Towing Rates" component={TowingRates} />
      </Tab.Navigator>
    </View>
  );
};

export default MyTabs;
