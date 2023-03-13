import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Image,
  ActivityIndicator,
  RefreshControl,
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
        console.log('Name retrieved from AsyncStorage:', username);
        // Do something with the token, e.g. send it in a request header
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
      //  setIsLoading(true);

      try {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
          console.log('Token retrieved from AsyncStorage:', token);
          try {
            const response = await fetch(
              'https://app.ecsapshipping.com/api/auth/dashboard/view',
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

            // console.log(JSON.stringify(data));

            if (data.status == 'Success') {
              setDashboardData(data);
              console.log('Dashboard fetched successfully');
              setRefreshing(false);
              console.log(data.message);
              console.log(data.data.onhand_count);
              // setIsData(true);
              // globalThis.myVarr.data.map(item => console.log(item.id));
            } else {
              console.log('Error fetching Dashboard');
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
  }, [isRefreshing]);

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

        <TouchableOpacity
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('CustomerProfile')}>
          <FontAwesome name="user-alt" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* welcome view (username and company name) */}
      <View style={{paddingHorizontal: 20}}>
        <View>
          <Text style={{color: COLORS.white, fontSize: 20, fontWeight: 'bold'}}>
            Welcome,
          </Text>
        </View>
        <View>
          <Text style={{color: COLORS.white, fontSize: 16}}>
            {userName} to {TEXT.title}
          </Text>
        </View>
      </View>

      {/* view containing dashboard items */}
      <View
        style={{
          flex: 1,
          backgroundColor: '#E7ECF8',
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          marginTop: 20,
        }}>
        <View style={{position: 'absolute'}}>
          <Image
            source={require('../../../../assets/images/dashboard.png')}
            resizeMode={'cover'}
            // style={{
            //   height: SIZES.windowHeight / 1,
            //   width: SIZES.windowWidth,
            // }}
          />
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={_onRefresh}
              colors={['#1B7ADE']}
            />
          }
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}>
          {/* view containing all dashboard items */}

          <View style={{flex: 1, paddingHorizontal: 20}}>
            {/* calling the DashboardItems component which contains two items in a row
            then passing the props which decides the title, icon, backgroundColor and onpress function */}
            <DashboardItems
              Title1={'PICKED UP'}
              Title2={'ON THE WAY'}
              Icon1={require('../../../../assets/icons/pickedup.png')}
              Icon2={require('../../../../assets/icons/ontheway.png')}
              Color1={COLORS.pickedup}
              Color2={COLORS.ontheway}
              OnPress1={() => console.log('PickedUp Pressed')}
              OnPress2={() => console.log('OnTheWay Pressed')}
            />

            <DashboardItems
              Title1={'ON HAND'}
              Title2={'MANIFEST'}
              Icon1={require('../../../../assets/icons/onhand.png')}
              Icon2={require('../../../../assets/icons/manifest.png')}
              Color1={COLORS.onhand}
              Color2={COLORS.manifest}
              OnPress1={() => console.log('OnHand Pressed')}
              OnPress2={() => console.log('Manifest Pressed')}
              Num1={dashboardData != null && dashboardData.data.onhand_count}
            />

            <DashboardItems
              Title1={'SHIPPED'}
              Title2={'ARRIVED'}
              Icon1={require('../../../../assets/icons/shipped.png')}
              Icon2={require('../../../../assets/icons/arrived.png')}
              Color1={COLORS.shipped}
              Color2={COLORS.arrived}
              OnPress1={() => console.log('Shipped Pressed')}
              OnPress2={() => console.log('Arrived Pressed')}
              Num1={dashboardData != null && dashboardData.data.shipped_count}
              Num2={dashboardData != null && dashboardData.data.arrived_count}
            />

            <DashboardItems
              Title1={'CONTAINER'}
              Title2={'ACCOUNTING'}
              Icon1={require('../../../../assets/icons/container.png')}
              Icon2={require('../../../../assets/icons/accounting.png')}
              Color1={COLORS.container}
              Color2={COLORS.accounting}
              OnPress1={() => console.log('Container Pressed')}
              OnPress2={() => console.log('Accounting Pressed')}
              Num1={dashboardData != null && dashboardData.data.completed_total}
            />
          </View>

          <View style={{paddingBottom: SIZES.windowHeight / 6}} />
        </ScrollView>
      </View>
    </Animated.View>
  );
}
