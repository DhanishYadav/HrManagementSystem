import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { TextInput, Snackbar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geocoding from 'react-native-geocoding';
import Colors from "../constant/Colors";
Geocoding.init("AIzaSyC6qrW-acYuQXcV1m-CFG11Dzi67dScktg");
const CheckOut = () => {
     const navigation = useNavigation();
     const [userLocation, setUserLocation] = useState(null);
     const [name, setName] = useState('');
     const [userId, setUserId] = useState('');
     const [snackBarText, setSnackBarText] = useState('');
     const [visibleSnackBar, setVisibleSnackBar] = useState(false);
     const [checkInPlaceName, setCheckInPlaceName] = useState('');
     const [isloading, setIsLoading] = useState(false);
     const onShowSnackBar = () => setVisibleSnackBar(true);
     const onDismissSnackBar = () => setVisibleSnackBar(false);
     const fetchLocation = async () => {
          try {
               const position = await new Promise((resolve, reject) => {
                    Geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 50000, maximumAge: 1000 });
               });
               const { latitude, longitude } = position.coords;
               setUserLocation({ latitude, longitude });
               setIsLoading(false)
               await AsyncStorage.setItem('CheckOutlatitude', String(latitude));
               await AsyncStorage.setItem('CheckOutlongitude', String(longitude));
          } catch (error) {
               console.error('Error fetching location:', error);
          }
     };
     const calculateDistance = async () => {
          if (userLocation) {
               try {
                    const checkInPlace = await Geocoding.from(userLocation.latitude, userLocation.longitude);
                    const checkInPlaceAddress = checkInPlace.results[0]?.formatted_address || 'Address not available';
                    setCheckInPlaceName(checkInPlaceAddress);
                    setIsLoading(false)

               } catch (error) {
                    console.error('Error fetching place names:', error);
               }
          }
     };
     const loginFormValidate = async () => {
          if (name === null || name === '') {
               setSnackBarText('Please Enter Employee Name');
               setVisibleSnackBar(true);

          } else if (userId === null || userId === '') {
               setSnackBarText('Please Enter Employee');
               setVisibleSnackBar(true);

          }
          else if (checkInPlaceName === null || checkInPlaceName === '') {
               setSnackBarText('Please Wait for getting check out Place Name');
               setVisibleSnackBar(true);
          }
          else {
               calculateDistance()
               setName('');
               setUserId('');
               navigation.navigate('Dashboard');
          }
     };
     useEffect(() => {
          const fetchData = async () => {
               await fetchLocation();
               await calculateDistance();
          };
          fetchData();
          setIsLoading(true)
     }, []);
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
                                   <View style={styles.label}>
                                        <Text style={styles.label}>Employee Name</Text>
                                   </View>
                                   <TextInput
                                        autoCorrect={false}
                                        placeholder='Enter User Name'
                                        value={name}
                                        activeOutlineColor='#f2612b'
                                        activeUnderlineColor='#f2612b'
                                        style={styles.input}
                                        onChangeText={(value) => setName(value)}
                                        cursorColor='#f2612b'
                                        left={<TextInput.Icon icon="account" size={25} color="#f2612b" style={{ marginTop: 20 }} />}
                                   />

                                   <View style={styles.spacing}></View>
                                   <View style={styles.label}>
                                        <Text style={styles.label}>Employee Id</Text>
                                   </View>
                                   <TextInput
                                        autoCorrect={false}
                                        maxLength={8}
                                        placeholder='Enter User Id'
                                        value={userId}
                                        activeOutlineColor='#f2612b'
                                        activeUnderlineColor='#f2612b'
                                        onChangeText={(value) => setUserId(value)}
                                        style={styles.input}
                                        cursorColor='#f2612b'
                                        left={<TextInput.Icon icon="mail" size={25} color="#f2612b" style={{ marginTop: 15 }} />}
                                   />
                                   <View style={styles.spacing}></View>
                                   <View
                                        style={{
                                             backgroundColor: '#f2612b',
                                             justifyContent: 'center',
                                             alignItems: 'center',
                                             borderRadius: 20,
                                             width: "100%",
                                             height: 50
                                        }}>
                                        <TouchableOpacity onPress={loginFormValidate}>
                                             <Text
                                                  style={{
                                                       color: 'white',
                                                       fontSize: 20,
                                                       fontWeight: "700"
                                                  }}>Check Out</Text>
                                        </TouchableOpacity>
                                   </View>

                              </View>
                         </View>
                    </View>
               </ScrollView>
               {checkInPlaceName && (
                    <View style={{
                         height: 100, backgroundColor: "white",
                         elevation: 20, alignSelf: "center", width: "100%", alignItems: "center", alignContent: "center"
                    }}>
                         <Text style={styles.textStyle}>Check Out Place: {checkInPlaceName}</Text>
                    </View>
               )}
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
     textStyle: {
          fontSize: 20,
          fontWeight: '500',
     },
});

export default CheckOut;
