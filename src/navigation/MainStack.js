import {NavigationContainer} from '@react-navigation/native';
import UnAuthDrawer from './UnAuthDrawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CustomerDrawer from './CustomerDrawer';
import Notifications from '../screens/Authorized/CustomerScreens/Notifications';
import CustomerProfile from '../screens/Authorized/CustomerScreens/CustomerProfile';
import VehicleDetails from '../screens/Authorized/CustomerScreens/VehicleScreens/VehicleDetails';
import EditVehicleDetails from '../screens/Authorized/CustomerScreens/VehicleScreens/EditVehicleDetails';
import AddVehicle from '../screens/Authorized/CustomerScreens/VehicleScreens/AddVehicle';
import ContainerDetails from '../screens/Authorized/CustomerScreens/ContainerScreens/ContainerDetails';
import EditContainer from '../screens/Authorized/CustomerScreens/ContainerScreens/EditContainer';
import AddContainer from '../screens/Authorized/CustomerScreens/ContainerScreens/AddContainer';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="Drawer"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Drawer" component={UnAuthDrawer} />
      <Stack.Screen name="CustomerDrawer" component={CustomerDrawer} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="CustomerProfile" component={CustomerProfile} />
      <Stack.Screen name="VehicleDetails" component={VehicleDetails} />
      <Stack.Screen name="EditVehicleDetails" component={EditVehicleDetails} />
      <Stack.Screen name="AddVehicle" component={AddVehicle} />
      <Stack.Screen name="ContainerDetails" component={ContainerDetails} />
      <Stack.Screen name="EditContainer" component={EditContainer} />
      <Stack.Screen name="AddContainer" component={AddContainer} />
    </Stack.Navigator>
  );
}
