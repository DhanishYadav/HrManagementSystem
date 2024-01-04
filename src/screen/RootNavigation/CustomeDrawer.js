import { View, Text, ImageBackground, Platform, Image, UIManager, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const CustomeDrawer = (props) => {
     const navigation = useNavigation()
     const [androidVersion, setAndroidVersion] = useState(null);
     const [selectedPhoto, setSelectedPhoto] = useState(null);
     const [name, setName] = useState("");
     const [employeeType, setEmployeeType] = useState('');
     useEffect(() => {
          getAndroidVersion();
          const intervalId = setInterval(() => {
               editForm()
          }, 1000);
          return () => clearInterval(intervalId);
     }, []);
     const getAndroidVersion = async () => {
          try {
               const version = await DeviceInfo.getSystemVersion();
               setAndroidVersion(version);
          } catch (error) {
               console.error('Error retrieving Android version:', error);
          }
     };
     const editForm = async () => {
          try {
               const [storedName, storedEmployeeType, storedSelectedPhoto] = await AsyncStorage.multiGet(['name', 'employeeType', 'selectedPhoto']);
               setName(storedName[1]);
               setEmployeeType(storedEmployeeType[1]);
               setSelectedPhoto(storedSelectedPhoto[1]);
          } catch (error) {
               console.error('Error retrieving data from AsyncStorage:', error);
          }
     };

     if (Platform.OS === 'android') {
          UIManager.setLayoutAnimationEnabledExperimental(true);
     }
     return (
          <View style={styles.Container}>

               <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: "#fff" }}>
                    <ImageBackground source={require("../../asserts/b1.jpg")} style={{ padding: 10, height: 170, width: 300, marginTop: -4 }}>
                         <Text style={{ color: "white", fontSize: 12, fontWeight: "bold", alignSelf: "flex-end", paddingRight: 13 }}>
                              {androidVersion ? `Android Version: ${androidVersion}` : null}
                         </Text>
                         <TouchableOpacity onPress={() => navigation.navigate("EditScreen")}>
                              {selectedPhoto == null ? (<Image style={{ height: 60, width: 60, borderRadius: 40, marginBottom: 10, resizeMode: "center" }} source={require("../../asserts/avatar.png")} ></Image>) : (<Image style={{ height: 60, width: 60, borderRadius: 40, marginBottom: 10, resizeMode: "center" }} source={{ uri: selectedPhoto }} ></Image>)}
                              <Image source={{ uri: selectedPhoto }}
                              />
                         </TouchableOpacity>


                         <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>{name}</Text>
                         <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>{employeeType}</Text>
                    </ImageBackground>
                    <DrawerItemList {...props} />
               </DrawerContentScrollView>
               <View>
                    <Text style={{ alignItems: "center", textAlign: "center", color: "gray" }}>Powered By</Text>
                    <Text style={{ alignItems: "center", textAlign: "center", color: "gray" }}>One Key Technology Private Limited</Text>
               </View>
          </View>
     )
}
export default CustomeDrawer
const styles = StyleSheet.create({
     Container: {
          flex: 1,
     },
     textContainer: {
          paddingHorizontal: 10,
     },
     avatar: {
          width: 50,
          height: 50,
     },

     name: {
          fontSize: 18,
          fontWeight: "bold",
     },
     testStyle: {
          fontSize: 16,
          fontWeight: "800",
          color: "white",
          marginLeft: 10,
     },
     spacer: {
          width: '90%',
          height: 1,
          backgroundColor: "light",
          alignSelf: 'center',
     },
     bottom: {
          backgroundColor: "#f2612b",
          height: 45,
          flexDirection: "row",
          width: "93%",
          justifyContent: "space-between",
          marginHorizontal: 8,
          borderRadius: 10,
          alignItems: "center",
          paddingLeft: 5,
     },
});