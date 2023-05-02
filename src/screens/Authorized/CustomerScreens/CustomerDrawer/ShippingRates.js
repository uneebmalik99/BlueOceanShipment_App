import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SIZES, COLORS} from '../../../../constants/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Rate() {
  const [shippingRates, setShippingRates] = useState(null);
  const [shippingLength, setShippingLength] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setShippingRates(null);
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
          console.log('Token retrieved from AsyncStorage:', token);
          try {
            const response = await fetch(
              'https://app.ecsapshipping.com/api/auth/rate/shipment',
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + token,
                },
              },
            );

            console.log('Fetching Shipping Prices...');
            const data = await response.json();

            if (data.status == 'Success') {
              setShippingRates(data);
              console.log('Shipping Prices successfully');
              console.log(data.message);
              const dataLength = data.data.shippment_rate;
              setShippingLength(dataLength.length);
              // console.log(data.data.shippment_rate);
              // setRefreshing(false);
            } else {
              console.log('Error fetching shipping prices');
              //  setIsLoading(false);
            }
          } catch (error) {
            console.error(error);
          }
        }
      } catch (error) {
        console.warn('Error while retrieving token from AsyncStorage:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#C3E7F8'}}>
      <View style={{alignItems: 'center', marginTop: 25}}>
        {/* first item in list */}

        {shippingRates != null &&
          shippingRates.data.shippment_rate.map(item => {
            return (
              <View
                key={item.id}
                style={{
                  height: SIZES.windowHeight / 7,
                  width: SIZES.windowWidth / 1.1,
                  backgroundColor: COLORS.primary,
                  borderRadius: 20,
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    height: 25,
                    width: 25,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 15,
                    position: 'absolute',
                    top: 10,
                    right: 10,
                  }}>
                  {item.status == 1 ? (
                    <Entypo name="check" size={20} color="green" />
                  ) : (
                    <Entypo name="cross" size={20} color="red" />
                  )}
                </View>
                <View
                  style={{
                    paddingHorizontal: 20,
                    justifyContent: 'center',
                  }}>
                  {/* Item 1 */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={{width: '50%'}}>
                      <Text style={{color: COLORS.white}}>
                        Container Size: {item.container_size}
                      </Text>
                    </View>
                    <View>
                      <Text style={{color: COLORS.white}}>
                        Vehicles: {item.vehicle}
                      </Text>
                    </View>
                  </View>
                  {/* Item 2 */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 7,
                    }}>
                    <View style={{width: '50%'}}>
                      <Text style={{color: COLORS.white}}>
                        Loading Port: {item.loading_port}
                      </Text>
                    </View>
                    <View>
                      <Text style={{color: COLORS.white}}>
                        Shipping Line: {item.shipping_line}
                      </Text>
                    </View>
                  </View>
                  {/* Item 3 */}
                  <View
                    style={{
                      flexDirection: 'row',
                      // justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View style={{width: '50%'}}>
                      <Text style={{color: COLORS.white}}>
                        Destination: {item.destination}
                      </Text>
                    </View>
                    <View
                      style={{
                        height: '60%',
                        width: 80,
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                      }}>
                      <Text style={{color: COLORS.black}}>{item.rate}$</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: item.status == 1 ? 'green' : 'red',
                      marginTop: 3,
                    }}
                  />
                </View>
              </View>
            );
          })}

        {shippingRates == null && (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size={'large'} color={COLORS.primary} />
          </View>
        )}
      </View>

      {shippingLength !== null &&
        shippingRates !== null &&
        shippingLength === 0 && (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>No Data Found</Text>
          </View>
        )}
    </View>
  );
}
