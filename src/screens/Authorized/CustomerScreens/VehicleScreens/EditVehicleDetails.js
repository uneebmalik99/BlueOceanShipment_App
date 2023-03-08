import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import React from 'react';
import {SIZES, COLORS} from '../../../../constants/theme';
import LinearGradient from 'react-native-linear-gradient';
import VehicleHeader from '../../../../components/VehicleHeader';
import IonIcons from 'react-native-vector-icons/Ionicons';

export default function EditVehicleDetails({navigation, route}) {
  const {VehicleData} = route.params;

  function ContactItems({Placeholder}) {
    return (
      <TextInput
        placeholder={Placeholder}
        style={{
          height: SIZES.windowHeight / 12,
          width: SIZES.windowWidth / 1.1,
          backgroundColor: COLORS.lightGray,
          paddingLeft: 10,
          borderRadius: 10,
          shadowColor: COLORS.primary,
          elevation: 5,
          borderWidth: 1,
          borderColor: COLORS.lightGray,
          justifyContent: 'center',
          color: 'black',
        }}
      />
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      {/* cover of the image */}
      <View>
        <Image
          source={VehicleData.cover}
          style={{width: SIZES.windowWidth, height: SIZES.windowHeight / 4}}
        />
      </View>

      <VehicleHeader
        HeaderTitle={'Edit Vehicle'}
        GoBack={() => navigation.goBack()}
      />

      <View
        style={{
          height: SIZES.windowHeight / 12,
          width: SIZES.windowWidth,
          backgroundColor: COLORS.primary,
          //   borderTopLeftRadius: 30,
          //   borderTopRightRadius: 30,
          //   bottom: SIZES.windowHeight / 6.2 - 100,
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <View>
            <Text style={{color: COLORS.white, fontSize: 16}}>
              {VehicleData.vin}
            </Text>
          </View>
          <TouchableOpacity>
            <IonIcons
              name="md-qr-code-outline"
              size={25}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{alignItems: 'center', marginTop: 20}}>
        <ContactItems Placeholder={'Muhammad Aamir'} />

        <View style={{marginTop: 15}}>
          <ContactItems Placeholder={'Texas'} />
        </View>

        <View style={{marginTop: 15}}>
          <ContactItems Placeholder={'12345678'} />
        </View>
      </View>

      <View
        style={{paddingHorizontal: 20, paddingTop: 20, alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            height: SIZES.windowHeight / 18,
            width: SIZES.windowWidth / 1.3,
            borderRadius: 10,
          }}
          onPress={() =>
            navigation.navigate('EditVehicleDetails', {
              VehicleData: VehicleData,
            })
          }>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#1A72DE', 'rgba(35, 111, 204, 0.19)']}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}>
            <Text style={{color: COLORS.white, fontSize: 16}}>Save</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
