import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View as MotiView, AnimatePresence} from 'moti';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import AppBackground from '../../components/AppBackground';
import {Easing} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [button, showButton] = useState(true);
  const loginSlideAnimationValue = useRef(new Animated.Value(0)).current;
  const welcomeAnimation = useRef(new Animated.Value(1)).current;
  const textAnimation = useRef(new Animated.Value(26)).current;

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [checkEmail, setCheckEmail] = useState(true);
  const [checkPassword, setCheckPassword] = useState(true);

  const [isFormValid, setIsFormValid] = useState(true);

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

  const handleLoginPress = () => {
    setShowLogin(true);
    showButton(false);

    Animated.parallel([
      Animated.timing(welcomeAnimation, {
        toValue: 0.2,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.timing(textAnimation, {
        toValue: 20,
        duration: 1000,
        useNativeDriver: false,
        easing: Easing.ease,
      }),
    ]).start();
  };

  const loginViewStyle = {
    transform: [
      {
        translateY: welcomeAnimation.interpolate({
          inputRange: [0, 2.2],
          outputRange: [0, 500],
        }),
      },
    ],
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
    <View style={{flex: 1}}>
      <View
        style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}>
        <AppBackground />
      </View>
      {/* first circle at at left corner */}
      <View
        style={{
          width: SIZES.windowWidth / 2.3,
          height: SIZES.windowHeight / 4.1,
          backgroundColor: 'rgba(133, 180, 235, 0.32)',
          position: 'absolute',
          borderRadius: SIZES.windowHeight / 3,
          left: -SIZES.windowWidth / 4.5,
          top: -SIZES.windowHeight / 18,
        }}
      />

      {/* second circle at top right corner */}
      <View
        style={{
          width: SIZES.windowWidth / 1.8,
          height: SIZES.windowHeight / 3.3,
          backgroundColor: 'rgba(133, 180, 235, 0.32)',
          position: 'absolute',
          borderRadius: SIZES.windowHeight / 3,
          right: -SIZES.windowWidth / 4.5,
          top: -SIZES.windowHeight / 18,
        }}
      />

      {/* third circle at middle left*/}
      <View
        style={{
          width: SIZES.windowWidth / 2.2,
          height: SIZES.windowHeight / 4.6,
          backgroundColor: 'rgba(133, 180, 235, 0.32)',
          position: 'absolute',
          borderRadius: SIZES.windowHeight / 3,
          left: -SIZES.windowWidth / 14,
          bottom: SIZES.windowHeight / 3.5,
        }}
      />

      {/* fourth circle at middle of screen*/}
      <View
        style={{
          width: SIZES.windowWidth / 3.5,
          height: SIZES.windowHeight / 7,
          backgroundColor: 'rgba(133, 180, 235, 0.32)',
          position: 'absolute',
          borderRadius: SIZES.windowHeight / 3,
          left: SIZES.windowWidth / 3.3,
          bottom: SIZES.windowHeight / 10,
        }}
      />

      <View>
        <TouchableOpacity
          style={{paddingTop: 20, paddingLeft: 20}}
          onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[
          {alignItems: 'center', justifyContent: 'center'},
          loginViewStyle,
        ]}>
        <Animated.Text
          style={{
            color: 'white',
            fontSize: textAnimation,
            textAlign: 'center',
            paddingHorizontal: 10,
          }}>
          Welcome to {TEXT.title}
        </Animated.Text>
        {button && (
          <TouchableOpacity
            onPress={handleLoginPress}
            style={{
              width: SIZES.windowWidth / 1.2,
              height: SIZES.windowHeight / 12,
              marginTop: 10,
              borderRadius: 13,
              backgroundColor: COLORS.white,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: COLORS.primary,
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Get Started
            </Text>
          </TouchableOpacity>
        )}
      </Animated.View>

      <AnimatePresence exitBeforeEnter>
        {showLogin && (
          <MotiView
            key="yellow"
            from={{opacity: 0, scale: 0.9}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 0.9}}
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}
            transition={{type: 'timing', delay: 1000, duration: 500}}>
            <View
              style={{
                height: SIZES.windowHeight / 4,
                width: SIZES.windowWidth / 1.2,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: 20,
                shadowColor: 'blue',
                justifyContent: 'center',
                elevation: 3,
              }}>
              <View style={{paddingLeft: 10, bottom: 15}}>
                <Text
                  style={{
                    color: COLORS.primary,
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  Sign in
                </Text>
              </View>

              <View style={{alignItems: 'center'}}>
                <TextInput
                  placeholder="Username or Email"
                  keyboardType="email-address"
                  placeholderTextColor={emailFocused ? COLORS.primary : 'grey'}
                  style={{
                    height: SIZES.windowHeight / 16,
                    width: SIZES.windowWidth / 1.4,
                    borderWidth: 1,
                    paddingLeft: 10,
                    borderRadius: 10,
                    color: 'black',
                    borderColor: emailFocused ? COLORS.primary : 'black',
                  }}
                  ref={emailRef}
                  onChangeText={text => handleEmail(text)}
                  onFocus={handleEmailFocus}
                  onBlur={handleEmailBlur}
                />

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
                <TextInput
                  placeholder="Password"
                  keyboardType="visible-password"
                  placeholderTextColor={
                    passwordFocused ? COLORS.primary : 'grey'
                  }
                  style={{
                    height: SIZES.windowHeight / 16,
                    width: SIZES.windowWidth / 1.4,
                    borderWidth: 1,
                    paddingLeft: 10,
                    borderRadius: 10,
                    marginTop: 10,
                    color: 'black',
                    borderColor: passwordFocused ? COLORS.primary : 'black',
                  }}
                  ref={passwordRef}
                  onChangeText={text => handlePassword(text)}
                  onFocus={handlePasswordFocus}
                  onBlur={handlePasswordBlur}
                />

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
              </View>
            </View>

            <View style={{marginTop: 20}}>
              <TouchableOpacity
                disabled={isFormValid}
                style={{
                  width: SIZES.windowWidth / 1.2,
                  height: SIZES.windowHeight / 16,
                  backgroundColor: isFormValid
                    ? 'grey'
                    : 'rgba(255, 255, 255, 0.8)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}
                onPress={LoginFunction}>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 16,
                  }}>
                  Sign in
                </Text>
              </TouchableOpacity>

              {isLoading == true && (
                <View>
                  <ActivityIndicator
                    size={'large'}
                    color={COLORS.white}
                    animating={true}
                  />
                </View>
              )}

              <TouchableOpacity
                style={{alignItems: 'center', marginTop: 5}}
                onPress={() => console.log('Forgot Password?')}>
                <Text style={{color: 'white', fontSize: 16}}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
          </MotiView>
        )}
      </AnimatePresence>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
