import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native';
import { TextInput, Snackbar } from 'react-native-paper';

const LoginTesting = () => {
     const navigation = useNavigation();
     const [EmployeeName, setEmployeeName] = useState('');
     const [isValid, setIsValid] = useState(true);
     const [isloading, setIsLoading] = useState(false);
     const [password, setPassword] = useState('');
     const [snackBarText, setSnackBarText] = useState('');
     const [visibleSnackBar, setVisibleSnackBar] = useState(false);
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
               setPassword('');
               setEmployeeName('');
               navigation.navigate("Drawernab")
          }
     }
     const AdminLogin = () => {
          navigation.navigate("SignMobileScreen")
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
          <>
               <View style={styles.container}>
                    <View style={styles.container1}>
                    </View>
                    <View style={styles.triangleChild}>
                         <View
                              style={{
                                   justifyContent: 'center',
                                   alignItems: 'center', borderRadius: 40
                              }}>
                              <Image
                                   style={{
                                        width: 120, height: 120,
                                        resizeMode: 'contain', borderRadius: 10
                                   }}
                                   source={require('../../assert/appicon.png')} />
                         </View>
                         <View style={styles.label}>
                              <Text style={styles.label}>User Name</Text>
                         </View>
                         <TextInput
                              placeholder='Enter User Name'
                              value={EmployeeName}
                              activeOutlineColor='#e58142'
                              activeUnderlineColor='#e58142'
                              onChangeText={(value) => setEmployeeName(value)}
                              style={styles.input}
                              cursorColor='#e58142'
                              left={<TextInput.Icon icon="mail" size={25} color="#e58142" style={{ marginTop: 20 }} />}
                         />
                         <View style={styles.spacing}></View>
                         <View style={styles.label}>
                              <Text style={styles.label}>Password</Text>
                         </View>
                         <TextInput

                              placeholder='Enter Password'
                              value={password}
                              activeOutlineColor='#e58142'
                              activeUnderlineColor='#e58142'
                              onChangeText={(value) => validatePassword(value)}
                              style={styles.input}
                              cursorColor='#e58142'
                              left={<TextInput.Icon icon="security" size={25} color="#e58142" style={{ marginTop: 15 }} />}
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
                                        width: "100%",
                                        marginTop: 4
                                   }}>
                                   <TouchableOpacity>
                                        <Text
                                             style={{
                                                  color: '#e58142',
                                                  fontSize: 16,
                                                  fontWeight: "800",
                                                  textAlign: "right",
                                             }}>Forgot Password</Text>
                                   </TouchableOpacity>
                              </View>
                         </View>
                         <View style={{ flexDirection: "row", marginTop: 20 }}>
                              <View
                                   style={{
                                        margin: 10,
                                        backgroundColor: '#e58142',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 20,
                                        width: "45%"
                                   }}>
                                   <TouchableOpacity onPress={loginFormValidate}>
                                        <Text
                                             style={{
                                                  color: 'white',
                                                  fontSize: 20,
                                                  fontWeight: "800"
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
                                                  color: '#f2612b',
                                                  fontSize: 20,
                                                  fontWeight: "700"
                                             }}>Sign Up</Text>
                                   </TouchableOpacity>
                              </View>
                         </View>
                    </View>
               </View>

          </>
     )
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: "white"
     },
     container1: {
          flex: 1,
          backgroundColor: "#e58142",
          borderTopWidth: 0,
          borderBottomWidth: 770,
          borderLeftWidth: 390,
          borderRightColor: 'white',
          borderBottomColor: 'white',
          borderLeftColor: 'transparent',
     },
     triangleChild: {
          height: '55%',
          width: '80%',
          backgroundColor: 'white',
          position: 'absolute',
          top: 160,
          left: 40,
          borderRadius: 10,
          // shadowColor: '#ffffff',
          // shadowOffset: { width: 0, height: 2 },
          // shadowOpacity: 0.5,
          // shadowRadius:1,
          elevation: 20, // Elevation is used for Android shadow
     },
     label: {
          fontWeight: '400',
          paddingLeft: 5,
          fontSize: 17,
          color: 'gray',
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
          borderRadius: 20,
          backgroundColor: 'white',
          padding: 6,
          color: "white",
          marginHorizontal: 10
     },
})
export default LoginTesting