import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';
import VehicleHeader from '../../../../components/VehicleHeader';
import {COLORS, SIZES} from '../../../../constants/theme';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddVehicle({navigation}) {
  const [vin, setVin] = useState(null);
  const [status, setStatus] = useState(null);
  const [make, setMake] = useState(null);
  const [lot, setLot] = useState(null);
  const [shipper, setShipper] = useState(null);

  const AddVehicle = async () => {
    const data = {
      vin: vin,
      status: status,
      lot: lot,
      shipper_name: shipper,
      make: make,
      // vehicle_id: 101,
    };

    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        console.log('Token retrieved from AsyncStorage:', token);

        var url = 'https://app.ecsapshipping.com/api/auth/vehicle/create';

        console.log('Data Provided: ' + JSON.stringify(data));
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify(data),
        })
          .then(response => response.json())
          .then(responseJson => {
            if (responseJson.status == 'Success') {
              console.log(responseJson.message);
              console.log(JSON.stringify(responseJson));
              alert('Add Success');
            } else {
              alert('Add Failed: ' + JSON.stringify(responseJson));
              console.log('UnSuccess ', responseJson);
            }
          })
          .catch(error => {
            alert(error);
            console.warn(error);
          });
      }
    } catch (error) {
      console.warn('Error while retrieving token from AsyncStorage:', error);
    }
  };

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

      <View style={{alignItems: 'center', marginTop: 20}}>
        <TextInput
          placeholder={'Enter vin'}
          onChangeText={text => setVin(text)}
          value={vin}
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

        <View style={{marginTop: 15}}>
          <TextInput
            placeholder={'Enter status'}
            value={status}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={text => setStatus(text)}
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
        </View>

        <View style={{marginTop: 15}}>
          <TextInput
            placeholder={'Enter lot'}
            onChangeText={text => setLot(text)}
            value={lot}
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
        </View>
        <View style={{marginTop: 15}}>
          <TextInput
            placeholder={'Enter shipper name'}
            onChangeText={text => setShipper(text)}
            value={shipper}
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
        </View>
        <View style={{marginTop: 15}}>
          <TextInput
            placeholder={'Enter make'}
            onChangeText={text => setMake(text)}
            value={make}
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
          onPress={AddVehicle}>
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
