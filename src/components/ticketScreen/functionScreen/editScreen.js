import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, SafeAreaView, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { Text, Button } from "native-base";
import { API_URL, App_Token } from "../../../config/config";
import { windowHeight, windowWidth } from "../../../assets/res/courseStyle";

const EditScreen = ({ navigation }) => {
    const token = useSelector(state => state.user.token.session_token)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log('USER TOKEN:', token)
    }, [])

    const updateAlert = () => {
        Alert.alert('Cảnh Báo', 'Bạn có muốn cập nhật?', [
            {
                text: 'Quay về',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => updateTicket().catch(console.error) },
        ]);
    }

    const updateTicket = async () => {
        console.log('AABBBBBAAABBAAAAAAAA')
        const URL = ''
        let objHeader = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'App-Token': App_Token,
        };
    }

    if (loading) {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" />
            </View>
        )
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.card}>

                </View>
                <View style={styles.Btn}>
                    <Button
                        style={{ width: windowWidth * 0.3 }}
                        onPress={() => navigation.goBack()}>
                        Quay Về
                    </Button>
                    <Button
                        style={{ width: windowWidth * 0.3 }}
                        onPress={() => updateAlert()}>
                        Cập Nhật
                    </Button>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly'
    },
    card: {
        borderRadius: (windowWidth + windowHeight) * 0.01,
        borderWidth: (windowWidth + windowHeight) * 0.001,
        width: windowWidth * 0.9,
        height: windowHeight * 0.8,
        maxHeight: windowHeight * 0.8,
        padding: (windowWidth + windowHeight) * 0.01,
    },
    Btn: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: (windowHeight + windowWidth) * 0.01,
        width: windowWidth * 0.7,
    }
})

export default EditScreen