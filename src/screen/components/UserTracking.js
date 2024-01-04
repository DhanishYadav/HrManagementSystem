import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoding from 'react-native-geocoding';
import AsyncStorage from '@react-native-async-storage/async-storage';

Geocoding.init("AIzaSyC6qrW-acYuQXcV1m-CFG11Dzi67dScktg"); // Replace with your Google Maps API Key

const LocationComponent = () => {
     const [userLocation, setUserLocation] = useState(null);
     const [finalDestination, setFinalDestination] = useState(null);
     const [distanceToDestination, setDistanceToDestination] = useState(null);
     const [checkInPlaceName, setCheckInPlaceName] = useState('');
     const [checkOutPlaceName, setCheckOutPlaceName] = useState('');
     const [show, setShow] = useState(false);
     useEffect(() => {
          const fetchLocation = async () => {
               try {
                    const storedLatitude = await AsyncStorage.getItem('latitude');
                    const storedLongitude = await AsyncStorage.getItem('longitude');
                    const storedOutLatitude = await AsyncStorage.getItem('CheckOutlatitude');
                    const storedOutLongitude = await AsyncStorage.getItem('CheckOutlongitude');

                    if (storedLatitude !== null && storedLongitude !== null) {
                         setUserLocation({ latitude: parseFloat(storedLatitude), longitude: parseFloat(storedLongitude) });
                    }
                    if (storedOutLatitude !== null && storedOutLongitude !== null) {
                         setFinalDestination({ latitude: parseFloat(storedOutLatitude), longitude: parseFloat(storedOutLongitude) });
                    }
               } catch (error) {
                    console.error('Error fetching location from AsyncStorage:', error);
               }
          };
          fetchLocation();
     }, []);
     const toRadians = angle => (Math.PI * angle) / 180;
     const haversine = (lat1, lon1, lat2, lon2) => {
          const R = 6371;
          const dLat = toRadians(lat2 - lat1);
          const dLon = toRadians(lon2 - lon1);
          const a =
               Math.sin(dLat / 2) * Math.sin(dLat / 2) +
               Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distance = R * c;
          return distance;
     };
     const calculateDistance = async () => {
          if (userLocation && finalDestination) {
               const distance = haversine(userLocation.latitude, userLocation.longitude, finalDestination.latitude, finalDestination.longitude);
               setDistanceToDestination(distance);
               setShow(!show);
               try {
                    const checkInPlace = await Geocoding.from(userLocation.latitude, userLocation.longitude);
                    const checkOutPlace = await Geocoding.from(finalDestination.latitude, finalDestination.longitude);
                    const checkInPlaceAddress = checkInPlace.results[0]?.formatted_address || 'Address not available';
                    const checkOutPlaceAddress = checkOutPlace.results[0]?.formatted_address || 'Address not available';

                    setCheckInPlaceName(checkInPlaceAddress);
                    setCheckOutPlaceName(checkOutPlaceAddress);
               } catch (error) {
                    console.error("Error fetching place names:", error);
               }
          }
     };
     return (
          <View style={styles.container}>
               {userLocation && finalDestination && (
                    <MapView
                         style={styles.map}
                         initialRegion={{
                              latitude: userLocation.latitude,
                              longitude: userLocation.longitude,
                              latitudeDelta: 0.0922,
                              longitudeDelta: 0.0421,
                         }}
                    >
                         <Polyline
                              coordinates={[
                                   { latitude: userLocation.latitude, longitude: userLocation.longitude },
                                   { latitude: finalDestination.latitude, longitude: finalDestination.longitude },
                              ]}
                              strokeWidth={2}
                              strokeColor="blue"
                         />
                         <Marker
                              coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }}
                              title={`Check In Place ${checkInPlaceName}`}
                              pinColor="green"
                              onPress={calculateDistance}
                         />
                         <Marker
                              coordinate={{ latitude: finalDestination.latitude, longitude: finalDestination.longitude }}
                              title={`Check Out Place ${checkOutPlaceName}`}
                              pinColor="red"
                              onPress={calculateDistance}
                         />
                    </MapView>
               )}
               {show && (
                    <View>
                         <Text style={styles.textStyle}>Check In Place : {checkInPlaceName}</Text>
                         <Text style={styles.textStyle}>Check Out Place : {checkOutPlaceName}</Text>
                    </View>
               )}
               {distanceToDestination !== null && (
                    <Text style={styles.text}>Distance to Final Destination: {distanceToDestination.toFixed(2)} km</Text>
               )}
          </View>
     );
};

const styles = StyleSheet.create({
     container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
     },
     map: {
          flex: 1,
          width: '100%',
          height: '100%',
     },
     text: {
          margin: 10,
     },
     textStyle: {
          fontSize: 20,
          fontWeight: '500',
     },
});

export default LocationComponent;
