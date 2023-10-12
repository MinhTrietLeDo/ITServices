import { Text } from "native-base";
import React from "react";
import { SafeAreaView, View, ScrollView, StyleSheet } from "react-native";
import { windowHeight, windowWidth } from "../../assets/res/courseStyle";

const SettingScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View>
                    <Text>SETTING</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginLeft: '10%' }}>
                    {/* <Heading fontSize={30} bold>{this.props.userObj.glpifirstname + ' ' + this.props.userObj.glpirealname}</Heading> */}
                    {/* <Text note>Last login in: {llfdata}</Text> */}
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

export default SettingScreen