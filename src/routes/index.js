import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Splash,
  Home,
  Login,
  Account,
  AccountEdit,

  APPLaporan,
  APPMasterData,
  APPProduksi,
  APPMasterDataProduk,
  APPMasterDataKaryawan,
  APPProduksiData,
  APPProduksiLine,
  AppLaporanKaryawan,
  APPLaporanProduksi,
  APPLaporanLine,

} from '../pages';
import { colors } from '../utils';
import { Icon } from 'react-native-elements';

const Stack = createStackNavigator();

export default function Router() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />



      <Stack.Screen name="APPLaporan" component={APPLaporan} options={{ headerShown: false }} />
      <Stack.Screen name="APPMasterData" component={APPMasterData} options={{ headerShown: false }} />
      <Stack.Screen name="APPProduksi" component={APPProduksi} options={{ headerShown: false }} />

      <Stack.Screen name="APPMasterDataProduk" component={APPMasterDataProduk} options={{ headerShown: false }} />
      <Stack.Screen name="APPMasterDataKaryawan" component={APPMasterDataKaryawan} options={{ headerShown: false }} />

      <Stack.Screen name="APPProduksiData" component={APPProduksiData} options={{ headerShown: false }} />
      <Stack.Screen name="APPProduksiLine" component={APPProduksiLine} options={{ headerShown: false }} />
      <Stack.Screen name="AppLaporanKaryawan" component={AppLaporanKaryawan} options={{ headerShown: false }} />
      <Stack.Screen name="APPLaporanProduksi" component={APPLaporanProduksi} options={{ headerShown: false }} />
      <Stack.Screen name="APPLaporanLine" component={APPLaporanLine} options={{ headerShown: false }} />





      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          // headerTitle: 'Detail',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />





      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,

        }}
      />
      <Stack.Screen
        name="AccountEdit"
        component={AccountEdit}
        options={{
          headerShown: true,
          headerTitle: 'Edit Profile',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: '#000',
        }}
      />










      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />






    </Stack.Navigator>
  );
}
