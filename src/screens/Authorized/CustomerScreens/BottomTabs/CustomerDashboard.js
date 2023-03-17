import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Image,
  ActivityIndicator,
  RefreshControl,
  BackHandler,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, SIZES, SVGBackground, TEXT} from '../../../../constants/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SvgXml} from 'react-native-svg';
import DashboardItems from '../../../../components/DashboardItems';
import {Easing} from 'react-native-reanimated';
import AppBackground from '../../../../components/AppBackground';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CustomerDashboard({navigation}) {
  const OpacityValue = useRef(new Animated.Value(0)).current;
  const [userName, serUserName] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const _onRefresh = () => {
    setRefreshing(true);
    setIsRefreshing(!isRefreshing);
  };

  const getName = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      if (username !== null) {
        serUserName(username);
        // console.log('Name retrieved from AsyncStorage:', username);
      }
    } catch (error) {
      console.warn('Error while retrieving username from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    getName();
  }, []);

  useEffect(() => {
    Animated.timing(OpacityValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  }, []);

  // useEffect for fetching dashboard data from api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
          console.log('Token retrieved from AsyncStorage:', token);
          try {
            const response = await fetch(
              'https://app.ecsapshipping.com/api/auth/dashboard/list',
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + token,
                },
              },
            );

            console.log('Fetching dashboard data...');
            const data = await response.json();

            if (data.status == 'Success') {
              setDashboardData(data);
              console.log('Dashboard fetched successfully');
              setRefreshing(false);
              console.log(data.message);
            } else {
              console.log('Error fetching Dashboard');
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
  }, [isRefreshing]);

  // useEffect for controling when the back button is pressed
  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     handleBackPress,
  //   );
  //   return () => {
  //     backHandler.remove();
  //   };
  // }, []);

  const handleBackPress = () => {
    BackHandler.exitApp();
    return true;
  };

  const HorizontalTab = ({title, OnPress, Number}) => {
    return (
      <TouchableOpacity
        style={{
          width: SIZES.windowWidth / 3.6,
          height: SIZES.windowHeight / 8,
          backgroundColor: COLORS.white,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={OnPress}>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              color: COLORS.primary,
              bottom: '10%',
              fontWeight: 'bold',
              fontSize: 12,
            }}>
            {title}
          </Text>
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.pickedup,
            }}>
            <Image
              source={require('../../../../assets/icons/pickedup.png')}
              resizeMode="contain"
              style={{
                height: 30,
                width: 30,
              }}
            />
          </View>
          <Text style={{color: COLORS.primary, fontWeight: 'bold', top: '10%'}}>
            {Number}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Animated.View style={{flex: 1, opacity: OpacityValue}}>
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

      {/* view for drawer and profile button */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingTop: 20,
        }}>
        <TouchableOpacity style={{}} onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={25} color={COLORS.white} />
        </TouchableOpacity>

        <View>
          <Text style={{color: COLORS.white, fontSize: 16}}>Dashboard</Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          {/* notification button */}
          <TouchableOpacity
            style={{
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              right: '15%',
            }}
            onPress={() => navigation.navigate('Notifications')}>
            <View
              style={{
                height: 13,
                width: 13,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: 'red',
                backgroundColor: COLORS.white,
                position: 'absolute',
                bottom: '60%',
                left: '60%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'red', fontSize: 5}}>56</Text>
            </View>
            <Icon name="bell" size={23} color={COLORS.white} />
          </TouchableOpacity>

          {/* user profile button */}
          <TouchableOpacity
            style={{
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: COLORS.white,
            }}
            onPress={() => navigation.navigate('CustomerProfile')}>
            <Image
              source={require('../../../../assets/images/model.jpg')}
              resizeMode="contain"
              style={{height: 40, width: 40, borderRadius: 25}}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* welcome view (username and company name) */}
      <View style={{paddingHorizontal: 20}}>
        <View>
          <Text style={{color: COLORS.white, fontSize: 20, fontWeight: 'bold'}}>
            Welcome,
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 5,
          }}>
          <View>
            <Text style={{color: COLORS.white, fontSize: 16}}>
              {userName} to {TEXT.title}
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('StickyNotes')}>
            <Image
              source={require('../../../../assets/icons/sticky.png')}
              style={{
                height: 30,
                width: 30,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* view for tab buttons, horizontal scroll */}
      <View
        style={{
          height: SIZES.windowHeight / 6,
          width: '100%',
          backgroundColor: 'rgba(191, 229, 239, 0.7)',
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <ScrollView
          horizontal={true}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={_onRefresh}
              colors={['#1B7ADE']}
            />
          }
          showsHorizontalScrollIndicator={false}
          style={{flexDirection: 'row'}}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
            paddingRight: 10,
          }}>
          <View style={{marginRight: 10}}>
            <HorizontalTab
              title={'All Customers'}
              OnPress={() => console.log('All Customers')}
              Number={
                dashboardData != null && dashboardData.data.TotalCustomers
              }
            />
          </View>
          <View style={{marginRight: 10}}>
            <HorizontalTab
              title={'All Vehicles'}
              OnPress={() => console.log('All Vehicles')}
              Number={dashboardData != null && dashboardData.data.TotalVehicles}
            />
          </View>
          <View style={{marginRight: 10}}>
            <HorizontalTab
              title={'Shipments'}
              OnPress={() => console.log('Shipments')}
              Number={
                dashboardData != null && dashboardData.data.completed_total
              }
            />
          </View>
          <View style={{marginRight: 10}}>
            <HorizontalTab
              title={'Invoices'}
              OnPress={() => console.log('Invoices')}
            />
          </View>
        </ScrollView>
      </View>

      {/* view containing dashboard items */}
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}>
        <View style={{position: 'absolute'}}>
          <Image
            source={require('../../../../assets/images/dashboard.png')}
            resizeMode={'cover'}
          />
        </View>

        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{paddingBottom: '3%'}}
          showsVerticalScrollIndicator={false}>
          {/* view containing all dashboard items */}

          <View style={{flex: 1, paddingHorizontal: 20}}>
            {/* calling the DashboardItems component which contains two items in a row
            then passing the props which decides the title, icon, backgroundColor and onpress function */}
            <View style={{marginTop: '5%'}}>
              <DashboardItems
                Title1={'NEW ORDER'}
                Title2={'DISPATCHED'}
                Icon1={require('../../../../assets/icons/pickedup.png')}
                Icon2={require('../../../../assets/icons/ontheway.png')}
                Color1={COLORS.pickedup}
                Color2={COLORS.ontheway}
                OnPress1={() => console.log('NEW ORDER Pressed')}
                OnPress2={() => console.log('DISPATCHED Pressed')}
                Num1={dashboardData != null && dashboardData.data.NewOrders}
                Num2={dashboardData != null && dashboardData.data.Dispatched}
              />
            </View>

            <View style={{marginTop: '5%'}}>
              <DashboardItems
                Title1={'ON HAND'}
                Title2={'NO TITLES'}
                Icon1={require('../../../../assets/icons/onhand.png')}
                Icon2={require('../../../../assets/icons/manifest.png')}
                Color1={COLORS.onhand}
                Color2={COLORS.manifest}
                OnPress1={() => console.log('ON HAND Pressed')}
                OnPress2={() => console.log('NO TITLES Pressed')}
                Num1={dashboardData != null && dashboardData.data.onhand_count}
                Num2={dashboardData != null && dashboardData.data.no_titles}
              />
            </View>

            <View style={{marginTop: '5%'}}>
              <DashboardItems
                Title1={'TOWING'}
                Title2={'BOOKED'}
                Icon1={require('../../../../assets/icons/shipped.png')}
                Icon2={require('../../../../assets/icons/arrived.png')}
                Color1={COLORS.shipped}
                Color2={COLORS.arrived}
                OnPress1={() => console.log('TOWING Pressed')}
                OnPress2={() => console.log('BOOKED Pressed')}
                // Num1={dashboardData != null && dashboardData.data.shipped_count}
                Num2={dashboardData != null && dashboardData.data.booked_count}
              />
            </View>

            <View style={{marginTop: '5%'}}>
              <DashboardItems
                Title1={'SHPPED'}
                Title2={'ARRIVED'}
                Icon1={require('../../../../assets/icons/container.png')}
                Icon2={require('../../../../assets/icons/accounting.png')}
                Color1={COLORS.container}
                Color2={COLORS.accounting}
                OnPress1={() => console.log('SHPPED Pressed')}
                OnPress2={() => console.log('ARRIVED Pressed')}
                Num1={dashboardData != null && dashboardData.data.shipped_count}
                Num2={dashboardData != null && dashboardData.data.arrived_total}
              />
            </View>
          </View>

          <View style={{paddingBottom: SIZES.windowHeight / 7}} />
        </ScrollView>
      </View>
    </Animated.View>
  );
}
