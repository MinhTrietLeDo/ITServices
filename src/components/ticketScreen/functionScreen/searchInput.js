import React, { useEffect, useState } from 'react'
import { Input } from 'native-base'
import { windowHeight, windowWidth } from '../../../assets/res/courseStyle'
import { App_Token, API_URL } from '../../../config/config'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet, TextInput, Keyboard } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import { Button } from 'native-base'

const SearchBar = ({ clicked, searchPhrase, setSearchPhrase, setClicked }) => {
    return (
        <View style={styles.container}>
            <View
                style={
                    clicked
                        ? styles.searchBar__clicked
                        : styles.searchBar__unclicked
                }
            >
                {/* search Icon */}
                <Feather
                    name="search"
                    size={(windowWidth + windowHeight) * 0.017}
                    color="black"
                    style={{ marginLeft: windowWidth * 0.02 }}
                />
                {/* Input field */}
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    value={searchPhrase}
                    onChangeText={setSearchPhrase}
                    onFocus={() => {
                        setClicked(true);
                    }}
                />
                {/* cross Icon, depending on whether the search bar is clicked or not */}
                {clicked && (
                    <Entypo
                        name="cross"
                        size={(windowWidth + windowHeight) * 0.017}
                        color="black"
                        style={{ marginRight: windowWidth * 0.015 }}
                        onPress={() => {
                            setSearchPhrase("")
                        }} />
                )}
            </View>
            {/* cancel button, depending on whether the search bar is clicked or not */}
            {clicked && (
                <View>
                    <Button
                        style={{marginLeft: 10}}
                        onPress={() => {
                            Keyboard.dismiss();
                            setClicked(false);
                        }}
                    >Cancel</Button>
                </View>
            )}
        </View>
    );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
    container: {
        margin: (windowWidth + windowHeight) * 0.005,
        justifyContent: 'space-around',
        alignItems: "center",
        flexDirection: "row",
        maxWidth: windowWidth*0.9,
        alignSelf: 'center'
    },
    searchBar__unclicked: {
        padding: (windowWidth + windowHeight) * 0.003,
        flexDirection: "row",
        width: windowWidth*0.9,
        backgroundColor: "#d9dbda",
        borderRadius: (windowWidth + windowHeight) * 0.01,
        alignItems: "center",
        alignContent: 'center',
        alignSelf: 'center'
    },
    searchBar__clicked: {
        padding: (windowWidth + windowHeight) * 0.003,
        flexDirection: "row",
        width: windowWidth*0.7,
        backgroundColor: "#d9dbda",
        borderRadius: (windowWidth + windowHeight) * 0.01,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    input: {
        fontSize: (windowWidth + windowHeight) * 0.017,
        marginLeft: (windowWidth + windowHeight) * 0.01,
        width: "90%",
    },
});
