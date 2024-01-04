import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, ImageBackground } from 'react-native';

const OnboardingScreen = ({ navigation }) => {
     const rotation = useRef(new Animated.Value(0)).current;

     useEffect(() => {
          const rotateImage = () => {
               Animated.timing(rotation, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: false,
               }).start(() => {
                    rotation.setValue(0);
               });
          };

          const rotationInterval = setInterval(() => {
               rotateImage();
          }, 5000);

          const stopRotation = () => {
               clearInterval(rotationInterval);
          };

          const navigateAfterTenSeconds = () => {
               setTimeout(() => {
                    if (navigation.isFocused()) {
                         navigation.replace('Login');
                    }
               }, 5000);
          };

          rotateImage();
          navigateAfterTenSeconds();

          return () => {
               stopRotation();
          };
     }, [navigation, rotation]);

     const interpolatedRotate = rotation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
     });

     const animatedStyle = {
          transform: [{ rotate: interpolatedRotate }],
     };

     return (
          <View style={styles.container}>
               <ImageBackground source={require("../../asserts/bg.jpg")} style={styles.container}>
                    <Animated.Image
                         source={require('../../asserts/circle.png')}
                         style={[styles.image, animatedStyle]}
                    />
               </ImageBackground>
          </View>
     );
};

const styles = StyleSheet.create({
     container: {
          flex: 1,
          justifyContent: 'center',
     },
     image: {
          width: 200,
          height: 200,
          alignSelf: "center",
     },
});

export default OnboardingScreen;
