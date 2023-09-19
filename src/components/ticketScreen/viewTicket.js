import React, { useEffect } from "react";
import { Button, Text } from "native-base";
import { useRoute } from "@react-navigation/native";
import { API_URL, App_Token } from "../../config/config";
import { windowHeight, windowWidth } from "../../assets/res/courseStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from 'react-native'

const ViewTicket = ({ navigation }) => {
    const route = useRoute()
    const id = route.params?.id
    const description = route.params?.description

    useEffect(() => {
        console.log(id, description)
        updateTicket().catch(console.error)
    }, [])

    updateTicket = async () => {


        let objHeader = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'App-Token': App_Token,
        };
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.ticketInformation}>
                <Text style={{
                    fontSize: windowWidth * 0.05,
                    fontWeight: 700,
                    textAlign: 'center'
                    // backgroundColor: 'black'
                }}>Ticket ID: {id}</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: (windowWidth+windowHeight) * 0.02,
        alignItems: 'center',
        alignSelf: 'center',
        // backgroundColor: 'black',
    },
    ticketInformation:{
        borderRadius: (windowWidth+windowHeight)*0.01,
        borderWidth: (windowWidth+windowHeight)*0.001,
        width: windowWidth*0.9,
        height: windowHeight*0.7,
        maxHeight: windowHeight*0.8, 
        padding: (windowWidth+windowHeight)*0.01
    }
})

export default ViewTicket