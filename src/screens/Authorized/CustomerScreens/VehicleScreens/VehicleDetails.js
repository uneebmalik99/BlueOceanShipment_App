import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SIZES, COLORS} from '../../../../constants/theme';
import LinearGradient from 'react-native-linear-gradient';
import VehicleHeader from '../../../../components/VehicleHeader';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

export default function VehicleDetails({navigation, route}) {
  //data coming from vehicle screens
  const {ID} = route.params;
  const [details, setDetails] = useState(null);
  const isFocused = useIsFocused();
  const [imageTab, setImageTab] = useState(0);

  var asset_url = 'https://app.ecsapshipping.com/public/';

  useEffect(() => {
    const ViewDetails = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          console.log('Token retrieved from AsyncStorage:', token);

          const url = `https://app.ecsapshipping.com/api/auth/vehicle/show/${ID}`;

          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
          });

          const data = await response.json();

          if (data.status == 'Success') {
            console.log('Fetched Vehicle Details Successfully');
            setDetails(data);
            // console.log(JSON.stringify(data));
          } else {
            console.log('UnSuccess ', data);
          }
        }
      } catch (error) {
        console.warn('Error while retrieving token from AsyncStorage:', error);
      }
    };

    ViewDetails();
  }, [isFocused]);

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
        }}>
        <Text style={{color: COLORS.black, textAlign: 'justify', fontSize: 14}}>
          {ItemText}
        </Text>
      </View>
    );
  }
  // flatlist render function
  const renderItem = ({item}) => {
    return (
      <View style={{margin: 5}}>
        <Image
          source={{uri: asset_url + item.name}}
          resizeMode="contain"
          style={{height: 60, width: 60}}
        />
      </View>
    );
  };

  const renderPickup = ({item}) => {
    console.log(item.thumbnail);
    return (
      <View style={{margin: 5}}>
        <Image
          source={{uri: asset_url + item.name}}
          resizeMode="contain"
          style={{height: 60, width: 60}}
        />
      </View>
    );
  };

  const renderAuction = ({item}) => {
    return (
      <View style={{marginHorizontal: 5, marginVertical: 5}}>
        <Image
          source={{uri: asset_url + item.name}}
          resizeMode="contain"
          style={{height: 60, width: 60}}
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={{alignItems: 'center', marginBottom: '5%'}}>
        <View
          style={{
            width: SIZES.windowWidth / 1.2,
            height: SIZES.windowHeight / 4,
            backgroundColor: 'white',
            marginTop: 10,
            borderWidth: 1,
            borderRadius: 10,

            marginTop: '20%',
          }}>
          {/* View for tabs */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              // width: "100%"
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: imageTab == 0 ? '#c1dcfa' : 'white',
                height: SIZES.windowHeight * 0.05,
                width: '33.3%',
                borderTopLeftRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomWidth: 0.7,
                borderColor: imageTab == 0 ? '#c1dcfa' : '#c1dcfa',
              }}
              onPress={() => setImageTab(0)}>
              <Text>Warehouse</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: imageTab == 1 ? '#c1dcfa' : 'white',
                height: SIZES.windowHeight * 0.05,
                width: '33.3%',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomWidth: 0.7,
                borderLeftWidth: 0.7,
                borderColor: imageTab == 1 ? '#c1dcfa' : '#c1dcfa',
              }}
              onPress={() => setImageTab(1)}>
              <Text>Pickup</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: imageTab == 3 ? '#c1dcfa' : 'white',
                height: SIZES.windowHeight * 0.05,
                width: '33.2%',
                borderTopRightRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomWidth: 0.7,
                borderLeftWidth: 0.7,
                borderColor: imageTab == 3 ? '#c1dcfa' : '#c1dcfa',
              }}
              onPress={() => setImageTab(3)}>
              <Text>Auction</Text>
            </TouchableOpacity>
          </View>

          {/* View with flatlist items and gallery and camera buttons */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            {/* Warehouse images */}
            {imageTab == 0 && details != null && (
              <View>
                <FlatList
                  // data={DATA}
                  data={details.data.warehouse_image}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  numColumns={4}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            )}

            {/* Pickup images */}

            {imageTab == 1 && details != null && (
              <View>
                <FlatList
                  data={details.data.pickupimages}
                  // data={Pickup}
                  renderItem={renderPickup}
                  keyExtractor={item => item.id}
                  numColumns={4}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            )}

            {/* Auction images */}
            {imageTab == 3 && details != null && (
              <View>
                <FlatList
                  // data={Auction}
                  data={details.data.auction_image}
                  renderItem={renderAuction}
                  keyExtractor={item => item.id}
                  numColumns={4}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            )}
          </View>
        </View>
      </View>

      <VehicleHeader
        HeaderTitle={'Vehicle Details'}
        GoBack={() => navigation.goBack()}
      />

      {details != null ? (
        <View>
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
                  {details.data.vin}
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
            <ContactItems
              ItemText={
                'Vehicle Details: ' +
                details.data.year +
                ' ' +
                details.data.make +
                ' ' +
                details.data.model
              }
            />

            <View style={{marginTop: 15}}>
              <ContactItems
                ItemText={'Shipper Name: ' + details.data.shipper_name}
              />
            </View>

            <View style={{marginTop: 15}}>
              <ContactItems ItemText={'Lot Number: ' + details.data.lot} />
            </View>
          </View>

          {/* edit vehicle button */}
          {/* <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 20,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                height: SIZES.windowHeight / 18,
                width: SIZES.windowWidth / 1.3,
                borderRadius: 10,
              }}
              onPress={() =>
                navigation.navigate('EditVehicleDetails', {
                  ID: ID,
                  Details: details,
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
                <Text style={{color: COLORS.white, fontSize: 16}}>
                  Edit Details
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View> */}
        </View>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} color={COLORS.primary} />
        </View>
      )}
    </View>
  );
}
