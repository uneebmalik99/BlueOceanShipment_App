import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SIZES, COLORS} from '../../../../constants/theme';
import LinearGradient from 'react-native-linear-gradient';
import VehicleHeader from '../../../../components/VehicleHeader';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {useIsFocused} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

export default function AdminVehicleDetails({navigation, route}) {
  //data coming from vehicle screens
  const {ID} = route.params;
  const [details, setDetails] = useState(null);
  const isFocused = useIsFocused();
  const [imageTab, setImageTab] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [showGeneral, setShowGeneral] = useState(false);
  const [totalWarehouseImages, setTotalWarehouse] = useState(null);
  const [totalAuctionImages, setTotalAuction] = useState(null);
  const [totalPickupImages, setTotalPickup] = useState(null);

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
            const warehouse_image = data.data.warehouse_image;
            setTotalWarehouse(warehouse_image.length);
            const pickupimages = data.data.pickupimages;
            setTotalPickup(pickupimages.length);
            const auction_image = data.data.auction_image;
            setTotalAuction(auction_image.length);
            // console.log(warehouse_image.length);
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

  function StatusColor() {
    if (details.data.shipment_status == 1) {
      return COLORS.onhandStatus;
    } else if (details.data.shipment_status == 2) {
      return COLORS.dispatched;
    } else if (details.data.shipment_status == 3) {
      return COLORS.notitle;
    } else {
      return COLORS.primary;
    }
  }
  function StatusText() {
    if (details.data.shipment_status == 1) {
      return 'On-Hand';
    } else if (details.data.shipment_status == 2) {
      return 'Dispatched';
    } else if (details.data.shipment_status == 3) {
      return 'No Title';
    }
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
      <View>
        <Image
          source={{uri: asset_url + item.name}}
          resizeMode="cover"
          style={{width: SIZES.windowWidth, height: SIZES.windowHeight / 4}}
        />
      </View>
    );
  };

  const renderPickup = ({item}) => {
    console.log(item.thumbnail);
    return (
      <Image
        source={{uri: asset_url + item.name}}
        resizeMode="cover"
        style={{width: SIZES.windowWidth, height: SIZES.windowHeight / 4}}
      />
    );
  };

  const renderAuction = ({item}) => {
    return (
      <Image
        source={{uri: asset_url + item.name}}
        resizeMode="cover"
        style={{width: SIZES.windowWidth, height: SIZES.windowHeight / 4}}
      />
    );
  };

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

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      {details != null && (
        <View style={{alignItems: 'center', marginBottom: '5%'}}>
          <View
            style={{
              width: '100%',
              height: SIZES.windowHeight / 4,
              backgroundColor: 'white',
              marginTop: '12.7%',
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
                  // borderTopLeftRadius: 10,
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
                  // borderTopRightRadius: 10,
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

            {/* Warehouse images */}
            {imageTab == 0 && details != null && (
              <View>
                {totalWarehouseImages != 0 ? (
                  <View>
                    <FlatList
                      data={details.data.warehouse_image}
                      renderItem={renderItem}
                      keyExtractor={item => item.id}
                      horizontal
                      pagingEnabled
                      showsHorizontalScrollIndicator={false}
                    />

                    <View
                      style={{
                        position: 'absolute',
                        bottom: 20,
                        left: 20,
                        height: 25,
                        width: 45,
                        backgroundColor: 'grey',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderRadius: 5,
                        flexDirection: 'row',
                        opacity: 0.8,
                        paddingHorizontal: 5,
                      }}>
                      <MaterialCommunity
                        name="image-multiple-outline"
                        size={15}
                        color={COLORS.white}
                      />
                      {totalWarehouseImages != null && (
                        <Text style={{color: COLORS.white}}>
                          {totalWarehouseImages}
                        </Text>
                      )}
                    </View>

                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        bottom: 20,
                        right: 10,
                        height: 30,
                        width: 30,
                        backgroundColor: 'grey',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5,
                      }}
                      onPress={() =>
                        navigation.navigate('ViewAllImages', {
                          AllImages: details.data.warehouse_image,
                        })
                      }>
                      <MaterialCommunity
                        name="image-filter-center-focus"
                        size={25}
                        color={COLORS.white}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Image
                      source={require('../../../../assets/images/noimage.jpeg')}
                      resizeMode="contain"
                      style={{
                        width: SIZES.windowWidth,
                        height: SIZES.windowHeight / 4,
                      }}
                    />
                  </View>
                )}
              </View>
            )}

            {/* Pickup images */}

            {imageTab == 1 && details != null && (
              <View>
                {totalPickupImages != 0 ? (
                  <View>
                    <FlatList
                      data={details.data.pickupimages}
                      renderItem={renderPickup}
                      keyExtractor={item => item.id}
                      horizontal
                      pagingEnabled
                      showsHorizontalScrollIndicator={false}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        bottom: 20,
                        left: 20,
                        height: 25,
                        width: 45,
                        backgroundColor: 'grey',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderRadius: 5,
                        flexDirection: 'row',
                        opacity: 0.8,
                        paddingHorizontal: 5,
                      }}>
                      <MaterialCommunity
                        name="image-multiple-outline"
                        size={15}
                        color={COLORS.white}
                      />
                      {totalPickupImages != null && (
                        <Text style={{color: COLORS.white}}>
                          {totalPickupImages}
                        </Text>
                      )}
                    </View>

                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        bottom: 20,
                        right: 10,
                        height: 30,
                        width: 30,
                        backgroundColor: 'grey',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5,
                      }}
                      onPress={() =>
                        navigation.navigate('ViewAllImages', {
                          AllImages: details.data.pickupimages,
                        })
                      }>
                      <MaterialCommunity
                        name="image-filter-center-focus"
                        size={25}
                        color={COLORS.white}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Image
                      source={require('../../../../assets/images/noimage.jpeg')}
                      resizeMode="contain"
                      style={{
                        width: SIZES.windowWidth,
                        height: SIZES.windowHeight / 4,
                      }}
                    />
                  </View>
                )}
              </View>
            )}

            {/* Auction images */}
            {imageTab == 3 && details != null && (
              <View>
                {totalAuctionImages != 0 ? (
                  <View>
                    <FlatList
                      data={details.data.auction_image}
                      renderItem={renderAuction}
                      keyExtractor={item => item.id}
                      horizontal
                      pagingEnabled
                      showsHorizontalScrollIndicator={false}
                    />

                    <View
                      style={{
                        position: 'absolute',
                        bottom: 20,
                        left: 20,
                        height: 25,
                        width: 45,
                        backgroundColor: 'grey',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderRadius: 5,
                        flexDirection: 'row',
                        opacity: 0.8,
                        paddingHorizontal: 5,
                      }}>
                      <MaterialCommunity
                        name="image-multiple-outline"
                        size={15}
                        color={COLORS.white}
                      />
                      {totalAuctionImages != null && (
                        <Text style={{color: COLORS.white}}>
                          {totalAuctionImages}
                        </Text>
                      )}
                    </View>

                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        bottom: 20,
                        right: 10,
                        height: 30,
                        width: 30,
                        backgroundColor: 'grey',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5,
                      }}
                      onPress={() =>
                        navigation.navigate('ViewAllImages', {
                          AllImages: details.data.auction_image,
                        })
                      }>
                      <MaterialCommunity
                        name="image-filter-center-focus"
                        size={25}
                        color={COLORS.white}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Image
                      source={require('../../../../assets/images/noimage.jpeg')}
                      resizeMode="contain"
                      style={{
                        width: SIZES.windowWidth,
                        height: SIZES.windowHeight / 4,
                      }}
                    />
                  </View>
                )}
              </View>
            )}
          </View>
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
            Vehicle Details
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
              height: SIZES.windowHeight / 12,
              width: SIZES.windowWidth,
              backgroundColor: COLORS.primary,
              justifyContent: 'center',
              // marginTop: 14,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
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

          <ScrollView
            style={{
              paddingHorizontal: 10,
            }}
            contentContainerStyle={{paddingBottom: '6%'}}>
            {/* status and tracking pdf view */}
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  height: SIZES.windowHeight / 16,
                  width: SIZES.windowWidth / 2.2,
                  backgroundColor: StatusColor(),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <Text style={{color: COLORS.white}}>Status</Text>
                <Text style={{color: COLORS.white}}>{StatusText()}</Text>
              </View>
              <TouchableOpacity style={{}}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    'rgba(241, 61, 61, 0.62)',
                    'rgba(210, 210, 210, 0.53)',
                  ]}
                  style={{
                    height: SIZES.windowHeight / 16,
                    width: SIZES.windowWidth / 2.2,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    alignItems: 'center',
                    borderRadius: 10,
                  }}>
                  <Image
                    source={require('../../../../assets/icons/pdf.png')}
                    style={{height: 16, width: 16}}
                  />
                  <Text style={{color: COLORS.white}}>Tracking PDF</Text>

                  <View
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: COLORS.white,
                      elevation: 5,
                      borderRadius: 4,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <MaterialCommunity
                      name={'eye'}
                      size={15}
                      color={'#3AB180'}
                    />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: '100%',
                paddingVertical: 15,
                backgroundColor: 'rgba(217,217,217, 0.22)',
                borderWidth: 1,
                borderColor: COLORS.primary,
                borderRadius: 5,
                marginTop: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                }}>
                <Text style={{fontWeight: 'bold', color: COLORS.primary}}>
                  Vehicle Information
                </Text>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity
                    style={{
                      height: 23,
                      width: 110,
                      backgroundColor: '#F98C27',
                      borderRadius: 8,
                      right: 15,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => console.log('Quick Edit')}>
                    <View style={{right: 5}}>
                      <MaterialCommunity
                        name="pencil"
                        color={COLORS.white}
                        size={13}
                      />
                    </View>
                    <Text style={{left: 5, color: 'white'}}>Quick Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderRadius: 15,
                    }}
                    onPress={() => setShowMore(!showMore)}>
                    {showMore == true ? (
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
              </View>

              {showMore == true && (
                <View
                  style={{
                    borderTopWidth: 1,
                    borderTopColor: COLORS.primary,
                    marginTop: 10,
                    paddingHorizontal: 10,
                  }}>
                  {/* Description view  */}
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{color: '#1F689E'}}>Description</Text>
                    </View>
                    <View>
                      <Text style={{color: '#1F689E'}}>
                        {details.data.year} {details.data.make}{' '}
                        {details.data.model}
                      </Text>
                    </View>
                  </View>
                  <LineDivider />

                  {/* vehicle color view  */}
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{color: '#1F689E'}}>Color</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View
                        style={{
                          height: 18,
                          width: 30,
                          backgroundColor: 'red',
                          borderRadius: 3,
                        }}
                      />
                      <Text>{details.data.null}</Text>
                    </View>
                  </View>
                  <LineDivider />

                  {/* vehicle type view  */}
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{color: '#1F689E'}}>Vehicle Type</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{color: '#1F689E'}}>
                        {details.data.vehicle_type}
                      </Text>
                    </View>
                  </View>
                  <LineDivider />

                  {/* lot number view  */}
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{color: '#1F689E'}}>Lot#</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{color: '#1F689E'}}>{details.data.lot}</Text>
                    </View>
                  </View>
                  <LineDivider />

                  {/* keys view  */}
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{color: '#1F689E'}}>Keys</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View
                        style={{
                          height: 22,
                          width: 60,
                          backgroundColor:
                            details.data.key == 'YES' ? 'green' : 'red',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'row',
                          borderRadius: 5,
                        }}>
                        <View style={{right: 3}}>
                          {details.data.key == 'YES' ? (
                            <AntDesign
                              name="checkcircle"
                              size={10}
                              color={COLORS.white}
                            />
                          ) : (
                            <Entypo
                              name="circle-with-cross"
                              size={10}
                              color={COLORS.white}
                            />
                          )}
                        </View>
                        <Text style={{color: COLORS.white, left: 3}}>
                          {details.data.key}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <LineDivider />

                  {/* auction name view  */}
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{color: '#1F689E'}}>Auction Name</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{color: '#1F689E'}}>
                        {details.data.auction}
                      </Text>
                    </View>
                  </View>
                  <LineDivider />

                  {/* buyer id view  */}
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{color: '#1F689E'}}>Buyer ID</Text>
                    </View>
                    <View
                      style={{
                        height: 18,
                        backgroundColor: COLORS.primary,
                        paddingHorizontal: 10,
                        borderRadius: 5,
                      }}>
                      <Text style={{color: 'white'}}>
                        {details.data.buyer_id}
                      </Text>
                    </View>
                  </View>
                  <LineDivider />

                  {/* tow by view  */}
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{color: '#1F689E'}}>Tow By</Text>
                    </View>
                    <View>
                      <Text style={{color: '#1F689E'}}>{details.data.tow}</Text>
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
                <Text style={{fontWeight: 'bold', color: COLORS.primary}}>
                  General Information
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
                      <Text style={{color: '#1F689E'}}>Customer Name</Text>
                    </View>
                    <View>
                      <Text style={{color: '#1F689E'}}>
                        {details.data.customer_name}
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
                      <Text style={{color: '#1F689E'}}>Title</Text>
                    </View>
                    <View>
                      <Text style={{color: '#1F689E'}}>
                        {details.data.title}
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
                      <Text style={{color: '#1F689E'}}>Title State</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{color: '#1F689E'}}>
                        {details.data.title_state}
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
                      <Text style={{color: '#1F689E'}}>Shipper Name</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{color: '#1F689E'}}>
                        {details.data.shipper_name}
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
                      <Text style={{color: '#1F689E'}}>Status</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{color: '#1F689E'}}>
                        {details.data.status}
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
                      <Text style={{color: '#1F689E'}}>Pickup Date</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{color: '#1F689E'}}>
                        {details.data.pickup_date}
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
                      <Text style={{color: '#1F689E'}}>Paid Date</Text>
                    </View>
                    <View>
                      <Text style={{color: '#1F689E'}}>
                        {details.data.paid_date}
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
                      <Text style={{color: '#1F689E'}}>Posted Date</Text>
                    </View>
                    <View>
                      <Text style={{color: '#1F689E'}}>
                        {details.data.posted_date}
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
                      <Text style={{color: '#1F689E'}}>Days</Text>
                    </View>
                    <View>
                      <Text style={{color: '#1F689E'}}>
                        {details.data.days}
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
                      <Text style={{color: '#1F689E'}}>Delievered Date</Text>
                    </View>
                    <View>
                      <Text style={{color: '#1F689E'}}>
                        {details.data.delivered_date}
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
                      <Text style={{color: '#1F689E'}}>Pickup Location</Text>
                    </View>
                    <View>
                      <Text style={{color: '#1F689E'}}>
                        {details.data.pickup_location}
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
                      <Text style={{color: '#1F689E'}}>Site</Text>
                    </View>
                    <View>
                      <Text style={{color: '#1F689E'}}>
                        {details.data.site}
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
                      <Text style={{color: '#1F689E'}}>Warehouse</Text>
                    </View>
                    <View>
                      <Text style={{color: '#1F689E'}}>
                        {details.data.warehouse_storage}
                      </Text>
                    </View>
                  </View>
                  <LineDivider />
                </View>
              )}
            </View>
          </ScrollView>
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
