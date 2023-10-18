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


import ProgressCircle from 'react-native-progress-circle'
export default function Kategori({ navigation, route }) {

    const [data, setData] = useState({});

    useEffect(() => {
        getData('user').then(uu => {
            axios.post(apiURL + 'arsip', {
                fid_user: uu.id
            }).then(res => {
                console.log(res.data);
                setData(res.data)
            })
        })
    }, [])


    const __renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback>
                <View style={{
                    flex: 1,
                    margin: 10,
                    flexDirection: 'row',
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 10,
                }}>
                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black
                        }}>{item.judul}</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[400],
                            color: colors.black
                        }}>{item.kategori}</Text>

                        {item.kategori == 'Ahli Waris' || item.kategori == 'Riwayat Tanah' ?
                            <View style={{
                                borderWidth: 1,
                                padding: 10,
                                borderColor: colors.secondary
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                }}>
                                    <Text style={{
                                        flex: 1,
                                        fontFamily: fonts.secondary[400],
                                        color: colors.black
                                    }}>Nama</Text>

                                    <Text style={{
                                        fontFamily: fonts.secondary[600],
                                        color: colors.black
                                    }}>{item.nama}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <Text style={{
                                        flex: 1,
                                        fontFamily: fonts.secondary[400],
                                        color: colors.black
                                    }}>Alamat</Text>
                                    <Text style={{
                                        fontFamily: fonts.secondary[600],
                                        color: colors.black
                                    }}>{item.alamat}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <Text style={{
                                        flex: 1,
                                        fontFamily: fonts.secondary[400],
                                        color: colors.black
                                    }}>Nomor Surat</Text>
                                    <Text style={{
                                        fontFamily: fonts.secondary[600],
                                        color: colors.black
                                    }}>{item.nomor_surat}</Text>
                                </View>
                            </View>
                            : <></>}
                    </View>
                    <View style={{
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                        <ProgressCircle
                            percent={item.persen}
                            radius={40}
                            borderWidth={5}
                            color={colors.primary}
                            shadowColor="#999"
                            bgColor="#fff"
                        >
                            <Text style={{ fontSize: 20 }}>{`${item.persen}%`}</Text>
                        </ProgressCircle>
                        <Text style={{
                            marginTop: 10,
                            fontFamily: fonts.secondary[400],
                            color: colors.black,
                            textAlign: 'center',
                            fontSize: 10
                        }}>{moment(item.tanggal).format('dddd, DD MMMM YYYY')} {'\nPukul'} {item.jam} {'WIB'}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

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
                    width: windowWidth / 5,
                    resizeMode: 'contain',
                    height: 50,
                }} />

                <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    color: colors.primary,
                    fontSize: 18,

                }}>Arsip / Result</Text>
            </View>

            <View style={{
                flex: 1,
            }}>
                <FlatList data={data} numColumns={1} renderItem={__renderItem} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})