import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {SIZES, COLORS} from '../../../../constants/theme';
import LinearGradient from 'react-native-linear-gradient';
import VehicleHeader from '../../../../components/VehicleHeader';
import IonIcons from 'react-native-vector-icons/Ionicons';

export default function VehicleDetails({navigation, route}) {
  //data coming from vehicle screens
  const {Data} = route.params;

  function ContactItems({ItemText}) {
    return (
      <View
        style={{
          height: SIZES.windowHeight / 12,
          width: SIZES.windowWidth / 1.1,
          backgroundColor: COLORS.lightGray,
          //   alignItems: 'center',
          paddingHorizontal: 20,
          borderRadius: 10,
          shadowColor: COLORS.primary,
          elevation: 5,
          justifyContent: 'center',
          //   borderBottomWidth: 1,
          //   borderBottomColor: COLORS.primary,
        }}>
        <Text style={{color: COLORS.black, textAlign: 'justify', fontSize: 14}}>
          {ItemText}
        </Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      {/* cover of the image */}
      <View>
        <Image
          source={Data.cover}
          style={{width: SIZES.windowWidth, height: SIZES.windowHeight / 4}}
        />
      </View>

      <VehicleHeader
        HeaderTitle={'Vehicle Details'}
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
            <Text style={{color: COLORS.white, fontSize: 16}}>{Data.vin}</Text>
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
        <ContactItems
          ItemText={
            'Vehicle Details: ' + Data.year + ' ' + Data.make + ' ' + Data.model
          }
        />

        <View style={{marginTop: 15}}>
          <ContactItems ItemText={'Shipper Name: ' + Data.shipper_name} />
        </View>

        <View style={{marginTop: 15}}>
          <ContactItems ItemText={'Lot Number: ' + Data.lot} />
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
            navigation.navigate('EditVehicleDetails', {VehicleData: Data})
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
            <Text style={{color: COLORS.white, fontSize: 16}}>
              Edit Details
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
