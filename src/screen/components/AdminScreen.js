import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, Button } from 'react-native';
import { TextInput, Snackbar, Card } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const DashBoard = () => {
     const navigation = useNavigation();
     const Refund = () => {
          navigation.navigate("Refund")
     }
     const WithDrawal = () => {
          navigation.navigate("WithdrawalScreen")
     }
     const Transfer = () => {
          navigation.navigate("Transaction")
     }

     const Deposit = () => {
          navigation.navigate("Deposit")
     }
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
                                   <View
                                        style={{
                                             width: 120, height: 120,
                                             backgroundColor: "white",
                                             borderRadius: 10,
                                             elevation: 15,
                                             justifyContent: 'center',
                                             alignItems: 'center'
                                        }}>
                                        <Image source={require("../../asserts/admin.png")} style={{ height: 40, width: 40, resizeMode: "cover", marginVertical: 7 }} />
                                        <TouchableOpacity>
                                             <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>Admin</Text>
                                        </TouchableOpacity>
                                   </View>
                              </View>
                         </View>
                    </View>
                    <View style={{ backgroundColor: '#003990', }}>
                         <View style={{
                              backgroundColor: 'white',
                              borderTopRightRadius: 60
                         }}>
                              <View style={styles.spacing_big}></View>
                              <View style={{ flexDirection: 'row', alignSelf: "center" }}>
                                   <TouchableOpacity onPress={Deposit}>
                                        <Card style={{
                                             height: 120, width: 120, margin: 10, backgroundColor: "white", justifyContent: 'center',
                                             alignItems: 'center'
                                        }}>
                                             <Image source={require("../../asserts/deposit.png")} style={{ height: 40, width: 40, resizeMode: "cover", marginVertical: 7, marginLeft: 20 }} />

                                             <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>Deposit</Text>
                                        </Card>
                                   </TouchableOpacity>
                                   <TouchableOpacity onPress={WithDrawal}>
                                        <Card style={{
                                             height: 120, width: 120, margin: 10, backgroundColor: "white", justifyContent: 'center',
                                             alignItems: 'center'
                                        }}>
                                             <Image source={require("../../asserts/with.png")} style={{ height: 40, width: 40, resizeMode: "cover", marginVertical: 7, marginLeft: 25 }} />

                                             <Text style={{ textAlign: "center", fontSize: 19, fontWeight: "bold" }}>WithDrawal</Text>
                                        </Card>
                                   </TouchableOpacity>
                              </View>
                              <View style={{ flexDirection: 'row', alignSelf: "center" }}>
                                   <TouchableOpacity onPress={Transfer}>
                                        <Card style={{
                                             height: 120, width: 120, margin: 10, backgroundColor: "white", justifyContent: 'center',
                                             alignItems: 'center'
                                        }}>
                                             <Image source={require("../../asserts/transition.jpeg")} style={{ height: 30, width: 30, resizeMode: "cover", marginVertical: 7, marginLeft: 35 }} />
                                             <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>Transaction Report</Text>
                                        </Card>
                                   </TouchableOpacity>
                                   <TouchableOpacity onPress={Refund}>
                                        <Card style={{
                                             height: 120, width: 120, margin: 10, backgroundColor: "white", justifyContent: 'center',
                                             alignItems: 'center'
                                        }}>
                                             <Image source={require("../../asserts/refund.png")} style={{
                                                  height: 40, width: 40, resizeMode: "cover",
                                                  marginVertical: 7, marginLeft: 15
                                             }} />

                                             <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>Refund</Text>

                                        </Card>
                                   </TouchableOpacity>
                              </View>
                         </View>
                    </View>
               </View>
          </SafeAreaProvider>
     );
};
export default DashBoard;
const styles = StyleSheet.create({
     spacing: {
          margin: 10
     },
     spacing_big: {
          margin: 20
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
     card: {
          width: 300,
          height: 300,
          backgroundColor: 'white',
          borderRadius: 10,
     },
     check: {
          width: "90%",
          height: 50,
          borderRadius: 10,
          backgroundColor: "green",
          color: "white",
          marginHorizontal: 20,
          marginVertical: 20,
          justifyContent: "center",
          alignItems: "center"
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