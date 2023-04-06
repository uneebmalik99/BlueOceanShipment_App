import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AppBackground from '../../../../components/AppBackground';
import {
  SIZES,
  COLORS,
  SVGBackground,
  SVGVehicle,
} from '../../../../constants/theme';
import {SvgXml} from 'react-native-svg';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dropdown} from 'react-native-element-dropdown';

export default function AllShipments({navigation}) {
  // pull to refresh states
  const [refreshing, setRefreshing] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // data from api saving in this state
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(false);

  // grid view toggle state
  const [isGridView, setIsGridView] = useState(false);

  // for searching shipment
  const [containerNo, setContainerNo] = useState('');
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchedShipment, setSearchedShipment] = useState(null);
  const [viewAll, setViewAll] = useState(false);

  //   fot shipments type dropdown
  const [shipmentFocus, setShipmentFocus] = useState(false);
  const [shipmentType, setShipmentType] = useState(null);

  var asset_url = 'https://app.ecsapshipping.com/public/';

  const data = [
    {label: 'New Order', value: '1'},
    {label: 'Dispatch', value: '2'},
    {label: 'On Hand', value: '3'},
  ];

  const _onRefresh = () => {
    setRefreshing(true);
    setIsRefreshing(!isRefreshing);
  };

  // shipment search api
  const Search = async () => {
    if (containerNo.length == 0) {
      console.log('Please Enter Container Number');
      alert('Please Enter Container Number');
    } else {
      setSearchLoader(true);
      try {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
          console.log('Token retrieved from AsyncStorage:', token);
          try {
            var url = 'https://app.ecsapshipping.com/api/auth/shipment/search';
            var value = {};

            value.container_number = containerNo;

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
                  setSearchedShipment(responseJson);
                  setSearchLoader(false);
                  setShipment(null);
                  setContainerNo('');
                } else {
                  console.log('Status: ' + responseJson.status);
                  alert('Vin/Lot not found');
                }
              })
              .catch(error => {
                setSearchLoader(false);
                alert('Error while search ' + error);
                console.warn(error);
              });
          } catch (error) {
            setSearchLoader(false);
            console.error(error);
          }
        }
      } catch (error) {
        setSearchLoader(false);
        console.warn('Error while retrieving token from AsyncStorage:', error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setShipment(null);
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
          console.log('Token retrieved from AsyncStorage:', token);
          try {
            const response = await fetch(
              'https://app.ecsapshipping.com/api/auth/shipment/all/shipments',
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + token,
                },
              },
            );

            console.log('Fetching shippment...');
            const data = await response.json();

            if (data.status == 'Success') {
              setShipment(data);
              console.log('Shippment fetched successfully');
              setLoading(false);
              console.log(data.message);
              setRefreshing(false);
            } else {
              console.log('Error fetching shippment');
              setLoading(false);
            }
          } catch (error) {
            console.error(error);
            setLoading(false);
          }
        }
      } catch (error) {
        console.warn('Error while retrieving token from AsyncStorage:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [isRefreshing, viewAll]);

  function InsideText({Text1, Text2}) {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{width: 105}}>
          <Text style={{color: COLORS.white, fontSize: 14}}>{Text1}</Text>
        </View>

        <View>
          <Text
            style={{
              color: COLORS.black,
              fontSize: 12,
              // paddingLeft: 10,
              textAlign: 'justify',
            }}>
            {Text2}
          </Text>
        </View>
      </View>
    );
  }
  // render item function for vehicle FlatList
  function renderContainer({item}) {
    // console.log(item.loading_image[0]);
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            height: SIZES.windowHeight / 6.6,
            width: SIZES.windowWidth,
            marginTop: 10,
            paddingHorizontal: 20,
          }}
          onPress={() => navigation.navigate('ShipmentDetails', {ID: item.id})}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#1A72DE', 'rgba(35, 111, 204, 0.19)']}
            style={{
              borderRadius: 15,
              flex: 1,
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
                {/* <InsideText Text1={'Company Name: '} Text2={item.company_name} /> */}
                <Text style={{color: COLORS.white, fontSize: 14}}>
                  {item.company_name}
                </Text>
                <InsideText
                  Text1={'Container No: '}
                  Text2={item.container_no}
                />
                <InsideText
                  Text1={'Booking No: '}
                  Text2={item.booking_number}
                />
                <InsideText
                  Text1={'Destination: '}
                  Text2={item.destination_country}
                />
              </View>

              <View style={{position: 'absolute', right: '3%'}}>
                {!item.loading_image || item.loading_image.length === 0 ? (
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
                      uri: asset_url + item.loading_image[0].name,
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

  // render grid container
  function renderGridContainer({item}) {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            height: SIZES.windowHeight / 8.2,
            width: SIZES.windowWidth / 2.1,
            marginTop: 10,
          }}
          onPress={() => navigation.navigate('ShipmentDetails', {ID: item.id})}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#1A72DE', 'rgba(35, 111, 204, 0.19)']}
            style={{
              borderRadius: 15,
              flex: 1,
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
              <View style={{flex: 1}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{}}>
                    {!item.loading_image || item.loading_image.length === 0 ? (
                      <View
                        style={{
                          height: 30,
                          width: 40,
                          borderRadius: 10,
                          borderWidth: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text style={{color: COLORS.black, fontSize: 10}}>
                          No Image
                        </Text>
                      </View>
                    ) : (
                      <Image
                        source={{
                          uri: asset_url + item.loading_image[0].name,
                        }}
                        resizeMode="cover"
                        style={{height: 30, width: 40, borderRadius: 10}}
                      />
                    )}
                  </View>

                  <View>
                    <Text style={{color: COLORS.white, fontSize: 13}}>
                      {item.booking_number}
                    </Text>
                    <Text style={{color: COLORS.white, fontSize: 13}}>
                      {item.shipper}
                    </Text>
                  </View>
                </View>
                {/* <InsideText Text1={'Company Name: '} Text2={item.company_name} /> */}

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: COLORS.black, fontSize: 13}}>
                    Container No:
                  </Text>
                  <Text style={{color: COLORS.white, fontSize: 13}}>
                    {item.container_no}
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }

  // main screen return funciton
  return (
    <View style={{flex: 1}}>
      {/* complete screen background */}
      <View
        style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}>
        <AppBackground />
      </View>

      <View style={{position: 'absolute'}}>
        <SvgXml
          xml={SVGBackground}
          width={SIZES.windowWidth}
          height={SIZES.windowHeight / 4.5}
        />
      </View>

      <View style={{paddingHorizontal: 20, paddingTop: 20}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={{}} onPress={() => navigation.openDrawer()}>
            <MaterialCommunity name="menu" size={25} color={COLORS.white} />
          </TouchableOpacity>

          <View>
            <Text
              style={{fontSize: 16, color: COLORS.white, fontWeight: 'bold'}}>
              Shipment
            </Text>
          </View>
          <View />
        </View>

        {/* view for search bar, sort and filter buttons */}
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {/* search bar view */}
          <View
            style={{
              height: SIZES.windowHeight / 18,
              width: SIZES.windowWidth / 1.36,
              backgroundColor: COLORS.white,
              borderRadius: 10,
              alignItems: 'center',
              flexDirection: 'row',
              shadowColor: COLORS.black,
              elevation: 10,
            }}>
            <TextInput
              style={{flex: 1, color: 'black', paddingLeft: 10}}
              placeholder="Enter container no"
              placeholderTextColor={'grey'}
              value={containerNo}
              onChangeText={text => setContainerNo(text)}
            />
          </View>

          {/* search button view */}
          <View
            style={{
              shadowColor: COLORS.black,
              elevation: 10,
              height: SIZES.windowHeight / 18,
              width: SIZES.windowWidth / 7.5,
              backgroundColor: COLORS.white,
              borderRadius: 10,
            }}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}
              onPress={Search}>
              {searchLoader == true ? (
                <View style={{}}>
                  <ActivityIndicator size={'small'} color={COLORS.primary} />
                </View>
              ) : (
                <MaterialIcons name="search" size={20} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        style={{
          backgroundColor: COLORS.white,
          flex: 1,
          width: '100%',
          marginTop: 30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          shadowColor: COLORS.black,
          elevation: 3,
          // alignItems: 'center',
        }}>
        <View style={{position: 'absolute'}}>
          <SvgXml
            xml={SVGVehicle}
            width={SIZES.windowWidth}
            height={SIZES.windowHeight / 1.5}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingTop: 10,
          }}>
          <View>
            <Dropdown
              style={[styles.dropdown, shipmentFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              // search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!shipmentFocus ? 'All Shipments' : '...'}
              searchPlaceholder="Search..."
              value={shipmentType}
              onFocus={() => setShipmentFocus(true)}
              onBlur={() => setShipmentFocus(false)}
              onChange={item => {
                setShipmentType(item.value);
                setShipmentFocus(false);
              }}
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            {/* filter button view */}
            <View
              style={{
                shadowColor: COLORS.primary,
                elevation: 10,
                height: SIZES.windowHeight / 18,
                width: SIZES.windowWidth / 8.5,
                backgroundColor: COLORS.white,
                borderRadius: 10,
                right: 10,
                borderWidth: 1,
                borderColor: COLORS.primary,
              }}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <MaterialCommunity
                  name="filter-variant"
                  size={20}
                  color={COLORS.black}
                />
              </TouchableOpacity>
            </View>

            {/* sort button view */}
            <View
              style={{
                shadowColor: COLORS.black,
                elevation: 10,
                height: SIZES.windowHeight / 18,
                width: SIZES.windowWidth / 8.5,
                backgroundColor: COLORS.white,
                borderRadius: 10,
                right: 5,
                borderWidth: 1,
                borderColor: COLORS.primary,
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <MaterialCommunity
                  name="sort-bool-descending"
                  size={20}
                  color={COLORS.black}
                />
              </TouchableOpacity>
            </View>

            {/* list grid toggle button view */}
            <View
              style={{
                shadowColor: COLORS.black,
                elevation: 10,
                height: SIZES.windowHeight / 18,
                width: SIZES.windowWidth / 8.5,
                backgroundColor: COLORS.white,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLORS.primary,
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => setIsGridView(!isGridView)}>
                {isGridView == false ? (
                  <MaterialCommunity
                    name="view-grid"
                    size={20}
                    color={COLORS.primary}
                  />
                ) : (
                  <MaterialCommunity
                    name="format-list-bulleted-square"
                    size={20}
                    color={COLORS.primary}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* searched shipment data shows here */}
        {searchedShipment != null && (
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={{
                height: SIZES.windowHeight / 6.6,
                width: SIZES.windowWidth,
                marginTop: 10,
                paddingHorizontal: 20,
              }}
              onPress={() =>
                navigation.navigate('ShipmentDetails', {
                  ID: searchedShipment.data[0].id,
                })
              }>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#1A72DE', 'rgba(35, 111, 204, 0.19)']}
                style={{
                  borderRadius: 15,
                  flex: 1,
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
                    {/* <InsideText Text1={'Company Name: '} Text2={item.company_name} /> */}
                    <Text style={{color: COLORS.white, fontSize: 14}}>
                      {searchedShipment.data[0].company_name}
                    </Text>
                    <InsideText
                      Text1={'Container No: '}
                      Text2={searchedShipment.data[0].container_no}
                    />
                    <InsideText
                      Text1={'Booking No: '}
                      Text2={searchedShipment.data[0].booking_number}
                    />
                    <InsideText
                      Text1={'Destination: '}
                      Text2={searchedShipment.data[0].destination_country}
                    />
                  </View>

                  <View style={{position: 'absolute', right: '3%'}}>
                    {!searchedShipment.data[0].loading_image ||
                    searchedShipment.data[0].loading_image.length === 0 ? (
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
                          uri:
                            asset_url +
                            searchedShipment.data[0].loading_image[0].name,
                        }}
                        resizeMode="cover"
                        style={{height: 50, width: 70, borderRadius: 10}}
                      />
                    )}
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <View style={{alignItems: 'center', marginTop: 10}}>
              <TouchableOpacity
                style={{
                  height: SIZES.windowHeight / 18,
                  width: SIZES.windowWidth / 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLORS.primary,
                  borderRadius: 10,
                }}
                onPress={() => {
                  setSearchedShipment(null);
                  setShipment(null);
                  setViewAll(!viewAll);
                }}>
                <Text style={{color: COLORS.white}}>View All</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {shipment != null && isGridView == false && (
          <FlatList
            data={shipment.data}
            keyExtractor={item => item.id}
            contentContainerStyle={{
              paddingBottom: '30%',
              paddingTop: 10,
            }}
            renderItem={renderContainer}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={_onRefresh}
                colors={['#1B7ADE']}
              />
            }
          />
        )}

        {shipment != null && isGridView == true && (
          <FlatList
            data={shipment.data}
            numColumns={2}
            keyExtractor={item => item.id}
            contentContainerStyle={{
              paddingBottom: '30%',
              paddingTop: 10,
            }}
            renderItem={renderGridContainer}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={_onRefresh}
                colors={['#1B7ADE']}
              />
            }
          />
        )}

        {loading == true && (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size={'large'} color={COLORS.primary} />
          </View>
        )}
        {/* <View style={{paddingBottom: SIZES.windowHeight / 10}} /> */}
      </View>

      <View style={{position: 'absolute', right: '5%', bottom: '5%'}}>
        <TouchableOpacity
          style={{
            height: 45,
            width: 45,
            backgroundColor: COLORS.primary,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 23,
          }}
          onPress={() => navigation.navigate('AddContainer')}>
          <MaterialIcons name="add" size={25} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: SIZES.windowHeight / 18,
    width: SIZES.windowWidth / 3,
    borderColor: COLORS.primary,
    // borderWidth: 0.5,
    // borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
    color: COLORS.primary,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    tintColor: COLORS.primary,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
});
