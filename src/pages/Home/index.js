import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import 'moment/locale/id';
import MyCarouser from '../../components/MyCarouser';
import { Rating } from 'react-native-ratings';

const MyMenuFeature = ({ img, label, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.border,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Image source={img} style={{
          width: windowHeight / 4,
          resizeMode: 'contain',
          height: windowWidth / 4
        }} />
        <Text style={{
          fontFamily: fonts.secondary[600],
          marginVertical: 5,
          color: colors.primary
        }}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default function Home({ navigation, route }) {



  const [user, setUser] = useState({});
  const isFocus = useIsFocused();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState({});

  const _getTransaction = async () => {

    await getData('user').then(u => {
      setUser(u);
    })

    await axios.post(apiURL + 'company').then(res => {

      setComp(res.data.data);

    });

    await axios.post(apiURL + 'menu').then(res => {

      console.log(res.data);
      setData(res.data);

    });
  }


  useEffect(() => {
    if (isFocus) {
      _getTransaction();
    }
  }, [isFocus]);


  return (

    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white,
      position: 'relative'
    }}>

      <View style={{
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 0
      }}>
        <Image source={require('../../assets/top2.png')} style={{
          width: 100,
          height: 140,
        }} />
      </View>




      <View style={{
        paddingHorizontal: 10,
      }}>

        <View style={{
          padding: 10,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Image source={require('../../assets/logo.png')} style={{
              width: 100,
              height: 50,
              resizeMode: 'contain'
            }} />
            <View style={{
              paddingLeft: 10,
            }}>
              <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: 15,
                color: colors.black
              }}>Selamat datang,  </Text>
              <Text style={{
                fontFamily: fonts.secondary[800],
                fontSize: 20,
                color: colors.black
              }}>{user.nama}</Text>
            </View>
          </View>

          <Text style={{
            fontFamily: fonts.secondary[800],
            color: colors.primary,
            fontSize: 16,
          }}>APLIKASI MANAJEMEN PRODUKSI</Text>
        </View>
      </View>

      <View style={{
        flex: 1,
        justifyContent: 'center',
        padding: 20,
      }}>

        <View style={{
          flexDirection: 'row',
          marginVertical: 10,
        }}>
          <MyMenuFeature img={require('../../assets/A1.png')} label="Master Data" onPress={() => navigation.navigate('APPMasterData')} />
          <MyMenuFeature img={require('../../assets/A2.png')} label="Produksi" onPress={() => navigation.navigate('APPProduksi')} />
        </View>
        <View style={{
          flexDirection: 'row',
          marginVertical: 10,
        }}>
          <MyMenuFeature img={require('../../assets/A3.png')} label="Laporan" onPress={() => navigation.navigate('APPLaporan')} />
          <MyMenuFeature img={require('../../assets/A4.png')} label="Akun" onPress={() => navigation.navigate('Account')} />
        </View>


      </View>
      {/* navigation bottom */}
      <View style={{
        height: 60,
        alignItems: 'center',
        flexDirection: 'row',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: colors.secondary,
        justifyContent: 'space-around'
      }}>
        <TouchableOpacity style={{
          padding: 10,
        }}>
          <Icon type='ionicon' name='home' color={colors.white} size={20} />


        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('APPLaporan')} style={{
          padding: 10,
        }}>
          <Icon type='ionicon' name='grid' color={colors.white} size={20} />


        </TouchableOpacity>



        <TouchableOpacity onPress={() => navigation.navigate('Account')} style={{
          padding: 10,
        }}>
          <Icon type='ionicon' name='person' color={colors.white} size={20} />
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  tulisan: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: fonts.secondary[600],
    color: colors.black,
    textAlign: 'justify'
  },
  tulisanJudul: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: fonts.secondary[800],
    color: colors.black,
    textAlign: 'justify'
  }
})