import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES} from '../../../constants/theme';

export default function RecoverPassword({navigation}) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
          source={require('../../../assets/images/recover-password.png')}
          style={{height: 180, width: 270}}
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
            Create new password
          </Text>
          <Text style={{textAlign: 'center', color: 'grey'}}>
            Your new password must be different from previously used password
          </Text>
        </View>

        <View style={{paddingHorizontal: 20}}>
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
            <Icon name="lock" size={20} color={COLORS.primary} />
            <View style={{flex: 1}}>
              <TextInput
                placeholder="Enter new password"
                keyboardType="visible-password"
                placeholderTextColor={'grey'}
                style={{
                  paddingLeft: 10,
                  color: 'black',
                  borderColor: 'black',
                }}
                onChangeText={text => setPassword(text)}
              />
            </View>
          </View>
        </View>

        <View style={{paddingHorizontal: 20}}>
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
            <Icon name="lock" size={20} color={COLORS.primary} />
            <View style={{flex: 1}}>
              <TextInput
                placeholder="Confirm password"
                keyboardType="visible-password"
                placeholderTextColor={'grey'}
                style={{
                  paddingLeft: 10,
                  color: 'black',
                  borderColor: 'black',
                }}
                onChangeText={text => setConfirmPassword(text)}
              />
            </View>
          </View>
        </View>

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
            onPress={() => console.log('Recover Password')}>
            <Text
              style={{
                color: COLORS.white,
                fontSize: 16,
              }}>
              Create
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
