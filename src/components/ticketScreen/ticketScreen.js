import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Alert,
  Image,
  Dimensions
} from 'react-native';
import { API_URL, App_Token } from '../../config/config';
import { connect } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {
  Text, Center, Container, List, FlatList, HStack, VStack,
  Heading, ScrollView, Box, Avatar, Spacer
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

    const userId = this.props.userObj.glpiID;
    // const criteria_open = `/search/Ticket/?order=DESC&criteria[0][itemtype]=Ticket&criteria[0][field]=12&criteria[0][searchtype]=contains&criteria[0][value]=1&criteria[2][link]=OR&criteria[2][itemtype]=Ticket&criteria[2][field]=12&criteria[2][searchtype]=contains&criteria[2][value]=2&criteria[3][link]=OR&criteria[3][itemtype]=Ticket&criteria[3][field]=12&criteria[3][searchtype]=contains&criteria[3][value]=3&criteria[4][link]=OR&criteria[4][itemtype]=Ticket&criteria[4][field]=12&criteria[4][searchtype]=contains&criteria[4][value]=4&criteria[1][link]=AND&criteria[1][itemtype]=Ticket&criteria[1][field]=4&criteria[1][searchtype]=equals&criteria[1][value]=${userId}&forcedisplay[0]=12&forcedisplay[0]=21&forcedisplay[2]=15`;
    // const criteria_closed = `/search/Ticket/?order=DESC&criteria[0][itemtype]=Ticket&criteria[0][field]=12&criteria[0][searchtype]=contains&criteria[0][value]=5&criteria[2][link]=OR&criteria[2][itemtype]=Ticket&criteria[2][field]=12&criteria[2][searchtype]=contains&criteria[2][value]=6&criteria[1][itemtype]=Ticket&criteria[1][link]=AND&criteria[1][field]=4&criteria[1][searchtype]=equals&criteria[1][value]=${userId}&forcedisplay[0]=12&forcedisplay[0]=21&forcedisplay[2]=15`;
    const ticket = '/search/Ticket/?expand_dropdowns=true'

    let objHeader = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'App-Token': App_Token,
    };

    let request = await Promise.all([
      // fetch ticket
      // await fetch(
      //   API_URL + criteria_open + '&session_token=' + this.props.token,
      //   {
      //     headers: objHeader,
      //   })
      //   .then(el => el.json()),

      // fetch ticket
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
        // tickets_open: request[0].data,
        // tickets_closed: request[1].data,
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

  listItem = async () => {

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
        console.log(llData)
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
            {this.state.tickets.map(el => {
              let rawDate = el["15"].split(' ')
              let ticketDate = rawDate[0].split('-').reverse().toString().replace(/,/g, '-').concat(' ' + rawDate[1]);
              let ticketTitle = el["1"]
              let lastUpdate = el["19"]
              console.log('Ticket Date:', ticketDate, 'Ticket Name:', ticketTitle, 'Last update:', lastUpdate)
              return (
                <Box>

                </Box>
              )
            })}
            {/* {this.state.tickets_open.map(el => {
              let fmtData = el["15"].split(' ');
              let data = fmtData[0].split('-').reverse().toString().replace(/,/g, '-').concat(' ' + fmtData[1]);
              return (
                <Box style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  width: '100%'
                }}>
                  <FlatList data={data} renderItem={({
                    item
                  }) => <Box borderBottomWidth="1" _dark={{
                    borderColor: "muted.50"
                  }} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
                      <HStack space={[3, 4]} justifyContent="space-between">
                        <Avatar size="48px" source={{
                          uri: item.avatarUrl
                        }} />
                        <VStack>
                          <Text _dark={{
                            color: "warmGray.50"
                          }} color="coolGray.800" bold>
                            {item.fullName}
                          </Text>
                          <Text color="coolGray.600" _dark={{
                            color: "warmGray.200"
                          }}>
                            {item.recentText}
                          </Text>
                        </VStack>
                        <Spacer />
                        <Text fontSize="xs" _dark={{
                          color: "warmGray.50"
                        }} color="coolGray.800" alignSelf="flex-start">
                          {item.timeStamp}
                        </Text>
                      </HStack>
                    </Box>} keyExtractor={item => item.id} />
                </Box>
              )
            })} */}
          </View>
        </Container>
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
    paddingVertical: windowHeight*0.02,
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
    width: '100%',
    height: '80%'
  }
});
