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

export default function VehicleDetails({navigation, route}) {
  //data coming from vehicle screens
  const {ID} = route.params;
  const [details, setDetails] = useState(null);
  const isFocused = useIsFocused();
  const [imageTab, setImageTab] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [showGeneral, setShowGeneral] = useState(false);

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
          height: 1,
          backgroundColor: 'grey',
          width: '100%',
          marginTop: 5,
        }}
      />
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
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
              <FlatList
                data={details.data.warehouse_image}
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
          )}

          {/* Pickup images */}

          {imageTab == 1 && details != null && (
            <View>
              <FlatList
                data={details.data.pickupimages}
                renderItem={renderPickup}
                keyExtractor={item => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
              />
              <TouchableOpacity
                style={{position: 'absolute', bottom: 10, right: 10}}
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
          )}

          {/* Auction images */}
          {imageTab == 3 && details != null && (
            <View>
              <FlatList
                data={details.data.auction_image}
                renderItem={renderAuction}
                keyExtractor={item => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
              />
              <TouchableOpacity
                style={{position: 'absolute', bottom: 10, right: 10}}
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
          )}
        </View>
      </View>

      <VehicleHeader
        HeaderTitle={'Vehicle Details'}
        GoBack={() => navigation.goBack()}
      />

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
                  backgroundColor: COLORS.onhandStatus,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <Text style={{color: COLORS.white}}>Status</Text>
                <Text style={{color: COLORS.white}}>On-Hand</Text>
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
                backgroundColor: '#D9D9D9',
                borderWidth: 1,
                borderColor: COLORS.primary,
                borderRadius: 10,
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
                      <Text style={{color: '#1F689E'}}>{details.data.key}</Text>
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
                backgroundColor: '#D9D9D9',
                borderWidth: 1,
                borderColor: COLORS.primary,
                borderRadius: 10,
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
                      <Text style={{color: '#1F689E'}}>{details.data.key}</Text>
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
          </ScrollView>

          {/* <View style={{alignItems: 'center', marginTop: 20}}>
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
