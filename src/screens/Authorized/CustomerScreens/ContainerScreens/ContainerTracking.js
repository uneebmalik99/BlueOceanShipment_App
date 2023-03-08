import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React from 'react';
import AppBackground from '../../../../components/AppBackground';
import {SIZES, COLORS, SVGBackground} from '../../../../constants/theme';
import {SvgXml} from 'react-native-svg';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

export default function ContainerTracking({navigation}) {
  function InsideText({Text1, Text2}) {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{width: '40%'}}>
          <Text style={{color: COLORS.white, fontSize: 14}}>{Text1}</Text>
        </View>
        <Text
          style={{
            color: COLORS.white,
            fontSize: 14,
            paddingLeft: SIZES.windowWidth / 18,
          }}>
          {Text2}
        </Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      {/* complete screen background */}
      <View
        style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}>
        <AppBackground />
      </View>

      <View style={{position: 'absolute'}}>
        <SvgXml
          xml={SVGBackground}
          width={SIZES.windowWidth}
          height={SIZES.windowHeight / 4.5}
        />
      </View>

      <View style={{paddingHorizontal: 20, paddingTop: 20}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
            <IonIcons
              name="arrow-back-circle-sharp"
              size={25}
              color={COLORS.white}
            />
          </TouchableOpacity>

          <View>
            <Text
              style={{fontSize: 16, color: COLORS.white, fontWeight: 'bold'}}>
              Track Container
            </Text>
          </View>
          <View />
        </View>

        {/* view for search bar, sort and filter buttons */}
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {/* search bar view */}
          <View
            style={{
              height: SIZES.windowHeight / 18,
              width: SIZES.windowWidth / 1.7,
              backgroundColor: COLORS.white,
              borderRadius: 10,
              alignItems: 'center',
              flexDirection: 'row',
              shadowColor: COLORS.black,
              elevation: 10,
            }}>
            <View style={{paddingLeft: 10}}>
              <MaterialIcons name="search" size={25} color={'grey'} />
            </View>
            <TextInput
              style={{flex: 1, color: 'black'}}
              placeholder="Enter container no"
              placeholderTextColor={'grey'}
            />
          </View>

          {/* filter button view */}
          <View
            style={{
              shadowColor: COLORS.black,
              elevation: 10,
              height: SIZES.windowHeight / 18,
              width: SIZES.windowWidth / 8.5,
              backgroundColor: COLORS.white,
              borderRadius: 10,
            }}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}>
              <MaterialCommunity
                name="filter-variant"
                size={20}
                color={COLORS.black}
              />
            </TouchableOpacity>
          </View>

          {/* sort button view */}
          <View
            style={{
              shadowColor: COLORS.black,
              elevation: 10,
              height: SIZES.windowHeight / 18,
              width: SIZES.windowWidth / 8.5,
              backgroundColor: COLORS.white,
              borderRadius: 10,
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialCommunity
                name="sort-bool-descending"
                size={20}
                color={COLORS.black}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        style={{
          backgroundColor: COLORS.white,
          flex: 1,
          width: '100%',
          marginTop: 30,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          shadowColor: COLORS.black,
          elevation: 3,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            height: SIZES.windowHeight / 6.6,
            width: SIZES.windowWidth,
            marginTop: 10,
            paddingHorizontal: 20,
          }}
          //   onPress={() => navigation.navigate('ContainerDetails')}
        >
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#1A72DE', 'rgba(35, 111, 204, 0.19)']}
            style={{
              borderRadius: 15,
              flex: 1,
            }}>
            {/* view for holding image and vehicle information */}
            <View
              style={{
                paddingHorizontal: 10,
                alignItems: 'center',
                justifyContent: 'space-between',
                flex: 1,
                flexDirection: 'row',
              }}>
              <View>
                <InsideText Text1={'Container No: '} Text2={'123456'} />
                <InsideText Text1={'Loading Port: '} Text2={'Karachi Port'} />
                <InsideText Text1={'Destination: '} Text2={'Islamabad'} />
              </View>

              {/* <View>
              <Image
                source={item.cover}
                resizeMode="contain"
                style={{height: 60, width: 100, borderRadius: 10}}
              />
            </View> */}
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
