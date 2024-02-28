import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, ActivityIndicator, Alert, PermissionsAndroid } from 'react-native';
import { TextInput, Snackbar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geocoding from 'react-native-geocoding';
import Colors from "../constant/Colors";
import Geocoder from 'react-native-geocoding';
import MapView, { Marker } from 'react-native-maps';
import BackgroundService from 'react-native-background-actions';
Geocoding.init("AIzaSyC6qrW-acYuQXcV1m-CFG11Dzi67dScktg");
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
const CheckIn = () => {
     const navigation = useNavigation();
     const [userLocation, setUserLocation] = useState(null);
     const [userLocationTrack, setUserLocationTrack] = useState(null);
     const [latitude, setLatitude] = useState(null);
     const [longitude, setLongitude] = useState(null);
     const [name, setName] = useState('');
     const [nameCompare, setNameCompare] = useState('');
     const [userId, setUserId] = useState('');
     const [userIdCompare, setUserIdCompare] = useState('');
     const [show, setShow] = useState(false);
     const [snackBarText, setSnackBarText] = useState('');
     const [visibleSnackBar, setVisibleSnackBar] = useState(false);
     const [checkInPlaceName, setCheckInPlaceName] = useState('');
     const [currentTime, setCurrentTime] = useState(new Date());
     const [currentTimeAPI, setCurrentTimeAPI] = useState(new Date());
     const [isloading, setIsLoading] = useState(false);
     const [isRefreshing, setRefreshing] = useState(false);
     const [distance, setDistance] = useState(0.0);
     const [distanceFinal, setDistanceFinal] = useState(0.0);
     const [placeName, setPlaceName] = useState('');
     const [showHide, setHide] = useState(true);
     const prevLocation = useRef(null);
     const prevDistance = useRef(0.0);
     const onShowSnackBar = () => setVisibleSnackBar(true);
     const onDismissSnackBar = () => setVisibleSnackBar(false);

     const fetchLocation = async () => {
          try {
               const position = await new Promise((resolve, reject) => {
                    Geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 50000, maximumAge: 1000 });
               });
               const { latitude, longitude } = position.coords;
               setUserLocation({ latitude, longitude });
               await AsyncStorage.setItem('latitude', String(latitude));
               await AsyncStorage.setItem('longitude', String(longitude));
               setLatitude(String(latitude));
               setLongitude(String(longitude));
               setIsLoading(false)
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
                    //console.log(checkInPlaceAddress, "checkInPlaceAddress")
                    setIsLoading(false)
                    setShow(true);
               } catch (error) {
                    console.error('Error fetching place names:', error);
               }
          }
     };
     const loginFormValidate = async () => {

          if (checkInPlaceName === null || checkInPlaceName === '') {
               setSnackBarText('Please wait for getting Location');
               setVisibleSnackBar(true);
          }
          else {
               await AsyncStorage.setItem('currentTime', (currentTime.toLocaleTimeString().toUpperCase()));
               setName('');
               setUserId('');
               setLatitude("");
               setLongitude("");
               setCheckInPlaceName("");
               senData();
               navigation.navigate('Dashboard');
          }
     };
     const getEmailFromStorage = async () => {
          try {
               setNameCompare(await AsyncStorage.getItem('EmployeeName'));
               setUserIdCompare(await AsyncStorage.getItem('EmployeeCode'));
          } catch (error) {
               console.log(error)
          }
     };
     const requestLocationPermission = async () => {
          try {
               const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
               ]);

               if (
                    granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&
                    granted['android.permission.ACCESS_BACKGROUND_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
               ) {
                    console.log('Location permission granted');
                    fetchLocation();
               } else {
                    console.log('Location permission denied');
               }
          } catch (err) {
               console.warn(err);
          }
     };
     useEffect(() => {
          getEmailFromStorage();
          requestLocationPermission();
          let timer; // Define a variable to hold the timer
          const handleTimeout = () => {
               setIsLoading(false); // Set loading to false when the timeout occurs
               Alert.alert("Location fetching took too long. Please try again.");
          };
          setCurrentTime(new Date());
          setIsLoading(true);
          fetchData();
          timer = setTimeout(handleTimeout, 20000);
          // Clean up function to clear the timer if component unmounts or useEffect runs again
          return () => clearTimeout(timer);
     }, []);
     useEffect(() => {
          const watchLocation = Geolocation.watchPosition(
               position => {
                    const newUserLocation = {
                         latitude: position.coords.latitude,
                         longitude: position.coords.longitude
                    };
                    setUserLocationTrack(newUserLocation);
                    fetchPlaceNameTrack(newUserLocation);
               },
               error => console.error('Error getting user location:', error),
               { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 }
          );
          return () => Geolocation.clearWatch(watchLocation);
     }, []);
     useEffect(() => {
          const options = {
               taskName: 'Tracking',
               taskTitle: 'Location User Tracking ON',
               taskDesc: placeName,
               taskIcon: {
                    name: 'ic_launcher',
                    type: 'mipmap',
               },
               color: '#ff00ff',
               linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
          };
          BackgroundService.start(veryIntensiveTask, options);
          // const intervalId = setInterval(() => {
          //      commonData()
          // }, 30000);
          // return () => clearInterval(intervalId);
     }, []);
     const veryIntensiveTask = async () => {
          while (BackgroundService.isRunning()) {
               console.log('Background task is running');
               requestLocationPermission();
               setCurrentTimeAPI(currentTimeAPI.toLocaleTimeString().toUpperCase())
               await UserTrackingData(); // Call API
               await sleep(60000);
          }
     };
     //console.log(nameCompare, userIdCompare, "DATA", currentTimeAPI)
     // useEffect(() => {
     //      const stopBackgroundServiceAt6PM = async () => {
     //           const currentDate = new Date();
     //           const currentHour = currentDate.getHours();
     //           const currentMinute = currentDate.getMinutes();
     //           if (currentHour === 19 && currentMinute === 0) { // If current time is 6:00 PM
     //                await BackgroundService.stop(); // Stop the background service
     //           }
     //      };
     //      const intervalId = setInterval(stopBackgroundServiceAt6PM, 360000); // Check every minute
     //      return () => clearInterval(intervalId);
     // }, []);
     const fetchPlaceNameTrack = async (location) => {
          try {
               const response = await Geocoder.from(location.latitude, location.longitude);
               const address = response.results[0]?.formatted_address;
               setPlaceName(address);
          } catch (error) {
               console.error("Error fetching place name:", error);
          }
     };
     const fetchData = async () => {
          try {
               await fetchLocation();
               await calculateDistance();
               setIsLoading(false);
          } catch (error) {
               setIsLoading(false);
               Alert.alert("Refresh the page !Location not found. Please try again.");
          }
     };
     const UserTrackingData = async () => {
          const position = await new Promise((resolve, reject) => {
               Geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true });
          });
          const { latitude, longitude } = position.coords;
          const newLocation = { latitude, longitude };
          //let newDistance = 0; // Initialize newDistance variable
          if (prevLocation.current) {
               const newDistance = calculateDistanceTrack(prevLocation.current, newLocation);
               var totalDistance = prevDistance.current + newDistance;
               prevDistance.current = totalDistance; // Update previous distance for the next iteration
               setDistance(totalDistance);
               //console.log(totalDistance, "distANCE", newDistance)
          }
          prevLocation.current = newLocation;

          prevLocation.current = newLocation;
          const checkInPlace = await Geocoding.from(latitude, longitude);
          const checkInPlaceAddress = checkInPlace.results[0]?.formatted_address || 'Address not available';
          try {
               const empCode = await AsyncStorage.getItem('EmployeeCode');
               const empName = await AsyncStorage.getItem('EmployeeName');
               // const distanceInKm = (distance).toFixed(3) + ' meters';
               await fetchPlaceNameTrack(newLocation); // Fetch place name and wait for it to complete
               const url = `https://hrms.kwicpay.com/api/WebAPI/UserTracking?Emp_Code=${empCode}&Emp_Name=${empName}&Place_Name=${checkInPlaceAddress}&Distance=${totalDistance}&LAT=${latitude}&LON=${longitude}&Device_Time=${currentTimeAPI}`;
               //console.log(url, "data");
               const response = await fetch(url, {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json",
                    },
               });
               const textResponse = await response.json();
               if (textResponse.API_STATUS === "OK") {
                    //console.log('Data Send Successfully', textResponse.MSG);
               } else {
                    Alert.alert('Error Signed', textResponse.MSG);
               }
          } catch (error) {
               console.error('Error sending tracking data:', error);
          }
     };
     const calculateDistanceTrack = (prevLocation, newLocation) => {
          const R = 6371; // Radius of the Earth in km
          const dLat = toRadians(newLocation.latitude - prevLocation.latitude);
          const dLon = toRadians(newLocation.longitude - prevLocation.longitude);
          const a =
               Math.sin(dLat / 2) * Math.sin(dLat / 2) +
               Math.cos(toRadians(prevLocation.latitude)) * Math.cos(toRadians(newLocation.latitude)) *
               Math.sin(dLon / 2) * Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distance = (R * c)// Distance in km
          return distance;
     };
     const toRadians = (angle) => angle * (Math.PI / 180);
     const senData = async () => {
          setIsLoading(true);
          const url = `https://hrms.kwicpay.com/api/WebAPI/INATTENDANCE?Emp_Code=${userIdCompare}&LAT=${latitude}&LON=${longitude}&Address=${checkInPlaceName}`;
          //console.log(url, "kljhlkj")
          try {
               const response = await fetch(url, {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json",
                    },
               });
               const textResponse = await response.json();
               //console.log(textResponse, "dada")
               if (textResponse.API_STATUS === "OK") {
                    //Alert.alert('Data Send Successfully', textResponse.MSG);
                    // navigation.navigate("Dashboard");
                    console.log('Data Send Successfully', textResponse.MSG)
                    setIsLoading(false);
                    setHide(false)
               } else {
                    setIsLoading(false);
                    showHide(false)
                    Alert.alert('Error Signed', textResponse.MSG);
                    //console.log(textResponse, "textResponsetextResponse");
                    return;
               }
          } catch (error) {
               setIsLoading(false);
               Alert.alert('Error Signed', textResponse.MSG);
               console.log(error);
          }
     };
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
               <>
                    {showHide === true ? (<><ScrollView style={{ backgroundColor: '#ffffff', flex: 1 }} refreshControl={
                         <RefreshControl refreshing={isRefreshing} onRefresh={fetchData}
                              progressViewOffset={80}
                              colors={['#f2612b', '#2471A3', '#f2612b']} />
                    }>
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
                                             placeholder='Enter Employee Name'
                                             value={nameCompare}
                                             activeOutlineColor='#f2612b'
                                             activeUnderlineColor='#f2612b'
                                             // onChangeText={(value) => setName(value)}
                                             style={styles.input}
                                             cursorColor='#f2612b'
                                             left={<TextInput.Icon icon="mail" size={25} color="#f2612b" style={{ marginTop: 15 }} />}
                                        />
                                        <View style={styles.label}>
                                             <Text style={styles.label}>Employee Code</Text>
                                        </View>
                                        <TextInput
                                             autoCorrect={false}
                                             placeholder='Enter Employee Code'
                                             value={userIdCompare}
                                             activeOutlineColor='#f2612b'
                                             activeUnderlineColor='#f2612b'
                                             style={styles.input}
                                             // onChangeText={(value) => setUserId(value)}
                                             cursorColor='#f2612b'
                                             left={<TextInput.Icon icon="account" size={25} color="#f2612b" style={{ marginTop: 20 }} />}
                                        />
                                        <View style={styles.spacing}></View>

                                        <View style={styles.spacing}></View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                             <View
                                                  style={{
                                                       backgroundColor: '#f2612b',
                                                       justifyContent: 'center',
                                                       alignItems: 'center',
                                                       borderRadius: 20,
                                                       width: "99%",
                                                       height: 45
                                                  }}>
                                                  <TouchableOpacity onPress={loginFormValidate}>
                                                       <Text
                                                            style={{
                                                                 color: 'white',
                                                                 fontSize: 20,
                                                                 fontWeight: "700"
                                                            }}>PUNCH IN</Text>
                                                  </TouchableOpacity>
                                             </View>

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
                                   <Text style={styles.textStyle}>Check In Place : {checkInPlaceName}</Text>
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
                         </Snackbar></>) : (<View style={styles.container}>
                              <MapView
                                   style={styles.map}
                                   initialRegion={{
                                        latitude: userLocationTrack.latitude,
                                        longitude: userLocationTrack.longitude,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421,
                                   }}
                              >
                                   {userLocationTrack && (
                                        <Marker
                                             coordinate={{ latitude: userLocationTrack.latitude, longitude: userLocationTrack.longitude }}
                                             title={placeName}
                                             pinColor="#f2612b"
                                        />
                                   )}
                              </MapView>
                              <View style={styles.infoContainer}>
                                   <Text style={styles.text}>Current Place: {placeName}</Text>
                                   <Text style={styles.text1}>Total Distance: {distance.toFixed(2)} meters</Text>
                              </View>
                         </View>)}
               </>
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
          color: "gray"
     },
     container: {
          flex: 1,
     },
     map: {
          flex: 1,
     },
     infoContainer: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: 10,
     },
     text: {
          fontSize: 16,
          fontWeight: 'bold',
          marginBottom: 5,
          color: "gray"
     },
     text1: {
          fontSize: 16,
          fontWeight: 'bold',
          marginBottom: 5,
          textAlign: "center",
          justifyContent: "center",
          color: "gray"
     },
});

export default CheckIn;