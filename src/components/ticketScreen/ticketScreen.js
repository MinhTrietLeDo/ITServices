import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import { API_URL, App_Token } from '../../config/config';
import { connect } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {
  Text, Center, Container, List, FlatList, HStack, VStack,
  Heading, ScrollView, Box, Avatar, Divider, Button
} from 'native-base';
import { windowHeight, windowWidth } from '../../assets/res/courseStyle';

class TicketScreen extends Component {
  state = {
    // tickets_open: [],
    // tickets_closed: [],
    tickets: [],
    loading: true,
    showId: null
  };

  constructor() {
    super();
  }

  componentDidMount() {
    //console.log(this.props);
    this.GetTickets();
    console.log(this.windowWidth)
  }

  GetTickets = async () => {
    const ticket = '/search/Ticket/?order=DESC&expand_dropdowns=true&sort=2'

    let objHeader = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'App-Token': App_Token,
    };

    let request = await Promise.all([
      await fetch(
        //API_URL + criteria_closed + '&session_token=' + this.props.token,
        API_URL + ticket + '&session_token=' + this.props.token,
        {
          headers: objHeader,
        })
        .then(el => el.json())
    ]);


    if (typeof request[0].data !== 'undefined') {
      this.setState({
        tickets: request[0].data,
        loading: false
      });
      console.log('333333333333333333', this.state.tickets)
    } else {

      Alert.alert('Error', 'Please try again later', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);

      this.setState({
        loading: false
      });
    }

  }

  render() {
    if (this.state.loading) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      let llfdata = null;
      try {
        let llData = this.props.userProfile.last_login.split(' ');
        llfdata = llData[0].split('-').reverse().toString().replace(/,/g, '-').concat(' ' + llData[1]);
        // console.log(llData)
      } catch (error) {
        llfdata = '-';
        console.error(error, llfdata)
      }
      return (
        <Container style={styles.container}>
          <View style={styles.UserProfile}>
            <View>
              <Avatar
                style={{ height: 100, borderRadius: 50, width: 100, resizeMode: 'cover' }}
                // source={{ uri: !!this.props.userProfile.picture ? 'http://172.16.18.45/front/document.send.php?file=_pictures/' + this.props.userProfile.picture : 'https://cdn.cwsplatform.com/assets/no-photo-available.png' }}
                source={{ uri: 'https://cdn.cwsplatform.com/assets/no-photo-available.png' }}
              />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginLeft: '10%' }}>
              <Heading fontSize={30} bold>{this.props.userObj.glpifirstname + ' ' + this.props.userObj.glpirealname}</Heading>
              <Text note>Last login in: {llfdata}</Text>
            </View>
          </View>

          <View style={styles.TicketList}>
            <ScrollView style={styles.ListStyle}>
              {this.state.tickets.map(el => {
                let rawDate = el["15"].split(' ')
                let ticketDate = rawDate[0].split('-').reverse().toString().replace(/,/g, '-').concat(' ' + rawDate[1]);
                let ticketTitle = el["1"]
                let lastUpdate = el["19"]
                let ticketID = el["2"]
                console.log(
                  'Ticket ID:', ticketID,
                  'Ticket Date:', ticketDate,
                  'Ticket Name:', ticketTitle,
                  'Last update:', lastUpdate)
                return (
                  <Center>
                    <VStack
                      space={100}
                      divider={<Divider my="2" />}
                      w={windowWidth * 0.9}
                    >
                      <View style={{ padding: windowWidth * 0.02 }}>
                        <HStack w={windowWidth * 0.8} >
                          <Text style={{ fontSize: windowWidth * 0.04 }}>ID: {ticketID}</Text>
                          <Text style={{ fontSize: windowWidth * 0.04, marginLeft: windowWidth * 0.08 }}>Name: {ticketTitle}</Text>
                        </HStack>
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
  };
}
const mapStateToProps = (state) => ({
  userConfig: state.user,
  userObj: state.user.userObj,
  userProfile: state.user.userProfile,
  token: state.user.token
});

/** dispatch actions */
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketScreen)

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
  UserProfile: {
    flexDirection: 'row',
    // backgroundColor: 'black'
  },
  TicketList: {
    width: windowWidth * 0.95,
    height: windowHeight * 0.7,
    // backgroundColor: 'white',
    margin: windowWidth * 0.05,
    justifyContent: 'space-around',
  },
  ListStyle: {
    // backgroundColor: 'gray',
    padding: windowWidth * 0.02
  }
});
