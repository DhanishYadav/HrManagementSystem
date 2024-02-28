import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { TextInput, Snackbar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import axios from "axios"
import string from '../constant/string';
import Colors from '../constant/Colors';
import DropDownPicker from 'react-native-dropdown-picker';
const Login = () => {
  const navigation = useNavigation();
  const [EmployeeNameLogin, setName] = useState('');
  const [EmployeeCodeLogin, setCode] = useState('');
  const [EmployeeName, setEmployeeName] = useState('');
  const [CodeEmp, setCodeEmp] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [EmployeePassword, setEmployeePassword] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isloading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [snackBarText, setSnackBarText] = useState('');
  const [visibleSnackBar, setVisibleSnackBar] = useState(false);
  // const onShowSnackBar = () => setVisibleSnackBar(true);
  const [openEnvironment, setOpenEnvironment] = useState(false);
  const [environmentDropDownValue, setEnvironmentValue] = useState(null);
  const onDismissSnackBar = () => setVisibleSnackBar(false);
  const loginFormValidate = async () => {
    if (EmployeeName === null || EmployeeName === '') {
      setSnackBarText('Please Enter Employee Name');
      setVisibleSnackBar(true);
    } else if (password === null || password === '') {
      setSnackBarText('Please Enter Password');
      setVisibleSnackBar(true);
    }
    else {
      await AsyncStorage.setItem('environmentValue', (environmentDropDownValue));
      getEmailFromStorage();
      getData()
      setPassword('');
      setEmployeeName('');
      setEnvironmentValue("");
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
  console.log(CodeEmp, confirmPassword, EmployeePassword)
  useEffect(() => {
    getEmailFromStorage()
  }, []);
  const getEmailFromStorage = async () => {
    try {
      setCodeEmp(await AsyncStorage.getItem('EmployeeCode'));
      const code = (await AsyncStorage.getItem('EmployeeCode'));
      setConfirmPassword(await AsyncStorage.getItem('confirmPassword'));
      setEmployeePassword(await AsyncStorage.getItem('EmployeePassword'));
      if (code == null || code == undefined) {
      }
      else {
        navigation.navigate("DrawerNav")
      }
    } catch (error) {
      console.log(error)
    }
  };
  const [environements, setEnvironment] = useState([
    { label: 'HR ', value: '1' },
    { label: 'MIS', value: '4' },
    { label: 'IT', value: '3' },
    { label: 'Sale', value: '2' },
  ]);
  const getData = async () => {
    setIsLoading(true)
    try {
      const url = `https://hrms.kwicpay.com/api/WebAPI/Login?UserName=${encodeURIComponent(EmployeeName)}&Password=${encodeURIComponent(password)}`;
      console.log(url, "url")
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const textResponse = await response.json();
      console.log(textResponse, 'text data');
      const apiStatus = textResponse;
      if (apiStatus.API_STATUS === 'OK') {
        console.log(apiStatus.Data[0].Emp_Code, apiStatus.Data[0].UserName, "data")
        await AsyncStorage.setItem('EmployeeCode', (apiStatus.Data[0].Emp_Code));
        await AsyncStorage.setItem('EmployeeName', (apiStatus.Data[0].UserName));
        setCode()
        setName()
        Alert.alert('Successfully Signed', apiStatus.MSG);
        navigation.navigate('DrawerNav');
        setIsLoading(false)
      } else {
        Alert.alert('Invalid Credential ', apiStatus.DATA);
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false);
      console.log('Error:', error); r
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
  };
  //console.log(environmentDropDownValue, "environmentDropDownValue")
  if (isloading) {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <ActivityIndicator size="40" color={Colors.accent} />
          <Text style={{ color: '#000', marginTop: 30, fontSize: 16, fontWeight: "bold" }}>Please wait while we process your request...</Text>
        </View>
      </View>);
  }
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
              <DropDownPicker
                open={openEnvironment}
                value={environmentDropDownValue}
                items={environements}
                setOpen={setOpenEnvironment}
                setValue={setEnvironmentValue}
                setItems={setEnvironment}
                style={styles.dropdown}
                placeholder='Please Select Department'
              />
              <View style={styles.label}>
                <Text style={styles.label}>User Name</Text>
              </View>
              <TextInput
                autoCorrect={false}
                placeholder='Enter User Name'
                value={EmployeeName}
                activeOutlineColor='#f2612b'
                activeUnderlineColor='#f2612b'
                onChangeText={(value) => setEmployeeName(value)}
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
                placeholder='Enter Password'
                value={password}
                activeOutlineColor='#f2612b'
                activeUnderlineColor='#f2612b'
                onChangeText={(value) => validatePassword(value)}
                style={styles.input}
                cursorColor='#f2612b'
                left={<TextInput.Icon icon="security" size={25} color="#f2612b" style={{ marginTop: 15 }} />}
              />
              {!isValid && (
                <Text style={{ color: 'red' }}>
                  Password must be at least 8 characters long and contain
                  At Least 1 capital letter, At Least 1 small letter, At Least 1 number, At Least 1 special character.
                </Text>
              )}
              <View style={styles.spacing}></View>
              <View style={{ flexDirection: "row", marginRight: 10 }}>
                <View
                  style={{
                    paddingVertical: 5,
                    borderRadius: 20,
                    width: "100%"
                  }}>
                  <TouchableOpacity onPress={() => navigation.navigate("ForgetScreen")}>
                    <Text
                      style={{
                        color: '#f2612b',
                        fontSize: 16,
                        fontWeight: "500",
                        textAlign: "right",
                      }}>Forgot Password</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
                        color: '#9BC9F9',
                        fontSize: 20,
                        fontWeight: "700"
                      }}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
  dropdown: {
    height: 50,
    borderColor: '#f2612b',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 4,
    padding: 8,
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