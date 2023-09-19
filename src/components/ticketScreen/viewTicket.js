import React from "react";
import { Button, Text } from "native-base";
import { View } from "react-native";
import { useRoute } from "@react-navigation/native";

const ViewTicket = ({ navigation }) => {
    const route = useRoute()
    const id= route.params?.id
    const description = route.params?.description

    getData = async () => {

    }

    return (
        <View>
            <Text note>ID: {id} Description: {description}</Text>
            <Button
                onPress={() => navigation.goBack()}>Go back</Button>
        </View>
    )
}

export default ViewTicket