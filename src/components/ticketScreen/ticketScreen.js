import React, {useState, useEffect, useCallback} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Alert,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {API_URL, App_Token} from '../../config/config';
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
} from 'native-base';
import {windowHeight, windowWidth} from '../../assets/res/courseStyle';
import {useSelector} from 'react-redux';
import {
  HandeStatusColor,
  HandeUrgencyColor,
  HandleBadgeStatus,
  HandleUrgency,
} from '../../config/handle';

const TicketScreen = () => {
  const [ticket, setTicket] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector(state => state.user.token.session_token);
  const [refreshing, setRefreshing] = useState(false);
  const [defaultSort, setDefaultSort] = useState(2);

  useEffect(() => {
    GetTickets().catch(console.error);
    console.log('Catch user token:', token);
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
    const ticketURL =
      '/search/Ticket/?order=DESC&expand_dropdowns=true&forcedisplay[0]=1&forcedisplay[1]=2&forcedisplay[2]=3&forcedisplay[3]=12&forcedisplay[4]=15&forcedisplay[5]=19&forcedisplay[6]=21&sort=' +
      defaultSort;
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
      setTicket(request[0].data);
      setLoading(false);
    } else {
      Alert.alert('Error', 'Please try again later', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
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
        <View
          style={{
            flexDirection: 'row',
            width: windowWidth * 0.8,
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: windowWidth * 0.05}}>Sort by:</Text>
          <Icon
            as={<MaterialIcons name="sort" />}
            size={0.09 * windowWidth}
            ml={windowWidth * 0.02}
            color="muted.400"
            onPress={() => console.log('Sort Box Pressed')}
          />
        </View>
        <View style={styles.TicketList}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            maxHeight={windowHeight * 0.8}>
            {ticket.map(el => {
              let rawDate = el['15'].split(' ');
              let ticketDate = rawDate[0]
                .split('-')
                .reverse()
                .toString()
                .replace(/,/g, '-')
                .concat(' ' + rawDate[1]);
              let ticketTitle = el['1'];
              let lastUpdate = el['19'];
              let ticketID = el['2'];
              let urgency = el['3'];
              let status = el['12'];
              let getRawDescription = el['21'].split('&#60;p&#62;');
              let description = getRawDescription[1]
                .split('&#60;/p&#62;')
                .toString()
                .replace(/,/g, '');
              console.log(description);
              return (
                <Center key={ticketID}>
                  <VStack
                    divider={<Divider my="2" />}
                    w={windowWidth * 0.9}
                    style={{
                      borderWidth: windowWidth * 0.0015,
                      borderRadius: windowWidth * 0.015,
                      margin: windowWidth * 0.01,
                      height: windowHeight * 0.15,
                      // backgroundColor:'white'
                    }}>
                    <TouchableOpacity
                      onPress={() => console.log('Ticket View Pressed')}
                    >
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
                        <Text style={{fontSize: windowWidth * 0.04}}>
                          Created: {ticketDate}
                        </Text>
                        {/* <Text style={{fontSize: windowWidth * 0.04}}>
                        Description: {description}
                      </Text> */}
                        {/*============== BAGDE ==============*/}
                        <HStack
                          alignSelf={'center'}
                          space={windowWidth * 0.02}
                          marginTop={windowHeight * 0.01}>
                          <Badge
                            _text={{fontSize: windowWidth * 0.037}}
                            variant="solid"
                            //colorScheme={HandeUrgencyColor({ urgency })}
                            style={{
                              backgroundColor: HandeUrgencyColor({urgency}),
                            }}
                            rounded={windowWidth * 0.01}>
                            {HandleUrgency({urgency})}
                          </Badge>
                          <Badge
                            _text={{fontSize: windowWidth * 0.037}}
                            variant="solid"
                            style={{
                              backgroundColor: HandeStatusColor({status}),
                            }}
                            rounded={windowWidth * 0.01}>
                            {HandleBadgeStatus({status})}
                          </Badge>
                        </HStack>
                        {/*============== BAGDE ==============*/}
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
    padding: windowWidth * 0.02,
  },
});
