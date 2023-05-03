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

export default function AboutUs({navigation}) {
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
          <Text style={{color: COLORS.white, fontSize: 18}}>About Us</Text>
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

        <View style={{alignItems: 'center', marginTop: 20}}>
          <Text style={{fontSize: 18, color: COLORS.black, fontWeight: 'bold'}}>
            About Us
          </Text>
        </View>

        <View
          style={{alignItems: 'center', marginTop: 20, paddingHorizontal: 10}}>
          <Text
            style={{fontSize: 14, color: COLORS.black, textAlign: 'center'}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
        </View>
      </View>
    </View>
  );
}
