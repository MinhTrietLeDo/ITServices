import React, {useEffect} from 'react';
import {Badge, Button, ScrollView, Text} from 'native-base';
import {useRoute} from '@react-navigation/native';
import {API_URL, App_Token} from '../../config/config';
import {windowHeight, windowWidth} from '../../assets/res/courseStyle';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, View} from 'react-native';
import {
  HandeStatusColor,
  HandeUrgencyColor,
  HandleBadgeStatus,
  HandleUrgency,
} from '../../config/handle';

const ViewTicket = ({navigation}) => {
  const route = useRoute();
  const id = route.params?.id;
  const description = route.params?.description;
  const urgency = route.params?.urgency;
  const date = route.params?.ticketDate;
  const status = route.params?.status;
  const title = route.params?.title;

  useEffect(() => {
    console.log('AAAA:', date);
    console.log(id, description, urgency, status);
    updateTicket().catch(console.error);
  }, []);

  updateTicket = async () => {
    let objHeader = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'App-Token': App_Token,
    };
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
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
            <Text
              style={{
                fontSize: windowWidth * 0.045,
                fontWeight: 400,
                marginLeft: windowWidth*0.01
              }}>
              Me may beo
            </Text>
          </View>
          <View style={styles.row}></View>
        </View>
      </View>
      <View style={styles.Button}>
        <Button onPress={() => navigation.goBack()}>Go Back</Button>
        <Button onPress={() => console.log('Pressed!')}>Update</Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  card: {
    borderRadius: (windowWidth + windowHeight) * 0.01,
    borderWidth: (windowWidth + windowHeight) * 0.001,
    width: windowWidth * 0.9,
    height: windowHeight * 0.75,
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
    margin: (windowHeight + windowWidth) * 0.02,
    width: windowWidth * 0.7,
  },
  row: {
    flexDirection: 'row',
    marginTop: (windowHeight + windowWidth) * 0.01,
    alignItems: 'center',
  },
});

export default ViewTicket;
