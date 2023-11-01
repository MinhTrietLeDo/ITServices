import React, { useState, useEffect, useCallback } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Alert,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { API_URL, App_Token } from '../../config/config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  Text,
  Center,
  Container,
  List,
  FlatList,
  HStack,
  VStack,
  Heading,
  ScrollView,
  Box,
  Avatar,
  Divider,
  Button,
  Badge,
  Icon,
  ArrowUpIcon,
} from 'native-base';
import { windowHeight, windowWidth } from '../../assets/res/courseStyle';
import {
  HandeStatusColor,
  HandeUrgencyColor,
  HandleBadgeStatus,
  HandleUrgency,
} from '../../config/handle';
import { useDispatch, useSelector } from 'react-redux';
import { setTicket, setRequester } from '../../redux/actions';
import { useRoute } from '@react-navigation/native';
import SearchBar from './functionScreen/searchInput';

const TicketScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const token = useSelector(state => state.user.token.session_token);
  const [refreshing, setRefreshing] = useState(false);
  const TicketData = useSelector(state => state.ticket.ticketArray);
  const lID = useSelector(state => state.user.userObj.glpiID)
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  const route = useRoute();
  const { ticketURL } = route.params;
  const [ticketList, setTicketList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Catch user token:', token);
    GetTickets().catch(console.error);
  }, []);

  const onRefresh = useCallback(() => {
    console.log('MMMMMMMMMMHHHHHM, REFRESHING!!');
    setRefreshing(true);
    GetTickets().catch(console.error);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const GetTickets = async () => {
    let objHeader = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'App-Token': App_Token,
    };

    let request = await Promise.all([
      // await fetch(API_URL + ticketURL + lID + '&session_token=' + token, {
      await fetch(API_URL + ticketURL + '&session_token=' + token, {
        headers: objHeader,
      }).then(el => el.json()),
    ]);
    if (typeof request[0].data !== 'undefined') {
      console.log('JKHKJAHSAKJHOIQW', request[0].data);
      const rawData = request[0].data;
      setTicketList(rawData);
      setLoading(false);
      dispatch(setTicket(rawData));
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

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.TicketList}>
          <SearchBar
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
          />
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {ticketList.map(el => {
              let rawDate = el['15'].split(' ');
              let ticketDate = rawDate[0]
                .split('-')
                .reverse()
                .toString()
                .replace(/,/g, '-')
                .concat(' ' + rawDate[1]);
              let ticketTitle = el['1'];
              let ticketID = el['2'];
              let urgency = el['3'];
              let status = el['12'];
              let userRequestID = el['4'];
              let technicianID = el['5'];
              return (
                <Center key={ticketID}>
                  <VStack
                    divider={<Divider my="2" />}
                    w={windowWidth * 0.9}
                    style={{
                      borderRadius: (windowWidth + windowHeight) * 0.01,
                      borderWidth: (windowWidth + windowHeight) * 0.001,
                      margin: (windowWidth + windowHeight) * 0.005,
                      height: windowHeight * 0.15,
                      // backgroundColor:'white'
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('ViewTicket', {
                          id: ticketID,
                          userID: userRequestID,
                          technicianID: technicianID,
                        })
                      }>
                      <View
                        style={{
                          padding: windowWidth * 0.02,
                          // backgroundColor: 'black',
                          justifyContent: 'space-between',
                          alignContent: 'center',
                          height: '100%',
                        }}>
                        <Text
                          maxWidth={windowWidth * 0.8}
                          maxH={windowHeight * 0.035}
                          style={{
                            fontSize: windowWidth * 0.05,
                            fontWeight: 700,
                            // backgroundColor: 'black'
                          }}>
                          {ticketTitle} #{ticketID}
                        </Text>
                        <Text style={{ fontSize: windowWidth * 0.04 }}>
                          Ngày tạo: {ticketDate}
                        </Text>
                        <HStack
                          alignSelf={'center'}
                          space={windowWidth * 0.02}
                        // marginTop={(windowWidth + windowHeight) * 0.01}
                        >
                          <Badge
                            _text={{ fontSize: windowWidth * 0.037 }}
                            variant="solid"
                            //colorScheme={HandeUrgencyColor({ urgency })}
                            style={{
                              backgroundColor: HandeUrgencyColor({ urgency }),
                            }}
                            rounded={windowWidth * 0.01}>
                            {HandleUrgency({ urgency })}
                          </Badge>
                          <Badge
                            _text={{ fontSize: windowWidth * 0.037 }}
                            variant="solid"
                            style={{
                              backgroundColor: HandeStatusColor({ status }),
                            }}
                            rounded={windowWidth * 0.01}>
                            {HandleBadgeStatus({ status })}
                          </Badge>
                        </HStack>
                      </View>
                    </TouchableOpacity>
                  </VStack>
                </Center>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
};

export default TicketScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: (windowWidth + windowHeight) * 0.01,
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
  TicketList: {
    width: windowWidth * 0.95,
    height: '100%',
    // margin: (windowWidth + windowHeight) * 0.01,
    // backgroundColor: 'black'
  },
  StackStyle: {
    // backgroundColor: 'gray',
    padding: (windowWidth + windowHeight) * 0.02,
  },
});
