import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import AppBackground from '../../components/AppBackground';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}>
        <AppBackground />
      </View>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
          Forgot Password?
        </Text>
      </View>

      <View style={{paddingHorizontal: 20}}>
        <View
          style={{
            marginTop: 20,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 10,
          }}>
          <Icon name="email" size={20} color={'white'} />
          <View style={{flex: 1}}>
            <TextInput
              placeholder="Enter your email"
              keyboardType="email-address"
              placeholderTextColor={'white'}
              style={{
                paddingLeft: 10,
                color: 'black',
                borderColor: 'black',
              }}
              onChangeText={text => setEmail(text)}
            />
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 10,
          }}>
          <Icon name="lock" size={20} color={'white'} />
          <View style={{flex: 1}}>
            <TextInput
              placeholder="Enter new password"
              keyboardType="email-address"
              placeholderTextColor={'white'}
              style={{
                paddingLeft: 10,
                color: 'black',
                borderColor: 'black',
              }}
              onChangeText={text => setPassword(text)}
            />
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 10,
          }}>
          <Icon name="lock" size={20} color={'white'} />
          <View style={{flex: 1}}>
            <TextInput
              placeholder="Confirm password"
              keyboardType="email-address"
              placeholderTextColor={'white'}
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
          position: 'absolute',
          bottom: '5%',
          alignSelf: 'center',
        }}>
        <TouchableOpacity
          style={{
            width: SIZES.windowWidth / 1.33,
            height: SIZES.windowHeight / 16,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}
          onPress={() => console.log('Submit Forgot Password')}>
          <Text
            style={{
              color: COLORS.primary,
              fontSize: 16,
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
