import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import AppBackground from '../../../../components/AppBackground';
import {SIZES, COLORS, SVGBackground} from '../../../../constants/theme';
import {SvgXml} from 'react-native-svg';
import Entypo from 'react-native-vector-icons/Entypo';
import IonIcons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Notifications({navigation}) {
  const [showMore, setShowMore] = useState(false);
  return (
    <View style={{flex: 1}}>
      {/* complete screen background */}
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

      <View style={{paddingTop: 20, paddingHorizontal: 20}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
            <IonIcons
              name="arrow-back-circle-sharp"
              size={25}
              color={COLORS.white}
            />
          </TouchableOpacity>
          <View>
            <Text
              style={{fontSize: 16, color: COLORS.white, fontWeight: 'bold'}}>
              Notifications
            </Text>
          </View>
          <View />
        </View>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          marginTop: 20,
        }}>
        {/* create new notification button */}
        <TouchableOpacity
          style={{
            height: '4.6%',
            width: '35%',
            borderRadius: 25,
            backgroundColor: '#315886',
            position: 'absolute',
            bottom: '5%',
            right: '5%',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 5,
          }}
          onPress={() => navigation.navigate('CreateNotifications')}>
          <View
            style={{
              height: '85%',
              width: '72%',
              backgroundColor: COLORS.white,
              borderRadius: 14,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 9, color: '#315886'}}>
              Create Notifications
            </Text>
          </View>

          <View>
            <MaterialCommunity
              name="bell-plus"
              size={20}
              color={COLORS.white}
            />
          </View>
        </TouchableOpacity>

        {/* view for holding notificaitons list */}
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              width: SIZES.windowWidth / 1.1,
              paddingVertical: 10,
              marginTop: 20,
              backgroundColor: COLORS.primary,
              borderRadius: 10,
              shadowColor: 'black',
              elevation: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 15,
            }}>
            <View style={{flex: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View>
                    <Image
                      source={require('../../../../assets/images/model.jpg')}
                      style={{height: 50, width: 50, borderRadius: 25}}
                    />
                  </View>
                  <View style={{paddingLeft: 20}}>
                    <Text style={{color: COLORS.white}}>Jennifer Lawrence</Text>
                    <Text>Lorem ipsum</Text>
                  </View>
                </View>
                <View style={{}}>
                  <TouchableOpacity onPress={() => setShowMore(!showMore)}>
                    {showMore == true ? (
                      <AntDesign
                        name="upcircle"
                        size={20}
                        color={COLORS.white}
                      />
                    ) : (
                      <AntDesign
                        name="downcircle"
                        size={20}
                        color={COLORS.white}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {showMore == true && (
                <View style={{marginTop: 5}}>
                  <Text style={{color: COLORS.white}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse pellentesque, odio ut vulputate malesuada,
                    tellus quam vulputate metus, at convallis ligula diam a ex.
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
