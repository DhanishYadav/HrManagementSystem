import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput, Snackbar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const ForgetPassword = () => {
     const navigation = useNavigation();
     const [confirmPassword, setConfirmPassword] = useState('');
     const [isValid, setIsValid] = useState(true);
     const [password, setPassword] = useState('');
     const [snackBarText, setSnackBarText] = useState('');
     const [visibleSnackBar, setVisibleSnackBar] = useState(false);
     const onShowSnackBar = () => setVisibleSnackBar(true);
     const onDismissSnackBar = () => setVisibleSnackBar(false);

     const loginFormValidate = async () => {
          if (password === null || password === '') {
               setSnackBarText('Please Enter Password');
               setVisibleSnackBar(true);
          } else if (confirmPassword === null || confirmPassword === "") {
               setSnackBarText('Please Enter Confirm Password');
               setVisibleSnackBar(true);
          }
          else if (password !== confirmPassword) {
               setSnackBarText('Passwords do not match');
               setVisibleSnackBar(true);
          }
          else {
               await AsyncStorage.setItem('confirmPassword', (confirmPassword));
               setPassword('');
               setConfirmPassword('');
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
                                   <View style={styles.label}>
                                        <Text style={styles.label}>New Password</Text>
                                   </View>
                                   <TextInput
                                        autoCorrect={false}
                                        placeholder='Enter New Password '
                                        value={password}
                                        activeOutlineColor='#f2612b'
                                        activeUnderlineColor='#f2612b'
                                        onChangeText={(value) => validatePassword(value)}
                                        style={styles.input}
                                        cursorColor='#f2612b'
                                        left={<TextInput.Icon icon="security" size={25} color="#f2612b" style={{ marginTop: 20 }} />}

                                   />
                                   <View style={styles.spacing}></View>
                                   <View style={styles.label}>
                                        <Text style={styles.label}>Confirm Password</Text>
                                   </View>
                                   <TextInput
                                        autoCorrect={false}
                                        placeholder='Enter Confirm Password'
                                        value={confirmPassword}
                                        activeOutlineColor='#f2612b'
                                        activeUnderlineColor='#f2612b'
                                        onChangeText={(value) => setConfirmPassword(value)}
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
                                                       }}>Create Password</Text>
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
export default ForgetPassword;
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