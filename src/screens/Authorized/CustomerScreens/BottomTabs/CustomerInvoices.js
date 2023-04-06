import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AppBackground from '../../../../components/AppBackground';
import {SIZES, COLORS, SVGBackground} from '../../../../constants/theme';
import {SvgXml} from 'react-native-svg';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CustomerInvoices({navigation}) {
  const [allInvoices, setAllInvoices] = useState(null);
  const [invoiceTab, setInvoiceTab] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setAllInvoices(null);
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
          console.log('Token retrieved from AsyncStorage:', token);
          try {
            const response = await fetch(
              'https://app.ecsapshipping.com/api/auth/invoice/allinvoices',
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + token,
                },
              },
            );

            console.log('Fetching all invoices...');
            const data = await response.json();

            if (data.status == 'Success') {
              setAllInvoices(data);
              setLoading(false);
              console.log('All Invoices fetched successfully');
              console.log(data.status);
            } else {
              console.log('Error fetching all invoices');
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
  }, []);

  const renderAllInvoices = ({item}) => {
    return (
      <View style={{flex: 1, marginTop: 10}}>
        <TouchableOpacity
          style={{
            height: SIZES.windowHeight / 8,
            width: SIZES.windowWidth,
            paddingHorizontal: 20,
          }}
          // onPress={() => navigation.navigate('VehicleDetails', {Data: item})}
        >
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#1A72DE', 'rgba(35, 111, 204, 0.19)']}
            style={{
              flex: 1,
              borderRadius: 15,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
            }}>
            <View>
              <Text style={{color: COLORS.white}}>AR No: {item.ar_number}</Text>
              <Text style={{color: COLORS.white, marginTop: 5}}>
                Date: {item.invoice_date}
              </Text>
            </View>

            <View>
              <Text style={{color: COLORS.black}}>{item.invoice_amount}$</Text>
              <View
                style={{
                  backgroundColor: 'green',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                  marginTop: 5,
                }}>
                <Text style={{color: COLORS.white}}>Paid</Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

  function hadleAllInvoices() {
    setInvoiceTab(1);
  }
  function hadlePaidInvoices() {
    setInvoiceTab(2);
  }
  function hadleUnpaidInvoices() {
    setInvoiceTab(3);
  }
  function hadlePartialInvoices() {
    setInvoiceTab(4);
  }
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
              Invoices
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
              width: SIZES.windowWidth / 1.7,
              backgroundColor: COLORS.white,
              borderRadius: 10,
              alignItems: 'center',
              flexDirection: 'row',
              shadowColor: COLORS.black,
              elevation: 10,
            }}>
            <View style={{paddingLeft: 10}}>
              <MaterialIcons name="search" size={25} color={'grey'} />
            </View>
            <TextInput
              style={{flex: 1, color: 'black'}}
              placeholder="Enter invoice no"
              placeholderTextColor={'grey'}
            />
          </View>

          {/* filter button view */}
          <View
            style={{
              shadowColor: COLORS.black,
              elevation: 10,
              height: SIZES.windowHeight / 18,
              width: SIZES.windowWidth / 8.5,
              backgroundColor: COLORS.white,
              borderRadius: 10,
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
        </View>
      </View>

      <View
        style={{
          backgroundColor: COLORS.white,
          flex: 1,
          marginTop: 30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          shadowColor: COLORS.black,
          elevation: 3,
          alignItems: 'center',
        }}>
        {/* tab (all, paid, unpaid, partially paid) buttons */}
        <View
          style={{
            height: SIZES.windowHeight / 14,
            width: SIZES.windowWidth / 1.2,
            // borderWidth: 1,
            // borderColor: 'grey',
            marginTop: 20,
            borderRadius: 50,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              height: SIZES.windowHeight / 14,
              width: SIZES.windowWidth / 4,
              backgroundColor: invoiceTab == 1 ? COLORS.primary : COLORS.white,
              borderTopLeftRadius: 50,
              borderBottomLeftRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              borderWidth: invoiceTab == 1 ? 0 : 0.5,
              borderColor: 'grey',
              borderRightWidth: 0,
            }}
            onPress={hadleAllInvoices}>
            <Text
              style={{
                color: invoiceTab == 1 ? COLORS.white : 'grey',
                fontSize: 12,
              }}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: SIZES.windowHeight / 14,
              width: SIZES.windowWidth / 4,
              backgroundColor: invoiceTab == 2 ? COLORS.primary : COLORS.white,
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              borderWidth: invoiceTab == 2 ? 0 : 0.5,
              borderColor: 'grey',
              borderRightWidth: 0,
            }}
            onPress={hadlePaidInvoices}>
            <Text
              style={{
                color: invoiceTab == 2 ? COLORS.white : 'grey',
                fontSize: 12,
              }}>
              Paid
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: SIZES.windowHeight / 14,
              width: SIZES.windowWidth / 4,
              backgroundColor: invoiceTab == 3 ? COLORS.primary : COLORS.white,
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              borderWidth: invoiceTab == 3 ? 0 : 0.5,
              borderColor: 'grey',
              borderRightWidth: 0,
            }}
            onPress={hadleUnpaidInvoices}>
            <Text
              style={{
                color: invoiceTab == 3 ? COLORS.white : 'grey',
                fontSize: 12,
              }}>
              Unpaid
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: SIZES.windowHeight / 14,
              width: SIZES.windowWidth / 4,
              backgroundColor: invoiceTab == 4 ? COLORS.primary : COLORS.white,
              borderTopRightRadius: 50,
              borderBottomRightRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: invoiceTab == 4 ? 0 : 0.5,
              borderColor: 'grey',
              flex: 1,
            }}
            onPress={hadlePartialInvoices}>
            <Text
              style={{
                color: invoiceTab == 4 ? COLORS.white : 'grey',
                fontSize: 12,
              }}>
              Partially Paid
            </Text>
          </TouchableOpacity>
        </View>

        {invoiceTab == 1 && allInvoices != null && (
          <View>
            <FlatList
              data={allInvoices.data}
              contentContainerStyle={{
                paddingBottom: '50%',
                paddingTop: 10,
              }}
              keyExtractor={item => item.vin}
              renderItem={renderAllInvoices}
            />
          </View>
        )}

        {loading == true && (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator color={COLORS.primary} size={'large'} />
          </View>
        )}
      </View>
    </View>
  );
}
