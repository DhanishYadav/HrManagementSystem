import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator, PermissionsAndroid } from 'react-native';
import { TextInput, Snackbar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Colors from '../constant/Colors';
import DateTimePicker from "react-native-modal-datetime-picker";
import axios from "axios";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Moment from 'moment';
import RNFetchBlob from 'rn-fetch-blob';
const DRScreen = () => {
     const navigation = useNavigation();
     const [EmployeeName, setName] = useState('');
     const [customerName, setCustomerName] = useState('');
     const [Area, setArea] = useState('');
     const [business, setBusiness] = useState('');
     const [isDatePickerFromVisible, setDatePickerFromVisibility] = useState(false);
     const [value, setValue] = useState("");
     const [EmployeeNumber, setNumber] = useState('');
     const [remarks, setRemark] = useState('');
     const [isValidEmail, setIsValidEmail] = useState(true);
     const [snackBarText, setSnackBarText] = useState('');
     const [isloading, setIsLoading] = useState(false);
     const [fromDate, setFromDate] = useState("");
     const [visibleSnackBar, setVisibleSnackBar] = useState(false);
     const onShowSnackBar = () => setVisibleSnackBar(true);
     const [selectedPhoto, setSelectedPhoto] = useState(null);
     const onDismissSnackBar = () => setVisibleSnackBar(false);
     const [open, setOpen] = useState(false);
     const [openEnvironment, setOpenEnvironment] = useState(false);
     const [environmentDropDownValue, setEnvironmentValue] = useState('Please Select Department');
     const months = [
          { label: 'State Head', value: 'State Head' },
          { label: 'RSM', value: 'RSM' },
          { label: 'ASM', value: 'ASM' },
          { label: 'SM', value: 'SM' },
          { label: 'FSE', value: 'FSE' },
          { label: 'DSL', value: 'DSL' },
     ];
     const loginFormValidate = async () => {
          if (fromDate === null || fromDate === '') {
               setSnackBarText('Please Select Date');
               setVisibleSnackBar(true);
          }
          else if (customerName === null || customerName === '') {
               setSnackBarText('Please Enter Customer Name');
               setVisibleSnackBar(true);
          } else if (Area === null || Area === '') {
               setSnackBarText('Please Enter Area');
               setVisibleSnackBar(true);
          }
          else if (business === null || business === '') {
               setSnackBarText('Please Enter Business Details');
               setVisibleSnackBar(true);
          }
          else if (EmployeeNumber === null || EmployeeNumber === '') {
               setSnackBarText('Please Enter Employee Number');
               setVisibleSnackBar(true);
          }
          else if (remarks === null || remarks === '') {
               setSnackBarText('Please Enter Remarks');
               setVisibleSnackBar(true);
          }
          else if (value === null || value === '') {
               setSnackBarText('Please Select Employee Designation');
               setVisibleSnackBar(true);
          }
          else if (selectedPhoto === null || selectedPhoto === '') {
               setSnackBarText('Please Click/Choose Photo');
               setVisibleSnackBar(true);
          }
          else {
               setName('');
               setNumber('');
               setEnvironmentValue("");
               setCustomerName("");
               setArea("");
               setBusiness("");
               setDatePickerFromVisibility("");
               setRemark("");
               setFromDate("")
               setValue("");
               setSelectedPhoto("");
               senData();
          }
     }
     //console.log(value, "valuevalue", fromDate, remarks, EmployeeName)
     const showDatePickerFrom = () => {
          setDatePickerFromVisibility(true);
     };
     const hideDatePickerFrom = () => {
          setDatePickerFromVisibility(false);
     };
     const handleFromDate = (date) => {
          Moment.locale('en');
          var dateFormated = Moment(date).format('DD/MM/YYYY');
          setFromDate(dateFormated);
          hideDatePickerFrom();
     };
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
     const senData = async () => {
          setIsLoading(true);

          try {
               const imageResponse = await RNFetchBlob.fs.readFile(selectedPhoto, 'base64');
               const imageData = `data:image/jpeg;base64,${imageResponse}`;
               // const finalData = RNFetchBlob.wrap(selectedPhoto)
               console.log(imageData, "finalDatafinalData")
               const url = `https://hrms.kwicpay.com/api/WebAPI/DSR?DSR_Date=${fromDate}&Customer_Name=${customerName}&Area=${Area}&Business_Details=${business}&Phone_number=${EmployeeNumber}&Designation=${value}&Employee_Name=${EmployeeName}&Remarks=${remarks}&Upload_Picture=${imageData}`;
               console.log(url, "data");
               const response = await fetch(url, {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json",
                    },
               });
               const textResponse = await response.json();
               console.log(textResponse, "dadatextResponse")
               if (textResponse.API_STATUS === "OK") {
                    Alert.alert('Data Sent Successfully', textResponse.MSG);
                    navigation.navigate("DrawerNav");
                    setIsLoading(false);
               } else {
                    setIsLoading(false);
                    Alert.alert('Error Occurred', textResponse.MSG);
                    console.log(textResponse, "textResponse");
                    return;
               }
          } catch (error) {
               setIsLoading(false);
               Alert.alert('Error Occurred', 'Failed to send data');
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
                                             width: "50%", resizeMode: "contain",
                                             height: 100, borderRadius: 10, alignItems: "center", alignSelf: "center"
                                        }} />
                                   </View>}
                                   <DropDownPicker
                                        items={months}
                                        open={open}
                                        value={value}
                                        setOpen={setOpen}
                                        setValue={setValue}
                                        placeholder={'Select Designation...'}
                                        style={styles.dropdown}
                                        itemStyle={{
                                             justifyContent: 'flex-start',
                                        }}
                                        dropDownStyle={{ backgroundColor: "red", height: 200 }}
                                   />
                                   {/* <Text style={styles.cardSubTitleText}>Date </Text> */}
                                   <TouchableOpacity onPress={() => showDatePickerFrom()} >
                                        <TextInput
                                             left={<TextInput.Icon icon="calendar-outline" size={25} color="#f2612b" onPress={() => showDatePickerFrom()} />}
                                             placeholder="Select Date"
                                             mode='outlined'
                                             editable={false}
                                             value={fromDate}
                                             style={styles.input}
                                             outlineColor='#f2612b'
                                             underlineColor='#f2612b'
                                             activeOutlineColor='#f2612b'
                                             activeUnderlineColor='#f2612b'
                                        />
                                        <DateTimePicker
                                             isVisible={isDatePickerFromVisible}
                                             mode="date"
                                             date={new Date()}
                                             onConfirm={handleFromDate}
                                             onCancel={hideDatePickerFrom}
                                        />
                                   </TouchableOpacity>
                                   <TextInput
                                        style={styles.input}
                                        autoCorrect={false}
                                        placeholder='Enter Customer Name'
                                        value={customerName}
                                        underlineColorAndroid="transparent"
                                        label={"Enter Customer Name"}
                                        mode='outlined'
                                        outlineColor='#f2612b'
                                        underlineColor='#f2612b'
                                        activeOutlineColor='#5DADE2'
                                        activeUnderlineColor='#f2612b'
                                        onChangeText={(value) => setCustomerName(value)}
                                        cursorColor='#f2612b'
                                        left={<TextInput.Icon icon="account" size={25} color="#f2612b" />}
                                   />

                                   <TextInput
                                        style={styles.input}
                                        autoCorrect={false}
                                        placeholder='Enter Area Name'
                                        underlineColorAndroid="transparent"
                                        cursorColor="#5DADE2"
                                        label={"Enter Area Name"}
                                        mode='outlined'
                                        outlineColor='#f2612b'
                                        underlineColor='#f2612b'
                                        value={Area}
                                        activeOutlineColor='#5DADE2'
                                        onChangeText={(value) => setArea(value)}
                                        activeUnderlineColor='#5DADE2'
                                        left={<TextInput.Icon icon="wan" size={25} color="#f2612b" />}
                                   />
                                   <TextInput
                                        style={styles.input}
                                        placeholder='Enter Business Details'
                                        underlineColorAndroid="transparent"
                                        cursorColor="#5DADE2"
                                        label={"Enter Business Details"}
                                        mode='outlined'
                                        outlineColor='#f2612b'
                                        underlineColor='#f2612b'
                                        value={business}
                                        activeOutlineColor='#5DADE2'
                                        onChangeText={(value) => setBusiness(value)}
                                        activeUnderlineColor='#5DADE2'
                                        left={<TextInput.Icon icon="handshake" size={25} color="#f2612b" />}
                                   />
                                   <TextInput
                                        style={styles.input}

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
                                        left={<TextInput.Icon icon="phone-log" size={25} color="#f2612b" />}
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
                                        activeOutlineColor='#5DADE2'
                                        activeUnderlineColor='#f2612b'
                                        onChangeText={(value) => setName(value)}
                                        cursorColor='#f2612b'
                                        left={<TextInput.Icon icon="account" size={25} color="#f2612b" />}
                                   />
                                   <TextInput
                                        style={styles.input}

                                        placeholder='Enter Remarks '
                                        value={remarks}
                                        underlineColorAndroid="transparent"
                                        label={"Enter Remarks"}
                                        mode='outlined'
                                        outlineColor='#f2612b'
                                        underlineColor='#f2612b'
                                        activeOutlineColor='#5DADE2'
                                        activeUnderlineColor='#f2612b'
                                        onChangeText={(value) => setRemark(value)}
                                        cursorColor='#f2612b'
                                        left={<TextInput.Icon icon="details" size={25} color="#f2612b" />}
                                   />
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
                                                       }}>Submit</Text>
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
export default DRScreen;
const styles = StyleSheet.create({
     spacing: {
          margin: 10,
          marginTop: 50
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
          padding: 8,
          marginTop: 12,

     },

});