import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput, Snackbar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import axios from "axios"
const Login = () => {
  const navigation = useNavigation();
  const [EmployeeCode, setEmployeeCode] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [password, setPassword] = useState('');
  const [snackBarText, setSnackBarText] = useState('');
  const [visibleSnackBar, setVisibleSnackBar] = useState(false);
  const onShowSnackBar = () => setVisibleSnackBar(true);
  const onDismissSnackBar = () => setVisibleSnackBar(false);

  const loginFormValidate = () => {
    if (EmployeeCode === null || EmployeeCode === '') {
      setSnackBarText('Please Enter Employee Code');
      setVisibleSnackBar(true);
    } else if (password === null || password === '') {
      setSnackBarText('Please Enter Password');
      setVisibleSnackBar(true);
    } else {
      setPassword('');
      setEmployeeCode('');
      navigation.navigate("DrawerNav")
    }
  }
  const AdminLogin = () => {
    navigation.navigate("SignUP")
  }
  const validatePassword = (value) => {
    const hasLowerCase = /[a-z]/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialCharacter = /[!@#$%^&*()\-_=+\[\]{};:'",.<>?/\\|]/.test(value);
    const isLengthValid = value.length >= 8;
    if (hasLowerCase && hasUpperCase && hasNumber && hasSpecialCharacter && isLengthValid) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    setPassword(value);
  };
  useEffect(() => {
    getEmailFromStorage();
  }, []);
  const getEmailFromStorage = async () => {
    try {
      const email = await AsyncStorage.getItem('EmployeeCode');
      if (email == null || email == undefined) {
      }
      else {
        navigation.navigate("DrawerNav")
      }
    } catch (error) {
    }
  };
  const getData = async () => {
    try {
      const data = "EmployeeCode=" + EmployeeCode + "&Password=" + password;
      const response = await axios.get(string.url + '/GetUserType' + data);
      const textResponse = response.data;
      console.log(textResponse, "text data")
      const apiStatus = textResponse;
      if (apiStatus.API_STATUS === "OK") {
      } else {
        setIsLoading(false);
        return;
      }
    }
    catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  return (
    <SafeAreaProvider>
      <ScrollView style={{ backgroundColor: '#ffffff', flex: 1 }}>
        <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
          <View style={{ backgroundColor: '#ffffff', }}>
            <View
              style={{
                backgroundColor: '#f2612b', padding: 50,
                borderBottomLeftRadius: 110,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: 100, height: 100,
                    resizeMode: 'contain', borderRadius: 10
                  }}
                  source={require('../../asserts/appicon.png')} />
              </View>
            </View>
          </View>
          <View style={{ backgroundColor: '#f2612b', }}>
            <View style={{
              justifyContent: 'center',
              backgroundColor: '#fff',
              paddingHorizontal: 60,
              borderTopRightRadius: 180,
            }}>
              <View style={styles.spacing_big}></View>
              <View style={styles.label}>
                <Text style={styles.label}>Employee Code</Text>
              </View>
              <TextInput
                autoCorrect={false}
                placeholder='Enter Email'
                value={EmployeeCode}
                activeOutlineColor='#f2612b'
                activeUnderlineColor='#f2612b'
                onChangeText={(value) => setEmployeeCode(value)}
                style={styles.input}
                cursorColor='#f2612b'
                left={<TextInput.Icon icon="mail" size={25} color="#f2612b" style={{ marginTop: 20 }} />}
              />
              <View style={styles.spacing}></View>
              <View style={styles.label}>
                <Text style={styles.label}>Password</Text>
              </View>
              <TextInput
                autoCorrect={false}
                maxLength={8}
                placeholder='Enter Password'
                value={password}
                activeOutlineColor='#f2612b'
                activeUnderlineColor='#f2612b'
                onChangeText={(value) => validatePassword(value)}
                style={styles.input}
                cursorColor='#f2612b'
                left={<TextInput.Icon icon="account" size={25} color="#f2612b" style={{ marginTop: 15 }} />}
              />
              {!isValid && (
                <Text style={{ color: 'red' }}>
                  Password must be at least 8 characters long and contain
                  At Least 1 capital letter, At Least 1 small letter, At Least 1 number, At Least 1 special character.
                </Text>
              )}
              <View style={styles.spacing}></View>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    margin: 10,
                    backgroundColor: '#f2612b',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                    width: "40%"
                  }}>
                  <TouchableOpacity onPress={loginFormValidate}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: "700"
                      }}>Sign In</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    margin: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 10,
                    borderRadius: 20,
                    width: "48%"
                  }}>
                  <TouchableOpacity onPress={AdminLogin}>
                    <Text
                      style={{
                        color: 'blue',
                        fontSize: 20,
                        fontWeight: "700"
                      }}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* <View style={{
                flexDirection: 'row',
                justifyContent: 'center', marginTop: 40
              }}>
                <View style={styles.imagecontainer}>
                  <TouchableOpacity>
                    <Image style={{ width: 40, height: 35, resizeMode: 'contain', }}
                      source={require('../../asserts/google.png')} />
                  </TouchableOpacity>
                </View>
                <View style={styles.imagecontainer}>
                  <TouchableOpacity>
                    <Image style={{ width: 40, height: 35, resizeMode: 'contain' }}
                      source={require('../../asserts/facebook.png')} />
                  </TouchableOpacity>
                </View>
                <View style={styles.imagecontainer}>
                  <TouchableOpacity>
                    <Image style={{ width: 40, height: 35, resizeMode: 'contain' }}
                      source={require('../../asserts/twitter.png')} />
                  </TouchableOpacity>
                </View>
              </View> */}
            </View>
          </View>
          <Snackbar
            visible={visibleSnackBar}
            onDismiss={onDismissSnackBar}
            style={styles.snackBar}
            action={{
              label: 'Dismiss',
              onPress: () => {
                onDismissSnackBar();
              },
            }}>
            {snackBarText}
          </Snackbar>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};
export default Login;
const styles = StyleSheet.create({
  spacing: {
    margin: 10
  },
  spacing_big: {
    margin: 30
  },
  label: {
    fontWeight: '300',
    paddingLeft: 5,
    fontSize: 17,
    color: 'black',
  },
  snackBar: {
    backgroundColor: '#003990',
  },
  input: {
    height: 35,
    margin: 5,
    borderRadius: 0,
    backgroundColor: '#e7e7e7',
    padding: 6,
    color: "white"
  },
  imagecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  image_logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    borderRadius: 7,
    elevation: 5,
    marginTop: 100,
  },

});