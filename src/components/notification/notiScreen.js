import React from 'react'
import { SafeAreaView, View, StyleSheet } from "react-native";
import { windowHeight, windowWidth } from "../../assets/res/courseStyle";

const NotiScreen = async () => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View>
                    <Text>SETTING</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginLeft: '10%' }}>

                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: (windowWidth + windowHeight) * 0.01,
        alignItems: 'center',
        alignSelf: 'center',
        flex: 1,
    },
})


export default NotiScreen