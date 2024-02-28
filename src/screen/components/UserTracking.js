import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import BackgroundService from 'react-native-background-actions';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

const getLocation = () => new Promise((resolve, reject) => {
  Geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true });
});

const getAddressFromCoords = async (latitude, longitude) => {
  try {
    const response = await Geocoder.from(latitude, longitude);
    const address = response.results[0]?.formatted_address || 'Address not available';
    return address;
  } catch (error) {
    console.error('Error getting address:', error);
    return 'Error retrieving address';
  }
};

const App = () => {
  const [placeName, setPlaceName] = useState('');

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const location = await getLocation();
        console.log('Current Location:', location);
        const address = await getAddressFromCoords(location.coords.latitude, location.coords.longitude);
        setPlaceName(address);
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };
    fetchLocation();
    // Start background task
    const options = {
      taskName: 'Tracking',
      taskTitle: 'Location Tracking ON',
      taskDesc: placeName,
      taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
      },
      color: '#ff00ff',
      linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    };
    BackgroundService.start(veryIntensiveTask, options);
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      BackgroundService.stop();
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);
  const veryIntensiveTask = async () => {
    // Example of an infinite loop task with a delay
    while (BackgroundService.isRunning()) {
      console.log('Background task is running 34');
      await sleep(30000);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Place Name: {placeName}</Text>
    </View>
  );
};

export default App;
