import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    SafeAreaView,
    View,
    StyleSheet
} from 'react-native'

import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { windowHeight, windowWidth } from '../../../assets/res/courseStyle'

const SelectUserListDropDown = ({ data }) => {
    const technicianName = useSelector(state => state.user.userObj.glpirealname)
    const techArray = technicianName.split(" ")
    useEffect(() => {
        console.log(techArray)
    }, [])
    return (
        <SelectDropdown
            data={techArray}
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
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={(windowHeight + windowWidth) * 0.012} />;
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
        />
    )
}

export default SelectUserListDropDown

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },
    dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
    dropdown1RowStyle: {
        backgroundColor: '#EFEFEF',
        borderBottomColor: '#C5C5C5'
    },
    dropdown1RowTxtStyle: {
        color: '#444',
        textAlign: 'left'
    },
    dropdown1BtnStyle: {
        marginTop: (windowHeight + windowWidth) * 0.01,
        backgroundColor: '#FFF',
        borderRadius: (windowHeight + windowWidth) * 0.005,
        borderWidth: windowWidth * 0.003,
        borderColor: '#444',
    },
    dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
})
