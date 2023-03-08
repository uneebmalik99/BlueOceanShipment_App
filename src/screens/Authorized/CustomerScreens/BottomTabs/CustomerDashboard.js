import {View, Text, TouchableOpacity, ScrollView, Animated} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, SIZES, SVGBackground} from '../../../../constants/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SvgXml} from 'react-native-svg';
import DashboardItems from '../../../../components/DashboardItems';
import {Easing} from 'react-native-reanimated';
import AppBackground from '../../../../components/AppBackground';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CustomerDashboard({navigation}) {
  const OpacityValue = useRef(new Animated.Value(0)).current;
  // const [authToken, setAuthToken] = useState(null);

  // const getToken = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem('token');
  //     if (token !== null) {
  //       setAuthToken(token);
  //       console.log('Token retrieved from AsyncStorage:', token);
  //       // Do something with the token, e.g. send it in a request header
  //     }
  //   } catch (error) {
  //     console.warn('Error while retrieving token from AsyncStorage:', error);
  //   }
  // };

  // useEffect(() => {
  //   getToken();
  // }, []);

  useEffect(() => {
    Animated.timing(OpacityValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  }, []);

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

      {/* view for dashboard icon and text */}

      {/* view containing dashboard items */}
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          marginTop: 20,
        }}>
        <ScrollView
          style={{paddingHorizontal: 20, flex: 1}}
          showsVerticalScrollIndicator={false}>
          {/* view containing all dashboard items */}
          <View style={{flex: 1}}>
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
            />
          </View>

          <View style={{paddingBottom: SIZES.windowHeight / 6}} />
        </ScrollView>
      </View>
    </Animated.View>
  );
}
