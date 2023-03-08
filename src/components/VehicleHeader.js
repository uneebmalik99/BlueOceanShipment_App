import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {SIZES, COLORS} from '../constants/theme';
import IonIcons from 'react-native-vector-icons/Ionicons';

export default function VehicleHeader({HeaderTitle, GoBack}) {
  return (
    <View
      style={{
        width: SIZES.windowWidth,
        height: SIZES.windowHeight / 14,
        backgroundColor: 'rgba(29, 119, 231, 0.81)',
        position: 'absolute',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={GoBack}>
        <IonIcons
          name="arrow-back-circle-sharp"
          size={25}
          color={COLORS.white}
        />
      </TouchableOpacity>

      <View>
        <Text style={{color: COLORS.white, fontSize: 18}}>{HeaderTitle}</Text>
      </View>

      <View />
    </View>
  );
}
