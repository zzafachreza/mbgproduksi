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
                <th>Kode Produk</th>
                <th>Nama Produk</th>
                <th>Tanggal</th>
                <th>Panjang Fiber</th>
                <th>Hasil Kualitas</th>
                <th>Nama Leader</th>
                <th>Harga Produk</th>
             </tr>` ;

        let tbody = ``;

        data.map((i, index) => {

            tbody += `<tr>
                <td>${index + 1}</td>
                <td>${i.kode_produk}</td>
                <td>${i.nama_produk}</td>
                <td>${i.tanggal_produksi}</td>
                <td>${i.panjang_fiber}</td>
                <td>${i.hasil_kualitas}</td>
                <td>${i.nama_leader}</td>
                <td>${new Intl.NumberFormat().format(i.harga_produk)}</td>
            
            </tr>`
        })


        let tfoot = `
        <tr>
                <td colspan="4"></td>
                <td>${total}</td>
                <td colspan="2"></td>\
                <td>${new Intl.NumberFormat().format(totalProduk)}</td>
            
            </tr>
        </table>`;

        let ttd = `<p style="text-align:right;margin-top:40px;margin-right:40px">Kendal, ${moment().format('DD MMMM YYYY')}</p><p style="text-align:right;margin-top:40px;margin-right:40px">( ${user.nama} )</p><p style="text-align:right;margin-top:5px;margin-right:40px">${user.jabatan}</p>`;

        let options = {
            html: thead + tbody + tfoot + ttd,
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

    const [user, setUser] = useState({});

    const modul = 'produksi';

    const [data, setData] = useState([]);
    const [kirim, setKirim] = useState({
        awal: moment().format('YYYY-MM-DD'),
        akhir: moment().format('YYYY-MM-DD'),
        key: '',
    })

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
            setData(res.data);

            if (res.data.length > 0) {
                let TOTAL = 0;
                let PRDK = 0;
                res.data.map(i => {
                    TOTAL += parseFloat(i.panjang_fiber);
                    PRDK += parseFloat(i.harga_produk)
                });
                setTotal(TOTAL);
                setTotalProduk(PRDK);
            }
        })
    }

    const __filterData = () => {
        axios.post(apiURL + modul, {
            awal: kirim.awal,
            akhir: kirim.akhir,
            key: kirim.key
        }).then(res => {
            console.log(res.data);
            setData(res.data);
            if (res.data.length > 0) {
                let TOTAL = 0;
                let PRDK = 0;
                res.data.map(i => {
                    TOTAL += parseFloat(i.panjang_fiber)
                    PRDK += parseFloat(i.harga_produk)
                });
                setTotal(TOTAL);
                setTotalProduk(PRDK)
            }
        })
    }
    const [total, setTotal] = useState(0);
    const [totalProduk, setTotalProduk] = useState(0);



    const __renderItem = ({ item, index }) => {


        if (index == data.length - 1) {
            return (
                <>

                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: colors.primary,
                    }}>
                        <Text style={styles.isiNo}>{index + 1}</Text>
                        <Text style={styles.isi}>{item.kode_produk}</Text>
                        <Text style={styles.isi}>{item.nama_produk}</Text>
                        <Text style={{
                            flex: 1.5,
                            padding: 5,
                            margin: 1,
                            backgroundColor: colors.white,
                            fontFamily: fonts.secondary[400],
                            fontSize: 8,
                            textAlign: 'center'
                        }}>{item.tanggal_produksi}</Text>
                        <Text style={styles.isi}>{item.panjang_fiber}</Text>
                        <Text style={styles.isi}>{item.hasil_kualitas}</Text>
                        <Text style={styles.isi}>{item.nama_leader}</Text>
                        <Text style={styles.isi}>{new Intl.NumberFormat().format(item.harga_produk)}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: colors.primary,
                    }}>
                        <Text style={styles.thetotalNo}></Text>
                        <Text style={styles.thetotal}></Text>
                        <Text style={styles.thetotal}></Text>
                        <Text style={{
                            flex: 1.5,
                            padding: 5,
                            margin: 1,
                            backgroundColor: colors.primary,
                            fontFamily: fonts.secondary[400],
                            fontSize: 10,
                            textAlign: 'center'
                        }}></Text>
                        <Text style={{
                            flex: 1,
                            padding: 5,
                            margin: 1,
                            backgroundColor: colors.white,
                            fontFamily: fonts.secondary[400],
                            fontSize: 10,
                            textAlign: 'center'
                        }}>{total}</Text>
                        <Text style={styles.thetotal}></Text>
                        <Text style={styles.thetotal}></Text>
                        <Text style={{
                            flex: 1,
                            padding: 5,
                            margin: 1,
                            backgroundColor: colors.white,
                            fontFamily: fonts.secondary[400],
                            fontSize: 10,
                            textAlign: 'center'
                        }}>{new Intl.NumberFormat().format(totalProduk)}</Text>
                    </View>
                </>
            )
        } else {
            return (
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: colors.primary,
                }}>
                    <Text style={styles.isiNo}>{index + 1}</Text>
                    <Text style={styles.isi}>{item.kode_produk}</Text>
                    <Text style={styles.isi}>{item.nama_produk}</Text>
                    <Text style={{
                        flex: 1.5,
                        padding: 5,
                        margin: 1,
                        backgroundColor: colors.white,
                        fontFamily: fonts.secondary[400],
                        fontSize: 8,
                        textAlign: 'center'
                    }}>{item.tanggal_produksi}</Text>
                    <Text style={styles.isi}>{item.panjang_fiber}</Text>
                    <Text style={styles.isi}>{item.hasil_kualitas}</Text>
                    <Text style={styles.isi}>{item.nama_leader}</Text>
                    <Text style={styles.isi}>{new Intl.NumberFormat().format(item.harga_produk)}</Text>
                </View >
            )
        }
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
                }} iconname="cube" label="Filter kode atau nama produk" placeholder="Masukan kode atau nama produk" />
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
                    <Text style={styles.judul}>Kode Produk</Text>
                    <Text style={styles.judul}>Nama Produk</Text>
                    <Text style={{
                        flex: 1.5,
                        padding: 5,
                        margin: 1,
                        backgroundColor: colors.white,
                        fontFamily: fonts.secondary[800],
                        fontSize: 8,
                        textAlign: 'center'
                    }}>Tanggal</Text>
                    <Text style={styles.judul}>Panjang Fiber</Text>
                    <Text style={styles.judul}>Hasil Kualitas</Text>
                    <Text style={styles.judul}>Nama Leader</Text>
                    <Text style={styles.judul}>Harga Produk</Text>
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
        </SafeAreaView >
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