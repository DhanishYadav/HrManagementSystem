import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, PermissionsAndroid } from 'react-native';
import { TextInput, Snackbar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const EditProfileScreen = () => {
     const navigation = useNavigation();
     const [selectedPhoto, setSelectedPhoto] = useState(null);
     const [name, setName] = useState(null);
     const [employeeType, setEmployeeType] = useState('');
     const [snackBarText, setSnackBarText] = useState('');
     const [visibleSnackBar, setVisibleSnackBar] = useState(false);
     const onShowSnackBar = () => setVisibleSnackBar(true);
     const onDismissSnackBar = () => setVisibleSnackBar(false);
     const options = {
          saveToPhotos: true,
          mediaType: "photo",
     };
     const OpenCamera = async () => {
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
               const result = await launchCamera(options);
               setSelectedPhoto(result.assets[0].uri);
          }
     }
     const gallery = async () => {
          const result = await launchImageLibrary(options);
          setSelectedPhoto(result.assets[0].uri);
     }
     const submitForm = async () => {
          if (name === null || name === '') {
               setSnackBarText('Enter Employee Name');
               setVisibleSnackBar(true);
          }
          else if (employeeType === null || employeeType === '') {
               setSnackBarText('Enter Employee Type');
               setVisibleSnackBar(true);
          }
          else if (selectedPhoto === null || selectedPhoto === '') {
               setSnackBarText('Please Click/Choose Photo');
               setVisibleSnackBar(true);
          }
          // Assuming you want to navigate to a screen named 'EmployeeDetails'
          else {
               await AsyncStorage.setItem('name', (name));
               await AsyncStorage.setItem('employeeType', (employeeType));
               await AsyncStorage.setItem('selectedPhoto', (selectedPhoto));
               navigation.navigate('Dashboard');
               setEmployeeType("");
               setName("");

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
                                   <View style={styles.spacing}></View>
                                   {selectedPhoto == null || selectedPhoto == "" ? <View style={[styles.cardStyle, { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
                                        <TouchableOpacity onPress={OpenCamera}>
                                             <EvilIcons name="camera" size={76} color="#f2612b" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={gallery}>
                                             <MaterialCommunityIcons name="view-gallery-outline" size={56} color="#f2612b" />
                                        </TouchableOpacity>
                                   </View> : <View style={styles.cardStyle}>
                                        <Image source={{ uri: selectedPhoto }} style={{
                                             width: "57%", resizeMode: "contain",
                                             height: 150, borderRadius: 10, alignItems: "center", alignSelf: "center"
                                        }} />
                                   </View>}
                                   <View style={styles.label}>
                                        <Text style={styles.label}>Employee Name</Text>
                                   </View>
                                   <TextInput
                                        autoCorrect={false}
                                        placeholder='Enter Employee Name'
                                        value={name}
                                        activeOutlineColor='#f2612b'
                                        activeUnderlineColor='#f2612b'
                                        onChangeText={(value) => setName(value)}
                                        style={styles.input}
                                        cursorColor='#f2612b'
                                        left={<TextInput.Icon icon="account" size={25} color="#f2612b" style={{ marginTop: 20 }} />}
                                   />
                                   <View style={styles.label}>
                                        <Text style={styles.label}>Employee Type</Text>
                                   </View>
                                   <TextInput
                                        autoCorrect={false}
                                        placeholder='Enter Employee Type'
                                        value={employeeType}
                                        activeOutlineColor='#f2612b'
                                        activeUnderlineColor='#f2612b'
                                        onChangeText={(value) => setEmployeeType(value)}
                                        style={styles.input}
                                        cursorColor='#f2612b'
                                        left={<TextInput.Icon icon="mail" size={25} color="#f2612b" style={{ marginTop: 20 }} />}
                                   />
                                   <View
                                        style={{
                                             backgroundColor: '#f2612b',
                                             justifyContent: 'center',
                                             alignItems: 'center',
                                             borderRadius: 20,
                                             width: "100%",
                                             height: 50, marginTop: 10
                                        }}>
                                        <TouchableOpacity onPress={submitForm}>
                                             <Text
                                                  style={{
                                                       color: 'white',
                                                       fontSize: 20,
                                                       fontWeight: "700"
                                                  }}>Submit Now</Text>
                                        </TouchableOpacity>
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

const styles = StyleSheet.create({
     spacing: {
          margin: 10
     },
     spacing_big: {
          margin: 30
     },
     cardStyle: {
          width: "100%",
          height: 150,
          marginHorizontal: 4,
          marginBottom: 10

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

export default EditProfileScreen;
