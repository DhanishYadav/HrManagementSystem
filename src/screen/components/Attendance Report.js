import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AttendanceReport = () => {
     const [latitude, setLatitude] = useState(null);
     const [longitude, setLongitude] = useState(null);
     const [Outlatitude, setOutLatitude] = useState(null);
     const [Outlongitude, setOutLongitude] = useState(null);
     useEffect(() => {
          const fetchLocation = async () => {
               try {
                    const storedLatitude = await AsyncStorage.getItem('latitude');
                    const storedLongitude = await AsyncStorage.getItem('longitude');
                    const OutstoredLatitude = await AsyncStorage.getItem('CheckOutlatitude');
                    const OutstoredLongitude = await AsyncStorage.getItem('Checkoutlongitude');
                    // Check if values are not null before setting state
                    if (storedLatitude !== null && storedLongitude !== null) {
                         setLatitude(parseFloat(storedLatitude));
                         setLongitude(parseFloat(storedLongitude));
                    }
                    if (OutstoredLatitude !== null && OutstoredLongitude !== null) {
                         setOutLatitude(parseFloat(OutstoredLatitude));
                         setOutLongitude(parseFloat(OutstoredLatitude));
                    }
               } catch (error) {
                    console.error('Error fetching location from AsyncStorage:', error);
               }
          };

          fetchLocation();
     }, []); // Run the effect only once when the component mounts

     return (
          <View>
               <Text>Attendance Report</Text>
               {latitude !== null && longitude !== null && (
                    <Text>
                         Latitude: {latitude}, Longitude: {longitude}
                    </Text>
               )}
               <View>
                    {Outlatitude !== null && Outlongitude !== null && (
                         <Text>
                              Latitude: {Outlatitude}, Longitude: {Outlongitude}
                         </Text>
                    )}
               </View>
          </View>
     );
};

export default AttendanceReport;
