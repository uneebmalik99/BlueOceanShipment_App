import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import AppBackground from '../../../../components/AppBackground';
import {SIZES, COLORS, SVGBackground} from '../../../../constants/theme';
import {SvgXml} from 'react-native-svg';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {Dropdown} from 'react-native-element-dropdown';

const TabButtons = [
  {
    id: 1,
    title: 'New Order Report',
  },
  {
    id: 2,
    title: 'Dispatch Report',
  },
  {
    id: 3,
    title: 'On Hand Report',
  },
  {
    id: 4,
    title: 'Shipment Report',
  },
  {
    id: 5,
    title: 'No Title Report',
  },
];

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
];

export default function Reporting({navigation}) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  //   fot title dropdown
  const [titleType, setTitleType] = useState(null);
  const [titleFocus, setTitleFocus] = useState(false);

  //   for location dropdown
  const [location, setLocation] = useState(null);
  const [locationFocus, setLocationFocus] = useState(false);

  //   for shipper dropdown
  const [shipper, setShipper] = useState(null);
  const [shipperFocus, setShipperFocus] = useState(false);

  //   for company_name dropdown
  const [companyName, setCompanyName] = useState(null);
  const [nameFocus, setNameFocus] = useState(false);

  function InsideText({Text1, Text2}) {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{width: '36%'}}>
          <Text style={{color: COLORS.white, fontSize: 14}}>{Text1}</Text>
        </View>

        <View>
          <Text
            style={{
              color: COLORS.black,
              fontSize: 12,
              paddingLeft: 10,
              textAlign: 'justify',
            }}>
            {Text2}
          </Text>
        </View>
      </View>
    );
  }

  const renderTab = ({item}) => {
    return (
      <View style={{paddingHorizontal: 3, flex: 1}}>
        <TouchableOpacity
          style={{
            height: SIZES.windowHeight / 18,
            width: SIZES.windowWidth / 3,
            backgroundColor:
              selectedCategory?.id == item.id ? COLORS.white : '#B9B9B9',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30,
          }}
          onPress={() => selectedOption(item)}>
          <Text
            style={{
              color: COLORS.primary,
            }}>
            {item.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  function selectedOption(category) {
    setSelectedCategory(category);
  }

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
              Reporting
            </Text>
          </View>
          <View />
        </View>
      </View>

      <View style={{marginTop: 20}}>
        <FlatList
          data={TabButtons}
          keyExtractor={item => item.id}
          renderItem={renderTab}
          contentContainerStyle={{paddingHorizontal: 20}}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View
        style={{
          backgroundColor: COLORS.white,
          flex: 1,
          marginTop: 20,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          shadowColor: COLORS.black,
          elevation: 3,
          //   alignItems: 'center',
        }}>
        {/* view for search and sort buttons */}
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          {/* search bar view */}
          <View
            style={{
              height: SIZES.windowHeight / 18,
              width: SIZES.windowWidth / 1.5,
              backgroundColor: '#F6F6F6',
              borderRadius: 10,
              alignItems: 'center',
              flexDirection: 'row',
              shadowColor: COLORS.black,
              elevation: 10,
              left: 5,
            }}>
            <View style={{paddingLeft: 10}}>
              <MaterialIcons name="search" size={25} color={'grey'} />
            </View>
            <TextInput
              style={{flex: 1, color: 'black'}}
              placeholder="Search reports"
              placeholderTextColor={'grey'}
            />
          </View>

          {/* sort button view */}
          <View
            style={{
              shadowColor: COLORS.black,
              elevation: 10,
              height: SIZES.windowHeight / 18,
              width: SIZES.windowWidth / 8.5,
              backgroundColor: '#F6F6F6',
              borderRadius: 10,
              right: 5,
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

        {/* view for dropdowns */}
        <View style={{marginTop: 20}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <Dropdown
              style={[styles.dropdown, titleFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              // search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!titleFocus ? 'Select Title' : '...'}
              searchPlaceholder="Search..."
              value={titleType}
              onFocus={() => setTitleFocus(true)}
              onBlur={() => setTitleFocus(false)}
              onChange={item => {
                setTitleType(item.value);
                setTitleFocus(false);
              }}
            />
            <Dropdown
              style={[styles.dropdown, locationFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              // search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!locationFocus ? 'Select Location' : '...'}
              searchPlaceholder="Search..."
              value={location}
              onFocus={() => setLocationFocus(true)}
              onBlur={() => setLocationFocus(false)}
              onChange={item => {
                setLocation(item.value);
                setLocationFocus(false);
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginTop: 10,
            }}>
            <Dropdown
              style={[styles.dropdown, shipperFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              // search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!shipperFocus ? 'Select Shipper' : '...'}
              searchPlaceholder="Search..."
              value={shipper}
              onFocus={() => setShipperFocus(true)}
              onBlur={() => setShipperFocus(false)}
              onChange={item => {
                setShipper(item.value);
                setShipperFocus(false);
              }}
            />
            <Dropdown
              style={[styles.dropdown, nameFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              // search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!nameFocus ? 'Company Name' : '...'}
              searchPlaceholder="Search..."
              value={companyName}
              onFocus={() => setNameFocus(true)}
              onBlur={() => setNameFocus(false)}
              onChange={item => {
                setCompanyName(item.value);
                setNameFocus(false);
              }}
            />
          </View>
        </View>

        {/* search button */}
        <View style={{alignItems: 'center', marginTop: 20}}>
          <TouchableOpacity
            style={{
              height: SIZES.windowHeight / 16,
              width: SIZES.windowWidth / 2.7,
              borderRadius: 20,
              backgroundColor: COLORS.primary,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: COLORS.primary,
              elevation: 5,
            }}>
            <Text style={{color: COLORS.white, fontWeight: 'bold'}}>
              Search
            </Text>
          </TouchableOpacity>
        </View>

        {/* view for items */}
        <View style={{marginTop: 20}}>
          <TouchableOpacity
            style={{
              height: SIZES.windowHeight / 6.6,
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
              }}>
              {/* view for holding image and vehicle information */}
              <View
                style={{
                  paddingHorizontal: 10,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <View>
                  <InsideText
                    Text1={'Company Name: '}
                    Text2={'item.company_name'}
                  />
                  <InsideText
                    Text1={'Container No: '}
                    Text2={'item.container_no'}
                  />
                  <InsideText
                    Text1={'Booking No: '}
                    Text2={'item.booking_number'}
                  />
                  <InsideText
                    Text1={'Destination: '}
                    Text2={'item.destination_country'}
                  />
                </View>

                {/* <View>
              <Image
                source={item.cover}
                resizeMode="contain"
                style={{height: 60, width: 100, borderRadius: 10}}
              />
            </View> */}
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: SIZES.windowHeight / 18,
    width: SIZES.windowWidth / 2.2,
    borderColor: COLORS.primary,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
    color: COLORS.primary,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    tintColor: COLORS.primary,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
});
