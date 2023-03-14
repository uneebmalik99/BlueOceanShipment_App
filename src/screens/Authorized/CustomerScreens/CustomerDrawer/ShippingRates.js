import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {SIZES, COLORS} from '../../../../constants/theme';
import Entypo from 'react-native-vector-icons/Entypo';

export default function Rate() {
  return (
    <View style={{flex: 1, backgroundColor: '#C3E7F8'}}>
      <View style={{alignItems: 'center', marginTop: 25}}>
        {/* first item in list */}
        <TouchableOpacity
          style={{
            height: SIZES.windowHeight / 6,
            width: SIZES.windowWidth / 1.1,
            backgroundColor: COLORS.primary,
            borderRadius: 20,
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: 25,
              width: 25,
              backgroundColor: COLORS.white,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 15,
              position: 'absolute',
              top: 10,
              right: 10,
            }}>
            <Entypo name="check" size={20} color="green" />
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              justifyContent: 'center',
            }}>
            {/* Item 1 */}
            <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{width: '50%'}}>
                <Text style={{color: COLORS.white}}>Container Size: 315</Text>
              </View>
              <View>
                <Text style={{color: COLORS.white}}>Vehicles: 15</Text>
              </View>
            </View>

            {/* Item 2 */}
            <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{width: '50%'}}>
                <Text style={{color: COLORS.white}}>Loading Port: 15</Text>
              </View>
              <View>
                <Text style={{color: COLORS.white}}>Shipping Line: 15</Text>
              </View>
            </View>

            {/* Item 3 */}
            <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{width: '50%'}}>
                <Text style={{color: COLORS.white}}>Destination: 15</Text>
              </View>
              <View
                style={{
                  height: '60%',
                  width: 80,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Text style={{color: COLORS.black}}>500$</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* Second item in list */}
        <TouchableOpacity
          style={{
            height: SIZES.windowHeight / 6,
            width: SIZES.windowWidth / 1.1,
            backgroundColor: COLORS.primary,
            borderRadius: 20,
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <View
            style={{
              height: 25,
              width: 25,
              backgroundColor: COLORS.white,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 15,
              position: 'absolute',
              top: 10,
              right: 10,
            }}>
            <Entypo name="cross" size={20} color="red" />
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              justifyContent: 'center',
            }}>
            {/* Item 1 */}
            <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{width: '50%'}}>
                <Text style={{color: COLORS.white}}>Container Size: 315</Text>
              </View>
              <View>
                <Text style={{color: COLORS.white}}>Vehicles: 15</Text>
              </View>
            </View>

            {/* Item 2 */}
            <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{width: '50%'}}>
                <Text style={{color: COLORS.white}}>Loading Port: 15</Text>
              </View>
              <View>
                <Text style={{color: COLORS.white}}>Shipping Line: 15</Text>
              </View>
            </View>

            {/* Item 3 */}
            <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{width: '50%'}}>
                <Text style={{color: COLORS.white}}>Destination: 15</Text>
              </View>
              <View
                style={{
                  height: '60%',
                  width: 80,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Text style={{color: COLORS.black}}>500$</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
