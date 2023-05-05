import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SIZES, COLORS, IMAGE_URL} from '../../../../constants/theme';
import LinearGradient from 'react-native-linear-gradient';
import VehicleHeader from '../../../../components/VehicleHeader';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function ShipmentDetails({navigation, route}) {
  //data coming from vehicle screens
  const {ID, IMAGES} = route.params;
  // console.log(DATA);
  const [details, setDetails] = useState(null);
  const isFocused = useIsFocused();
  const [showGeneral, setShowGeneral] = useState(false);
  const [showVehicles, setShowVehicles] = useState(false);

  const LineDivider = () => {
    return (
      <View
        style={{
          height: 0.5,
          backgroundColor: 'grey',
          width: '100%',
          marginTop: 5,
        }}
      />
    );
  };

  useEffect(() => {
    const ViewDetails = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          console.log('Token retrieved from AsyncStorage:', token);

          const url = `https://app.ecsapshipping.com/api/auth/shipment/show/${ID}`;

          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
          });

          const data = await response.json();

          if (data.status == 'Success') {
            console.log('Fetched Shipment Details Successfully');
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

  // flatlist render function
  const renderItem = ({item}) => {
    return (
      <View>
        <Image
          source={{uri: IMAGE_URL + item.name}}
          resizeMode="cover"
          style={{width: SIZES.windowWidth, height: SIZES.windowHeight / 3}}
        />
      </View>
    );
  };

  function renderVehicle({item}) {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={{
            height: SIZES.windowHeight / 8,
            width: SIZES.windowWidth,
            marginTop: 10,
            paddingHorizontal: 20,
          }}
          onPress={() => navigation.navigate('VehicleDetails', {ID: item.id})}>
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
              </View>

              <View>
                <Image
                  source={item.cover}
                  resizeMode="contain"
                  style={{height: 60, width: 100, borderRadius: 10}}
                />
              </View>

              <View style={{position: 'absolute', right: '3%'}}>
                {!item.warehouse_image || item.warehouse_image.length === 0 ? (
                  <View
                    style={{
                      height: 50,
                      width: 70,
                      borderRadius: 10,
                      borderWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{color: COLORS.black}}>No Image</Text>
                  </View>
                ) : (
                  <Image
                    source={{
                      uri: asset_url + item.warehouse_image[0].name,
                    }}
                    resizeMode="cover"
                    style={{height: 50, width: 70, borderRadius: 10}}
                  />
                )}
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

  function StatusColor() {
    if (details.data.status == 1) {
      return COLORS.onhandStatus;
    } else if (details.data.status == 2) {
      return COLORS.dispatched;
    } else if (details.data.status == 3) {
      return COLORS.notitle;
    } else {
      return COLORS.primary;
    }
  }
  function StatusText() {
    if (details.data.status == 1) {
      return 'Booked';
    } else if (details.data.status == 2) {
      return 'Shipped';
    } else if (details.data.status == 3) {
      return 'Arrival';
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      {details != null && (
        <View>
          <FlatList
            data={IMAGES}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          />

          <TouchableOpacity
            style={{position: 'absolute', bottom: 10, right: 10}}
            onPress={() =>
              navigation.navigate('ViewAllImages', {
                AllImages: IMAGES,
              })
            }>
            <MaterialCommunity
              name="image-filter-center-focus"
              size={25}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>
      )}

      <View
        style={{
          width: SIZES.windowWidth,
          height: SIZES.windowHeight / 14,
          backgroundColor: 'rgba(29, 119, 231, 0.81)',
          position: 'absolute',
          // borderBottomLeftRadius: 30,
          // borderBottomRightRadius: 30,
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
          <Text style={{color: COLORS.white, fontSize: 18}}>
            Shipment Details
          </Text>
        </View>

        <TouchableOpacity onPress={() => console.log('Share')}>
          <MaterialCommunity
            name="share-variant"
            size={25}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </View>
      {details != null ? (
        <View style={{flex: 1}}>
          <View
            style={{
              height: SIZES.windowHeight / 13,
              width: SIZES.windowWidth,
              backgroundColor: COLORS.primary,
              // borderTopLeftRadius: 30,
              // borderTopRightRadius: 30,
              //   bottom: SIZES.windowHeight / 6.2 - 100,
              justifyContent: 'center',
            }}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 16,
                }}>
                Container No: {details.data.container_no}
              </Text>
            </View>
          </View>

          {/* status view */}
          <View style={{paddingHorizontal: 10, paddingTop: 10}}>
            <View
              style={{
                width: '100%',
                height: 40,
                backgroundColor: StatusColor(),
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                justifyContent: 'space-between',
              }}>
              <Text style={{color: COLORS.white}}>Status</Text>
              <Text style={{color: COLORS.white}}>{StatusText()}</Text>
              <Text />
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              paddingHorizontal: 10,
            }}
            contentContainerStyle={{paddingBottom: '6%'}}>
            <View
              style={{
                width: '100%',
                paddingVertical: 15,
                backgroundColor: 'rgba(217,217,217, 0.22)',
                borderWidth: 1,
                borderColor: COLORS.primary,
                borderRadius: 5,
                marginTop: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                }}>
                <Text style={{color: COLORS.primary}}>
                  Shipment Information
                </Text>

                <TouchableOpacity
                  style={{
                    borderRadius: 15,
                  }}
                  onPress={() => setShowGeneral(!showGeneral)}>
                  {showGeneral == true ? (
                    <AntDesign
                      name="upcircle"
                      size={20}
                      color={COLORS.primary}
                    />
                  ) : (
                    <AntDesign
                      name="downcircle"
                      size={20}
                      color={COLORS.primary}
                    />
                  )}
                </TouchableOpacity>
              </View>

              {showGeneral == true && (
                <View
                  style={{
                    borderTopWidth: 1,
                    borderTopColor: COLORS.primary,
                    marginTop: 10,
                    paddingHorizontal: 10,
                  }}>
                  {/* customer name view  */}
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{color: '#1F689E'}}>Booking Number</Text>
                    </View>
                    <View>
                      <Text style={{color: '#1F689E'}}>
                        {details.data.booking_number}
                      </Text>
                    </View>
                  </View>
                  <LineDivider />

                  {/* title view  */}
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{color: '#1F689E'}}>Container Type</Text>
                    </View>
                    <View>
                      <Text style={{color: '#1F689E'}}>
                        {details.data.container_type}
                      </Text>
                    </View>
                  </View>
                  <LineDivider />

                  {/* title state view  */}
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{color: '#1F689E'}}>Container Size</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{color: '#1F689E'}}>
                        {details.data.container_size}
                      </Text>
                    </View>
                  </View>
                  <LineDivider />

                  {/* shipper name view  */}
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{color: '#1F689E'}}>Shipment Type</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{color: '#1F689E'}}>
                        {details.data.shipment_type}
                      </Text>
                    </View>
                  </View>
                  <LineDivider />

                  {/* status view  */}
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{color: '#1F689E'}}>Customer Email</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{color: '#1F689E'}}>
                        {details.data.customer_email}
                      </Text>
                    </View>
                  </View>
                  <LineDivider />

                  {/* pickup date view  */}
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{color: '#1F689E'}}>Customer Phone</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{color: '#1F689E'}}>
                        {details.data.customer_phone}
                      </Text>
                    </View>
                  </View>
                  <LineDivider />

                  {/* sale date view  */}
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{color: '#1F689E'}}>Sale Date</Text>
                    </View>
                    <View>
                      <Text style={{color: '#1F689E'}}>
                        {details.data.sale_date}
                      </Text>
                    </View>
                  </View>
                  <LineDivider />

                  {/* paid date view  */}
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{color: '#1F689E'}}>Shipping Reference</Text>
                    </View>
                    <View>
                      <Text style={{color: '#1F689E'}}>
                        {details.data.shipping_reference}
                      </Text>
                    </View>
                  </View>
                  <LineDivider />

                  {/* posted date view  */}
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{color: '#1F689E'}}>XTN Number</Text>
                    </View>
                    <View>
                      <Text style={{color: '#1F689E'}}>
                        {details.data.xtn_number}
                      </Text>
                    </View>
                  </View>
                  <LineDivider />

                  {/* days view  */}
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{color: '#1F689E'}}>OTI Number</Text>
                    </View>
                    <View>
                      <Text style={{color: '#1F689E'}}>
                        {details.data.oti_number}
                      </Text>
                    </View>
                  </View>
                  <LineDivider />

                  {/* delievered date view  */}
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{color: '#1F689E'}}>Shipper</Text>
                    </View>
                    <View>
                      <Text style={{color: '#1F689E'}}>
                        {details.data.shipper}
                      </Text>
                    </View>
                  </View>
                  <LineDivider />

                  {/* pickup location view  */}
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{color: '#1F689E'}}>Loading Terminal</Text>
                    </View>
                    <View>
                      <Text style={{color: '#1F689E'}}>
                        {details.data.loading_terminal}
                      </Text>
                    </View>
                  </View>
                  <LineDivider />

                  {/* site view  */}
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{color: '#1F689E'}}>Shipping Line</Text>
                    </View>
                    <View>
                      <Text style={{color: '#1F689E'}}>
                        {details.data.shipping_line}
                      </Text>
                    </View>
                  </View>
                  <LineDivider />

                  {/* warehouse view  */}
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{color: '#1F689E'}}>Seal Number</Text>
                    </View>
                    <View>
                      <Text style={{color: '#1F689E'}}>
                        {details.data.seal_number}
                      </Text>
                    </View>
                  </View>
                  <LineDivider />
                </View>
              )}
            </View>

            <View
              style={{
                width: '100%',
                paddingVertical: 15,
                backgroundColor: 'rgba(217,217,217, 0.22)',
                borderWidth: 1,
                borderColor: COLORS.primary,
                borderRadius: 5,
                marginTop: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                }}>
                <Text style={{color: COLORS.primary}}>Vehicles</Text>

                <TouchableOpacity
                  style={{
                    borderRadius: 15,
                  }}
                  onPress={() => setShowVehicles(!showVehicles)}>
                  {showVehicles == true ? (
                    <AntDesign
                      name="upcircle"
                      size={20}
                      color={COLORS.primary}
                    />
                  ) : (
                    <AntDesign
                      name="downcircle"
                      size={20}
                      color={COLORS.primary}
                    />
                  )}
                </TouchableOpacity>
              </View>

              {showVehicles == true && (
                <FlatList
                  data={details.data.vehicle}
                  keyExtractor={item => item.id}
                  contentContainerStyle={{
                    paddingBottom: '30%',
                    paddingTop: 10,
                  }}
                  renderItem={renderVehicle}
                  showsVerticalScrollIndicator={false}
                />
              )}
            </View>

            <View style={{marginTop: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    height: SIZES.windowHeight / 14,
                    width: SIZES.windowWidth / 2.2,
                    backgroundColor: COLORS.primary,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: 'white'}}>Non Hazard Report</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: SIZES.windowHeight / 14,
                    width: SIZES.windowWidth / 2.2,
                    backgroundColor: COLORS.primary,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: 'white'}}>Houston Cover Letter</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{marginTop: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    height: SIZES.windowHeight / 14,
                    width: SIZES.windowWidth / 3,
                    backgroundColor: COLORS.primary,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: 'white'}}>US Customs</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: SIZES.windowHeight / 14,
                    width: SIZES.windowWidth / 5,
                    backgroundColor: COLORS.primary,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: 'white'}}>BOL</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: SIZES.windowHeight / 14,
                    width: SIZES.windowWidth / 3,
                    backgroundColor: COLORS.primary,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: 'white'}}>Dock Reciept</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* edit shipment details button */}
            <View style={{marginTop: 10, alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  height: 30,
                  width: 400,
                  backgroundColor: 'orange',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() =>
                  navigation.navigate('EditShipment', {
                    ID: details.data.id,
                    Details: details,
                  })
                }>
                <Text style={{color: 'black'}}>Edit Details</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* vehicles section */}
          {/* <View style={{flex: 1}}>
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
              <Text
                style={{fontSize: 16, color: COLORS.white, fontWeight: 'bold'}}>
                Vehicles
              </Text>
            </View>

            <View>
              <FlatList
                data={details.data.vehicle}
                keyExtractor={item => item.id}
                contentContainerStyle={{
                  paddingBottom: '30%',
                  paddingTop: 10,
                }}
                renderItem={renderVehicle}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View> */}
        </View>
      ) : (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={'large'} color={COLORS.primary} />
        </View>
      )}
    </View>
  );
}
