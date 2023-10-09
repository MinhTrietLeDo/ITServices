import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  RefreshControl
} from 'react-native';
import {
  Text,
  Center,
  Avatar,
  Heading,
  ScrollView
} from 'native-base'

const Home = ({ navigation }) => {
  // const {theme, appearance} = useTheme()
  // const styles = dynamicStyles(theme, appearance)
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    console.log('MMMMMMMMMMHHHHHM, REFRESHING!!')
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (

    <Center>
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

    </Center>
  );
};

export default Home;
