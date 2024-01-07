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
                 <th>No</th>
                <th>Line Mesin</th>
                <th>Tanggal</th>
                <th>Waktu Produksi</th>
                <th>Keterangan</th>
                <th>Nama Operator</th>
             </tr>` ;

        let tbody = ``;

        data.map((i, index) => {

            tbody += `<tr>
                <td>${index + 1}</td>
                <td>${i.line_mesin}</td>
                <td>${i.tanggal_produksi}</td>
                <td>${i.waktu_produksi}</td>
                <td>${i.keterangan}</td>
                <td>${i.nama_operator}</td>
            
            </tr>`
        })


        let tfoot = `</table>`;


        let ttd = `<p style="text-align:right;margin-top:40px;margin-right:40px">Kendal, ${moment().format('DD MMMM YYYY')}</p><p style="text-align:right;margin-top:40px;margin-right:40px">( ${user.nama} )</p><p style="text-align:right;margin-top:5px;margin-right:40px">${user.jabatan}</p>`;



        let options = {
            html: thead + tbody + tfoot + ttd,
            fileName: 'MBGProdukLine',
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



    const modul = 'line';

    const [data, setData] = useState([]);
    const [kirim, setKirim] = useState({
        awal: moment().format('YYYY-MM-DD'),
        akhir: moment().format('YYYY-MM-DD'),
        key: '',
    })

    const [user, setUser] = useState({});

    useEffect(() => {
        getData('user').then(uu => {
            setUser(uu);
            console.log(uu)
        })
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
            akhir: kirim.akhir,
            key: kirim.key
        }).then(res => {
            console.log(res.data);
            setData(res.data)
        })
    }

    const __renderItem = ({ item, index }) => {
        return (
            <View style={{
                flexDirection: 'row',
                backgroundColor: colors.primary,
            }}>
                <Text style={styles.isiNo}>{index + 1}</Text>
                <Text style={styles.isi}>{item.line_mesin}</Text>
                <Text style={styles.isi}>{item.tanggal_produksi}</Text>
                <Text style={styles.isi}>{item.waktu_produksi}</Text>

                <Text style={styles.isi}>{item.keterangan}</Text>
                <Text style={styles.isi}>{item.nama_operator}</Text>

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
                padding: 5,
                marginBottom: 5,
            }}>
                <MyInput value={kirim.key} onChangeText={x => {
                    setKirim({
                        ...kirim,
                        key: x
                    })
                }} iconname="cube" label="Filter line mesin" placeholder="Masukan line mesin" />
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
                    <Text style={styles.judulNo}>No</Text>
                    <Text style={styles.judul}>Line Mesin</Text>
                    <Text style={styles.judul}>Tanggal</Text>
                    <Text style={styles.judul}>Waktu Produksi</Text>
                    <Text style={styles.judul}>Keterangan</Text>
                    <Text style={styles.judul}>Nama Operator</Text>
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

            {user.jabatan !== 'Direktur' && <View style={{
                padding: 10
            }}>
                <MyButton onPress={createPDF} title="Cetak" warna={colors.danger} Icons="print-outline" />
            </View>}

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