import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  RefreshControl,
  SafeAreaView,
  StyleSheet
} from 'react-native';
import {
  Text,
  Center,
  Avatar,
  Heading,
  ScrollView
} from 'native-base'
import { windowHeight, windowWidth } from '../../assets/res/courseStyle';

const Home = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    console.log('MMMMMMMMMMHHHHHM, REFRESHING!!')
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          <View>
            <Avatar
              style={{ height: 100, borderRadius: 50, width: 100, resizeMode: 'cover' }}
              source={{ uri: 'https://cdn.cwsplatform.com/assets/no-photo-available.png' }}
            />
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginLeft: '10%' }}>
            {/* <Heading fontSize={30} bold>{this.props.userObj.glpifirstname + ' ' + this.props.userObj.glpirealname}</Heading> */}
            {/* <Text note>Last login in: {llfdata}</Text> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: (windowWidth + windowHeight) * 0.01,
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
  },
})

export default Home;
