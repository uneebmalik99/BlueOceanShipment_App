import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Animated,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View as MotiView, AnimatePresence} from 'moti';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import AppBackground from '../../components/AppBackground';
import {Easing} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [checkEmail, setCheckEmail] = useState(true);
  const [checkPassword, setCheckPassword] = useState(true);

  const [isFormValid, setIsFormValid] = useState(true);
  const animation = useRef(new Animated.Value(0)).current;

  const [secureEntry, setSecureEntry] = useState(true);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [animation]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0],
  });

  const handleEmailFocus = () => {
    setEmailFocused(true);
    setCheckEmail(false);
  };
  const handleEmailBlur = () => setEmailFocused(false);

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
    setCheckPassword(false);
  };
  const handlePasswordBlur = () => setPasswordFocused(false);

  const LoginFunction = async () => {
    if (email.length == 0 || password.length == 0) {
      return console.log('Please enter email and password');
    } else {
      setIsLoading(true);
      var url = 'https://app.ecsapshipping.com/api/auth/login';
      var value = {};
      (value.email = email), (value.password = password);
      console.log('Login_key_vale ', value);
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.status == 'Success') {
            // console.log(JSON.stringify(responseJson));
            console.log(responseJson.data.token);
            const AsyncData = [
              ['token', responseJson.data.token],
              ['name', responseJson.data.data.name],
              ['username', responseJson.data.data.username],
              ['email', responseJson.data.data.email],
              ['company_name', responseJson.data.data.company_name],
              ['company_email', responseJson.data.data.company_email],
              ['status', responseJson.data.data.status],
              ['role_id', responseJson.data.data.role_id],
            ];

            // console.log(AsyncData[0]);
            AsyncStorage.multiSet(AsyncData)
              .then(() => {
                console.log('Data Saved Succefully');
              })
              .catch(error => {
                console.log('Error Saving Data');
              });

            // AsyncStorage.setItem('token', responseJson.data.token)
            //   .then(() => {
            //     console.log('Token saved to AsyncStorage');
            //   })
            //   .catch(error => {
            //     console.warn(
            //       'Error while saving token to AsyncStorage:',
            //       error,
            //     );
            //   });
            console.log('Login Success');
            setIsLoading(false);
            emailRef.current.clear();
            passwordRef.current.clear();
            setEmail('');
            setPassword('');
            setIsFormValid(true);
            // console.log(responseJson.data.token);
            navigation.navigate('CustomerDrawer');
          } else {
            console.log('Login Error');
          }
        })
        .catch(error => {
          setIsLoading(false);
          alert('Error while login' + error);
          console.warn(error);
        });
    }
  };

  const handleEmail = text => {
    if (validateEmail(text)) {
      setEmail(text);
      setCheckEmail(true);
    } else {
      setCheckEmail(false);
    }
  };
  const handlePassword = text => {
    if (text.length == 0) {
      setCheckPassword(false);
      setIsFormValid(true);
    } else {
      setPassword(text);
      setCheckPassword(true);
      setIsFormValid(false);
    }
  };

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../../assets/images/ship.jpg')}>
      <View>
        <TouchableOpacity
          style={{paddingTop: 20, paddingLeft: 20}}
          onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={25} color="white" />
        </TouchableOpacity>
      </View>
      <Animated.ScrollView
        style={[
          {
            backgroundColor: COLORS.white,
            position: 'absolute',
            width: '100%',
            height: '70%',
            bottom: 0,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingHorizontal: 20,
          },
          {transform: [{translateY}]},
        ]}>
        <View style={{marginTop: 20}}>
          <Text style={{fontWeight: 'bold', color: COLORS.black, fontSize: 16}}>
            Welcome to Blue Ocean Shipping
          </Text>
          <Text style={{color: COLORS.primary, marginTop: 5}}>
            Sign in to continue
          </Text>
        </View>

        <View
          style={{
            marginTop: 20,
            borderBottomWidth: 1,
            borderBottomColor: emailFocused ? COLORS.primary : 'grey',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon
            name="email"
            size={20}
            color={emailFocused ? COLORS.primary : 'grey'}
          />
          <View style={{flex: 1}}>
            <View
              style={{
                paddingLeft: 10,
                top: '20%',
              }}>
              <Text style={{color: COLORS.black, fontWeight: 'bold'}}>
                EMAIL
              </Text>
            </View>
            <TextInput
              placeholder="Username or email"
              keyboardType="email-address"
              placeholderTextColor={emailFocused ? COLORS.primary : 'grey'}
              style={{
                flex: 1,
                paddingLeft: 10,
                color: 'black',
                borderColor: emailFocused ? COLORS.primary : 'black',
              }}
              ref={emailRef}
              onChangeText={text => handleEmail(text)}
              onFocus={handleEmailFocus}
              onBlur={handleEmailBlur}
            />
          </View>
        </View>
        {checkEmail ? null : (
          <Text
            style={{
              color: 'red',
              alignSelf: 'flex-start',
              paddingLeft: '8%',
            }}>
            Invalid Email
          </Text>
        )}

        <View
          style={{
            marginTop: 10,
            borderBottomWidth: 1,
            borderBottomColor: passwordFocused ? COLORS.primary : 'grey',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon
            name="lock"
            size={20}
            color={passwordFocused ? COLORS.primary : 'grey'}
          />
          <View style={{flex: 1}}>
            <View
              style={{
                paddingLeft: 10,
                top: '20%',
              }}>
              <Text style={{color: COLORS.black, fontWeight: 'bold'}}>
                PASSWORD
              </Text>
            </View>
            <TextInput
              placeholder="Password"
              // keyboardType="visible-password"
              placeholderTextColor={passwordFocused ? COLORS.primary : 'grey'}
              style={{
                flex: 1,
                borderBottomColor: passwordFocused ? COLORS.primary : 'grey',
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 10,
              }}
              ref={passwordRef}
              onChangeText={text => handlePassword(text)}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              secureTextEntry={secureEntry}
            />
          </View>

          <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}>
            <Icon
              name={secureEntry ? 'eye-off' : 'eye'}
              size={20}
              color={'grey'}
            />
          </TouchableOpacity>
        </View>
        {checkPassword ? null : (
          <Text
            style={{
              color: 'red',
              alignSelf: 'flex-start',
              paddingLeft: '8%',
            }}>
            Invalid Password
          </Text>
        )}

        <View style={{marginTop: 20, alignItems: 'center'}}>
          <TouchableOpacity
            disabled={isFormValid}
            style={{
              width: SIZES.windowWidth / 1.2,
              height: SIZES.windowHeight / 16,
              backgroundColor: isFormValid ? 'grey' : COLORS.primary,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}
            onPress={LoginFunction}>
            {isLoading == true ? (
              <View>
                <ActivityIndicator
                  size={'small'}
                  color={COLORS.white}
                  animating={true}
                />
              </View>
            ) : (
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 16,
                }}>
                Sign in
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={{alignItems: 'center', marginTop: 20}}
            onPress={() => console.log('Forgot Password?')}>
            <Text style={{color: 'grey', fontSize: 14}}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 20, alignItems: 'center'}}>
          <TouchableOpacity
            // disabled={isFormValid}
            style={{
              width: SIZES.windowWidth / 1.2,
              height: SIZES.windowHeight / 16,
              backgroundColor: COLORS.white,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: 'grey',
            }}
            onPress={() => console.log('SignUp Pressed')}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 16,
              }}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </ImageBackground>
  );
}

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
