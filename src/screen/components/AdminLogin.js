import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Snackbar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const Login = () => {
     const navigation = useNavigation();
     const [email, setEmail] = useState('');
     const [isValid, setIsValid] = useState(true);
     const [password, setPassword] = useState('');
     const [isValidEmail, setIsValidEmail] = useState(true);
     const [snackBarText, setSnackBarText] = useState('');
     const [visibleSnackBar, setVisibleSnackBar] = useState(false);
     const onShowSnackBar = () => setVisibleSnackBar(true);
     const onDismissSnackBar = () => setVisibleSnackBar(false);

     const loginFormValidate = () => {
          if (email === null || email === '') {
               setSnackBarText('Please Enter Email');
               setVisibleSnackBar(true);
          } else if (password === null || password === '') {
               setSnackBarText('Please Enter Password');
               setVisibleSnackBar(true);
          } else {
               setPassword('');
               setEmail('');
               navigation.navigate("AdminScreen")
          }
     }
     const validateEmail = (text) => {
          const emailPattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/;
          const isValid = emailPattern.test(text);
          setIsValidEmail(isValid);
          setEmail(text);
     };
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
               <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
                    <View style={{ backgroundColor: '#ffffff', }}>
                         <View
                              style={{
                                   backgroundColor: '#003990', padding: 50,
                                   borderBottomLeftRadius: 60
                              }}>
                              <View
                                   style={{
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                   }}>
                                   <Image
                                        style={{
                                             width: 100, height: 100,
                                             resizeMode: 'contain'
                                        }}
                                        source={require('../../asserts/appicon.png')} />
                              </View>
                         </View>
                    </View>
                    <View style={{ backgroundColor: '#003990', }}>
                         <View style={{
                              justifyContent: 'center',
                              backgroundColor: '#fff',
                              paddingHorizontal: 30,
                              borderTopRightRadius: 60
                         }}>
                              <View style={styles.spacing_big}></View>

                              <View style={styles.label}>
                                   <Text style={styles.label}>Email</Text>
                              </View>
                              <TextInput
                                   autoCorrect={false}
                                   placeholder='Enter Email'
                                   value={email}
                                   onChangeText={(value) => validateEmail(value)}
                                   style={styles.input}
                                   left={<TextInput.Icon icon="mail" size={25} color="#5d6fe2" style={{ marginTop: 20 }} />}
                              />
                              {!isValidEmail && (
                                   <Text style={{ color: 'red' }}>Please enter a valid email address.</Text>
                              )}
                              <View style={styles.spacing}></View>
                              <View style={styles.label}>
                                   <Text style={styles.label}>Password</Text>
                              </View>
                              <TextInput
                                   autoCorrect={false}
                                   maxLength={8}
                                   placeholder='Enter Password'
                                   value={password}
                                   onChangeText={(value) => validatePassword(value)}
                                   style={styles.input}
                                   left={<TextInput.Icon icon="account" size={25} color="#5d6fe2" style={{ marginTop: 15 }} />}
                              />
                              {!isValid && (
                                   <Text style={{ color: 'red' }}>
                                        Password must be at least 8 characters long and contain
                                        At Least 1 capital letter, At Least 1 small letter, At Least 1 number, At Least 1 special character.
                                   </Text>
                              )}
                              <View style={styles.spacing}></View>
                              <TouchableOpacity onPress={loginFormValidate}>
                                   <View
                                        style={{
                                             margin: 10,
                                             backgroundColor: '#003990',
                                             justifyContent: 'center',
                                             alignItems: 'center',
                                             borderRadius: 100,
                                             paddingVertical: 10,
                                             flexDirection: "row"
                                        }}>
                                        <TouchableOpacity onPress={loginFormValidate}>
                                             <Text
                                                  style={{
                                                       color: 'white',
                                                       fontSize: 20,
                                                  }}>Admin Login</Text>
                                        </TouchableOpacity>
                                   </View>
                              </TouchableOpacity>
                              <View style={{
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
                              </View>
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