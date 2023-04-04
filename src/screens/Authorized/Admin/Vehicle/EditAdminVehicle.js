import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {SIZES, COLORS} from '../../../../constants/theme';
import LinearGradient from 'react-native-linear-gradient';
import VehicleHeader from '../../../../components/VehicleHeader';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';

export default function EditAdminVehicle({navigation, route}) {
  const {ID, Details} = route.params;

  var asset_url = 'https://app.ecsapshipping.com/public/';
  //   console.log(VehicleData.title);
  const [lot, setLot] = useState('');
  //   console.log(lot);
  const [title, setTitle] = useState('');
  const [key, setKey] = useState('');
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');

  // states for deleting images
  const [deletedWare, setDeletedWare] = useState([]);
  const [deletedPickup, setDeletedPickup] = useState([]);
  const [deletedAuction, setDeletedAuction] = useState([]);

  // state for image tab buttons
  const [imageTab, setImageTab] = useState(0);
  const [warehouseImage, setWareHouseImage] = useState(null);
  const [pickupImage, setPickupImage] = useState(null);
  const [auctionImage, setAuctionImage] = useState(null);

  // funcion for warehouse image uploading

  const WareHouseGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      // multiple: true,
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
        setWareHouseImage(newImage);
        alert('Image selected, press save');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const WareHouseCamera = () => {
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
        setWareHouseImage(newImage);
        alert('Image selected, press save');
      })
      .catch(error => {
        console.log(error);
      });
  };

  // functions for pickup image uploading
  const PickupGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      // multiple: true,
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
        setPickupImage(newImage);
        alert('Image selected, press save');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const PickupCamera = () => {
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
        setPickupImage(newImage);
        alert('Image selected, press save');
      })
      .catch(error => {
        console.log(error);
      });
  };

  // functions for ausction image uploading
  const AuctionGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      // multiple: true,
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
        setAuctionImage(newImage);
        alert('Image selected, press save');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const AuctionCamera = () => {
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
        setAuctionImage(newImage);
        alert('Image selected, press save');
      })
      .catch(error => {
        console.log(error);
      });
  };

  // flatlist render function
  const renderItem = ({item}) => {
    const imgID = item.id;
    const isDeleted = deletedWare.includes(imgID);
    return (
      <View style={{margin: 10}}>
        <Image
          source={{uri: asset_url + item.name}}
          resizeMode="contain"
          style={{height: 50, width: 50}}
        />

        <TouchableOpacity
          onPress={() => {
            const wareID = item.id;
            // wareHouseDelete.push(wareID)
            setDeletedWare([...deletedWare, wareID]);
            console.log(deletedWare);
          }}
          disabled={isDeleted}>
          <Text style={{color: isDeleted ? 'gray' : 'red'}}>
            {isDeleted ? 'Delete' : 'Delete'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderPickup = ({item}) => {
    const imgID = item.id;
    const isDeleted = deletedPickup.includes(imgID);
    return (
      <View style={{margin: 10}}>
        <Image
          source={{uri: asset_url + item.name}}
          resizeMode="contain"
          style={{height: 50, width: 50}}
        />

        <TouchableOpacity
          onPress={() => {
            const pickupID = item.id;
            setDeletedPickup([...deletedPickup, pickupID]);
            console.log(deletedPickup);
          }}
          disabled={isDeleted}>
          <Text style={{color: isDeleted ? 'gray' : 'red'}}>
            {isDeleted ? 'Delete' : 'Delete'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderAuction = ({item}) => {
    const imgID = item.id;
    const isDeleted = deletedAuction.includes(imgID);
    return (
      <View style={{margin: 10}}>
        <Image
          source={{uri: asset_url + item.name}}
          resizeMode="contain"
          style={{height: 50, width: 50}}
        />

        <TouchableOpacity
          onPress={() => {
            const auctionID = item.id;
            setDeletedAuction([...deletedAuction, auctionID]);
            console.log(deletedAuction);
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

    value.append('vehicle_id', ID);
    {
      lot.length != 0 && value.append('lot', lot);
    }
    {
      title.length != 0 && value.append('title', title);
    }
    {
      key.length != 0 && value.append('key', key);
    }
    {
      year.length != 0 && value.append('year', year);
    }
    {
      make.length != 0 && value.append('make', make);
    }
    {
      model.length != 0 && value.append('model', model);
    }

    // value.append('customer_name', companyName);
    // value.append('buyer_id', buyer);

    value.append('warehouse_images[]', warehouseImage);
    value.append('pickup[]', pickupImage);
    value.append('auction_images[]', auctionImage);

    deletedWare.forEach(id => {
      value.append('warehouse_deleted_images[]', id);
    });
    setDeletedWare([]);

    deletedPickup.forEach(id => {
      value.append('pickup_deleted_images[]', id);
    });
    setDeletedPickup([]);

    deletedAuction.forEach(id => {
      value.append('auction_deleted_images[]', id);
    });
    setDeletedAuction([]);

    console.log('===' + JSON.stringify(value));
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        console.log('Token retrieved from AsyncStorage:', token);

        var url = 'https://app.ecsapshipping.com/api/auth/vehicle/update';

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
              setWareHouseImage([]);
              setAuctionImage([]);
              setPickupImage([]);
              console.log('Success');
              console.log(JSON.stringify(responseJson));
              alert('Update Success');
            } else {
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

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      {/* cover of the image */}
      {/* <View>
        {!Details.data.warehouse_image ||
        Details.data.warehouse_image.length === 0 ? (
          <View
            style={{
              width: SIZES.windowWidth,
              height: SIZES.windowHeight / 4,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: COLORS.black}}>No Image</Text>
          </View>
        ) : (
          <Image
            source={{
              uri: asset_url + Details.data.warehouse_image[0].name,
            }}
            resizeMode="cover"
            style={{width: SIZES.windowWidth, height: SIZES.windowHeight / 4}}
          />
        )}
      </View> */}

      {/* view container for uploading images */}
      <View style={{alignItems: 'center', marginBottom: '5%'}}>
        <View
          style={{
            width: SIZES.windowWidth / 1.2,
            height: SIZES.windowHeight / 4,
            backgroundColor: 'white',
            marginTop: 10,
            borderWidth: 1,
            borderRadius: 10,
            marginTop: '20%',
          }}>
          {/* View for tab buttons */}
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: imageTab == 0 ? '#c1dcfa' : 'white',
                  height: SIZES.windowHeight * 0.05,
                  width: '33.3%',
                  borderTopLeftRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderBottomWidth: 0.7,
                  borderColor: imageTab == 0 ? '#c1dcfa' : '#c1dcfa',
                }}
                onPress={() => setImageTab(0)}>
                <Text>Warehouse</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: imageTab == 1 ? '#c1dcfa' : 'white',
                  height: SIZES.windowHeight * 0.05,
                  width: '33.3%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderBottomWidth: 0.7,
                  borderLeftWidth: 0.7,
                  borderColor: imageTab == 1 ? '#c1dcfa' : '#c1dcfa',
                }}
                onPress={() => setImageTab(1)}>
                <Text>Pickup</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: imageTab == 3 ? '#c1dcfa' : 'white',
                  height: SIZES.windowHeight * 0.05,
                  width: '33.2%',
                  borderTopRightRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderBottomWidth: 0.7,
                  borderLeftWidth: 0.7,
                  borderColor: imageTab == 3 ? '#c1dcfa' : '#c1dcfa',
                }}
                onPress={() => setImageTab(3)}>
                <Text>Auction</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* View with flatlist items and gallery and camera buttons */}
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
            {/* warehouse images */}
            {imageTab == 0 && (
              <View style={{flexDirection: 'row'}}>
                <FlatList
                  // data={DATA}
                  data={Details.data.warehouse_image}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  numColumns={3}
                  showsVerticalScrollIndicator={false}
                />

                <View
                  style={{flexDirection: 'row', right: SIZES.windowWidth / 18}}>
                  <TouchableOpacity onPress={WareHouseGallery}>
                    <Image
                      source={require('../../../../assets/icons/gallery.png')}
                      resizeMode="contain"
                      style={{height: 30, width: 30, tintColor: '#c1dcfa'}}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={WareHouseCamera}>
                    <Image
                      source={require('../../../../assets/icons/camera.png')}
                      resizeMode="contain"
                      style={{
                        height: 30,
                        width: 30,
                        left: 5,
                        tintColor: '#c1dcfa',
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* pickup images */}
            {imageTab == 1 && (
              <View style={{flexDirection: 'row'}}>
                <FlatList
                  // data={Pickup}
                  data={Details.data.pickupimages}
                  renderItem={renderPickup}
                  keyExtractor={item => item.id}
                  numColumns={3}
                  showsVerticalScrollIndicator={false}
                />

                <View
                  style={{flexDirection: 'row', right: SIZES.windowWidth / 18}}>
                  <TouchableOpacity onPress={PickupGallery}>
                    <Image
                      source={require('../../../../assets/icons/gallery.png')}
                      resizeMode="contain"
                      style={{height: 30, width: 30, tintColor: '#c1dcfa'}}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={PickupCamera}>
                    <Image
                      source={require('../../../../assets/icons/camera.png')}
                      resizeMode="contain"
                      style={{
                        height: 30,
                        width: 30,
                        left: 5,
                        tintColor: '#c1dcfa',
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* auction images */}
            {imageTab == 3 && (
              <View style={{flexDirection: 'row'}}>
                <FlatList
                  // data={Auction}
                  data={Details.data.auction_image}
                  renderItem={renderAuction}
                  keyExtractor={item => item.id}
                  numColumns={3}
                  showsVerticalScrollIndicator={false}
                />

                <View
                  style={{flexDirection: 'row', right: SIZES.windowWidth / 18}}>
                  <TouchableOpacity onPress={AuctionGallery}>
                    <Image
                      source={require('../../../../assets/icons/gallery.png')}
                      resizeMode="contain"
                      style={{height: 30, width: 30, tintColor: '#c1dcfa'}}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={AuctionCamera}>
                    <Image
                      source={require('../../../../assets/icons/camera.png')}
                      resizeMode="contain"
                      style={{
                        height: 30,
                        width: 30,
                        left: 5,
                        tintColor: '#c1dcfa',
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {/* <View style={{height: 50, width: 50, paddingLeft: 10, marginTop: 10}}>
              {/* {image !== '' ? 
              <Image source={{uri: image}} resizeMode = "contain" style={{height: 50, width: 50}}/>
              : 
              null} */}
            {/* <Image source={{uri: image}} resizeMode = "contain" style={{height: 50, width: 50}}/> */}

            {/* <View
              style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>
              <TouchableOpacity onPress={OpenGallery}>
                <Image
                  source={require('../assets/gallery.png')}
                  resizeMode="contain"
                  style={{height: 30, width: 30, tintColor: '#c1dcfa'}}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={OpenCamera}>
                <Image
                  source={require('../assets/camera.png')}
                  resizeMode="contain"
                  style={{height: 30, width: 30, left: 5, tintColor: '#c1dcfa'}}
                />
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
      </View>

      <VehicleHeader
        HeaderTitle={'Edit Vehicle'}
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
              {Details.data.vin}
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

      <ScrollView contentContainerStyle={{paddingBottom: '10%'}}>
        <View style={{alignItems: 'center', marginTop: 20}}>
          {/* lot textinput */}
          <TextInput
            placeholder={'Enter lot'}
            onChangeText={text => setLot(text)}
            keyboardType={'number-pad'}
            value={lot}
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

          {/* title textinput */}
          <View style={{marginTop: 15}}>
            <TextInput
              placeholder={'Enter title'}
              onChangeText={text => setTitle(text)}
              value={title}
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
              placeholder={'Enter year'}
              onChangeText={text => setYear(text)}
              value={year}
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
              placeholder={'Enter make'}
              onChangeText={text => setMake(text)}
              value={make}
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
              placeholder={'Enter model'}
              onChangeText={text => setModel(text)}
              value={model}
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
    </View>
  );
}
