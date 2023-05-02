import 'react-native-gesture-handler';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {COLORS, SIZES, TEXT} from '../constants/theme';
import Customer from '../screens/Authorized/CustomerScreens/CustomerDrawer/Customer';
import CustomerBottomTabs from '../navigation/CustomerBottomTabs';
import ContainerTracking from '../screens/Authorized/CustomerScreens/ContainerScreens/ContainerTracking';
import Reporting from '../screens/Authorized/CustomerScreens/CustomerDrawer/Reporting';
import Rate from '../screens/Authorized/CustomerScreens/CustomerDrawer/ShippingRates';
import RateTopTabs from '../navigation/RateTopTabs';
import CustomerVehicles from '../screens/Authorized/CustomerScreens/BottomTabs/CustomerVehicle';
import CustomerContainer from '../screens/Authorized/CustomerScreens/BottomTabs/CustomerContainer';
import CustomerInvoices from '../screens/Authorized/CustomerScreens/BottomTabs/CustomerInvoices';
import Notifications from '../screens/Authorized/CustomerScreens/Notifications/Notifications';
import CustomerDashboard from '../screens/Authorized/CustomerScreens/BottomTabs/CustomerDashboard';
import ContactUS from '../screens/UnauthorizedScreens/LoginDrawerScreens/ContactUs';
import Watchlist from '../screens/Authorized/CustomerScreens/CustomerDrawer/Watchlist';
import TermsAndConditions from '../screens/Authorized/CustomerScreens/CustomerDrawer/TermsAndConditions';
import FAQs from '../screens/Authorized/CustomerScreens/CustomerDrawer/FAQs';
import AboutUs from '../screens/Authorized/CustomerScreens/CustomerDrawer/AboutUs';
import Settings from '../screens/Authorized/CustomerScreens/CustomerDrawer/Settings';
import Contact from '../screens/Authorized/CustomerScreens/CustomerDrawer/Contact';

const DrawerNav = createDrawerNavigator();

export default function CustomerDrawer({route}) {
  const {userImage} = route.params;
  console.log('User Image in Drawer: ', route.params.userImage);
  // console.log('params', route.params);
  const [languageID, setLanguageID] = useState(0);
  return (
    <DrawerNav.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        drawerStyle: {borderTopRightRadius: 40},
        // drawerActiveBackgroundColor: COLORS.draweritems,
        // drawerInactiveBackgroundColor: COLORS.white,
        drawerActiveTintColor: COLORS.primary,
        drawerInactiveTintColor: COLORS.black,
        drawerLabelStyle: {
          marginLeft: -20,
          color: '#454545',
        },
        drawerItemStyle: {
          // borderRadius: 20,
          // shadowColor: 'grey',
          // elevation: 3,
          // marginTop: 10,
          marginVertical: 0,
          marginTop: 0,
          marginBottom: 0,
        },
        overlayColor: 'rgba(30, 138, 225, 0.5)',
      }}
      drawerContent={({...props}) => (
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
            borderTopRightRadius: 40,
            // borderBottomEndRadius: 40,
          }}>
          <Image
            source={require('../assets/images/drawer.png')}
            resizeMode={'contain'}
            style={{
              width: '95%',
              position: 'absolute',
              top: -SIZES.windowHeight / 11,
            }}
          />

          <View
            style={{
              alignItems: 'flex-end',
              paddingTop: 15,
              paddingRight: 15,
            }}>
            <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
              <Entypo name="cross" size={25} color="red" />
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{}}>
              <Image
                source={require('../assets/images/model.jpg')}
                resizeMode="contain"
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: 35,
                  borderWidth: 2,
                  borderColor: COLORS.white,
                  marginLeft: 10,
                }}
              />
            </View>

            <View style={{paddingLeft: 10}}>
              <Text style={{color: COLORS.black, fontSize: 16}}>
                Master Admin
              </Text>
              <Text style={{color: COLORS.black, fontSize: 14}}>
                masteradmin@gmail.com
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 20,
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              // flex: 1,
            }}>
            <TouchableOpacity
              style={{
                height: SIZES.windowHeight / 16,
                width: SIZES.windowWidth / 3.7,
                backgroundColor:
                  languageID == 1 ? COLORS.primary : COLORS.white,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                elevation: 7,
                shadowColor: 'black',
              }}
              onPress={() => setLanguageID(1)}>
              <Image
                source={require('../assets/images/uk.png')}
                style={{height: 15, width: 25, right: 3}}
              />
              <Text
                style={{
                  color: languageID == 1 ? COLORS.white : COLORS.black,
                  left: 3,
                }}>
                English
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: SIZES.windowHeight / 16,
                width: SIZES.windowWidth / 3.7,
                backgroundColor:
                  languageID == 2 ? COLORS.primary : COLORS.white,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                elevation: 7,
                shadowColor: 'black',
              }}
              onPress={() => setLanguageID(2)}>
              <Image
                source={require('../assets/images/uae.png')}
                style={{height: 15, width: 25, right: 3}}
              />
              <Text
                style={{
                  color: languageID == 2 ? COLORS.white : COLORS.black,
                  left: 3,
                }}>
                Arabic
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: '10%'}}>
            <DrawerContentScrollView
              {...props}
              contentContainerStyle={{flex: 1}}>
              <View style={{paddingTop: 20}}>
                <DrawerItemList {...props} />
              </View>
            </DrawerContentScrollView>

            <View style={{paddingHorizontal: 10, marginTop: 10}}>
              <View
                style={{height: 1, width: '100%', backgroundColor: 'grey'}}
              />
            </View>
            <View style={{marginTop: 20, alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  height: SIZES.windowHeight / 14,
                  width: '80%',
                  backgroundColor: COLORS.primary,
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{right: '5%'}}>
                  <Icon name="logout" size={20} color={COLORS.white} />
                </View>
                <Text style={{color: COLORS.white, left: '5%'}}>Logout</Text>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 10, alignItems: 'center'}}>
              <Text style={{color: COLORS.primary, fontSize: 10}}>
                Developed By The Revolution Technologies
              </Text>
            </View>
          </ScrollView>
        </View>
      )}>
      <DrawerNav.Screen
        name="Dashboard"
        component={CustomerBottomTabs}
        initialParams={{userImage: route.params.userImage}}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={require('../assets/icons/dash.png')}
              resizeMode="contain"
              style={{
                width: 15,
                height: 15,
              }}
            />
          ),
        }}
      />
      <DrawerNav.Screen
        name="Vehicles"
        component={CustomerVehicles}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={require('../assets/icons/vehicl.png')}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
              }}
            />
          ),
        }}
      />
      <DrawerNav.Screen
        name="Shipments"
        component={CustomerContainer}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={require('../assets/icons/ship.png')}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
              }}
            />
          ),
        }}
      />
      <DrawerNav.Screen
        name="Invoices"
        component={CustomerInvoices}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={require('../assets/icons/invoice.png')}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
              }}
            />
          ),
        }}
      />
      <DrawerNav.Screen
        name="Customers"
        component={Customer}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={require('../assets/icons/avatar.png')}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
              }}
            />
          ),
        }}
      />
      <DrawerNav.Screen
        name="Reporting"
        component={Reporting}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={require('../assets/icons/reporting.png')}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
              }}
            />
          ),
        }}
      />

      <DrawerNav.Screen
        name="Rate"
        component={RateTopTabs}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={require('../assets/icons/rate.png')}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
              }}
            />
          ),
        }}
      />
      <DrawerNav.Screen
        name="Watchlist"
        component={Watchlist}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={require('../assets/icons/watchlist.png')}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
              }}
            />
          ),
        }}
      />
      <DrawerNav.Screen
        name="Notifications"
        component={Notifications}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={require('../assets/icons/notif.png')}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
              }}
            />
          ),
        }}
      />

      <DrawerNav.Screen
        name="Terms and Conditions"
        component={TermsAndConditions}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={require('../assets/icons/tac.png')}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
              }}
            />
          ),
        }}
      />
      <DrawerNav.Screen
        name="FAQs / Turotials"
        component={FAQs}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={require('../assets/icons/faq.png')}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
              }}
            />
          ),
        }}
      />
      <DrawerNav.Screen
        name="About Us"
        component={AboutUs}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={require('../assets/icons/about-us.png')}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
              }}
            />
          ),
        }}
      />
      <DrawerNav.Screen
        name="Contact Us"
        component={Contact}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={require('../assets/icons/contact.png')}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
              }}
            />
          ),
        }}
      />
      <DrawerNav.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={require('../assets/icons/setting.png')}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
              }}
            />
          ),
        }}
      />
    </DrawerNav.Navigator>
  );
}
