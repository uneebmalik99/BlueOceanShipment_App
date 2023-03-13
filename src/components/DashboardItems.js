import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../constants/theme';

export default function DashboardItems({
  Icon1,
  Icon2,
  OnPress1,
  OnPress2,
  Title1,
  Title2,
  Color1,
  Color2,
  Num1,
  Num2,
}) {
  return (
    <View
      style={{
        paddingTop: 30,
        height: SIZES.windowHeight / 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity
        style={{
          width: SIZES.windowWidth / 2.3,
          height: SIZES.windowHeight / 7,
          backgroundColor: COLORS.white,
          borderRadius: 10,
          shadowColor: COLORS.black,
          elevation: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={OnPress1}>
        <View style={{alignItems: 'center'}}>
          <Text style={{color: COLORS.primary}}>{Title1}</Text>
          <View
            style={{
              height: 55,
              width: 55,
              borderRadius: 55 / 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Color1,
            }}>
            <Image
              source={Icon1}
              resizeMode="contain"
              style={{
                height: 35,
                width: 35,
              }}
            />
          </View>
          <Text style={{color: 'red', fontWeight: 'bold'}}>{Num1}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: SIZES.windowWidth / 2.3,
          height: SIZES.windowHeight / 7,
          backgroundColor: COLORS.white,
          borderRadius: 10,
          shadowColor: COLORS.black,
          elevation: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={OnPress2}>
        <View style={{alignItems: 'center'}}>
          <Text style={{color: COLORS.primary}}>{Title2}</Text>
          <View
            style={{
              height: 55,
              width: 55,
              borderRadius: 55 / 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Color2,
            }}>
            <Image
              source={Icon2}
              resizeMode="contain"
              style={{
                height: 35,
                width: 35,
              }}
            />
          </View>
          <Text style={{color: 'red', fontWeight: 'bold'}}>{Num2}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
