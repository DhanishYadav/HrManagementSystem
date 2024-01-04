import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput, Snackbar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
const SignUpage = () => {
     const navigation = useNavigation();
     const [EmployeeName, setName] = useState('');
     const [EmployeeCode, setCode] = useState('');
     const [EmployeeNumber, setNumber] = useState('');
     const [EmployeePassword, setPassword] = useState('');
     const [isValid, setIsValid] = useState(true);
     const [isValidEmail, setIsValidEmail] = useState(true);
     const [snackBarText, setSnackBarText] = useState('');
     const [visibleSnackBar, setVisibleSnackBar] = useState(false);
     const onShowSnackBar = () => setVisibleSnackBar(true);
     const onDismissSnackBar = () => setVisibleSnackBar(false);
     const [open, setOpen] = useState(false);
     const [dropDownValue, setValue] = useState('');

     const [items, setItems] = useState([
          { label: 'Debit', value: '/v4/debit' },
          { label: 'B2B PG', value: '/pg/v1/pay' }
     ]);

     const [openEnvironment, setOpenEnvironment] = useState(false);
     const [environmentDropDownValue, setEnvironmentValue] = useState('Please Select Department');

     const [environements, setEnvironment] = useState([
          { label: 'UAT', value: 'UAT' },
          { label: 'UAT_SIM', value: 'UAT_SIM' },
          { label: 'PRODUCTION', value: 'PRODUCTION' }
     ]);

     const loginFormValidate = async () => {
          if (EmployeeName === null || EmployeeName === '') {
               setSnackBarText('Please Enter Employee Name');
               setVisibleSnackBar(true);
          } else if (EmployeePassword === null || EmployeePassword === '') {
               setSnackBarText('Please Enter Password');
               setVisibleSnackBar(true);
          }
          else if (EmployeeCode === null || EmployeeCode === '') {
               setSnackBarText('Please Enter Employee Code');
               setVisibleSnackBar(true);
          }
          else if (EmployeeNumber === null || EmployeeNumber === '') {
               setSnackBarText('Please Enter Employee Number');
               setVisibleSnackBar(true);
          }
          else {
               await AsyncStorage.setItem('EmployeeCode', (EmployeeCode));
               setSnackBarText('Employee Sign Up Successfully');
               setVisibleSnackBar(true);
               setPassword('');
               setCode('');
               setName('');
               setNumber('');
               navigation.navigate("Login")
          }
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
                                   <TextInput
                                        style={styles.input}
                                        autoCorrect={false}
                                        placeholder='Enter Employee Name'
                                        value={EmployeeName}
                                        underlineColorAndroid="transparent"
                                        label={"Enter Employee Name"}
                                        mode='outlined'
                                        outlineColor='#f2612b'
                                        underlineColor='#f2612b'
                                        activeOutlineColor='#f2612b'
                                        activeUnderlineColor='#f2612b'
                                        onChangeText={(value) => setName(value)}
                                        cursorColor='#f2612b'
                                        left={<TextInput.Icon icon="mail" size={25} color="#f2612b" />}
                                   />
                                   {!isValidEmail && (
                                        <Text style={{ color: 'red' }}>Please enter a valid email address.</Text>
                                   )}
                                   <TextInput
                                        style={styles.input}
                                        autoCorrect={false}
                                        maxLength={8}
                                        placeholder='Enter Employee Code'
                                        underlineColorAndroid="transparent"
                                        cursorColor="#5DADE2"
                                        label={"Enter Employee Code"}
                                        mode='outlined'
                                        outlineColor='#f2612b'
                                        underlineColor='#f2612b'
                                        value={EmployeeCode}
                                        activeOutlineColor='#5DADE2'
                                        onChangeText={(value) => setCode(value)}
                                        activeUnderlineColor='#5DADE2'
                                        left={<TextInput.Icon icon="account" size={25} color="#f2612b" />}
                                   />
                                   <TextInput
                                        style={styles.input}
                                        autoCorrect={false}
                                        maxLength={10}
                                        placeholder='Enter Employee Contact No'
                                        underlineColorAndroid="transparent"
                                        cursorColor="#5DADE2"
                                        label={"Enter Contact No"}
                                        mode='outlined'
                                        outlineColor='#f2612b'
                                        underlineColor='#f2612b'
                                        keyboardType='numeric'
                                        value={EmployeeNumber}
                                        activeOutlineColor='#5DADE2'
                                        onChangeText={(value) => setNumber(value)}
                                        activeUnderlineColor='#5DADE2'
                                        left={<TextInput.Icon icon="account" size={25} color="#f2612b" />}
                                   />
                                   <TextInput
                                        style={styles.input}
                                        autoCorrect={false}
                                        maxLength={8}
                                        placeholder='Enter Password'
                                        underlineColorAndroid="transparent"
                                        cursorColor="#5DADE2"
                                        label={"Enter Password"}
                                        mode='outlined'
                                        outlineColor='#f2612b'
                                        underlineColor='#f2612b'
                                        value={EmployeePassword}
                                        activeOutlineColor='#5DADE2'
                                        onChangeText={(value) => validatePassword(value)}
                                        activeUnderlineColor='#5DADE2'
                                        left={<TextInput.Icon icon="account" size={25} color="#f2612b" />}
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
                                                  backgroundColor: '#f2612b',
                                                  justifyContent: 'center',
                                                  alignItems: 'center',
                                                  borderRadius: 20,
                                                  width: "100%",
                                                  height: 40
                                             }}>
                                             <TouchableOpacity onPress={loginFormValidate}>
                                                  <Text
                                                       style={{
                                                            color: 'white',
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
export default SignUpage;
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
          marginTop: 8,
          borderRadius: 0,
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
     dropdown: {
          height: 50,
          borderColor: '#f2612b',
          borderWidth: 1,
          borderRadius: 8,
          marginVertical: 4,
          padding: 8,
     },

});