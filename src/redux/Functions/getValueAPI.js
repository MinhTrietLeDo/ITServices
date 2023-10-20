import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL, App_Token } from "../../config/config";


const dispatch = useDispatch()
const token = useSelector(state => state.user.token.session_token)
/////////////==== LẤY THÔNG TIN/USERNAME ====/////////////
export const getUsername = async (userID, technicianID) => {
    const a = '/User/';
    const b = '?expand_dropdowns=true';
    let objHeader = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'App-Token': App_Token,
    };

    let requestUsername = await Promise.all([
        await fetch(API_URL + a + userID + b + '&session_token=' + token, {
            headers: objHeader,
        }).then(el => el.json()),
    ]);
    console.log(API_URL + a + userID + b + '&session_token=' + token);
    if (typeof requestUsername !== 'undefined') {
        const aName = requestUsername.map(el => el['firstname']);
        const bName = requestUsername.map(el => el['realname']);
        const loca = requestUsername.map(el => el['locations_id']);
        setName(bName + ' ' + aName);
        setLocation(loca);
        console.log('hjkasgdrkjashdgf', location);
        setLoading(false);
    } else {
        Alert.alert('Error', 'Please try again later', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
        setLoading(false);
    }

    let techinianName = await Promise.all([
        await fetch(API_URL + '/User/' + technicianID + '?expand_dropdowns=true' + '&session_token=' + token, {
            headers: objHeader,
        }).then(el => el.json()),
    ]);
    if (typeof techinianName !== 'undefined') {
        const techAName = techinianName.map(el => el['firstname']);
        const techBName = techinianName.map(el => el['realname']);
        setTechnicianName(techAName + ' ' + techBName);
        setLoading(false);
        console.log('AAAAAAAAAAAAAAAAAAAAA')
    } else {
        Alert.alert('Error', 'Please try again later', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
        setLoading(false);
    }

};
/////////////==== LẤY THÔNG TIN/USERNAME ====/////////////


/////////////==== LẤY THÔNG TICKET ====/////////////
export const GetTickets = async () => {
    let objHeader = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'App-Token': App_Token,
    };

    let request = await Promise.all([
        await fetch(API_URL + ticketURL + '&session_token=' + token, {
            headers: objHeader,
        }).then(el => el.json()),
    ]);
    console.log(API_URL + ticketURL + '&session_token=' + token);

    if (typeof request[0].data !== 'undefined') {
        const rawData = request[0].data;
        setTicket(rawData);
        dispatch(getTicket(rawData))
        setLoading(false);
    } else {
        Alert.alert('Error', 'Please try again later', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
        setLoading(false);
    }
};
/////////////==== LẤY THÔNG TICKET ====/////////////
