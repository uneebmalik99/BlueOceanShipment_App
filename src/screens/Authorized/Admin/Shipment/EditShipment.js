import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {SIZES, COLORS, IMAGE_URL} from '../../../../constants/theme';
import LinearGradient from 'react-native-linear-gradient';
import VehicleHeader from '../../../../components/VehicleHeader';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';

export default function EditShipment({navigation, route}) {
  const {ID, Details} = route.params;

  const [shipper, setShipper] = useState('');
  const [bookingNumber, setBookingNo] = useState('');
  const [containerNo, setContainerNo] = useState('');
  const [loadingPort, setLoadingPort] = useState('');
  const [destinationState, setDestinationState] = useState('');
  const [destinationCountry, setDestinationCountry] = useState('');
  const [deletedItems, setDeletedItems] = useState([]);
  const [newImages, setNewImages] = useState(null);

  // funcion for opening gallery

  const OpenGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        const newImage = {
          uri: image.path,
          type: image.mime,
          name: image.path.split('/').pop(),
          size: image.size,
          height: image.height,
          width: image.width,
        };
        setNewImages(newImage);
        console.log(newImages);
        alert('Image selected, press save');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const OpenCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        const newImage = {
          uri: image.path,
          type: image.mime,
          name: image.path.split('/').pop(),
          size: image.size,
          height: image.height,
          width: image.width,
        };
        setNewImages(newImage);
        alert('Image selected, press save');
      })
      .catch(error => {
        console.log(error);
      });
  };

  // flatlist render function
  const renderItem = ({item}) => {
    const imgID = item.id;
    const isDeleted = deletedItems.includes(imgID);
    return (
      <View style={{margin: 10}}>
        <Image
          source={{uri: IMAGE_URL + item.name}}
          resizeMode="contain"
          style={{height: windowHeight / 12, width: windowWidth / 6.5}}
        />

        <TouchableOpacity
          onPress={() => {
            const imgID = item.id;
            // g.push(imgID)
            setDeletedItems([...deletedItems, imgID]);
            console.log(deletedItems);
            // console.log(g)
          }}
          disabled={isDeleted}>
          <Text style={{color: isDeleted ? 'gray' : 'red'}}>
            {isDeleted ? 'Delete' : 'Delete'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const update = async () => {
    var value = new FormData();

    value.append('shipment_id', ID);

    {
      shipper.length != 0 && value.append('company_name', shipper);
    }
    {
      bookingNumber.length != 0 &&
        value.append('booking_number', bookingNumber);
    }
    {
      containerNo.length != 0 && value.append('container_no', containerNo);
    }
    {
      loadingPort.length != 0 && value.append('loading_port', loadingPort);
    }
    {
      destinationState.length != 0 &&
        value.append('destination_state', destinationState);
    }
    {
      destinationCountry.length != 0 &&
        value.append('destination_country', destinationCountry);
    }
    deletedItems.forEach(id => {
      value.append('loading_delelte_images[]', id);
    });
    setDeletedItems([]);

    value.append('loading_images[]', newImages);

    console.log('===' + JSON.stringify(value));
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        console.log('Token retrieved from AsyncStorage:', token);

        var url = 'https://app.ecsapshipping.com/api/auth/shipment/update';

        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: value,
        })
          .then(response => response.json())
          .then(responseJson => {
            if (responseJson.status == 'Success') {
              console.log('Update Success');
              setNewImages([]);
              alert('Update Success');
            } else {
              alert(JSON.stringify(responseJson));
              console.log('UnSuccess ', responseJson);
            }
          })
          .catch(error => {
            alert(error);
            console.warn(error);
          });
      }
    } catch (error) {
      console.warn('Error while retrieving token from AsyncStorage:', error);
    }
  };

  function ContactItems({Placeholder}) {
    return (
      <TextInput
        placeholder={Placeholder}
        style={{
          height: SIZES.windowHeight / 12,
          width: SIZES.windowWidth / 1.1,
          backgroundColor: COLORS.lightGray,
          paddingLeft: 10,
          borderRadius: 10,
          shadowColor: COLORS.primary,
          elevation: 5,
          borderWidth: 1,
          borderColor: COLORS.lightGray,
          justifyContent: 'center',
          color: 'black',
        }}
      />
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      {/* cover of the image */}
      {/* <View>
        <Image
          source={ContainerData.cover}
          style={{width: SIZES.windowWidth, height: SIZES.windowHeight / 4}}
        />
      </View> */}

      {/* view container for uploading images */}
      <View
        style={{alignItems: 'center', marginTop: '15%', marginBottom: '2%'}}>
        <View
          style={{
            width: SIZES.windowWidth / 1.2,
            height: SIZES.windowHeight / 3,
            backgroundColor: 'white',
            marginTop: 10,
            borderWidth: 1,
            borderRadius: 10,
          }}>
          {/* View with flatlist items and gallery and camera buttons */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* {imageTab == 0 && ( */}
            <View>
              <FlatList
                // data={DATA}
                data={Details.data.loading_image}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={3}
                showsVerticalScrollIndicator={false}
              />
            </View>

            <View style={{flexDirection: 'row', paddingTop: 10}}>
              <TouchableOpacity onPress={OpenGallery}>
                <Image
                  source={require('../../../../assets/icons/gallery.png')}
                  resizeMode="contain"
                  style={{height: 30, width: 30, tintColor: '#c1dcfa'}}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={OpenCamera}>
                <Image
                  source={require('../../../../assets/icons/camera.png')}
                  resizeMode="contain"
                  style={{height: 30, width: 30, left: 5, tintColor: '#c1dcfa'}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <VehicleHeader
        HeaderTitle={'Edit Container'}
        GoBack={() => navigation.goBack()}
      />

      <View
        style={{
          height: SIZES.windowHeight / 12,
          width: SIZES.windowWidth,
          backgroundColor: COLORS.primary,
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <View>
            <Text style={{color: COLORS.white, fontSize: 16}}>
              Container No: {Details.data.container_no}
            </Text>
          </View>
          <TouchableOpacity>
            <IonIcons
              name="md-qr-code-outline"
              size={25}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <View style={{alignItems: 'center', marginTop: 20}}>
          {/* shipper name textinput */}
          <TextInput
            placeholder={'Enter company name'}
            onChangeText={text => setShipper(text)}
            value={shipper}
            style={{
              height: SIZES.windowHeight / 12,
              width: SIZES.windowWidth / 1.1,
              backgroundColor: COLORS.lightGray,
              paddingLeft: 10,
              borderRadius: 10,
              shadowColor: COLORS.primary,
              elevation: 5,
              borderWidth: 1,
              borderColor: COLORS.lightGray,
              justifyContent: 'center',
              color: 'black',
            }}
          />

          {/* booking number textinput */}
          <View style={{marginTop: 15}}>
            <TextInput
              placeholder={'Enter booking number'}
              onChangeText={text => setBookingNo(text)}
              value={bookingNumber}
              keyboardType="number-pad"
              style={{
                height: SIZES.windowHeight / 12,
                width: SIZES.windowWidth / 1.1,
                backgroundColor: COLORS.lightGray,
                paddingLeft: 10,
                borderRadius: 10,
                shadowColor: COLORS.primary,
                elevation: 5,
                borderWidth: 1,
                borderColor: COLORS.lightGray,
                justifyContent: 'center',
                color: 'black',
              }}
            />
          </View>

          <View style={{marginTop: 15}}>
            <TextInput
              placeholder={'Enter container no'}
              onChangeText={text => setContainerNo(text)}
              value={containerNo}
              style={{
                height: SIZES.windowHeight / 12,
                width: SIZES.windowWidth / 1.1,
                backgroundColor: COLORS.lightGray,
                paddingLeft: 10,
                borderRadius: 10,
                shadowColor: COLORS.primary,
                elevation: 5,
                borderWidth: 1,
                borderColor: COLORS.lightGray,
                justifyContent: 'center',
                color: 'black',
              }}
            />
          </View>
          <View style={{marginTop: 15}}>
            <TextInput
              placeholder={'Enter loading port'}
              onChangeText={text => setLoadingPort(text)}
              value={loadingPort}
              style={{
                height: SIZES.windowHeight / 12,
                width: SIZES.windowWidth / 1.1,
                backgroundColor: COLORS.lightGray,
                paddingLeft: 10,
                borderRadius: 10,
                shadowColor: COLORS.primary,
                elevation: 5,
                borderWidth: 1,
                borderColor: COLORS.lightGray,
                justifyContent: 'center',
                color: 'black',
              }}
            />
          </View>
          <View style={{marginTop: 15}}>
            <TextInput
              placeholder={'Enter destination state'}
              onChangeText={text => setDestinationState(text)}
              value={destinationState}
              style={{
                height: SIZES.windowHeight / 12,
                width: SIZES.windowWidth / 1.1,
                backgroundColor: COLORS.lightGray,
                paddingLeft: 10,
                borderRadius: 10,
                shadowColor: COLORS.primary,
                elevation: 5,
                borderWidth: 1,
                borderColor: COLORS.lightGray,
                justifyContent: 'center',
                color: 'black',
              }}
            />
          </View>
          <View style={{marginTop: 15}}>
            <TextInput
              placeholder={'Enter destination country'}
              onChangeText={text => setDestinationCountry(text)}
              value={destinationCountry}
              style={{
                height: SIZES.windowHeight / 12,
                width: SIZES.windowWidth / 1.1,
                backgroundColor: COLORS.lightGray,
                paddingLeft: 10,
                borderRadius: 10,
                shadowColor: COLORS.primary,
                elevation: 5,
                borderWidth: 1,
                borderColor: COLORS.lightGray,
                justifyContent: 'center',
                color: 'black',
              }}
            />
          </View>
        </View>

        <View
          style={{paddingHorizontal: 20, paddingTop: 20, alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              height: SIZES.windowHeight / 18,
              width: SIZES.windowWidth / 1.3,
              borderRadius: 10,
            }}
            onPress={update}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#1A72DE', 'rgba(35, 111, 204, 0.19)']}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text style={{color: COLORS.white, fontSize: 16}}>Save</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* <View
        style={{paddingHorizontal: 20, paddingTop: 20, alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            height: SIZES.windowHeight / 18,
            width: SIZES.windowWidth / 1.3,
            borderRadius: 10,
          }}
          onPress={update}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#1A72DE', 'rgba(35, 111, 204, 0.19)']}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}>
            <Text style={{color: COLORS.white, fontSize: 16}}>Save</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}
