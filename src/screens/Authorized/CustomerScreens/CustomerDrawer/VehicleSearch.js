import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import VehicleHeader from '../../../../components/VehicleHeader';
import {COLORS, SIZES, SVGVehicle} from '../../../../constants/theme';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {SvgXml} from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VehicleSearch({navigation}) {
  const [vin, setVin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isData, setIsData] = useState(false);
  const [vehicleInfo, setVehicleInfo] = useState([]);
  //   console.log(vin);

  const Search = async () => {
    if (vin.length == 0) {
      console.log('Please Enter Vin/Lot Number');
      alert('Please Enter Vin/Lot Number');
    } else {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
          console.log('Token retrieved from AsyncStorage:', token);
          try {
            setIsLoading(true);
            var url = 'https://app.ecsapshipping.com/api/auth/vehicle/search';
            var value = {};

            value.vin_lot_no = vin;

            console.log('Search_key_vale ', value);
            fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
              },
              body: JSON.stringify(value),
            })
              .then(response => response.json())
              .then(responseJson => {
                console.log(responseJson.message);
                if (responseJson.status == 'Success') {
                  setIsLoading(false);
                  setVehicleInfo(responseJson);
                  setIsData(true);
                } else {
                  setIsLoading(false);
                  console.log('Status: ' + responseJson.status);
                  alert('Vin/Lot not found');
                }
              })
              .catch(error => {
                alert('Error while search ' + error);
                console.warn(error);
              });
          } catch (error) {
            console.error(error);
          }
        }
      } catch (error) {
        console.warn('Error while retrieving token from AsyncStorage:', error);
      }
    }
  };

  function InsideText({Text1, Text2}) {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{width: '40%'}}>
          <Text style={{color: COLORS.white, fontSize: 14}}>{Text1}</Text>
        </View>

        <View>
          <Text
            style={{
              color: COLORS.black,
              fontSize: 13,
              paddingLeft: 10,
              textAlign: 'justify',
            }}>
            {Text2}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <VehicleHeader
        HeaderTitle={'Search Vehicle'}
        GoBack={() => navigation.goBack()}
      />

      <View style={{position: 'absolute'}}>
        <SvgXml
          xml={SVGVehicle}
          width={SIZES.windowWidth}
          height={SIZES.windowHeight}
        />
      </View>

      {/* search bar view */}
      <View style={{alignItems: 'center', marginTop: 80}}>
        <View
          style={{
            height: SIZES.windowHeight / 12,
            width: SIZES.windowWidth / 1.2,
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
            placeholder="Enter vin number"
            placeholderTextColor={'grey'}
            onChangeText={text => setVin(text)}
          />
        </View>
      </View>

      <View
        style={{paddingHorizontal: 20, paddingTop: 10, alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            height: SIZES.windowHeight / 18,
            width: SIZES.windowWidth / 2.5,
            borderRadius: 10,
          }}
          onPress={Search}>
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
            <Text style={{color: COLORS.white, fontSize: 16}}>Search</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {isLoading == true && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} color={COLORS.primary} />
        </View>
      )}

      {isData == true && (
        <View style={{marginTop: 30}}>
          <TouchableOpacity
            style={{
              height: SIZES.windowHeight / 8,
              width: SIZES.windowWidth,
              marginTop: 10,
              paddingHorizontal: 20,
            }}
            onPress={() =>
              navigation.navigate('VehicleDetails', {
                Data: vehicleInfo.data[0],
              })
            }>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#1A72DE', 'rgba(35, 111, 204, 0.19)']}
              style={{
                flex: 1,
                borderRadius: 15,
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
                  <InsideText
                    Text1={'Vin No: '}
                    Text2={vehicleInfo.data[0].vin}
                  />
                  <InsideText
                    Text1={'Shipper Name: '}
                    Text2={vehicleInfo.data[0].shipper_name}
                  />
                  <InsideText
                    Text1={'Lot No: '}
                    Text2={vehicleInfo.data[0].lot}
                  />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
