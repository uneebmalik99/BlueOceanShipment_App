import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SIZES, COLORS, IMAGE_URL} from '../../../../constants/theme';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import VehicleHeader from '../../../../components/VehicleHeader';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function InvoiceDetails({route, navigation}) {
  const {ID} = route.params;
  const [details, setDetails] = useState(null);
  console.log(ID);

  useEffect(() => {
    const InvoiceDetails = async () => {
      setDetails(null);
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          console.log('Token retrieved from AsyncStorage:', token);

          const url = `https://app.ecsapshipping.com/api/auth/invoice/show/${ID}`;

          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
          });

          const data = await response.json();

          if (data.status == 'Success') {
            console.log('Fetched Invoice Details Successfully');
            setDetails(data);
            // console.log(JSON.stringify(data));
            data.data.map(item => console.log(item.ar_number));
          } else {
            console.log('UnSuccess ', data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    InvoiceDetails();
  }, []);

  return (
    <View style={{flex: 1}}>
      {/* header */}
      <View
        style={{
          width: SIZES.windowWidth,
          height: SIZES.windowHeight / 14,
          backgroundColor: 'rgba(29, 119, 231, 0.81)',
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
            Invoice Details
          </Text>
        </View>

        <View />
      </View>

      {/* invoice view */}
      {details != null ? (
        <View style={{alignItems: 'center', marginTop: 20}}>
          <View
            style={{
              height: SIZES.windowHeight / 7.5,
              width: SIZES.windowWidth / 1.1,
              backgroundColor: COLORS.primary,
              borderRadius: 20,
              justifyContent: 'center',
              marginBottom: 10,
            }}>
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
                    Invoide ID: {details.data.ar_number}
                  </Text>
                </View>
                <View>
                  <Text style={{color: COLORS.white}}>Status: hello</Text>
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
                  <Text style={{color: COLORS.white}}>Total Amount: hello</Text>
                </View>
                <View>
                  <Text style={{color: COLORS.white}}>500$</Text>
                </View>
              </View>

              <View
                style={{
                  height: 1,
                  backgroundColor: COLORS.white,
                  marginTop: 10,
                }}
              />
            </View>
          </View>
        </View>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} color={COLORS.primary} />
        </View>
      )}
    </View>
  );
}
