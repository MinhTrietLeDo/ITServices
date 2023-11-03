import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView, View, StyleSheet, ActivityIndicator} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {windowHeight, windowWidth} from '../../../assets/res/courseStyle';
import {App_Token, API_URL} from '../../../config/config';
import {setTechnician} from '../../../redux/actions';

const SelectUserListDropDown = ({data}) => {
  const [technicianList, setTechnicianList] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector(state => state.user.token.session_token);
  const dispatch = useDispatch();

  useEffect(() => {
    getTechList().catch(console.error);
  }, []);

  const getTechList = async () => {
    const URL =
      '/search/User/?sort=34&expand_dropdowns=true&criteria[0][itemtype]=User&criteria[0][field]=20&criteria[0][searchtype]=contains&criteria[0][value]=Super-Admin&forcedisplay[0]=9&forcedisplay[1]=34';
    let objHeader = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'App-Token': App_Token,
    };
    let request = await Promise.all([
      await fetch(API_URL + URL + '&session_token=' + token, {
        headers: objHeader,
      }).then(el => el.json()),
    ]);
    if (typeof request[0].data !== 'undefined') {
      const arr = request[0].data;
      const techname = arr.map(arr => {
        let fullName = arr['34'] + ' ' + arr['9'];
        return fullName;
      });
      console.log(arr);
      setTechnicianList(techname);
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

  const addTechnician = async () => {
    const updateURL = '';
    let objHeader = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'App-Token': App_Token,
    };
  };

  if (loading) {
    return (
      <View style={[styles.container]}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <SafeAreaView>
        <SelectDropdown
          data={technicianList}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            // dispatch(setTechnician(selectedItem))
          }}
          defaultButtonText="Select"
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
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
          dropdownIconPosition={'right'}
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
        />
      </SafeAreaView>
    );
  }
};

export default SelectUserListDropDown;

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: {
    color: '#444',
    textAlign: 'left',
  },
  dropdown1BtnStyle: {
    marginTop: (windowHeight + windowWidth) * 0.01,
    backgroundColor: '#FFF',
    borderRadius: (windowHeight + windowWidth) * 0.005,
    borderWidth: windowWidth * 0.003,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
});
