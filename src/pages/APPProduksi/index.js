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


const MyMenuFeature = ({ img, label, onPress }) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={{
                marginVertical: 10,
                padding: 10,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: colors.border,
                marginHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Image source={img} style={{
                    width: windowHeight / 10,
                    resizeMode: 'contain',
                    height: windowWidth / 10
                }} />
                <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    color: colors.primary,
                    fontSize: 18,
                }}>{label}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default function ({ navigation, route }) {


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            position: 'relative'
        }}>

            <View style={{
                padding: 10,
                marginBottom: 10,
                backgroundColor: colors.white,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Image source={require('../../assets/logo.png')} style={{
                    width: windowWidth / 4,
                    resizeMode: 'contain',
                    height: 50,
                }} />

                <Text style={{
                    flex: 1,
                    textAlign: 'center',
                    fontFamily: fonts.secondary[800],
                    color: colors.primary,
                    fontSize: 18,

                }}>PRODUKSI</Text>
            </View>

            <View style={{
                flex: 1,
                padding: 20,
            }}>


                <MyMenuFeature img={require('../../assets/P1.png')} label="Data Produksi" onPress={() => navigation.navigate('APPProduksiData', {
                    judul: 'Data Produksi'
                })} />
                <MyMenuFeature img={require('../../assets/P2.png')} label="Data Line Mesin" onPress={() => navigation.navigate('APPProduksiLine', {
                    judul: 'Data Line Mesin'
                })} />





            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})