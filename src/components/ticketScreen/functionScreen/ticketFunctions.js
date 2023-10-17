import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    SafeAreaView,
    View,
    StyleSheet
} from 'react-native'
import { Text } from 'native-base'
import { App_Token, API_URL } from '../../../config/config'

const SelectUser = async () => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token.session_token)
    useEffect(() => {
        // getTechnician().catch(console.error)
        console.log(token)
    }, [])

    const getTechnician = async () => {
        const technicianURL = ''
        let objHeader = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'App-Token': App_Token,
        };
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>AAAAAAAAAAAAAAAAAAAAA</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    }
})

export default SelectUser