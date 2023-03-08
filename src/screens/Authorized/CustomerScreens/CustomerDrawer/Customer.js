import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import AppBackground from '../../../../components/AppBackground';
import {SIZES, COLORS, SVGBackground} from '../../../../constants/theme';
import {SvgXml} from 'react-native-svg';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const CustomerData = [
  {
    id: 1,
    name: 'Jennifer Lawerance',
    cover: require('../../../../assets/images/model.jpg'),
  },
  {
    id: 2,
    name: 'Jennifer Lawerance',
    cover: require('../../../../assets/images/model.jpg'),
  },
  {
    id: 3,
    name: 'Jennifer Lawerance',
    cover: require('../../../../assets/images/model.jpg'),
  },
  {
    id: 4,
    name: 'Jennifer Lawerance',
    cover: require('../../../../assets/images/model.jpg'),
  },
];

export default function Customer({navigation}) {
  const renderCustomers = ({item}) => {
    return (
      <View style={{flex: 1, paddingTop: 10}}>
        <TouchableOpacity
          style={{
            height: SIZES.windowHeight / 10,
            width: SIZES.windowWidth,
            paddingHorizontal: 20,
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#1A72DE', 'rgba(35, 111, 204, 0.19)']}
            style={{
              borderRadius: 15,
              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View>
                <Image
                  source={item.cover}
                  resizeMode="contain"
                  style={{height: 50, width: 50, borderRadius: 25}}
                />
              </View>
              <View style={{paddingLeft: 20}}>
                <Text style={{fontSize: 16, color: COLORS.white}}>
                  {item.name}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };
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

      <View style={{paddingHorizontal: 20, paddingTop: 20}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={{}} onPress={() => navigation.openDrawer()}>
            <MaterialCommunity name="menu" size={25} color={COLORS.white} />
          </TouchableOpacity>

          <View>
            <Text
              style={{fontSize: 16, color: COLORS.white, fontWeight: 'bold'}}>
              Customers
            </Text>
          </View>
          <View />
        </View>

        {/* view for search bar, sort and filter buttons */}
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {/* search bar view */}
          <View
            style={{
              height: SIZES.windowHeight / 18,
              width: SIZES.windowWidth / 1.7,
              backgroundColor: COLORS.white,
              borderRadius: 10,
              alignItems: 'center',
              flexDirection: 'row',
              shadowColor: COLORS.black,
              elevation: 10,
            }}>
            <View style={{paddingLeft: 10}}>
              <MaterialIcons name="search" size={25} color={'grey'} />
            </View>
            <TextInput
              style={{flex: 1, color: 'black'}}
              placeholder="Search customer"
              placeholderTextColor={'grey'}
            />
          </View>

          {/* filter button view */}
          <View
            style={{
              shadowColor: COLORS.black,
              elevation: 10,
              height: SIZES.windowHeight / 18,
              width: SIZES.windowWidth / 8.5,
              backgroundColor: COLORS.white,
              borderRadius: 10,
            }}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}>
              <MaterialCommunity
                name="filter-variant"
                size={20}
                color={COLORS.black}
              />
            </TouchableOpacity>
          </View>

          {/* sort button view */}
          <View
            style={{
              shadowColor: COLORS.black,
              elevation: 10,
              height: SIZES.windowHeight / 18,
              width: SIZES.windowWidth / 8.5,
              backgroundColor: COLORS.white,
              borderRadius: 10,
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialCommunity
                name="sort-bool-descending"
                size={20}
                color={COLORS.black}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        style={{
          backgroundColor: COLORS.white,
          flex: 1,
          width: '100%',
          marginTop: 30,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          shadowColor: COLORS.black,
          elevation: 3,
          alignItems: 'center',
        }}>
        <FlatList
          data={CustomerData}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            paddingBottom: '30%',
            paddingTop: 10,
          }}
          renderItem={renderCustomers}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
