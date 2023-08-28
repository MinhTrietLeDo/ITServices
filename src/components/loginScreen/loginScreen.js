import React from 'react';
import {
  View,
  Button,
  TextInput,
  ActivityIndicator,
  Alert,
  StyleSheet,
  BackHandler,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Base64 } from '../../config/base64';
import { API_URL, App_Token } from '../../config/config';
import { setUserObject, setSessionToken } from '../../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // username: 'glpi',
      // password: 'glpi',
      username: 'admin_dccs',
      password: '@ntiLockbit4TDTU',
      loading: false,
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

  // handleBackPress() {
  //   Alert.alert(
  //     'Exit App',
  //     'Exit Application',
  //     [
  //       {
  //         text: 'Cancel',
  //         onPress: () => console.log('Cancel Pressed'),
  //         style: 'cancel',
  //       },
  //       {text: 'OK', onPress: () => BackHandler.exitApp()},
  //       //{text: 'OK', onPress: () => console.log('BackHandler.exitApp')},
  //     ],
  //     {
  //       cancelable: false,
  //     },
  //   );
  //   return true;
  // }

  // componentDidMount() {
  //   BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  // }

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
    if (this.state.loading === true) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <SafeAreaView>
          <View>
            <TextInput
              placeholder="Enter username"
              value={this.state.username}
              onChangeText={username => this.setState({ username })}
            />
            <TextInput
              placeholder="Enter password"
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
            <Button title="Sign In" onPress={this.authenticateUser} />
          </View>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
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
