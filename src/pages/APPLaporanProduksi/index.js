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
import { MyButton, MyCalendar, MyGap, MyInput } from '../../components';
import { Modal } from 'react-native';


import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
export default function ({ navigation, route }) {


    const createPDF = async () => {


        let thead =
            `

        <table width="100%" border="1" style="margin-top:5%;border-collapse:collapse" cellpadding="4">
            <tr>
                <th>Kode Produk</th>
                <th>Tanggal</th>
                <th>Panjang Fiber</th>
                <th>Hasil Kualitas</th>
             </tr>` ;

        let tbody = ``;

        data.map(i => {

            tbody += `<tr>
                <td>${i.kode_produk}</td>
                <td>${i.tanggal_produksi}</td>
                <td>${i.panjang_fiber}</td>
                <td>${i.hasil_kualitas}</td>
            
            </tr>`
        })


        let tfoot = `</table>`;



        let options = {
            html: thead + tbody + tfoot,
            fileName: 'MBGProduksi',
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



    const modul = 'produksi';

    const [data, setData] = useState([]);
    const [kirim, setKirim] = useState({
        awal: moment().format('YYYY-MM-DD'),
        akhir: moment().format('YYYY-MM-DD')
    })

    useEffect(() => {
        __getTransaction();
    }, []);

    const __getTransaction = () => {
        axios.post(apiURL + modul).then(res => {
            console.log(res.data);
            setData(res.data)
        })
    }

    const __filterData = () => {
        axios.post(apiURL + modul, {
            awal: kirim.awal,
            akhir: kirim.akhir
        }).then(res => {
            console.log(res.data);
            setData(res.data)
        })
    }

    const __renderItem = ({ item }) => {
        return (
            <View style={{
                flexDirection: 'row',
                backgroundColor: colors.primary,
            }}>
                <Text style={styles.isi}>{item.kode_produk}</Text>
                <Text style={styles.isi}>{item.tanggal_produksi}</Text>
                <Text style={styles.isi}>{item.panjang_fiber}</Text>
                <Text style={styles.isi}>{item.hasil_kualitas}</Text>
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
                flexDirection: 'row',
                marginBottom: 20,
            }}>
                <View style={{
                    flex: 1,
                    paddingLeft: 5,
                }}>
                    <MyCalendar label="Dari" value={kirim.awal} onDateChange={x => {
                        setKirim({
                            ...kirim,
                            awal: x
                        })
                    }} iconname="calendar" />
                </View>
                <View style={{
                    flex: 1,
                    paddingLeft: 5,
                }}>
                    <MyCalendar label="Sampai" value={kirim.akhir} onDateChange={x => {
                        setKirim({
                            ...kirim,
                            akhir: x
                        })
                    }} iconname="calendar" />
                </View>
                <View style={{
                    flex: 0.8,
                    paddingLeft: 5,
                    paddingTop: 20,
                }}>
                    <MyButton onPress={__filterData} title="Search" Icons="search" />
                </View>
            </View>
            <View style={{
                flex: 1,
            }}>
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: colors.primary,
                }}>
                    <Text style={styles.judul}>Kode Produk</Text>
                    <Text style={styles.judul}>Tanggal</Text>
                    <Text style={styles.judul}>Panjang Fiber</Text>
                    <Text style={styles.judul}>Hasil Kualitas</Text>
                </View >
                <FlatList data={data} renderItem={__renderItem} />
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