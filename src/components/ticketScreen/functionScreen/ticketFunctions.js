import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    SafeAreaView,
    View,
    StyleSheet
} from 'react-native'

import SelectDropdown from 'react-native-select-dropdown'

const SelectUserListDropDown = ({ data }) => {
    const countries = ["Tín", "Huy", "Triết"]
    return (
        <SelectDropdown
            data={countries}
            onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
            }}
            rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
            }}
        />
    )
}

export default SelectUserListDropDown

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    }
})
