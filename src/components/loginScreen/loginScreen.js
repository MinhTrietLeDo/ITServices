import React from 'react';
import {
  Alert,
  StyleSheet, Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Base64 } from '../../config/base64';
import { API_URL, App_Token } from '../../config/config';
import { setUserObject, setSessionToken } from '../../redux/actions';
import {
  Input, Icon, Stack, Pressable, Center,
  Box, Button, Container, FormControl, View,
  Text, Divider, Image, Heading,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'glpi',
      password: 'glpi',
      // username: 'admin_dccs',
      // password: '@ntiLockbit4TDTU',
      loading: false,
      showPassword: false
    };

  }

  async UNSAFE_componentWillMount() {
    try {
      const username = await AsyncStorage.getItem('username');
      const password = await AsyncStorage.getItem('password');
      if (!!username && !!password) {
        await this.setState({ username, password });
      }
    } catch (error) {
      console.error(error);
    } finally {
      //this.setState
      console.log('bruh');
    }
  }

  genBase64 = () => {
    return Base64.encode(this.state.username + ':' + this.state.password);
  };

  GetFullProfile = async token => {
    let result = await fetch(API_URL + '/getFullSession', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Session-Token': token,
      },
    });
    let resultCvt = await result.json();

    console.log(resultCvt);

    return resultCvt;
  };

  authenticateUser = () => {
    console.log(
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      this.state.username,
      this.state.password,
    );
    this.setState({ loading: true });
    let credentials = this.genBase64();
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
          console.log('KLJHSDKLJHLKJSHDLKJHSDLKHJSDIOLUWYEPOI');
          try {
            let { session_token } = data;
            await AsyncStorage.setItem('username', this.state.username);
            await AsyncStorage.setItem('password', this.state.password);
            this.props.setToken(session_token);
            //await AsyncStorage.setItem('token', session_token)
            console.log('KJHKLJH');
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
              API_URL +
              '/User/' +
              profileData.session.glpiID +
              '?session_token=' +
              session_token,
              {
                headers: objHeader,
              },
            );

            let resultProfileCvt = await resultProfile.json();
            console.log(
              '===============RESULT PROFILE: ',
              resultProfileCvt,
              '===============',
            );

            if (!!profileData) {
              this.props.setUser({
                userGLPI: profileData.session,
                userProfile: resultProfileCvt,
              });
              console.log('ABCDEFG', profileData);
              //MyStack()
              //this.props.navigation.navigate('MyStack', {screen: 'Home'})
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
        this.setState({ loading: false });
      });
  };

  render() {
    return (

      <Container style={styles.container}>
        <Center>
          <Box alignItems="center" w='100%'>
            <View style={styles.LogoandHeaders}>
              <Image
                style={{ width: 0.9 * windowWidth, height: 0.22 * windowHeight }}
                isRequired
                source={require('../../assets/img/TDT_logo.png')} alt="Logo"
              />
              <Text style={styles.Headers}>IT SUPPORT SERVICES</Text>
            </View>

            <FormControl isRequired  >
              <Stack space={4} w="100%" alignItems="center">
                {/* USERNAME INPUT */}
                <Input
                  fontFamily="body" fontWeight="600" fontSize={0.045 * windowWidth}
                  isRequired
                  value={this.state.username}
                  onChangeText={username => this.setState({ username })}
                  InputLeftElement={
                    <Icon as={
                      <MaterialIcons
                        name="person"
                      />}
                      size={0.06 * windowWidth} ml="2" color="muted.400"
                    />}
                  placeholder="Name"
                />
                {/* PASSWORD INPUT */}
                <Input
                  fontFamily="body" fontWeight="600" fontSize={0.045 * windowWidth}
                  isRequired
                  value={this.state.password}
                  onChangeText={password => this.setState({ password })}
                  type={this.state.showPassword ? "text" : "password"}
                  InputRightElement={
                    <Pressable onPress={showPassword => this.setState({ showPassword })}>
                      <Icon as={
                        <MaterialIcons
                          name={this.state.showPassword ? "visibility" : "visibility-off"}
                        />} size={0.06 * windowWidth} mr="2" color="muted.400" />
                    </Pressable>
                  }
                  InputLeftElement={
                    <Icon as={
                      <MaterialIcons
                        name="lock"
                      />}
                      size={0.06 * windowWidth} ml="2" color="muted.400"
                    />}
                  placeholder="Password"
                />

              </Stack>
              <Box space={4} mt="4" >
                <Button
                  onPress={this.authenticateUser}
                  isLoading={this.state.loading}
                  spinnerPlacement="end"
                  isLoadingText="Please wait"
                  colorScheme='darkBlue'
                  _text={{
                    fontFamily: 'body',
                    fontSize: 0.045 * windowWidth,
                    fontWeight: 500
                  }}
                >
                  Login
                </Button>
              </Box>
            </FormControl>
          </Box>
          <Box flexBox='bottom' alignItems='center' style={styles.copyrightBox} >
            <Text style={styles.copyright} note>Copyright © {new Date().getFullYear()}, DCCS</Text>
            <Text style={styles.copyright} note>Ton Duc Thang University</Text>
          </Box>
        </Center>
      </Container >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: windowHeight*0.05,
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
    fontSize: 0.035 * windowWidth
  },
  Headers: {
    fontFamily: 'WorkSans-Bold',
    fontSize: 0.068 * windowWidth,
    padding: 0.02 * windowWidth,
    color: '#0352A5',
    textAlign: 'center',
    width: '100%'
  },
  LogoandHeaders: {
    alignItems: "center",
    // backgroundColor: 'black',
    flexDirection: 'column',
    height: '55%',
    alignContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }
});

/** listen state */
const mapStateToProps = state => ({
  userConfig: state.user,
});

/** dispatch actions */
const mapDispatchToProps = dispatch => ({
  setToken: token => dispatch(setSessionToken(token)),
  setUser: user => dispatch(setUserObject(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
