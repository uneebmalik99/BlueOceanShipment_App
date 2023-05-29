import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES} from '../../../constants/theme';

export default function RecoveryEmail({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Image
        source={require('../../../assets/images/forgot-back.png')}
        style={{height: '42%', width: '100%', position: 'absolute'}}
        resizeMode="cover"
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
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../../../assets/images/mailbox.png')}
          style={{height: 189, width: 283}}
          resizeMode="contain"
        />
      </View>

      <ScrollView
        style={{marginTop: '15%'}}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <Text
            style={{color: COLORS.primary, fontSize: 18, fontWeight: 'bold'}}>
            Check your email
          </Text>
          <Text style={{textAlign: 'center', color: 'grey'}}>
            We have a sent a password recovery instruction to your email
          </Text>
        </View>

        {/* <View style={{paddingHorizontal: 20}}>
          <View
            style={{
              marginTop: 20,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: COLORS.primary,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 10,
            }}>
            <Icon name="email" size={20} color={COLORS.primary} />
            <View style={{flex: 1}}>
              <TextInput
                placeholder="Enter your email"
                keyboardType="email-address"
                placeholderTextColor={'grey'}
                style={{
                  paddingLeft: 10,
                  color: 'black',
                  borderColor: 'black',
                }}
                onChangeText={text => setEmail(text)}
              />
            </View>
          </View>
        </View> */}

        <View
          style={{
            marginTop: 25,
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: SIZES.windowWidth / 1.33,
              height: SIZES.windowHeight / 16,
              backgroundColor: COLORS.primary,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}
            onPress={() => navigation.navigate('RecoverPassword')}>
            <Text
              style={{
                color: COLORS.white,
                fontSize: 16,
              }}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
