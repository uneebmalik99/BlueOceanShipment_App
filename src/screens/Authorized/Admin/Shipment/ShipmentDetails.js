import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import {SIZES, COLORS} from '../../../../constants/theme';
import LinearGradient from 'react-native-linear-gradient';
import VehicleHeader from '../../../../components/VehicleHeader';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ShipmentDetails({navigation, route}) {
  //data coming from vehicle screens
  const {Data} = route.params;

  function renderVehicle({item}) {
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
        <TouchableOpacity
          style={{
            height: SIZES.windowHeight / 8,
            width: SIZES.windowWidth,
            marginTop: 10,
            paddingHorizontal: 20,
          }}
          onPress={() =>
            navigation.navigate('AdminVehicleDetails', {Data: item})
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
                <InsideText Text1={'Vin No: '} Text2={item.vin} />
                <InsideText
                  Text1={'Shipper Name: '}
                  Text2={item.shipper_name}
                />
                <InsideText Text1={'Lot No: '} Text2={item.lot} />
                {/* <InsideText
                  Text1={'Destination: '}
                  Text2={item.destination_country}
                /> */}
              </View>
              {/* <View>
                <Text style={{color: COLORS.white, fontSize: 14}}>
                  Vin No: {item.vin}
                </Text>
                <Text style={{color: COLORS.white, fontSize: 14}}>
                  "Shipper Name: "{item.shipper_name}
                </Text>
                <Text style={{color: COLORS.white, fontSize: 14}}>
                  "Lot Number: "{item.lot}
                </Text>
              </View> */}

              <View>
                <Image
                  source={item.cover}
                  resizeMode="contain"
                  style={{height: 60, width: 100, borderRadius: 10}}
                />
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }

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
      {/* <View>
        <Image
          source={Data.cover}
          style={{width: SIZES.windowWidth, height: SIZES.windowHeight / 4}}
        />
      </View> */}

      {/* <VehicleHeader
        HeaderTitle={'Container Details'}
        GoBack={() => navigation.goBack()}
      /> */}

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
              Container No: {Data.container_no}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('EditShipment', {ContainerData: Data})
            }>
            <MaterialCommunity
              name="pencil-box-multiple"
              size={25}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{alignItems: 'center', marginTop: 20}}>
        <ContactItems ItemText={'Company Name: ' + Data.company_name} />

        <View style={{marginTop: 15}}>
          <ContactItems ItemText={'Shippment Type: ' + Data.shipment_type} />
        </View>

        <View style={{marginTop: 15}}>
          <ContactItems ItemText={'Booking No: ' + Data.booking_number} />
        </View>
      </View>

      <View style={{flex: 1}}>
        <View
          style={{
            height: SIZES.windowHeight / 12,
            width: SIZES.windowWidth,
            backgroundColor: COLORS.primary,
            marginTop: 30,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}>
          <Text style={{fontSize: 16, color: COLORS.white, fontWeight: 'bold'}}>
            Vehicles
          </Text>
        </View>

        <View>
          <FlatList
            data={Data.vehicle}
            keyExtractor={item => item.id}
            contentContainerStyle={{
              paddingBottom: '30%',
              paddingTop: 10,
            }}
            renderItem={renderVehicle}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>

      {/* <View
        style={{paddingHorizontal: 20, paddingTop: 20, alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            height: SIZES.windowHeight / 18,
            width: SIZES.windowWidth / 1.3,
            borderRadius: 10,
          }}
          onPress={() =>
            navigation.navigate('EditContainer', {ContainerData: Data})
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
  );
}
