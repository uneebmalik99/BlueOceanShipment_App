import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Animated,
  Video,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {View as MotiView, AnimatePresence} from 'moti';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import AppBackground from '../../components/AppBackground';
import {Easing} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Biometrics, {BiometryType, BiometryTypes} from 'react-native-biometrics';

export default function Login({navigation}) {
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  var value = {};

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [checkEmail, setCheckEmail] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);

  // const [isFormValid, setIsFormValid] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const [secureEntry, setSecureEntry] = useState(true);

  // states for Biometrics atuhtentication
  const ReactNativeBiometrics = new Biometrics();
  const [isFirstTimeLogin, setIsFirstTimeLogin] = useState(true);
  const [isBiometricsSupported, setIsBiometricsSupported] = useState(false);
  const [biometricType, setBiometricType] = useState(null);

  // function to control what to do when the textinputs are in focus and are in blur
  const handleEmailFocus = () => setEmailFocused(true);
  const handleEmailBlur = () => setEmailFocused(false);

  const handlePasswordFocus = () => setPasswordFocused(true);
  const handlePasswordBlur = () => setPasswordFocused(false);

  // email input onchange function to check validation
  const handleEmail = text => {
    if (validateEmail(text)) {
      setEmail(text);
      setCheckEmail(false);
    } else {
      setCheckEmail(true);
    }
  };
  // password input onchange function to check validation
  const handlePassword = text => {
    if (text.length == 0) {
      setCheckPassword(true);
    } else {
      setPassword(text);
      setCheckPassword(false);
    }
  };

  // email regular expression for validation
  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // useEffect to check the availibility of sensors
  useEffect(() => {
    ReactNativeBiometrics.isSensorAvailable().then(result => {
      setIsBiometricsSupported(result.available);
      setBiometricType(result.biometryType);
      console.log('Biometrics Supported');
    });
  }, []);

  // this function will be calle in login function if the authentication credentials are not stored
  // in the app for the first time running of app, it will not get called again if the credentials are stored
  const storeLoginCredentials = async () => {
    try {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect to get the login credentials from AsyncStorage, this is used to check if the user has logged in
  // first time or not, the useEffect will check if email and password are present in the AsyncStorage, if they are
  // it will toggle the setIsFirstTimeLogin
  useEffect(() => {
    AsyncStorage.multiGet(['email', 'password']).then(result => {
      setIsFirstTimeLogin(!result);
      if (!result) {
        console.log('No authentication data');
      } else {
        console.log('Found authentication data: ' + result);
      }
    });
  }, []);

  // function for biometric authentication
  const BiometricAuthentication = async () => {
    const Email = await AsyncStorage.getItem('email');
    const Password = await AsyncStorage.getItem('password');
    if (!Email || !Password) {
      console.log('Please log in with email and password for the first time');
      alert('Please log in with email and password for the first time');
    } else {
      setIsLoading(true);
      var url = 'https://app.ecsapshipping.com/api/auth/login';

      (value.email = Email), (value.password = Password);
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
            if (isFirstTimeLogin) {
              storeLoginCredentials();
            }
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

            AsyncStorage.multiSet(AsyncData)
              .then(() => {
                console.log('Data Saved Succefully');
              })
              .catch(error => {
                console.log('Error Saving Data');
              });

            console.log('Login Success');
            setIsLoading(false);
            emailRef.current.clear();
            passwordRef.current.clear();
            setEmail('');
            setPassword('');
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
      console.log('successful biometrics provided');
    }
  };

  // login authentication by using Biometrics (if they are available)
  const handleBiometrics = async () => {
    if (isBiometricsSupported && biometricType === BiometryTypes.TouchID) {
      console.log('TouchID is supported');
      ReactNativeBiometrics.simplePrompt({
        promptMessage: 'Confirm Fingerprint',
      })
        .then(resultObject => {
          const {success} = resultObject;
          if (success) {
            BiometricAuthentication();
          } else {
            console.log('user cancelled biometric prompt');
          }
        })
        .catch(() => {
          console.log('biometrics failed');
        });
    } else if (
      isBiometricsSupported &&
      biometricType === BiometryTypes.FaceID
    ) {
      console.log('FaceID is supported');
      BiometricAuthentication();
    } else if (
      isBiometricsSupported &&
      biometricType === BiometryTypes.Biometrics
    ) {
      console.log('Biometrics is supported');
      ReactNativeBiometrics.simplePrompt({
        promptMessage: 'Scan fingerprint or face id',
      })
        .then(resultObject => {
          const {success} = resultObject;
          if (success) {
            BiometricAuthentication();
          } else {
            console.log('user cancelled biometric prompt');
          }
        })
        .catch(() => {
          console.log('biometrics failed');
        });
    } else {
      console.log('Biometric authentication not available on this device');
      alert('Biometric authentication not available on this device');
    }
  };

  // useEffect for animation
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

  // login function by clicking on sign in button and entering username and password
  const LoginFunction = async () => {
    if (email.length == 0 || password.length == 0) {
      console.log('Please enter email and password');
      alert('Please enter email and password');
    } else {
      setIsLoading(true);
      var url = 'https://app.ecsapshipping.com/api/auth/login';

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
            if (isFirstTimeLogin) {
              console.log('isFirstTimeLogin ran');
              storeLoginCredentials();
            }
            console.log(responseJson.data.token);
            const AsyncData = [
              ['token', responseJson.data.token],
              // ['password', password],
              ['name', responseJson.data.data.name],
              ['username', responseJson.data.data.username],
              ['email', responseJson.data.data.email],
              ['company_name', responseJson.data.data.company_name],
              ['company_email', responseJson.data.data.company_email],
              ['status', responseJson.data.data.status],
              ['role_id', responseJson.data.data.role_id],
            ];

            AsyncStorage.multiSet(AsyncData)
              .then(() => {
                console.log('Data Saved Succefully');
              })
              .catch(error => {
                console.log('Error Saving Data');
              });

            console.log('Login Success');
            setIsLoading(false);
            emailRef.current.clear();
            passwordRef.current.clear();
            setEmail('');
            setPassword('');
            navigation.navigate('CustomerDrawer');
          } else {
            console.log('Login Error');
            setIsLoading(false);
            alert('Login Error');
          }
        })
        .catch(error => {
          setIsLoading(false);
          alert('Error while login' + error);
          console.warn(error);
        });
    }
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}>
        <AppBackground />
      </View>

      {/* first circle at at left corner */}
      <MotiView
        from={{translateX: 0, translateY: 0}}
        animate={{
          translateX: [100, 200, 50, 300, 250],
          translateY: [0, 100, -50, 500, 0],
        }}
        transition={{type: 'timing', duration: 3000, loop: true}}
        style={{
          width: 200,
          height: 200,
          backgroundColor: 'rgba(133, 180, 235, 0.32)',
          position: 'absolute',
          borderRadius: 100,
        }}
      />

      {/* second circle at top right corner */}
      <MotiView
        from={{translateX: 0, translateY: 0}}
        animate={{
          translateX: [
            SIZES.windowWidth / 12,
            SIZES.windowWidth / 10,
            SIZES.windowWidth / 8,
            SIZES.windowWidth / 6,
            SIZES.windowWidth / 4,
          ],
          translateY: [
            SIZES.windowHeight / 12,
            SIZES.windowHeight / 10,
            SIZES.windowHeight / 8,
            SIZES.windowHeight / 6,
            SIZES.windowHeight / 4,
          ],
          // perspective: 100,
        }}
        transition={{type: 'timing', duration: 3000, loop: true}}
        style={{
          width: 150,
          height: 150,
          backgroundColor: 'rgba(133, 180, 235, 0.32)',
          position: 'absolute',
          borderRadius: 75,
          right: 0,
          top: 0,
          left: 0,
          // right: -SIZES.windowWidth / 4.5,
          // top: -SIZES.windowHeight / 18,
        }}
      />

      {/* third circle at middle left*/}
      <MotiView
        from={{translateX: 0, translateY: 0}}
        animate={{
          translateX: [200, 100, 250, 300, 250],
          translateY: [-100, 0, 150, 500, 0],
        }}
        transition={{type: 'timing', duration: 3000, loop: true}}
        style={{
          width: 230,
          height: 230,
          backgroundColor: 'rgba(133, 180, 235, 0.32)',
          position: 'absolute',
          borderRadius: 150,
          left: -SIZES.windowWidth / 14,
          bottom: SIZES.windowHeight / 3.5,
        }}
      />

      {/* fourth circle at middle of screen*/}
      <MotiView
        from={{translateX: 0, translateY: 0}}
        animate={{
          translateX: [-50, -100, 50, 300, 250],
          translateY: [-50, -100, 0, 200, 0],
        }}
        transition={{type: 'timing', duration: 3000, loop: true}}
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'rgba(133, 180, 235, 0.32)',
          position: 'absolute',
          borderRadius: 50,
          left: SIZES.windowWidth / 3.3,
          bottom: SIZES.windowHeight / 10,
        }}
      />
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
        {checkEmail && (
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
        {checkPassword && (
          <Text
            style={{
              color: 'red',
              alignSelf: 'flex-start',
              paddingLeft: '8%',
            }}>
            Invalid Password
          </Text>
        )}

        <View
          style={{
            marginTop: 20,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{
              width: SIZES.windowWidth / 1.3,
              height: SIZES.windowHeight / 16,
              backgroundColor: COLORS.primary,
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

          {/* biometric authenticaion */}
          <TouchableOpacity
            style={{
              width: SIZES.windowWidth / 9,
              height: SIZES.windowHeight / 16,
              borderWidth: 1,
              borderColor: COLORS.primary,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}
            onPress={handleBiometrics}>
            <IonIcon name="finger-print" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* forgot password button */}
        <TouchableOpacity
          style={{alignItems: 'center', marginTop: 20}}
          onPress={() => console.log('Forgot Password?')}>
          <Text style={{color: 'grey', fontSize: 14}}>Forgot Password?</Text>
        </TouchableOpacity>
      </Animated.ScrollView>
    </View>
  );
}
