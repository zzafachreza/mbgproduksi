import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View,
    Image,
    ScrollView,
    ImageBackground,
    Dimensions,
    Switch,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { MyInput, MyGap, MyButton, MyPicker, MyCalendar } from '../../components';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { apiURL, api_token, MYAPP } from '../../utils/localStorage';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import { Icon } from 'react-native-elements';

export default function Register({ navigation }) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [loading, setLoading] = useState(false);
    const [valid, setValid] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [cek, setCek] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const validate = text => {
        // console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            // console.log('nama_lengkap is Not Correct');
            setData({ ...data, nama_lengkap: text });
            setValid(false);
            return false;
        } else {
            setData({ ...data, nama_lengkap: text });
            setValid(true);
            // console.log('nama_lengkap is Correct');
        }
    };

    const [sama, setSama] = useState(true)

    const [data, setData] = useState({
        api_token: api_token,
        nama_lengkap: '',
        username: '',
        telepon: '',
        password: '',
        repassword: '',


    });

    const simpan = () => {
        if (
            data.nama_lengkap.length === 0 &&
            data.username.length === 0 &&
            data.telepon.length === 0 &&
            data.password.length === 0

        ) {
            showMessage({
                message: 'Formulir pendaftaran tidak boleh kosong !',
            });
        } else if (data.nama_lengkap.length === 0) {
            showMessage({
                message: 'Masukan nama kamu',
            });
        }

        else if (data.telepon.length === 0) {
            showMessage({
                message: 'Masukan nomor telepon',
            });
        } else if (data.username.length === 0) {
            showMessage({
                message: 'Masukan username',
            });
        } else if (data.password.length === 0) {
            showMessage({
                message: 'Masukan kata sandi kamu',
            });
        } else {

            console.log(data);

            setLoading(true);
            axios
                .post(apiURL + 'register', data)
                .then(res => {
                    console.warn(res.data);
                    setLoading(false);
                    if (res.data.status == 404) {
                        showMessage({
                            type: 'danger',
                            message: res.data.message
                        })
                    } else {
                        showMessage({
                            type: 'success',
                            message: res.data.message
                        })

                        navigation.navigate('Login');
                    }


                });
        }
    };

    const [desa, setDesa] = useState([]);



    return (
        <ImageBackground
            style={{
                flex: 1,
                backgroundColor: colors.white,
                padding: 10,
                position: 'relative'
            }}>
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

            {/* <Switch onValueChange={toggleSwitch} value={isEnabled} /> */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        marginTop: 80,
                        fontSize: windowWidth / 12,
                        fontFamily: fonts.primary[800],
                        color: colors.secondary,

                    }}>Daftar</Text>
                </View>


                <View style={{
                    padding: 20,
                    backgroundColor: colors.white,
                    borderRadius: 20,
                }}>
                    <MyInput
                        placeholder="Masukan nama lengkap"
                        label="Nama Lengkap"
                        iconname="person-outline"
                        value={data.nama_lengkap}
                        onChangeText={value =>
                            setData({
                                ...data,
                                nama_lengkap: value,
                            })
                        }
                    />
                    <MyGap jarak={10} />
                    <MyInput
                        placeholder="Masukan jabatan"
                        label="Jabatan"
                        iconname="ribbon"
                        value={data.username}
                        onChangeText={value =>
                            setData({
                                ...data,
                                username: value,
                            })
                        }
                    />
                    <MyGap jarak={5} />


                    <MyInput
                        placeholder="Masukan nomor telepon"
                        label="Telepon"
                        iconname="call-outline"
                        keyboardType="phone-pad"
                        value={data.telepon}
                        onChangeText={value =>
                            setData({
                                ...data,
                                telepon: value,
                            })
                        }
                    />









                    <MyGap jarak={10} />
                    <MyInput
                        placeholder="Masukan kata sandi"
                        label="Kata Sandi"
                        iconname="lock-closed-outline"
                        secureTextEntry
                        value={data.password}
                        onChangeText={value =>
                            setData({
                                ...data,
                                password: value,
                            })
                        }
                    />
                    <MyGap jarak={5} />
                    <MyInput
                        borderColor={sama ? colors.border : colors.danger}
                        borderWidth={sama ? 1 : 1}
                        placeholder="Masukan ulang kata sandi"
                        label="Masukan ulang kata sandi"
                        iconname="lock-closed-outline"
                        secureTextEntry
                        value={data.repassword}
                        onChangeText={value => {

                            if (value !== data.password) {
                                setSama(false)
                            } else {
                                setSama(true)
                            }

                            setData({
                                ...data,
                                repassword: value,
                            })
                        }

                        }
                    />
                </View>
                <MyGap jarak={20} />




                {!loading &&
                    <>
                        <MyButton


                            title="Daftar"
                            Icons="log-in"
                            onPress={simpan}
                        />
                        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{
                            padding: 10,
                            marginTop: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}><Text style={{
                            fontSize: windowWidth / 28,
                            fontFamily: fonts.primary[400],
                            textAlign: 'center',
                            color: colors.primary
                        }}>Sudah memiliki Akun ? <Text style={{
                            fontSize: windowWidth / 28,
                            fontFamily: fonts.primary[600],
                            textAlign: 'center',
                            color: colors.border
                        }}>Masuk di sini</Text></Text></TouchableOpacity>
                    </>
                }

                <MyGap jarak={10} />
                {loading && <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator color={colors.primary} size="large" />
                </View>}
            </ScrollView>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 10,
    },
    image: {
        width: 620 / 4,
        height: 160 / 4,
    },
});
