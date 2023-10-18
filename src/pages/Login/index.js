import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity, BackHandler, Alert, Linking } from 'react-native';
import { fonts, windowWidth, colors, windowHeight } from '../../utils';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { apiURL, api_token, MYAPP, storeData } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';


export default function Login({ navigation }) {

  const [kirim, setKirim] = useState({
    api_token: api_token,
    username: null,
    password: null
  });
  const [loading, setLoading] = useState(false);

  const [comp, setComp] = useState({});





  const masuk = () => {


    if (kirim.username == null && kirim.password == null) {
      Alert.alert(MYAPP, 'Username dan Password tidak boleh kosong !');
    } else if (kirim.username == null) {
      Alert.alert(MYAPP, 'Username tidak boleh kosong !');
    } else if (kirim.password == null) {
      Alert.alert(MYAPP, 'Password tidak boleh kosong !');
    } else {


      setLoading(true);
      console.log(kirim);

      axios
        .post(apiURL + 'login', kirim)
        .then(res => {
          setLoading(false);
          console.log(res.data);
          if (res.data.status == 404) {
            showMessage({
              type: 'danger',
              message: res.data.message
            })
          } else {
            storeData('user', res.data.data);
            navigation.replace('Home')
          }
        }).finally(() => {
          setLoading(false)
        });



    }




  }

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: colors.white, position: 'relative' }}>

        <View style={{
          position: 'absolute',
          top: 0,
          zIndex: 99
        }}>
          <Image source={require('../../assets/top.png')} style={{
            width: 150,
            height: 140,
          }} />
        </View>


        <View style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Image source={require('../../assets/logo.png')} style={{
            marginTop: 100,
            width: windowWidth / 1.5,
            height: windowWidth / 2,
            resizeMode: 'contain'
          }} />
        </View>


        <View style={{
          padding: 20, flex: 1, backgroundColor: colors.white, margin: 20,
          borderRadius: 10,
        }}>
          <MyInput label="Username" onChangeText={val => setKirim({
            ...kirim,
            username: val
          })}
            iconname="at" placeholder="Masukan username" />
          <MyGap jarak={20} />
          <MyInput
            onChangeText={val => setKirim({
              ...kirim,
              password: val
            })}
            secureTextEntry={true}
            label="Kata Sandi"
            iconname="lock-closed"
            placeholder="Masukan kata sandi"
          />

          <MyGap jarak={40} />
          {!loading &&




            <MyButton
              onPress={masuk}
              title="Masuk"


              Icons="log-in-outline"
            />


          }

        </View>


        {loading && <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ActivityIndicator color={colors.secondary} size="large" />
        </View>}
      </ScrollView>


    </>
  );
}

const styles = StyleSheet.create({});
