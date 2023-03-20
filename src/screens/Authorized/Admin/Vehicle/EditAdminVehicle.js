import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {SIZES, COLORS} from '../../../../constants/theme';
import LinearGradient from 'react-native-linear-gradient';
import VehicleHeader from '../../../../components/VehicleHeader';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditAdminVehicle({navigation, route}) {
  const {ID, Details} = route.params;
  var asset_url = 'https://app.ecsapshipping.com/public/';
  //   console.log(VehicleData.title);
  const [lot, setLot] = useState('');
  //   console.log(lot);
  const [title, setTitle] = useState('');
  const [key, setKey] = useState('');
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');

  const update = async () => {
    var value = new FormData();

    value.append('vehicle_id', ID);
    {
      lot.length != 0 && value.append('lot', lot);
    }
    {
      title.length != 0 && value.append('title', title);
    }
    {
      key.length != 0 && value.append('key', key);
    }
    {
      year.length != 0 && value.append('year', year);
    }
    {
      make.length != 0 && value.append('make', make);
    }
    {
      model.length != 0 && value.append('model', model);
    }

    // value.append('customer_name', companyName);
    // value.append('buyer_id', buyer);

    // value.append('warehouse_images[]', warehouseImage);
    // value.append('pickup[]', pickupImage);
    // value.append('auction_images[]', auctionImage);

    console.log('===' + JSON.stringify(value));
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        console.log('Token retrieved from AsyncStorage:', token);

        var url = 'https://app.ecsapshipping.com/api/auth/vehicle/update';

        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: value,
        })
          .then(response => response.json())
          .then(responseJson => {
            if (responseJson.status == 'Success') {
              //   setWareHouseImage([]);
              //   setAuctionImage([]);
              //   setPickupImage([]);
              console.log('Success');
              alert('Update Success');
            } else {
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
        {!Details.data.warehouse_image ||
        Details.data.warehouse_image.length === 0 ? (
          <View
            style={{
              width: SIZES.windowWidth,
              height: SIZES.windowHeight / 4,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: COLORS.black}}>No Image</Text>
          </View>
        ) : (
          <Image
            source={{
              uri: asset_url + Details.data.warehouse_image[0].name,
            }}
            resizeMode="cover"
            style={{width: SIZES.windowWidth, height: SIZES.windowHeight / 4}}
          />
        )}
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
              {Details.data.vin}
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

      <ScrollView>
        <View style={{alignItems: 'center', marginTop: 20}}>
          {/* lot textinput */}
          <TextInput
            placeholder={'enter lot'}
            onChangeText={text => setLot(text)}
            keyboardType={'number-pad'}
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

          {/* title textinput */}
          <View style={{marginTop: 15}}>
            <TextInput
              placeholder={'Enter title'}
              onChangeText={text => setTitle(text)}
              value={title}
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
              placeholder={'Enter year'}
              onChangeText={text => setYear(text)}
              value={year}
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
          <View style={{marginTop: 15}}>
            <TextInput
              placeholder={'Enter model'}
              onChangeText={text => setModel(text)}
              value={model}
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
            onPress={update}>
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
      </ScrollView>
    </View>
  );
}
