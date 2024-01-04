import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ImagesScreen = () => {
     const navigation = useNavigation();
     const navigationHandle = () => {
          navigation.navigate("MyBasket")
     }
     return (
          <View style={styles.container}>
               <StatusBar
                    backgroundColor="#ffc470" />
               <View>
                    <Image source={require("../../asserts/iri.jpg")} style={styles.icon} />
               </View>
               <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 12 }}>
                    <Text style={styles.textStyle}>Iris Reticulate</Text>
                    <Image source={require("../../asserts/d1.png")} style={styles.icon1} />
               </View>
               <Text style={{ fontSize: 22, fontWeight: "600", color: "black", paddingLeft: 10 }}>$1.99/ea</Text>

               <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 60, marginHorizontal: 10 }}>
                    <View style={{
                         borderWidth: 1, borderColor: "black", width: 100, height: 50, alignItems: "center",
                         borderRadius: 10, justifyContent: "center", backgroundColor: "white"
                    }}>
                         <Text style={[styles.textStyle, { fontSize: 28, paddingLeft: 0 }]}> -  1  +</Text>
                    </View>
                    <View style={{
                         borderWidth: 1, borderColor: "white", width: 200, height: 50, alignItems: "center",
                         borderRadius: 10, justifyContent: "center", backgroundColor: "black"
                    }}>
                         <TouchableOpacity onPress={navigationHandle}>
                              <Text style={[styles.textStyle, { fontSize: 20, paddingLeft: 0, color: "white" }]}>Add To basket</Text>
                         </TouchableOpacity>
                    </View>
               </View>
          </View>
     )
}
const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: "#ffc470"
     },
     icon: {
          width: "96%",
          height: 400,
          marginHorizontal: 8,
          borderRadius: 10
     },
     icon1: {
          width: 36,
          height: 50,
          marginHorizontal: 8,
          borderRadius: 10
     },
     textStyle: {
          fontSize: 50,
          fontWeight: "bold",
          color: "black",
          paddingLeft: 10
     }
})
export default ImagesScreen