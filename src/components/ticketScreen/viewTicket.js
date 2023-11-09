import React, {useState, useEffect, useCallback, useRef} from 'react';
import {Badge, Button, ScrollView, Text} from 'native-base';
import {createNavigationContainerRef, useRoute} from '@react-navigation/native';
import {API_URL, App_Token} from '../../config/config';
import {windowHeight, windowWidth} from '../../assets/res/courseStyle';
// import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Alert,
  StyleSheet,
  View,
  ActivityIndicator,
  BackHandler,
  SafeAreaView,
  Modal,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {
  HandeStatusColor,
  HandeUrgencyColor,
  HandleBadgeStatus,
  HandleUrgency,
  fetchWithTimeout,
} from '../../config/handle';
import {RefreshControl} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import SelectUserListDropDown from './functionScreen/ticketFunctions';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ViewTicket = ({navigation}) => {
  const dispatch = useDispatch();
  const route = useRoute();
  const id = route.params?.id;
  const urgency = route.params?.urgency;
  const status = route.params?.status;
  const userID = route.params?.userID;
  const technicianID = route.params?.technicianID;
  const token = useSelector(state => state.user.token.session_token);

  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);

  const [reqName, setReqName] = useState('');
  const [reqLocation, setReqLocation] = useState('');

  const [techName, setTechName] = useState([]);

  const [technicianList, setTechnicianList] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const [ticketName, setTicketName] = useState('');
  const [ticketDate, setTicketDate] = useState('');
  const [ticketLUpdate, setTicketLUpdate] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');

  const [changeTechID, setChangeTechID] = useState('');

  useEffect(() => {
    getCertainTicket().catch(console.error);
    getUsername().catch(console.error);
    getTechList().catch(console.error);
    getTickerUser().catch(console.error);

    // updateTicket().catch(console.error)

    console.log(technicianID);
  }, []);

  /////////////==== LẤY THÔNG TIN/USERNAME ====/////////////
  const getUsername = async () => {
    const URL1 =
      '/search/User/?sort=34&criteria[0][itemtype]=User&criteria[0][field]=2&criteria[0][searchtype]=contains&criteria[0][value]=';
    const URL2 = '&forcedisplay[0]=9&forcedisplay[1]=34&forcedisplay[2]=3';

    let objHeader = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'App-Token': App_Token,
    };

    try {
      const requesterInfo = await fetchWithTimeout(
        API_URL + URL1 + userID + URL2 + '&session_token=' + token,
        {
          headers: objHeader,
          timeout: 5000,
        },
      ).then(el => el.json());

      if (typeof requesterInfo.data !== 'undefined') {
        let reqFullName = requesterInfo.data.map(arr => {
          let rFullName = arr['34'] + ' ' + arr['9'];
          setReqName(rFullName);
          let rLocation = arr['3'];
          if (rLocation === null) {
            setReqLocation('Chưa cập nhật');
          } else {
            setReqLocation(rLocation);
          }
          return [rFullName, rLocation];
        });
        // setLoading(false);
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
      if (technicianID === null) {
        console.log('skip, tech');
        setTechName('Chưa cập nhật');
      } else {
        const techinianInfo = await fetchWithTimeout(
          API_URL + URL1 + technicianID + URL2 + '&session_token=' + token,
          {
            headers: objHeader,
            timeout: 5000,
          },
        ).then(el => el.json());

        if (typeof techinianInfo.data !== 'undefined') {
          let techFullName = techinianInfo.data.map(arr => {
            let tFullName = arr['34'] + ' ' + arr['9'];
            setTechName(tFullName);
            return tFullName;
          });
          // console.log('ABC', techFullName)
          // setLoading(false);
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
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Cannot connect to the server', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };
  /////////////==== LẤY THÔNG TIN/USERNAME ====/////////////

  /////////////==== LẤY THÔNG TIN TECHNICIAN ====/////////////
  const getTechList = async () => {
    const URL =
      '/search/User/?sort=34&expand_dropdowns=true&criteria[0][itemtype]=User&criteria[0][field]=20&criteria[0][searchtype]=contains&criteria[0][value]=Super-Admin&forcedisplay[0]=9&forcedisplay[1]=34&forcedisplay[2]=2';
    let objHeader = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'App-Token': App_Token,
    };

    try {
      const responeTech = await fetchWithTimeout(
        API_URL + URL + '&session_token=' + token,
        {
          headers: objHeader,
          timeout: 5000,
        },
      ).then(el => el.json());
      if (typeof responeTech.data !== 'undefined') {
        const arr = responeTech.data;
        const techname = arr.map(arr => {
          let fullName = arr['34'] + ' ' + arr['9'];
          let techID = arr['2'];
          return {fullName, techID};
        });
        console.log('test', techname);
        setTechnicianList(techname);
        // setLoading(false);
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
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Cannot connect to the server', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };
  /////////////==== LẤY THÔNG TIN TECHNICIAN ====/////////////

  const getCertainTicket = async () => {
    const URL = '/Ticket/';
    let objHeader = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'App-Token': App_Token,
    };
    try {
      const respone = await fetchWithTimeout(
        API_URL + URL + id + '?session_token=' + token,
        {
          headers: objHeader,
          timeout: 5000,
        },
      ).then(arr => arr.json());
      if (typeof respone !== 'undefined') {
        console.log(respone);
        let ticketName = respone['name'];
        let rawDescription = respone['content'].split('&#60;p&#62;');
        let ticketDescription = rawDescription[1]
          .split('&#60;/p&#62;')
          .toString()
          .replace(/,/g, '');
        let ticketDate = respone['date'];
        let ticketLUpdate = respone['date_mod'];
        setTicketName(ticketName);
        setTicketDate(ticketDate);
        setTicketDescription(ticketDescription);
        setTicketLUpdate(ticketLUpdate);
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
    } catch (error) {
      console.error(error);
      setLoading(false);
      Alert.alert('Error', 'Cannot connect to the server', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  const getTickerUser = async () => {
    const URL = '/Ticket/';
    let objHeader = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'App-Token': App_Token,
    };

    try {
      const respone123 = await fetchWithTimeout(
        API_URL + URL + id + '/Ticket_User/?session_token=' + token,
        {
          headers: objHeader,
          timeout: 5000,
        },
      ).then(arr => arr.json());
      console.log('87263482736423423', respone123);
      if (typeof respone123 !== 'undefined') {
        if (respone123[1].type == 2) {
          console.log('1313');
          setChangeTechID(respone123[1].type);
        } else if (typeof respone123[1].type == 'undefined') {
          console.log('không có technician');
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      Alert.alert('Error', 'Cannot connect to the server', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  updateTicket = async () => {
    console.log('updating..');
    const URL = '/Ticket/';
    let objHeader = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'App-Token': App_Token,
    };

    let body = JSON.stringify({
      input: {
        // tickets_id: id,
        // name: 'q2123qưe123',
        // type: '1',
        // use_notification: '1',
        // urgency: 3,
      },
    });

    try {
      const respone = await fetchWithTimeout(
        API_URL + URL + id + '/Ticket_User/?session_token=' + token,
        {
          headers: objHeader,
          timeout: 5000,
          body: body,
          method: 'PATCH',
        },
      ).then(arr => arr.json());
      console.log(respone);
      if (respone !== 'undefine') {
        setLoading(false);
        setEditMode(false);
      } else {
        setLoading(false);
        setEditMode(false);
        Alert.alert('Error', 'Cannot connect to the server', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setEditMode(false);
      Alert.alert('Error', 'Cannot connect to the server', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  editBtn = () => {
    setEditMode(true);
    console.log(editMode);
    console.log('Tech Array', technicianList);
  };

  updateBtn = () => {
    Alert.alert('Cập nhật lại ticket?', 'Bạn có muốn cập nhật ticket?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => updateTicket()},
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
              {text: 'OK', onPress: () => setModalVisible(!modalVisible)},
            ]);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text
                style={{
                  fontSize: windowWidth * 0.055,
                  fontWeight: 600,
                  textAlign: 'center',
                  alignItems: 'center',
                }}>
                Chọn Người Xử Lý:
              </Text>
              <SelectUserListDropDown />
              <View style={styles.Button2}>
                <Button
                  style={{width: windowWidth * 0.2}}
                  onPress={() => assignBtn()}>
                  Cancel
                </Button>
                <Button
                  style={{width: windowWidth * 0.2}}
                  onPress={() => assignBtn()}>
                  OK
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      );
    } else {
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
                {ticketName} #{id}
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
                  {ticketDescription}
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
                  _text={{fontSize: windowWidth * 0.03}}
                  variant="solid"
                  style={{
                    backgroundColor: HandeStatusColor({status}),
                    marginLeft: (windowHeight + windowWidth) * 0.01,
                  }}
                  rounded={windowWidth * 0.01}>
                  {HandleBadgeStatus({status})}
                </Badge>
              </View>
              <View style={styles.row}>
                <Text
                  style={{
                    fontSize: windowWidth * 0.05,
                    fontWeight: 700,
                  }}>
                  Support type:
                </Text>
                <Text
                  style={{
                    fontSize: windowWidth * 0.045,
                    fontWeight: 400,
                    marginLeft: windowWidth * 0.01,
                  }}></Text>
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
                  {ticketDate}
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
                  {ticketLUpdate}
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
                  _text={{fontSize: windowWidth * 0.037}}
                  variant="solid"
                  style={{
                    backgroundColor: HandeUrgencyColor({urgency}),
                    marginLeft: (windowHeight + windowWidth) * 0.01,
                  }}
                  rounded={windowWidth * 0.01}>
                  {HandleUrgency({urgency})}
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
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('UserInfo', {
                      userID: userID,
                    })
                  }>
                  <Text
                    style={{
                      fontSize: windowWidth * 0.045,
                      fontWeight: 400,
                      marginLeft: windowWidth * 0.01,
                    }}>
                    {reqName}
                  </Text>
                </TouchableOpacity>
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
              {status === 2 ||
              status === 3 ||
              status === 4 ||
              status === 5 ||
              status === 6 ? (
                <View style={styles.row}>
                  <Text
                    style={{
                      fontSize: windowWidth * 0.05,
                      fontWeight: 700,
                    }}>
                    Người được gán:
                  </Text>
                  {editMode === true ? (
                    <SelectDropdown
                      data={technicianList}
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                        // techDropdownRef.current.reset();
                        // setTechTemp();
                        // setTechTemp(selectedItem.techID);
                      }}
                      defaultButtonText={techName}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem.fullName;
                      }}
                      buttonStyle={styles.dropdown1BtnStyle}
                      buttonTextStyle={styles.dropdown1BtnTxtStyle}
                      renderDropdownIcon={isOpened => {
                        return (
                          <FontAwesome
                            name={isOpened ? 'chevron-up' : 'chevron-down'}
                            color={'#444'}
                            size={(windowHeight + windowWidth) * 0.012}
                          />
                        );
                      }}
                      rowTextForSelection={(item, index) => {
                        return item.fullName;
                      }}
                      dropdownIconPosition={'right'}
                      dropdownStyle={styles.dropdown1DropdownStyle}
                      rowStyle={styles.dropdown1RowStyle}
                      rowTextStyle={styles.dropdown1RowTxtStyle}
                      // defaultValue={techName}
                    />
                  ) : (
                    <Text
                      style={{
                        fontSize: windowWidth * 0.045,
                        fontWeight: 400,
                        marginLeft: windowWidth * 0.01,
                      }}>
                      {techName}
                    </Text>
                  )}
                </View>
              ) : null}
            </View>
            {/* </ScrollView> */}
          </View>
          <View style={styles.Button}>
            <Button
              style={{width: windowWidth * 0.3}}
              onPress={() => navigation.goBack()}>
              Quay Về
            </Button>
            {/* {status === 1 ? (
              <Button style={{ width: windowWidth * 0.3 }} onPress={() => setModalVisible(true)}>Phân Công</Button>
            ) : status === 2 || status === 3 || status === 4 ? (
              <Button style={{ width: windowWidth * 0.3 }} onPress={() => editBtn()}>Hoàn Thành</Button>
            ) : null} */}
            {editMode === true ? (
              <Button
                style={{width: windowWidth * 0.3}}
                onPress={() => updateBtn()}>
                Cập nhật
              </Button>
            ) : (
              <Button
                style={{width: windowWidth * 0.3}}
                onPress={() => editBtn()}>
                Chỉnh sửa
              </Button>
            )}
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
    margin: (windowWidth + windowHeight) * 0.015,
    justifyContent: 'space-around',
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
    marginTop: (windowHeight + windowWidth) * 0.012,
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: (windowHeight + windowWidth) * 0.01,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: (windowHeight + windowWidth) * 0.02,
    padding: (windowHeight + windowWidth) * 0.05,
    alignItems: 'center',
    elevation: (windowHeight + windowWidth) * 0.4,
  },
  dropdown1DropdownStyle: {
    backgroundColor: '#EFEFEF',
  },
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: {
    color: '#444',
    textAlign: 'center',
    fontFamily: 'WorkSans',
    fontSize: windowWidth * 0.045,
  },
  dropdown1BtnStyle: {
    marginRight: windowWidth * 0.02,
    borderRadius: (windowHeight + windowWidth) * 0.005,
    borderWidth: windowWidth * 0.003,
    borderColor: '#444',
    maxWidth: windowWidth * 0.4,
    maxHeight: windowHeight * 0.045,
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
});

export default ViewTicket;
