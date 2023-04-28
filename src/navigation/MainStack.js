import {NavigationContainer} from '@react-navigation/native';
import UnAuthDrawer from './UnAuthDrawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState, useEffect} from 'react';
import CustomerDrawer from './CustomerDrawer';
import Notifications from '../screens/Authorized/CustomerScreens/Notifications/Notifications';
import CustomerProfile from '../screens/Authorized/CustomerScreens/CustomerProfile';
import VehicleDetails from '../screens/Authorized/CustomerScreens/VehicleScreens/VehicleDetails';
import EditVehicleDetails from '../screens/Authorized/CustomerScreens/VehicleScreens/EditVehicleDetails';
import AddVehicle from '../screens/Authorized/Admin/Vehicle/AddVehicle';
import ContainerDetails from '../screens/Authorized/CustomerScreens/ContainerScreens/ContainerDetails';
import EditContainer from '../screens/Authorized/CustomerScreens/ContainerScreens/EditContainer';
import AddContainer from '../screens/Authorized/Admin/Shipment/AddContainer';
import StickyNotes from '../screens/Authorized/CustomerScreens/StickyNotes';
import AdminDrawer from './AdminDrawer';
import ShipmentDetails from '../screens/Authorized/Admin/Shipment/ShipmentDetails';
import EditShipment from '../screens/Authorized/Admin/Shipment/EditShipment';
import AdminVehicleDetails from '../screens/Authorized/Admin/Vehicle/AdminVehicleDetails';
import EditAdminVehicle from '../screens/Authorized/Admin/Vehicle/EditAdminVehicle';
import CreateNotifications from '../screens/Authorized/CustomerScreens/Notifications/CreateNotifications';
import ViewAllImages from '../screens/Authorized/CustomerScreens/VehicleScreens/ViewAllImages';
import Onboarding from '../screens/UnauthorizedScreens/OnBoarding/Onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InvoiceDetails from '../screens/Authorized/CustomerScreens/Invoices/InvoiceDetails';
import Customer from '../screens/Authorized/CustomerScreens/CustomerDrawer/Customer';
import CustomerVehicles from '../screens/Authorized/CustomerScreens/BottomTabs/CustomerVehicle';
import CustomerContainer from '../screens/Authorized/CustomerScreens/BottomTabs/CustomerContainer';
import CustomerInvoices from '../screens/Authorized/CustomerScreens/BottomTabs/CustomerInvoices';
import ForgotPassword from '../screens/UnauthorizedScreens/ForgotPassword';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    // check if the app has launched before
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value === null) {
        console.log('No Value, Setting New');
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        console.log('Value Found');
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    // render a loading screen if the launch status hasn't been determined yet
    return null;
  } else {
    return (
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={isFirstLaunch ? 'Onboarding' : 'Drawer'}>
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Drawer" component={UnAuthDrawer} />
        <Stack.Screen name="CustomerDrawer" component={CustomerDrawer} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="CustomerProfile" component={CustomerProfile} />
        <Stack.Screen name="VehicleDetails" component={VehicleDetails} />
        <Stack.Screen
          name="EditVehicleDetails"
          component={EditVehicleDetails}
        />
        <Stack.Screen name="AddVehicle" component={AddVehicle} />
        <Stack.Screen name="ContainerDetails" component={ContainerDetails} />
        <Stack.Screen name="EditContainer" component={EditContainer} />
        <Stack.Screen name="AddContainer" component={AddContainer} />
        <Stack.Screen name="StickyNotes" component={StickyNotes} />
        <Stack.Screen name="AdminDrawer" component={AdminDrawer} />
        <Stack.Screen name="ShipmentDetails" component={ShipmentDetails} />
        <Stack.Screen name="EditShipment" component={EditShipment} />
        <Stack.Screen name="InvoiceDetails" component={InvoiceDetails} />
        <Stack.Screen
          name="AdminVehicleDetails"
          component={AdminVehicleDetails}
        />
        <Stack.Screen name="EditAdminVehicle" component={EditAdminVehicle} />
        <Stack.Screen
          name="CreateNotifications"
          component={CreateNotifications}
        />
        <Stack.Screen name="ViewAllImages" component={ViewAllImages} />
        <Stack.Screen name="AllCustomers" component={Customer} />
        <Stack.Screen name="AllVehicles" component={CustomerVehicles} />
        <Stack.Screen name="AllShipments" component={CustomerContainer} />
        <Stack.Screen name="AllInvoices" component={CustomerInvoices} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    );
  }
}
