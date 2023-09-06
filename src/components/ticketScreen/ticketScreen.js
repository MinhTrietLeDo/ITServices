import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import { API_URL, App_Token } from '../../config/config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {
  Text, Center, Container, List, FlatList, HStack, VStack,
  Heading, ScrollView, Box, Avatar, Divider, Button
} from 'native-base';
import { windowHeight, windowWidth } from '../../assets/res/courseStyle';
import { useSelector } from 'react-redux';

const TicketScreen = () => {
  const [ticket, setTicket] = useState([])
  const [loading, setLoading] = useState(true)
  const [id, setID] = useState(null)
  const token = useSelector((state) => state.user.token.session_token)

  useEffect(() => {
    GetTickets().catch(console.error)
    console.log('Catch user token:',token)
  }, [])

  const GetTickets = async () => {
    const ticket = '/search/Ticket/?order=DESC&expand_dropdowns=true&sort=2'
    let objHeader = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'App-Token': App_Token,
    };

    let request = await Promise.all([
      await fetch(
        API_URL + ticket + '&session_token=' + token,
        {
          headers: objHeader,
        })
        .then(el => el.json())
    ]);
    console.log(API_URL + ticket + '&session_token=' + token)

    if (typeof request[0].data !== 'undefined') {
      setTicket(request[0].data)
      setLoading(false)
    } else {

      Alert.alert('Error', 'Please try again later', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
      setLoading(false)
    }

  }

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <Container style={styles.container}>
        <View style={styles.TicketList}>
          <ScrollView>
            {ticket.map(el => {
              let rawDate = el["15"].split(' ')
              let ticketDate = rawDate[0].split('-').reverse().toString().replace(/,/g, '-').concat(' ' + rawDate[1]);
              let ticketTitle = el["1"]
              let lastUpdate = el["19"]
              let ticketID = el["2"]
              let urgency = el["3"]
              let watchers = el["12"]
              console.log(
                'Ticket ID:', ticketID,
                'Ticket Date:', ticketDate,
                'Ticket Name:', ticketTitle,
                'Last update:', lastUpdate,
                'Urgency:', urgency
                )
              return (
                <Center>
                  <VStack
                    divider={<Divider my="2" />}
                    w={windowWidth * 0.9}
                    style={{
                      borderWidth: windowWidth * 0.0015,
                      borderRadius: windowWidth * 0.015,
                      margin: windowWidth * 0.01,
                      height: windowHeight * 0.15,
                      // backgroundColor:'white'
                    }}
                  >
                    <View style={{ padding: windowWidth * 0.02 }}>
                      <Text style={{ fontSize: windowWidth * 0.05, fontWeight: 700 }}>{ticketTitle} #{ticketID}</Text>
                      <Text style={{ fontSize: windowWidth * 0.04 }}>Created: {ticketDate}</Text>
                    </View>
                  </VStack>
                </Center>
              )
            })}
          </ScrollView>
        </View>
      </Container >
    );
  }
}

export default TicketScreen

const styles = StyleSheet.create({
  container: {
    paddingVertical: windowHeight * 0.02,
    alignItems: 'center',
    alignSelf: 'center',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
  TicketList: {
    width: windowWidth * 0.95,
    height: windowHeight * 0.8,
    margin: windowWidth * 0.05,
    justifyContent: 'center',
  },
  StackStyle: {
    // backgroundColor: 'gray',
    padding: windowWidth * 0.02
  }
});
