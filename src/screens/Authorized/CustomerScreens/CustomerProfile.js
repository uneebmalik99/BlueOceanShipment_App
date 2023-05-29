import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {SIZES, COLORS} from '../../../constants/theme';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CustomerProfile({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Image
        source={require('../../../assets/images/profile-back.png')}
        resizeMode="contain"
        style={{
          width: SIZES.windowWidth,
          height: '65%',
          position: 'absolute',
          bottom: '49%',
        }}
      />

      <TouchableOpacity
        style={{paddingLeft: 15, paddingTop: 15}}
        onPress={() => navigation.goBack()}>
        <IonIcon
          name="arrow-back-circle-sharp"
          size={25}
          color={COLORS.white}
        />
      </TouchableOpacity>

      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: '5%',
          justifyContent: 'space-between',
        }}>
        <View style={{alignItems: 'center'}}>
          <Text style={{color: 'white', fontSize: 22, fontWeight: 'bold'}}>
            Denial Rozar
          </Text>
          <Text style={{color: 'white'}}>user@gmail.com</Text>
        </View>

        <View style={{elevation: 15, shadowColor: 'black'}}>
          <Image
            source={require('../../../assets/images/model.jpg')}
            resizeMode="contain"
            style={{height: 100, width: 100, borderRadius: 50}}
          />
        </View>
      </View>

      <View
        style={{
          height: 32,
          width: 121,
          borderRadius: 30,
          backgroundColor: '#D7E5EF',
          alignSelf: 'flex-end',
          marginTop: '12%',
          elevation: 5,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          marginRight: '2%',
        }}>
        <View>
          <Text style={{color: COLORS.primary}}>Balance</Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={{color: COLORS.primary}}>0.0</Text>
          <Text style={{color: 'red'}}> $</Text>
        </View>
      </View>

      {/* view for phone number */}
      <View
        style={{
          height: SIZES.windowHeight / 11,
          width: SIZES.windowWidth / 1.1,
          borderWidth: 1.3,
          borderColor: COLORS.primary,
          borderRadius: 41,
          alignSelf: 'center',
          marginTop: '6%',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 10,
        }}>
        <View
          style={{
            height: 35,
            width: 35,
            borderRadius: 20,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 7,
          }}>
          <MaterialCommunity name="phone" size={20} color={COLORS.primary} />
        </View>

        <View style={{paddingLeft: '7%'}}>
          <Text style={{color: COLORS.primary}}>Phone No</Text>
          <Text style={{color: 'black'}}>0300-1234567</Text>
        </View>
      </View>

      {/* view for address */}
      <View
        style={{
          height: SIZES.windowHeight / 11,
          width: SIZES.windowWidth / 1.1,
          borderWidth: 1.3,
          borderColor: COLORS.primary,
          borderRadius: 41,
          alignSelf: 'center',
          marginTop: '6%',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 10,
        }}>
        <View
          style={{
            height: 35,
            width: 35,
            borderRadius: 20,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 7,
          }}>
          <MaterialCommunity name="home" size={20} color={'#FF7A00'} />
        </View>

        <View style={{paddingLeft: '7%'}}>
          <Text style={{color: COLORS.primary}}>Address</Text>
          <Text style={{color: 'black'}}>8507 Rosewood Street, Manchester</Text>
        </View>
      </View>

      {/* view for account no */}
      <View
        style={{
          height: SIZES.windowHeight / 11,
          width: SIZES.windowWidth / 1.1,
          borderWidth: 1.3,
          borderColor: COLORS.primary,
          borderRadius: 41,
          alignSelf: 'center',
          marginTop: '6%',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 10,
        }}>
        <View
          style={{
            height: 35,
            width: 35,
            borderRadius: 20,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 7,
          }}>
          <MaterialCommunity name="account-cash" size={20} color={'#11978A'} />
        </View>

        <View style={{paddingLeft: '7%'}}>
          <Text style={{color: COLORS.primary}}>Account No</Text>
          <Text style={{color: 'black'}}>00000111101000010101</Text>
        </View>
      </View>
    </View>
  );
}
