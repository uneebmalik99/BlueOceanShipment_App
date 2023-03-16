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
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity
        style={{
          width: SIZES.windowWidth / 2.3,
          height: SIZES.windowHeight / 8,
          backgroundColor: '#F9F9F9',
          borderRadius: 10,
          shadowColor: COLORS.black,
          elevation: 5,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}
        onPress={OnPress1}>
        <View>
          <Text
            style={{
              color: COLORS.primary,
              fontWeight: 'bold',
              bottom: '15%',
              fontSize: 12,
            }}>
            {Title1}
          </Text>
          <Text style={{color: 'red', fontWeight: 'bold', top: '15%'}}>
            {Num1}
          </Text>
        </View>

        <View>
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Color1,
            }}>
            <Image
              source={Icon1}
              resizeMode="contain"
              style={{
                height: 30,
                width: 30,
              }}
            />
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: SIZES.windowWidth / 2.3,
          height: SIZES.windowHeight / 8,
          backgroundColor: '#F9F9F9',
          borderRadius: 10,
          shadowColor: COLORS.black,
          elevation: 5,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}
        onPress={OnPress2}>
        <View>
          <Text
            style={{
              color: COLORS.primary,
              fontWeight: 'bold',
              bottom: '15%',
              fontSize: 12,
            }}>
            {Title2}
          </Text>
          <Text style={{color: 'red', fontWeight: 'bold', top: '15%'}}>
            {Num2}
          </Text>
        </View>

        <View>
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Color2,
            }}>
            <Image
              source={Icon2}
              resizeMode="contain"
              style={{
                height: 30,
                width: 30,
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
