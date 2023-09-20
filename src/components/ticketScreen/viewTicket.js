import React, { useEffect } from "react";
import { Badge, Button, Text } from "native-base";
import { useRoute } from "@react-navigation/native";
import { API_URL, App_Token } from "../../config/config";
import { windowHeight, windowWidth } from "../../assets/res/courseStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from 'react-native'
import {
    HandeStatusColor,
    HandeUrgencyColor,
    HandleBadgeStatus,
    HandleUrgency,
} from "../../config/handle";

const ViewTicket = ({ navigation }) => {
    const route = useRoute()
    const id = route.params?.id
    const description = route.params?.description
    const urgency = route.params?.urgency
    const date = route.params?.ticketDate
    const status = route.params?.status
    const title = route.params?.title

    useEffect(() => {
        console.log('AAAA:', date)
        console.log(id, description, urgency, status)
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
            <View style={styles.card}>
                <View style={styles.title}>
                    <Text style={{
                        fontSize: windowWidth * 0.055,
                        fontWeight: 700,
                        textAlign: 'center',
                        alignItems: 'center',
                    }}>{title} #{id}</Text>
                    {/* <Badge
                        _text={{ fontSize: windowWidth * 0.03 }}
                        variant="solid"
                        style={{
                            backgroundColor: HandeStatusColor({ status }),
                        }}
                        rounded={windowWidth * 0.01}>
                        {HandleBadgeStatus({ status })}
                    </Badge> */}
                </View>
                <View style={{ margin: (windowHeight + windowWidth) * 0.01 }}>
                    <Text style={{
                        fontSize: windowWidth * 0.05,
                        fontWeight: 700,
                        // textAlign: 'center'
                        // backgroundColor: 'black'
                    }}>Miêu tả sự cố:</Text>
                    <Text style={{
                        fontSize: windowWidth * 0.045,
                    }}>{description}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: (windowWidth + windowHeight) * 0.02,
        alignItems: 'center',
        alignSelf: 'center',
        // backgroundColor: 'black',
    },
    card: {
        borderRadius: (windowWidth + windowHeight) * 0.01,
        borderWidth: (windowWidth + windowHeight) * 0.001,
        width: windowWidth * 0.9,
        height: windowHeight * 0.7,
        maxHeight: windowHeight * 0.8,
        padding: (windowWidth + windowHeight) * 0.01
    },
    title: {
        // flexDirection: 'row',
        // justifyContent: 'space-evenly',
        // backgroundColor: 'black',
        width: '100%',
        maxWidth: '100%',
        alignItems: 'center',
        height: windowHeight * 0.1,
        maxHeight: windowHeight * 0.1,
    }
})

export default ViewTicket