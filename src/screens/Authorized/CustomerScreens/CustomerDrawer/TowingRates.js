import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SIZES, COLORS} from '../../../../constants/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TowingRates() {
  const [towingRates, setTowingRates] = useState(null);
  const [towingLength, setTowingLength] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTowingRates(null);
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
          console.log('Token retrieved from AsyncStorage:', token);
          try {
            const response = await fetch(
              'https://app.ecsapshipping.com/api/auth/rate/towing',
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + token,
                },
              },
            );

            console.log('Fetching Towing Prices...');
            const data = await response.json();

            if (data.status == 'Success') {
              setTowingRates(data);
              console.log('Towing Prices successfully');
              console.log(data.message);
              const dataLength = data.data.master_towing;
              setTowingLength(dataLength.length);
            } else {
              console.log('Error fetching towing prices');
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
        {towingRates !== null ? (
          towingRates.data.master_towing.map(item => {
            return (
              <View
                key={item.id}
                style={{
                  height: SIZES.windowHeight / 9,
                  width: SIZES.windowWidth / 1.1,
                  backgroundColor: COLORS.primary,
                  borderRadius: 20,
                  justifyContent: 'center',
                  marginBottom: 10,
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
                      // justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View style={{width: '50%'}}>
                      <Text style={{color: COLORS.white}}>
                        City: {item.city}
                      </Text>
                    </View>
                    <View>
                      <Text style={{color: COLORS.white}}>
                        State: {item.new_jersery}
                      </Text>
                    </View>
                  </View>

                  {/* Item 2 */}
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 5,
                      alignItems: 'center',
                    }}>
                    <View style={{width: '50%'}}>
                      <Text style={{color: COLORS.white}}>
                        Auction: {item.auction}
                      </Text>
                    </View>
                    <View
                      style={{
                        height: '70%',
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
                      marginTop: 5,
                    }}
                  />
                </View>
              </View>
            );
          })
        ) : (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text>No Data Found</Text>
          </View>
        )}
      </View>

      {towingLength !== null && towingRates !== null && towingLength === 0 && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>No Data Found</Text>
        </View>
      )}
    </View>
  );
}
