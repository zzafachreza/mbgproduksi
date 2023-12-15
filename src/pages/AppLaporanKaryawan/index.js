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
import RNFS from 'react-native-fs';
import DocumentPicker, {
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isInProgress,
    types,
} from 'react-native-document-picker'


import ProgressCircle from 'react-native-progress-circle'
import { MyButton, MyGap, MyInput } from '../../components';
import { Modal } from 'react-native';

export default function ({ navigation, route }) {



    const modul = 'karyawan';

    const [data, setData] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        __getTransaction();
    }, []);

    const __getTransaction = () => {
        axios.post(apiURL + modul).then(res => {
            console.log(res.data);
            setData(res.data)
        })
        getData('user').then(uu => {
            setUser(uu);
            console.log(uu)
        })
    }

    const __renderItem = ({ item }) => {
        return (
            <View style={{
                flexDirection: 'row',
                backgroundColor: colors.primary,
            }}>
                <Text style={styles.isi}>{item.nip}</Text>
                <Text style={styles.isi}>{item.nama}</Text>
                <Text style={styles.isi}>{item.jabatan}</Text>
                <Text style={styles.isi}>{item.username}</Text>
                <Text style={styles.isi}>{item.password}</Text>
            </View >
        )
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            padding: 10,
            backgroundColor: colors.white
        }}>
            <View style={{
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',

            }}>
                <Text style={{
                    fontFamily: fonts.secondary[800],
                    fontSize: 18,
                    color: colors.primary,
                }}>{route.params.judul}</Text>
            </View>
            <View style={{
                flex: 1,
            }}>
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: colors.primary,
                }}>
                    <Text style={styles.judul}>Nama</Text>
                    <Text style={styles.judul}>Jabatan</Text>
                    <Text style={styles.judul}>Username</Text>
                    <Text style={styles.judul}>Password</Text>
                    <Text style={styles.judul}>NIP</Text>
                </View >
                <FlatList data={data} renderItem={__renderItem} />

                <View style={{
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    padding: 10,
                }}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'

                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 12
                        }}>Kendal, {moment().format('DD MMMM YYYY')}</Text>
                        <MyGap jarak={20} />
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 12
                        }}>{user.nama}</Text>
                    </View>
                </View>
            </View>



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    isi: {
        flex: 1,
        padding: 5,
        margin: 1,
        backgroundColor: colors.white,
        fontFamily: fonts.secondary[400],
        fontSize: 12,
        textAlign: 'center'
    },
    judul: {
        flex: 1,
        padding: 5,
        margin: 1,
        backgroundColor: colors.white,
        fontFamily: fonts.secondary[800],
        fontSize: 12,
        textAlign: 'center'
    }
})