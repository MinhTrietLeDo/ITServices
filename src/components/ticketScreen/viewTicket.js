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
import { useSelector } from 'react-redux';

const ViewTicket = ({ navigation }) => {
  const route = useRoute();
  const id = route.params?.id;
  const description = route.params?.description;
  const urgency = route.params?.urgency;
  const date = route.params?.date;
  const status = route.params?.status;
  const title = route.params?.title;
  const userID = route.params?.userID;
  const token = useSelector(state => state.user.token.session_token);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [modalVisible, setModalVisible] = useState(false)
  const [technicianName, setTechnicianName] = useState('')

  useEffect(() => {
    getUsername().catch(console.error);
    console.log('ID:', id, 'Miêu tả:', description, 'Ngày tạo:', date);
    return () => backHandler.remove();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
    getUsername().catch(console.error);
  }, []);

  const backButton = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Mới',
          params: '',
        },
      ],
    });
    // navigation.goBack()
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backButton,
  );

  /////////////==== LẤY THÔNG TIN NGƯỜI YÊU CẦU ====/////////////
  const getUsername = async () => {
    const a = '/User/';
    const b = '?expand_dropdowns=true';
    let objHeader = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'App-Token': App_Token,
    };

    let request = await Promise.all([
      await fetch(API_URL + a + userID + b + '&session_token=' + token, {
        headers: objHeader,
      }).then(el => el.json()),
    ]);
    console.log(API_URL + a + userID + b + '&session_token=' + token);
    if (typeof request !== 'undefined') {
      const aName = request.map(el => el['firstname']);
      const bName = request.map(el => el['realname']);
      const loca = request.map(el => el['locations_id']);
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
  };
  /////////////==== LẤY THÔNG TIN NGƯỜI YÊU CẦU ====/////////////


  /////////////==== LẤY THÔNG TIN NGƯỜI XỬ LÝ ====/////////////
  const getTechnician = async () => {
    const a = '/User/';
    const b = '?expand_dropdowns=true';
    let objHeader = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'App-Token': App_Token,
    };

    let request = await Promise.all([
      await fetch(API_URL + a + userID + b + '&session_token=' + token, {
        headers: objHeader,
      }).then(el => el.json()),
    ]);
    console.log(API_URL + a + userID + b + '&session_token=' + token);
    if (typeof request !== 'undefined') {
      const aName = request.map(el => el['firstname']);
      const bName = request.map(el => el['realname']);
      const loca = request.map(el => el['locations_id']);
      setName(bName + ' ' + aName);
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
  };
  /////////////==== LẤY THÔNG TIN NGƯỜI XỬ LÝ ====/////////////

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
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{
                fontSize: windowWidth * 0.055,
                fontWeight: 600,
                textAlign: 'center',
                alignItems: 'center',
              }}>Chọn Người Xử Lý:</Text>
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
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
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
                    maxHeight: windowHeight * 0.2,
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
                    {name}
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
                    {location}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
          <View style={styles.Button}>
            <Button
              style={{ width: windowWidth * 0.3 }}
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'Mới',
                      params: '',
                    },
                  ],
                })
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
    margin: (windowWidth + windowHeight) * 0.01,
  },
  card: {
    borderRadius: (windowWidth + windowHeight) * 0.01,
    borderWidth: (windowWidth + windowHeight) * 0.001,
    width: windowWidth * 0.9,
    height: windowHeight * 0.7,
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
