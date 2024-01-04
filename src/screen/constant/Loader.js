import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import colors from "../constant/Colors";
import { ActivityIndicator } from 'react-native-paper';
const Loader = (props) => {
  return (
    <View style={styles.spinnerView}>
      <ActivityIndicator size={30} animating={true} color={colors.primary} />
      <Text style={{ textAlign: 'center', color: colors.primary, marginTop: 25, fontSize: 15 }}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerView: {
    position: "absolute",
    zIndex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5FCFF88",
  }

});


export default Loader;
