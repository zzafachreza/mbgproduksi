import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Linking,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyGap } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

export default function ({ navigation, route }) {
    const [user, setUser] = useState({});
    const [com, setCom] = useState({});
    const isFocused = useIsFocused();
    const [wa, setWA] = useState('');
    const [open, setOpen] = useState(false);



    useEffect(() => {


        if (isFocused) {
            getData('user').then(res => {
                console.log(res)
                setOpen(true);
                setUser(res);

            });
        }




    }, [isFocused]);



    const btnKeluar = () => {
        Alert.alert(MYAPP, 'Apakah kamu yakin akan keluar ?', [
            {
                text: 'Batal',
                style: "cancel"
            },
            {
                text: 'Keluar',
                onPress: () => {
                    storeData('user', null);

                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Splash' }],
                    });
                }
            }
        ])
    };

    const MyList = ({ label, value }) => {
        return (
            <View
                style={{
                    marginVertical: 3,
                    padding: 5,
                    backgroundColor: colors.white,
                    borderRadius: 5,
                }}>
                <Text
                    style={{
                        fontFamily: fonts.primary[400],
                        color: '#8E99A2',
                    }}>
                    {label}
                </Text>
                <Text
                    style={{
                        fontFamily: fonts.primary[400],
                        color: colors.black,
                    }}>
                    {value}
                </Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#F4F6FF'
        }}>

            {!open && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>}


            {open &&
                <>
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: colors.white,
                        padding: 5,
                        height: 80,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{
                            padding: 5,
                        }}>
                            <Icon type='ionicon' name='arrow-back-outline' size={windowWidth / 13} color={colors.black} />
                        </TouchableOpacity>
                        <Text style={{
                            flex: 1,
                            textAlign: 'center',
                            fontFamily: fonts.secondary[600],
                            fontSize: 20,

                            color: colors.black
                        }}>Profile</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('AccountEdit', user)} style={{
                            padding: 5,
                            borderRadius: 5,
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                fontFamily: fonts.primary[400],
                                fontSize: windowWidth / 18,
                                color: colors.primary
                            }}>Edit</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        backgroundColor: colors.white,
                        margin: 10,
                    }}>

                        <View style={{ padding: 10, }}>
                            <MyList label="NIP" value={user.nip} />
                            <MyList label="Nama" value={user.nama} />
                            <MyList label="Jabatan" value={user.jabatan} />
                            <MyList label="Username" value={user.username} />


                        </View>
                        {/* data detail */}
                    </View>
                </>
            }
            <View style={{
                padding: 20,
            }}>
                <MyButton onPress={btnKeluar} warna={colors.black} title="Log Out" Icons="log-out" iconColor={colors.white} colorText={colors.white} />
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({});
