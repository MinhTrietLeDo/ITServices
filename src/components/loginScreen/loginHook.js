import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Dimensions } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Base64 } from '../../config/base64';
import { API_URL, App_Token } from '../../config/config';
import { setUserObject, setSessionToken } from '../../redux/actions';
import {
  Input,
  Icon,
  Stack,
  Pressable,
  Center,
  Box,
  Button,
  Container,
  FormControl,
  View,
  Text,
  Divider,
  Image,
  Heading,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import store from '../../config/store';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginHook = () => {
  const [username, setUsername] = useState('glpi');
  const [password, setPassword] = useState('glpi');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fecthData = async () => {
      try {
        const username = await AsyncStorage.getItem('username');
        const password = await AsyncStorage.getItem('password');
        if (!!username && !!password) {
          await setUsername(username);
          setPassword(password);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fecthData().catch(console.error);
    // GetFullProfile().catch(console.error)
  }, []);

  const genBase64 = () => {
    return Base64.encode(username + ':' + password);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const authenticateUser = () => {
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAA', username, password);
    setLoading(true);
    console.log('LOADING STATE:', loading);
    let credentials = genBase64();
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Basic ' + credentials);
    myHeaders.append('App-Token', App_Token);
    //console.log('1231231231231313123')
    fetch(API_URL + '/initSession', {
      method: 'GET',
      headers: myHeaders,
      cors: true,
    })
      .then(rawData => rawData.json())
      .then(async data => {
        console.log('async data', data);
        if (
          typeof data === 'object' &&
          typeof data.session_token === 'string'
        ) {
          console.log(
            'KLJHSDKLJHLKJSHDLKJHSDLKHJSDIOLUWYEPOI',
            data.session_token,
          );
          try {
            let { session_token } = data;
            await AsyncStorage.setItem('username', username);
            await AsyncStorage.setItem('password', password);
            dispatch(setSessionToken({ session_token }));
            let objHeader = {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              session_token: session_token,
              'App-Token': App_Token,
            };

            let result = await fetch(
              API_URL + '/getFullSession/?session_token=' + session_token,
              {
                headers: objHeader,
              },
            );
            let profileData = await result.json();
            let resultProfile = await fetch(
              API_URL + '/User/' +
              profileData.session.glpiID +
              '?session_token=' +
              session_token,
              {
                headers: objHeader,
              },
            );

            let resultProfileCvt = await resultProfile.json();
            if (!!profileData) {
              dispatch(
                setUserObject({
                  userGLPI: profileData.session,
                  userProfile: resultProfileCvt,
                }),
              );
              //console.log('123333343234:', setUserObject({userGLPI}))
            } else {
              console.log('dslkdfjs;lkdfjas;dfklj');
              Alert.alert('Error', 'Cannot communicate with the server', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
              ]);
            }
          } catch (error) {
            console.error(error);
            throw new Error(error);
          }
        } else {
          console.error(data);
          Alert.alert('Error', 'Wrong Username or Password!', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        }
      })
      .catch(error => {
        console.error('AHJGSDJKHGD', error);
        Alert.alert(
          'Error',
          'Network request failed. Cannot communicate with the server',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
        );
      })
      .then(() => {
        // this.setState({ loading: false });
        setLoading(false);
      });
  };

  return (
    <Container style={styles.container}>
      <Center>
        <Box alignItems="center" w="100%">
          <View style={styles.LogoandHeaders}>
            <Image
              style={{ width: 0.72 * windowWidth, height: 0.22 * windowHeight }}
              isRequired
              source={require('../../assets/img/TDT_logo.png')}
              alt="Logo"
            />
            <Text style={styles.Headers}>IT SUPPORT SERVICES</Text>
          </View>

          <FormControl isRequired>
            <Stack space={4} w="100%" alignItems="center">
              {/* USERNAME INPUT */}
              <Input
                fontFamily="body"
                fontWeight="600"
                fontSize={0.045 * windowWidth}
                isRequired
                value={username}
                onChangeText={username => setUsername(username)}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="person" />}
                    size={0.06 * windowWidth}
                    ml={windowWidth * 0.02}
                    color="muted.400"
                  />
                }
                placeholder="Name"
              />
              {/* PASSWORD INPUT */}
              <Input
                fontFamily="body"
                fontWeight="600"
                fontSize={0.045 * windowWidth}
                isRequired
                value={password}
                onChangeText={password => setPassword(password)}
                type={showPassword ? 'text' : 'password'}
                InputRightElement={
                  <Icon
                    as={
                      <Ionicons
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        onPress={() => toggleShowPassword()}
                      />
                    }
                    size={0.06 * windowWidth}
                    mr={windowWidth * 0.02}
                    color="muted.400"
                  // style={{marginRight: windowWidth*0.02}}
                  />
                }
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="lock" />}
                    size={0.06 * windowWidth}
                    ml={windowWidth * 0.02}
                    color="muted.400"
                  />
                }
                placeholder="Password"
              />
            </Stack>
            <Box space={4} mt="4">
              <Button
                onPress={() => authenticateUser()}
                isLoading={loading}
                spinnerPlacement="end"
                isLoadingText="Please wait"
                colorScheme="darkBlue"
                _text={{
                  fontFamily: 'body',
                  fontSize: 0.045 * windowWidth,
                  fontWeight: 500,
                }}>
                Login
              </Button>
            </Box>
          </FormControl>
        </Box>
        <Box flexBox="bottom" alignItems="center" style={styles.copyrightBox}>
          <Text style={styles.copyright} note>
            Copyright © {new Date().getFullYear()}, DCCS
          </Text>
          <Text style={styles.copyright} note>
            Ton Duc Thang University
          </Text>
        </Box>
      </Center>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: windowHeight * 0.05,
    alignItems: 'center',
    alignSelf: 'center',
  },
  copyrightBox: {
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    //backgroundColor: 'black'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  copyright: {
    //marginTop: 40,
    color: '#D3D3D3',
    fontFamily: 'WorkSans-Medium',
    fontSize: 0.035 * windowWidth,
  },
  Headers: {
    fontFamily: 'WorkSans-Bold',
    fontSize: 0.068 * windowWidth,
    padding: 0.02 * windowWidth,
    color: '#0352A5',
    textAlign: 'center',
    width: '100%',
  },
  LogoandHeaders: {
    alignItems: 'center',
    // backgroundColor: 'black',
    flexDirection: 'column',
    height: '55%',
    alignContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default LoginHook;
