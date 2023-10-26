import React, { useEffect, useState } from "react";
import { Text, Button, Avatar, } from "native-base";
import { SafeAreaView, StyleSheet, ActivityIndicator, View, Alert, ScrollView } from "react-native";
import { API_URL, App_Token } from "../../config/config";
import { useDispatch, useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { windowHeight, windowWidth } from "../../assets/res/courseStyle";
import ReactNativeBlobUtil from "react-native-blob-util";

const UserInfo = ({ navigation }) => {
    const token = useSelector(state => state.user.token.session_token)
    const dispatch = useDispatch()
    const route = useRoute()

    const userID = route.params?.userID
    const [loading, setLoading] = useState(true)
    const [userName, setUserName] = useState('')
    const [userLocation, setUserLocation] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPhone, setUserPhone] = useState('')
    const [userCreateDate, setUserCreateDate] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [userLastLogin, setUserLastLogin] = useState('')

    useEffect(() => {
        getUserData().catch(console.error)
        getImg().catch(console.error)
    }, [])

    const getUserData = async () => {
        const URL1 = '/search/User/?sort=34&criteria[0][itemtype]=User&criteria[0][field]=2&criteria[0][searchtype]=contains&criteria[0][value]='
        const URL2 = '&forcedisplay[0]=9&forcedisplay[1]=34&forcedisplay[2]=3&forcedisplay[3]=6&forcedisplay[4]=62&forcedisplay[5]=5&forcedisplay[6]=150&forcedisplay[7]=14'
        ///////////////////////////////
        ////62: Ngày tạo profile//////
        ////6: SĐT Di Động///////////
        ////5: Email////////////////
        ////14: Hoạt động lần cuối/
        //////////////////////////
        let objHeader = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'App-Token': App_Token,
        };
        let userInfo = await Promise.all([
            await fetch(API_URL + URL1 + userID + URL2 + '&session_token=' + token, {
                headers: objHeader,
            }).then(el => el.json()),
        ]);
        if (typeof userInfo[0].data !== 'undefined') {
            let userProfile = userInfo[0].data.map(arr => {
                let rFullName = (arr['34'] + ' ' + arr['9'])
                let rLocation = arr['3']
                let email = arr['5']
                let phoneNumber = arr['6']
                let createDate = arr['62']
                let lastLogin = arr['14']
                setUserName(rFullName)
                if (rLocation === null) { setUserLocation('Chưa cập nhật') }
                else { setUserLocation(rLocation) }
                if (email === null) { setUserEmail('Chưa cập nhật') }
                else { setUserEmail(email) }
                if (phoneNumber === null) { setUserPhone('Chưa cập nhật') }
                else { setUserPhone(phoneNumber) }
                if (createDate === null) { setUserCreateDate('Chưa cập nhật') }
                else { setUserCreateDate(createDate) }
                if (lastLogin === null) { setUserLastLogin('Chưa cập nhật') }
                else { setUserLastLogin(lastLogin) }
                return ([rFullName, rLocation, email, phoneNumber, createDate, lastLogin])
            })
            // console.log('EEEEE', userProfile)
            setLoading(false);
        } else {
            Alert.alert('Error', 'Please try again later', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
            setLoading(false);
        }
    }

    const getImg = async () => {
        ReactNativeBlobUtil.fetch(
            'GET', API_URL + '/User/' + userID + '/Picture/?session_token=' + token,
            // 'GET', API_URL + '/User/2' + '/Picture/?session_token=' + token,
            {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'App-Token': App_Token,
            })
            .then((res) => {
                let status = res.info().status
                console.log(status)
                if (status == 200) {
                    let base64Str = res.base64()
                    setUserAvatar(base64Str)
                    setLoading(false)
                }
                else if (status == 204) {
                    console.log('không có hình')
                    setLoading(false)
                }
                else {
                    Alert.alert('Error', 'Please try again later', [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                    setLoading(false)
                }
            })
            .catch((errorMessage, statusCode) => {
                let msg = errorMessage.toString()
                console.log('AAAAAAAAAA', msg, 'BBBB', statusCode)
                Alert.alert('Error', msg, [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
                setLoading(false);
            })
    }

    if (loading) {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" />
            </View>
        );
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.card}>
                    <View style={{ margin: (windowHeight + windowWidth) * 0.01 }}>
                        <Text style={styles.headerText}>THÔNG TIN NGƯỜI DÙNG</Text>
                    </View>
                    <View style={styles.header}>
                        <Avatar
                            // source={{ uri: userAvatar }}
                            source={{ uri: !!userAvatar ? `data:image/jpeg;base64,${userAvatar}` : 'https://cdn.cwsplatform.com/assets/no-photo-available.png' }}
                            style={styles.avatar} />
                        <Text style={styles.headerText}>{userName}</Text>
                    </View>
                    <ScrollView>
                        <View style={styles.row}>
                            <Text style={styles.textTitle}>Số Điện Thoại:</Text>
                            <Text style={styles.textInfo}> {userPhone}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.textTitle}>Email:</Text>
                            <Text style={styles.textInfo}> {userEmail}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.textTitle}>Phòng Ban/Khoa:</Text>
                            <Text style={styles.textInfo}> {userLocation}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.textTitle}>Được tạo ngày:</Text>
                            <Text style={styles.textInfo}> {userCreateDate}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.textTitle}>Last login:</Text>
                            <Text style={styles.textInfo}> {userLastLogin}</Text>
                        </View>
                    </ScrollView>

                </View>
                <View style={styles.Button}>
                    <Button
                        style={{ width: windowWidth * 0.3 }}
                        onPress={() => navigation.goBack()}>
                        Quay Về
                    </Button>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-around',
        margin: (windowWidth + windowHeight) * 0.015,
    },
    header: {
        width: '100%',
        // height: windowHeight * 0.07,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    headerText: {
        fontSize: windowWidth * 0.06,
        fontWeight: 800,
        paddingTop: (windowHeight + windowWidth) * 0.01,
        textAlign: 'center'
    },
    avatar: {
        height: 100,
        borderRadius: 50,
        width: 100,
        resizeMode: 'cover'
    },
    card: {
        borderRadius: (windowWidth + windowHeight) * 0.01,
        borderWidth: (windowWidth + windowHeight) * 0.001,
        width: windowWidth * 0.9,
        height: windowHeight * 0.8,
        maxHeight: windowHeight * 0.8,
        padding: (windowWidth + windowHeight) * 0.01,
    },
    Button: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: (windowHeight + windowWidth) * 0.01,
        width: windowWidth * 0.7,
    },
    row: {
        flexDirection: 'row',
        marginTop: (windowHeight + windowWidth) * 0.01,
        alignItems: 'center',
    },
    textTitle: {
        fontSize: windowWidth * 0.05,
        fontWeight: 500,
        paddingTop: (windowHeight + windowWidth) * 0.01,
        textAlign: 'center'
    },
    textInfo: {
        fontSize: windowWidth * 0.045,
        fontWeight: 500,
        paddingTop: (windowHeight + windowWidth) * 0.01,
        textAlign: 'center'
    }
})

export default UserInfo