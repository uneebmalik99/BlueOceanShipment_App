import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  SIZES,
  COLORS,
  SVGBackground,
  SVGVehicle,
} from '../../../../constants/theme';
import {SvgXml} from 'react-native-svg';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppBackground from '../../../../components/AppBackground';
import IonIcons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

const Buttons = ({IconName, ButtonText, OnPress}) => {
  return (
    <TouchableOpacity
      style={{
        height: '12%',
        width: SIZES.windowWidth / 1.1,
        marginTop: 20,
        borderRadius: 10,
        elevation: 2,
        backgroundColor: 'rgba(26,114,222,0.18)',
        justifyContent: 'center',
        paddingHorizontal: 10,
      }}
      onPress={OnPress}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              height: 32,
              width: 32,
              backgroundColor: COLORS.white,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FontAwesome name={IconName} size={16} color={COLORS.primary} />
          </View>
          <View style={{left: 10}}>
            <Text style={{fontSize: 16, color: COLORS.black}}>
              {ButtonText}
            </Text>
          </View>
        </View>

        <View>
          <Entypo name="chevron-right" size={30} color={'#C3C3C3'} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function Watchlist({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <View
        style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}>
        <AppBackground />
      </View>

      {/* header with back button and screen name */}
      <View
        style={{
          width: SIZES.windowWidth,
          height: SIZES.windowHeight / 14,
          backgroundColor: 'rgba(29, 119, 231, 0.81)',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IonIcons
            name="arrow-back-circle-sharp"
            size={25}
            color={COLORS.white}
          />
        </TouchableOpacity>

        <View>
          <Text style={{color: COLORS.white, fontSize: 18}}>Settings</Text>
        </View>

        <View />
      </View>

      <View
        style={{
          backgroundColor: COLORS.white,
          flex: 1,
          width: '100%',
          marginTop: 30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          shadowColor: COLORS.black,
          elevation: 3,
          // alignItems: 'center',
        }}>
        <View style={{position: 'absolute'}}>
          <SvgXml
            xml={SVGVehicle}
            width={SIZES.windowWidth}
            height={SIZES.windowHeight / 1.5}
          />
        </View>

        {/* <View style={{alignItems: 'center', marginTop: 20}}>
          <Text style={{fontSize: 18, color: COLORS.black, fontWeight: 'bold'}}>
            Watchlist
          </Text>
        </View> */}
        <View style={{flex: 1, alignItems: 'center'}}>
          <Buttons
            IconName={'user'}
            ButtonText={'Username'}
            OnPress={() => console.log('Username pressed')}
          />

          <Buttons
            IconName={'phone'}
            ButtonText={'Phone'}
            OnPress={() => console.log('Phone pressed')}
          />

          <Buttons
            IconName={'envelope'}
            ButtonText={'Email'}
            OnPress={() => console.log('Email pressed')}
          />

          <Buttons
            IconName={'lock'}
            ButtonText={'Password'}
            OnPress={() => console.log('Password pressed')}
          />

          <Buttons
            IconName={'location-arrow'}
            ButtonText={'Location'}
            OnPress={() => console.log('Location pressed')}
          />
        </View>
      </View>
    </View>
  );
}
