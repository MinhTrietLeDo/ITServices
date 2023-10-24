import React, { useState, useEffect, useCallback } from 'react';
import { Badge, Button, ScrollView, Text } from 'native-base';
import { createNavigationContainerRef, useRoute } from '@react-navigation/native';
import { API_URL, App_Token } from '../../config/config';
import { windowHeight, windowWidth } from '../../assets/res/courseStyle';
// import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Alert,
  StyleSheet,
  View,
  ActivityIndicator,
  BackHandler,
  SafeAreaView,
  Modal,
  Pressable
} from 'react-native';
import {
  HandeStatusColor,
  HandeUrgencyColor,
  HandleBadgeStatus,
  HandleUrgency,
} from '../../config/handle';
import { RefreshControl } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import SelectUserListDropDown from './functionScreen/ticketFunctions';
import { getRequester, getTechnician } from '../../redux/actions';

const ViewTicket = ({ navigation }) => {
  const dispatch = useDispatch()
  const route = useRoute();
  const id = route.params?.id;
  const userID = route.params?.userID;
  const technicianID = route.params?.technicianID
  const token = useSelector(state => state.user.token.session_token);
  const TicketArray = useSelector(state => state.ticket.ticketArray)

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [modalVisible, setModalVisible] = useState(false)

  const [title, setTicketTitle] = useState('')
  const [description, setDescription] = useState('')
  const [urgency, setUrgency] = useState('')
  const [date, setDate] = useState('')
  const [status, setStatus] = useState('')
  const [lastUpdate, setLastUpdate] = useState('')

  const requesterArray = useSelector(state => state.requester.requesterArray)
  const [reqName, setReqName] = useState('')
  const [reqLocation, setReqLocation] = useState('')

  const technicianArray = useSelector(state => state.technician.technicianArray)
  const [techName, setTechName] = useState([])

  useEffect(() => {
    console.log('TechID:', technicianID)
    getUsername().catch(console.error);
    splitArray()
    return () => backHandler.remove();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
    getUsername().catch(console.error);
    splitArray()
  }, []);

  /////////////==== LẤY THÔNG TIN/USERNAME ====/////////////
  const getUsername = async () => {
    const URL1 = '/search/User/?sort=34&criteria[0][itemtype]=User&criteria[0][field]=2&criteria[0][searchtype]=contains&criteria[0][value]='
    const URL2 = '&forcedisplay[0]=9&forcedisplay[1]=34&forcedisplay[2]=3'

    let objHeader = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'App-Token': App_Token,
    };

    let requesterInfo = await Promise.all([
      await fetch(API_URL + URL1 + userID + URL2 + '&session_token=' + token, {
        headers: objHeader,
      }).then(el => el.json()),
    ]);
    if (typeof requesterInfo[0].data !== 'undefined') {
      console.log('a:', requesterInfo[0].data)
      let reqFullName = requesterInfo[0].data.map(arr => {
        let rFullName = (arr['34'] + ' ' + arr['9'])
        setReqName(rFullName)
        let rLocation = arr['3']
        if (rLocation === null) {
          setReqLocation('Chưa cập nhật')
        }
        else { setReqLocation(rLocation) }
        return ([rFullName, rLocation])
      })
      console.log('EEEEE', reqFullName)
      // dispatch(getRequester(reqFullName))
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
    console.log(requesterInfo[0].data)
    if (technicianID === null) {
      console.log('skip, tech')
      setTechName('Chưa cập nhật')
    } else {
      let techinianInfo = await Promise.all([
        await fetch(API_URL + URL1 + technicianID + URL2 + '&session_token=' + token, {
          headers: objHeader,
        }).then(el => el.json()),
      ]);
      if (typeof techinianInfo[0].data !== 'undefined') {
        console.log(techinianInfo[0].data)
        let techFullName = techinianInfo[0].data.map(arr => {
          let tFullName = (arr['34'] + ' ' + arr['9'])
          setTechName(tFullName)
          return tFullName
        })
        // console.log('ABC', techFullName)
        dispatch(getTechnician(techFullName))
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
    }

  };
  /////////////==== LẤY THÔNG TIN/USERNAME ====/////////////

  const splitArray = () => {
    const splitTicket = TicketArray.map(el => {
      if (el['2'] === id) {
        const rawDate = el['15'].split(' ');
        const ticketDate = rawDate[0]
          .split('-')
          .reverse()
          .toString()
          .replace(/,/g, '-')
          .concat(' ' + rawDate[1]);
        const ticketTitle = el['1'];
        const rawlastUpdate = el['19'].split(' ');
        const lastUpdate = rawlastUpdate[0].split('-')
          .reverse()
          .toString()
          .replace(/,/g, '-')
          .concat(' ' + rawDate[1]);
        const urgency = el['3'];
        const status = el['12'];
        const getRawDescription = el['21'].split('&#60;p&#62;');
        const description = getRawDescription[1]
          .split('&#60;/p&#62;')
          .toString()
          .replace(/,/g, '');
        return (
          setTicketTitle(ticketTitle),
          setDate(ticketDate),
          setDescription(description),
          setLastUpdate(lastUpdate),
          setUrgency(urgency),
          setStatus(status)
        )
      }
    })

    // const splitRequester = requesterArray.map(arr => {
    //   let reqFirstName = arr['firstname']
    //   let reqRealtName = arr['realname']
    //   let reqFullName = (reqFirstName + ' ' + reqRealtName)
    //   let requesterLocation = arr['locations_id']
    //   console.log(reqFullName, requesterLocation)
    //   return (
    //     setReqName(reqFullName),
    //     setReqLocation(requesterLocation)
    //   )
    // })

    // const splitTechnician = technicianArray.map(arr => {
    //   let techFullName = (arr['firstname'] + ' ' + arr['realname'])
    //   return techFullName
    // })
    // console.log('123123123123', splitTechnician)
  }

  const backButton = () => {
    // navigation.reset({
    //   index: 0,
    //   routes: [
    //     {
    //       name: 'Mới',
    //       params: '',
    //     },
    //   ],
    // });
    navigation.goBack()
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backButton,
  );

  updateTicket = async () => {
    console.log('updating..');
    // navigation.goBack()
  };

  assignBtn = async () => {
    console.log('CHỌN NGƯỜI AAA');
    // Alert.alert('Cập nhật lại ticket?', 'Bạn có muốn cập nhật ticket?', [
    //   {
    //     text: 'Cancel',
    //     onPress: () => console.log('Cancel Pressed'),
    //     style: 'cancel',
    //   },
    //   { text: 'OK', onPress: () => updateTicket() },
    // ]);
    setModalVisible(!modalVisible)
  };

  editBtn = () => {
    console.log('UPDATE/FINISH TICKET');
    Alert.alert('Cập nhật lại ticket?', 'Bạn có muốn cập nhật ticket?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => updateTicket() },
    ]);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    if (modalVisible) {
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Các tác vụ sẽ không được lưu', 'Bạn có muốn thoát?', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              { text: 'OK', onPress: () => setModalVisible(!modalVisible) },
            ]);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{
                fontSize: windowWidth * 0.055,
                fontWeight: 600,
                textAlign: 'center',
                alignItems: 'center',
              }}>Chọn Người Xử Lý:</Text>
              <SelectUserListDropDown />
              <View style={styles.Button2}>
                <Button style={{ width: windowWidth * 0.2 }} onPress={() => assignBtn()}>Cancel</Button>
                <Button style={{ width: windowWidth * 0.2 }} onPress={() => assignBtn()}>OK</Button>
              </View>
            </View>
          </View>
        </Modal>
      )
    }
    else {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.card}>
            {/* <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }> */}
              <View style={styles.title}>
                <Text
                  style={{
                    fontSize: windowWidth * 0.055,
                    fontWeight: 700,
                    textAlign: 'center',
                    alignItems: 'center',
                  }}>
                  {title} #{id}
                </Text>
              </View>
              <View
                style={{
                  margin: (windowHeight + windowWidth) * 0.01,
                }}>
                <Text
                  style={{
                    fontSize: windowWidth * 0.05,
                    fontWeight: 700,
                  }}>
                  Miêu tả sự cố:
                </Text>
                <ScrollView
                  style={{
                    maxHeight: windowHeight * 0.17,
                    marginTop: windowHeight * 0.01,
                  }}>
                  <Text
                    style={{
                      fontSize: windowWidth * 0.045,
                    }}>
                    {description}
                  </Text>
                </ScrollView>
                <View style={styles.row}>
                  <Text
                    style={{
                      fontSize: windowWidth * 0.05,
                      fontWeight: 700,
                    }}>
                    Tình trạng:
                  </Text>
                  <Badge
                    _text={{ fontSize: windowWidth * 0.03 }}
                    variant="solid"
                    style={{
                      backgroundColor: HandeStatusColor({ status }),
                      marginLeft: (windowHeight + windowWidth) * 0.01,
                    }}
                    rounded={windowWidth * 0.01}>
                    {HandleBadgeStatus({ status })}
                  </Badge>
                </View>
                <View style={styles.row}>
                  <Text
                    style={{
                      fontSize: windowWidth * 0.05,
                      fontWeight: 700,
                    }}>
                    Ngày tạo:
                  </Text>
                  <Text
                    style={{
                      fontSize: windowWidth * 0.045,
                      fontWeight: 400,
                      marginLeft: windowWidth * 0.01,
                    }}>
                    {date}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text
                    style={{
                      fontSize: windowWidth * 0.05,
                      fontWeight: 700,
                    }}>
                    Last Update:
                  </Text>
                  <Text
                    style={{
                      fontSize: windowWidth * 0.045,
                      fontWeight: 400,
                      marginLeft: windowWidth * 0.01,
                    }}>
                    {lastUpdate}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text
                    style={{
                      fontSize: windowWidth * 0.05,
                      fontWeight: 700,
                    }}>
                    Mức Độ Ưu Tiên:
                  </Text>
                  <Badge
                    _text={{ fontSize: windowWidth * 0.037 }}
                    variant="solid"
                    style={{
                      backgroundColor: HandeUrgencyColor({ urgency }),
                      marginLeft: (windowHeight + windowWidth) * 0.01,
                    }}
                    rounded={windowWidth * 0.01}>
                    {HandleUrgency({ urgency })}
                  </Badge>
                </View>
                <View style={styles.row}>
                  <Text
                    style={{
                      fontSize: windowWidth * 0.05,
                      fontWeight: 700,
                    }}>
                    Người Yêu Cầu:
                  </Text>
                  <Text
                    style={{
                      fontSize: windowWidth * 0.045,
                      fontWeight: 400,
                      marginLeft: windowWidth * 0.01,
                    }}>
                    {reqName}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text
                    style={{
                      fontSize: windowWidth * 0.05,
                      fontWeight: 700,
                    }}>
                    Phòng Ban/Khoa:
                  </Text>
                  <Text
                    style={{
                      fontSize: windowWidth * 0.045,
                      fontWeight: 400,
                      marginLeft: windowWidth * 0.01,
                    }}>
                    {reqLocation}
                  </Text>
                </View>
                {status === 2 || status === 3 || status === 4 ? (
                  <View style={styles.row}>
                    <Text
                      style={{
                        fontSize: windowWidth * 0.05,
                        fontWeight: 700,
                      }}>
                      Người được gán:
                    </Text>
                    <Text
                      style={{
                        fontSize: windowWidth * 0.045,
                        fontWeight: 400,
                        marginLeft: windowWidth * 0.01,
                      }}>
                      {techName}
                    </Text>
                  </View>
                ) : status === 5 || status === 6 ? (
                  <View style={styles.row}>
                    <Text
                      style={{
                        fontSize: windowWidth * 0.05,
                        fontWeight: 700,
                      }}>
                      Người đã xử lý:
                    </Text>
                    <Text
                      style={{
                        fontSize: windowWidth * 0.045,
                        fontWeight: 400,
                        marginLeft: windowWidth * 0.01,
                      }}>
                      {techName}
                    </Text>
                  </View>
                ) : null}

              </View>
            {/* </ScrollView> */}
          </View>
          <View style={styles.Button}>
            <Button
              style={{ width: windowWidth * 0.3 }}
              onPress={() =>
                // navigation.reset({
                //   index: 0,
                //   routes: [
                //     {
                //       name: 'Mới',
                //       params: '',
                //     },
                //   ],
                // })
                navigation.goBack()
              }>
              Quay Về
            </Button>
            {status === 1 ? (
              <Button style={{ width: windowWidth * 0.3 }} onPress={() => setModalVisible(true)}>Phân Công</Button>
            ) : status === 2 || status === 3 || status === 4 ? (
              <Button style={{ width: windowWidth * 0.3 }} onPress={() => editBtn()}>Hoàn Thành</Button>
            ) : null}
          </View>
        </SafeAreaView>
      );
    }

  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    // margin: (windowWidth + windowHeight) * 0.02,
    justifyContent: 'center'

  },
  card: {
    borderRadius: (windowWidth + windowHeight) * 0.01,
    borderWidth: (windowWidth + windowHeight) * 0.001,
    width: windowWidth * 0.9,
    height: windowHeight * 0.8,
    maxHeight: windowHeight * 0.8,
    padding: (windowWidth + windowHeight) * 0.01,
  },
  title: {
    width: '100%',
    maxWidth: '100%',
    alignItems: 'center',
    maxHeight: windowHeight * 0.1,
  },
  Button: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: (windowHeight + windowWidth) * 0.01,
    width: windowWidth * 0.7,
  },
  Button2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: (windowHeight + windowWidth) * 0.01,
    width: windowWidth * 0.5,
  },
  row: {
    flexDirection: 'row',
    marginTop: (windowHeight + windowWidth) * 0.01,
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: (windowHeight + windowWidth) * 0.01,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: (windowHeight + windowWidth) * 0.02,
    padding: (windowHeight + windowWidth) * 0.05,
    alignItems: 'center',
    elevation: (windowHeight + windowWidth) * 0.4,
  },
});

export default ViewTicket;
