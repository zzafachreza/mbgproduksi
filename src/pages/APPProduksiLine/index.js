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

export default function ({ navigation, route }) {
    const [open, setOpen] = useState(false);
    const [kirim, setKirim] = useState({
        tipe: 'ADD',
        line_mesin: '',
        tanggal_produksi: moment().format('YYYY-MM-DD'),
        waktu_produksi: '',
        keterangan: '',
        nama_operator: '',
    });

    const modul = 'line';

    const [data, setData] = useState([]);

    useEffect(() => {
        __getTransaction();
    }, []);

    const __getTransaction = () => {
        axios.post(apiURL + modul).then(res => {
            console.log(res.data);
            setData(res.data)
        })
    }

    const __renderItem = ({ item }) => {
        return (
            <View style={{
                marginVertical: 10,
                padding: 10,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 10,
                flexDirection: 'row'
            }}>
                <View style={{
                    flex: 1,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12
                    }}>Line Mesin</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 12
                    }}>{item.line_mesin}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12
                    }}>Tanggal Produksi</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 12
                    }}>{item.tanggal_produksi}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12
                    }}>Waktu Produksi</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 12
                    }}>{item.waktu_produksi}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12
                    }}>Keterangan</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 12
                    }}>{item.keterangan}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12
                    }}>Nama Operator</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 12
                    }}>{item.nama_operator}</Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity onPress={() => {
                        setKirim({
                            tipe: 'UPDATE',
                            id_line: item.id,
                            line_mesin: item.line_mesin,
                            tanggal_produksi: item.tanggal_produksi,
                            waktu_produksi: item.waktu_produksi,
                            keterangan: item.keterangan,
                            nama_operator: item.nama_operator,
                        });
                        setOpen(true);
                    }} style={{
                        padding: 10,
                    }}>
                        <Icon type='ionicon' name='create' color={colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        Alert.alert(MYAPP, 'Apakah kamu yakin akan hapus ini ?', [
                            {
                                text: 'TIDAK'
                            },
                            {
                                text: 'HAPUS',
                                onPress: () => {
                                    axios.post(apiURL + modul + '_delete', {
                                        id: item.id
                                    }).then(res => {
                                        __getTransaction();
                                    })
                                }
                            }
                        ])
                    }} style={{
                        padding: 10,
                    }}>
                        <Icon type='ionicon' name='trash' color={colors.danger} />
                    </TouchableOpacity>
                </View>
            </View>
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
                <FlatList data={data} renderItem={__renderItem} />
            </View>
            <View>
                <MyButton title="Tambah" onPress={() => {
                    setOpen(true);
                }} />
            </View>

            {/* modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={open}
                onRequestClose={() => {
                    setOpen(!open);
                    setKirim({
                        tipe: 'ADD',
                        line_mesin: '',
                        tanggal_produksi: moment().format('YYYY-MM-DD'),
                        waktu_produksi: '',
                        keterangan: '',
                        nama_operator: '',
                    })
                }}>
                <View style={{
                    backgroundColor: '#00000090',
                    flex: 1,
                    justifyContent: 'center',
                    padding: 10
                }}>
                    <View style={{
                        borderRadius: 10,
                        padding: 20,
                        flex: 1,
                        backgroundColor: colors.white,
                        justifyContent: 'center'
                    }}>
                        <ScrollView>

                            <MyInput iconname='create' label="Line Mesin" value={kirim.line_mesin} onChangeText={x => {
                                setKirim({
                                    ...kirim,
                                    line_mesin: x
                                })
                            }} />

                            <MyGap jarak={10} />
                            <MyCalendar iconname="create" value={kirim.tanggal_produksi} label="Tanggal Produksi" onDateChange={x => {
                                setKirim({
                                    ...kirim,
                                    tanggal_produksi: x
                                })
                            }} />
                            <MyGap jarak={10} />
                            <MyInput iconname='create' label="Waktu Produksi" value={kirim.waktu_produksi} onChangeText={x => {
                                setKirim({
                                    ...kirim,
                                    waktu_produksi: x
                                })
                            }} />
                            <MyGap jarak={10} />
                            <MyInput iconname='create' label="Keterangan" value={kirim.keterangan} onChangeText={x => {
                                setKirim({
                                    ...kirim,
                                    keterangan: x
                                })
                            }} />
                            <MyGap jarak={10} />
                            <MyInput iconname='create' label="Nama Operator" value={kirim.nama_operator} onChangeText={x => {
                                setKirim({
                                    ...kirim,
                                    nama_operator: x
                                })
                            }} />
                            <MyGap jarak={20} />
                            <MyButton title="Simpan" onPress={() => {
                                console.log(kirim);
                                let link = '';
                                if (kirim.tipe == 'ADD') {
                                    link = apiURL + modul + '_add';

                                } else {
                                    link = apiURL + modul + '_update';
                                }
                                axios.post(link, kirim).then(res => {
                                    __getTransaction();
                                    setKirim({
                                        tipe: 'ADD',
                                        line_mesin: '',
                                        tanggal_produksi: moment().format('YYYY-MM-DD'),
                                        waktu_produksi: '',
                                        keterangan: '',
                                        nama_operator: '',
                                    })
                                    setOpen(false);
                                })
                            }} />
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})