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
import { size } from '../../assets/res/courseStyle';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class TicketScreen extends Component {
  state = {
    tickets_open: [],
    tickets_closed: [],
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
    const criteria_open = `/search/Ticket/?order=DESC&criteria[0][itemtype]=Ticket&criteria[0][field]=12&criteria[0][searchtype]=contains&criteria[0][value]=1&criteria[2][link]=OR&criteria[2][itemtype]=Ticket&criteria[2][field]=12&criteria[2][searchtype]=contains&criteria[2][value]=2&criteria[3][link]=OR&criteria[3][itemtype]=Ticket&criteria[3][field]=12&criteria[3][searchtype]=contains&criteria[3][value]=3&criteria[4][link]=OR&criteria[4][itemtype]=Ticket&criteria[4][field]=12&criteria[4][searchtype]=contains&criteria[4][value]=4&criteria[1][link]=AND&criteria[1][itemtype]=Ticket&criteria[1][field]=4&criteria[1][searchtype]=equals&criteria[1][value]=${userId}&forcedisplay[0]=12&forcedisplay[0]=21&forcedisplay[2]=15`;
    const criteria_closed = `/search/Ticket/?order=DESC&criteria[0][itemtype]=Ticket&criteria[0][field]=12&criteria[0][searchtype]=contains&criteria[0][value]=5&criteria[2][link]=OR&criteria[2][itemtype]=Ticket&criteria[2][field]=12&criteria[2][searchtype]=contains&criteria[2][value]=6&criteria[1][itemtype]=Ticket&criteria[1][link]=AND&criteria[1][field]=4&criteria[1][searchtype]=equals&criteria[1][value]=${userId}&forcedisplay[0]=12&forcedisplay[0]=21&forcedisplay[2]=15`;

    let objHeader = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'App-Token': App_Token,
    };

    let request = await Promise.all([
      // fetch ticket
      await fetch(
        API_URL + criteria_open + '&session_token=' + this.props.token,
        {
          headers: objHeader,
        })
        .then(el => el.json()),

      // fetch ticket
      await fetch(
        API_URL + criteria_closed + '&session_token=' + this.props.token,
        {
          headers: objHeader,
        })
        .then(el => el.json())
    ]);


    if (typeof request[0].data !== 'undefined') {

      this.setState({
        tickets_open: request[0].data,
        tickets_closed: request[1].data,
        loading: false
      });
      console.log('333333333333333333', this.state.tickets_open)
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
        <View style={styles.container}>
          {/* <Center> */}
          <View style={styles.UserProfile}>
            <View>
              <Avatar
                style={{ height: 100, borderRadius: 50, width: 100, resizeMode: 'cover' }}
                // source={{ uri: !!this.props.userProfile.picture ? 'http://172.16.18.45/front/document.send.php?file=_pictures/' + this.props.userProfile.picture : 'https://cdn.cwsplatform.com/assets/no-photo-available.png' }}
                source={{ uri: 'https://cdn.cwsplatform.com/assets/no-photo-available.png' }}
              />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginLeft: '10%', backgroundColor: 'white' }}>
              <Heading fontSize={30} bold>{this.props.userObj.glpifirstname + ' ' + this.props.userObj.glpirealname}</Heading>
              <Text note>Logined: {llfdata}</Text>
            </View>
          </View>

          <View style={styles.TicketList}>
            <Heading>Test</Heading>
            {/* <List> */}
            {this.state.tickets_open.map(el => {
              let fmtData = el["15"].split(' ');
              let data = fmtData[0].split('-').reverse().toString().replace(/,/g, '-').concat(' ' + fmtData[1]);
              return (
                // <ListItem >
                // <FlatList style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                // <View style={{
                //   backgroundColor: 'back',
                //   flexDirection: 'row', alignContent: 'center', justifyContent: 'center', alignSelf: 'center', width: '100%'
                // }} >
                //   <View style={{ flexDirection: 'column' }}>
                //     <View style={{ flexDirection: 'row' }}>
                //       <FontAwesome name='calendar' size={16} style={{ marginRight: 5 }}></FontAwesome>
                //       <Text style={{ alignSelf: 'flex-start', }} note>Lastest Request: {data}</Text>
                //     </View>
                //     <View style={{ flexDirection: 'row' }}>
                //       <MaterialIcons name="title" size={16} style={{ marginRight: 5 }} />
                //       <Text style={{ alignSelf: 'flex-start', textAlign: 'left', fontWeight: 'bold' }}>Title: {el["1"]}</Text>
                //     </View>
                //   </View>
                //   <FontAwesome
                //     onPress={() => {
                //       if (this.state.showId == el["2"])
                //         this.setState({ showId: null })
                //       else
                //         this.setState({ showId: el["2"] })
                //     }}
                //     name={this.state.showId == el["2"] ? 'angle-up' : 'angle-down'} size={32} color={'rgb(56,126,220)'} ></FontAwesome>
                // </View>
                // //    <View style={{ height: this.state.showId == el["2"] ? null : 0 , opacity: this.state.showId == el["2"] ? 1 : 0 }}>
                // //    <Text note>{el["21"]}</Text>
                // //    {/* <RoundedBadge id={el["12"]}></RoundedBadge> */}
                // //  </View>
                <Box style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  width: '100%'
                }}>
                  {/* <Heading fontSize="xl" p="4" pb="3">
                      Ticket
                    </Heading> */}
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
            })}
            {/* </List> */}
          </View>
          {/* </Center> */}
        </View>
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
    width: this.windowWidth,
    alignContent: 'center',
    height: this.windowHeight,
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    // backgroundColor: 'black', 
    margin: '1%',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
  UserProfile: {
    flexDirection: 'row',
    width: this.windowWidth,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 10,
    textAlign: 'center',
    // backgroundColor: 'black'
  },
  TicketList: {
    width: '100%',
    height: '80%'
  }
});
