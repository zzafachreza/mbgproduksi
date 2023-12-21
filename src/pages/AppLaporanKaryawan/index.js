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

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';

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

    const createPDF = async () => {


        let thead =
            `

        <table width="100%" border="1" style="margin-top:5%;border-collapse:collapse" cellpadding="4">
            <tr>
            <th>No</th>
                <th>NIP</th>
                <th>Nama</th>
                <th>Jabatan</th>
                <th>Username</th>
             </tr>` ;

        let tbody = ``;

        data.map((i, index) => {

            tbody += `<tr>
                <td>${index + 1}</td>
                <td>${i.nip}</td>
                <td>${i.nama}</td>
                <td>${i.jabatan}</td>
                <td>${i.username}</td>
            
            </tr>`
        })


        let tfoot = `</table>`;


        let ttd = `<p style="text-align:right;margin-top:40px;margin-right:40px">Kendal, ${moment().format('DD MMMM YYYY')}</p><p style="text-align:right;margin-top:40px;margin-right:40px">( ${user.nama} )</p><p style="text-align:right;margin-top:5px;margin-right:40px">${user.jabatan}</p>`;



        let options = {
            html: thead + tbody + tfoot + ttd,
            fileName: 'MBGKaryawan',
            directory: 'Documents',
            height: 1122.52, width: 793.7,
        };


        let file = await RNHTMLtoPDF.convert(options)
        // console.log(file.filePath);
        // alert(file.filePath);

        await Share.open({
            title: MYAPP,
            message: "Print data",
            url: 'file:///' + file.filePath,
            subject: "Report",
        })
            .then((res) => {
                console.log(res);

            })
            .catch((err) => {
                err && console.log(err);
            });

    }

    const __renderItem = ({ item, index }) => {
        return (
            <View style={{
                flexDirection: 'row',
                backgroundColor: colors.primary,
            }}>

                <Text style={styles.isiNo}>{index + 1}</Text>
                <Text style={styles.isi}>{item.nip}</Text>
                <Text style={styles.isi}>{item.nama}</Text>
                <Text style={styles.isi}>{item.jabatan}</Text>
                <Text style={styles.isi}>{item.username}</Text>

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
                    <Text style={styles.judulNo}>No</Text>
                    <Text style={styles.judul}>NIP</Text>
                    <Text style={styles.judul}>Nama</Text>
                    <Text style={styles.judul}>Jabatan</Text>
                    <Text style={styles.judul}>Username</Text>


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
                            fontSize: 11
                        }}>Kendal, {moment().format('DD MMMM YYYY')}</Text>
                        <MyGap jarak={20} />
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 11
                        }}>( {user.nama} )</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 11
                        }}>{user.jabatan}</Text>
                    </View>
                </View>
            </View>

            <View style={{
                padding: 10
            }}>
                <MyButton onPress={createPDF} title="Cetak" warna={colors.danger} Icons="print-outline" />
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    isiNo: {
        flex: 0.5,
        padding: 5,
        margin: 1,
        backgroundColor: colors.white,
        fontFamily: fonts.secondary[400],
        fontSize: 8,
        textAlign: 'center'
    },

    thetotalNo: {
        flex: 0.5,
        padding: 5,
        margin: 1,
        backgroundColor: colors.primary,
        fontFamily: fonts.secondary[400],
        fontSize: 8,
        textAlign: 'center'
    },
    thetotal: {
        flex: 1,
        padding: 5,
        margin: 1,
        backgroundColor: colors.primary,
        fontFamily: fonts.secondary[400],
        fontSize: 8,
        textAlign: 'center'
    },
    isi: {
        flex: 1,
        padding: 5,
        margin: 1,
        backgroundColor: colors.white,
        fontFamily: fonts.secondary[400],
        fontSize: 8,
        textAlign: 'center'
    },
    judulNo: {
        flex: 0.5,
        padding: 5,
        margin: 1,
        backgroundColor: colors.white,
        fontFamily: fonts.secondary[800],
        fontSize: 8,
        textAlign: 'center'
    },
    judul: {
        flex: 1,
        padding: 5,
        margin: 1,
        backgroundColor: colors.white,
        fontFamily: fonts.secondary[800],
        fontSize: 8,
        textAlign: 'center'
    }
})