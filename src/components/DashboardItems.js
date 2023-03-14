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
        // paddingTop: 30,
        // height: SIZES.windowHeight / 6,
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
          justifyContent: 'center',
        }}
        onPress={OnPress1}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{right: '15%'}}>
              <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>
                {Title1}
              </Text>
              <Text style={{color: 'red', fontWeight: 'bold'}}>{Num1}</Text>
            </View>
            <View style={{left: '15%'}}>
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
                    height: 30,
                    width: 30,
                  }}
                />
              </View>
            </View>
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
          justifyContent: 'center',
        }}
        onPress={OnPress2}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{right: '15%'}}>
              <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>
                {Title2}
              </Text>
              <Text style={{color: 'red', fontWeight: 'bold'}}>{Num2}</Text>
            </View>
            <View style={{left: '15%'}}>
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
                    height: 30,
                    width: 30,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
