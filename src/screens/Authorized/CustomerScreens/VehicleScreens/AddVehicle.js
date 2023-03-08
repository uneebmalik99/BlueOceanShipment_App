import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import React from 'react';
import VehicleHeader from '../../../../components/VehicleHeader';
import {COLORS, SIZES} from '../../../../constants/theme';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

export default function AddVehicle({navigation}) {
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
          source={require('../../../../assets/images/addImage.jpg')}
          style={{width: SIZES.windowWidth, height: SIZES.windowHeight / 3.5}}
        />
      </View>

      <View style={{position: 'absolute', right: '5%', top: '21%'}}>
        <TouchableOpacity
          style={{
            height: 45,
            width: 45,
            backgroundColor: COLORS.primary,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 23,
          }}
          onPress={() => console.log('Add Vehicle Image')}>
          <MaterialIcons name="add" size={25} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <VehicleHeader
        HeaderTitle={'Add Vehicle'}
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
              VIN No: JTHBE1BL2D5010987
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
