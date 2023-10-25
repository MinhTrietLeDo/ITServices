import React, { useEffect, useState } from "react";
import { View, Text, Button, Avatar } from "native-base";
import { SafeAreaView, StyleSheet, ActivityIndicator } from "react-native";
import { API_URL, App_Token } from "../../config/config";
import { useDispatch, useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { windowHeight, windowWidth } from "../../assets/res/courseStyle";

const UserInfo = () => {
    const token = useSelector(state => state.user.token.session_token)
    const dispatch = useDispatch()
    const route = useRoute()

    const userID = route.params?.userID
    const [loading, setLoading] = useState(true)
    const [userName, setUserName] = useState('')
    const [userLocation, setUserLocation] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPhone, setUserPhone] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [userCreateDate, setUserCreateDate] = useState('')

    useEffect(() => {
        getUserData().catch(console.error)
    }, [])

    const getUserData = async () => {
        const URL1 = '/search/User/?sort=34&criteria[0][itemtype]=User&criteria[0][field]=2&criteria[0][searchtype]=contains&criteria[0][value]='
        const URL2 = '&forcedisplay[0]=9&forcedisplay[1]=34&forcedisplay[2]=3&forcedisplay[3]=6&forcedisplay[4]=62&forcedisplay[5]=5&forcedisplay[6]=150'
        /////////////////////////////
        ////62: Ngày tạo profile////
        ////6: SĐT Di Động/////////
        ////5: Email//////////////
        ////150: URL Avatar//////
        ////////////////////////
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
            console.log('a:', userInfo[0].data)
            let username = userInfo[0].data.map(arr => {
                let rFullName = (arr['34'] + ' ' + arr['9'])
                setUserName(rFullName)
                let rLocation = arr['3']
                if (rLocation === null) {
                    setUserLocation('Chưa cập nhật')
                }
                else { setUserLocation(rLocation) }
                return ([rFullName, rLocation])
            })
            console.log('EEEEE', username)
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


    if (loading) {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" />
            </View>
        );
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <Text>123</Text>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignSelf: 'center',
        flex: 1,
        margin: (windowHeight + windowWidth) * 0.015,
        justifyContent: 'center'
    }
})

export default UserInfo