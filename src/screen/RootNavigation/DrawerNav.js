import { createDrawerNavigator } from '@react-navigation/drawer';
import DashBoard from '../components/DashBoard';
import CustomeDrawer from './CustomeDrawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import Attendance from '../components/Attendance';
import AttendanceReport from '../components/Attendance Report';
import UserTracking from '../components/UserTracking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import PaySlip from '../components/ReimbursementClaim';
// import WeekOff from '../components/WeekOff';
import ReimbursementClaim from '../components/WeekOff';
import Holiday from '../components/Holiday';
import DSRScreen from '../components/DSRScreen';
import { useEffect, useState } from 'react';
const Drawer = createDrawerNavigator();

function DrawerNav() {
     const [loginDepartment, setLoginDepartment] = useState(null);
     useEffect(() => {
          getEmailFromStorage();
     }, []);
     const navigation = useNavigation();
     const getEmailFromStorage = async () => {
          try {
               setLoginDepartment(await AsyncStorage.getItem('environmentValue'));
          } catch (error) {
               Alert.alert("Invalid demand")
          }
     };
     return (
          <Drawer.Navigator
               drawerContent={(props) => <CustomeDrawer {...props} />}
               screenOptions={({ route }) => ({
                    drawerIcon: ({ color, size }) => {
                         let iconName;

                         if (route.name === 'Dashboard') {
                              iconName = 'dashboard';
                         } else if (route.name === 'Attendance') {
                              iconName = 'barschart';
                         } else if (route.name === 'DSR Screen') {
                              iconName = 'filetext1';
                         } else if (route.name === 'User Tracking') {
                              iconName = 'user';
                         }
                         else if (route.name === 'PaySlip') {
                              iconName = 'alipay-circle';
                         }
                         else if (route.name === 'Leave') {
                              iconName = 'calendar';
                         }
                         else if (route.name === 'Reimbursement Claim') {
                              iconName = 'save';
                         }
                         return <AntDesign name={iconName} size={size} color="red" />;
                    },
               })}
          >
               {loginDepartment === "2" ? (<><Drawer.Screen name="Dashboard" component={DashBoard}
                    options={{
                         headerStyle: {
                              backgroundColor: '#f2612b'
                         },
                         headerTitleStyle: {
                              color: 'white',
                              marginLeft: 'auto', // Align to the left
                              marginRight: 'auto', // Align to the right
                              justifyContent: 'center', // Center vertically
                              alignItems: 'center', // Center horizontally
                         }, headerTitleStyle: {
                              color: 'white',
                              marginLeft: 30,
                         },
                         headerTintColor: 'white',
                         headerTitle: "Kwic Pay",
                    }}
               />
                    {/* <Drawer.Screen name="Attendance" component={Attendance}
                         options={{
                              headerStyle: {
                                   backgroundColor: '#f2612b'
                              },
                              headerTitleStyle: {
                                   color: 'white',
                                   marginLeft: 'auto', // Align to the left
                                   marginRight: 'auto', // Align to the right
                                   justifyContent: 'center', // Center vertically
                                   alignItems: 'center', // Center horizontally
                              },
                              headerTintColor: 'white',
                              headerTitle: "Attendance",
                         }}
                    /> */}
                    <Drawer.Screen name="DSR Screen" component={DSRScreen}
                         options={{
                              headerStyle: {
                                   backgroundColor: '#f2612b'
                              },
                              headerTitleStyle: {
                                   color: 'white',
                                   marginLeft: 'auto', // Align to the left
                                   marginRight: 'auto', // Align to the right
                                   justifyContent: 'center', // Center vertically
                                   alignItems: 'center', // Center horizontally
                              },
                              headerTintColor: 'white',
                              headerTitle: "Daily Sales Report",
                         }}
                    />
                    <Drawer.Screen name="PaySlip" component={PaySlip}
                         options={{
                              headerStyle: {
                                   backgroundColor: '#f2612b'
                              },
                              headerTitleStyle: {
                                   color: 'white',
                                   marginLeft: 'auto', // Align to the left
                                   marginRight: 'auto', // Align to the right
                                   justifyContent: 'center', // Center vertically
                                   alignItems: 'center', // Center horizontally
                              },
                              headerTintColor: 'white',
                              headerTitle: "PaySlip",
                         }}
                    />
                    <Drawer.Screen name="Reimbursement Claim" component={ReimbursementClaim}
                         options={{
                              headerStyle: {
                                   backgroundColor: '#f2612b'
                              },
                              headerTitleStyle: {
                                   color: 'white',
                                   marginLeft: 'auto', // Align to the left
                                   marginRight: 'auto', // Align to the right
                                   justifyContent: 'center', // Center vertically
                                   alignItems: 'center', // Center horizontally
                              },
                              headerTintColor: 'white',
                              headerTitle: "Reimbursement Claim",
                         }}
                    />
                    <Drawer.Screen name="Leave" component={Holiday}
                         options={{
                              headerStyle: {
                                   backgroundColor: '#f2612b'
                              },
                              headerTitleStyle: {
                                   color: 'white',
                                   marginLeft: 'auto', // Align to the left
                                   marginRight: 'auto', // Align to the right
                                   justifyContent: 'center', // Center vertically
                                   alignItems: 'center', // Center horizontally
                              },
                              headerTintColor: 'white',
                              headerTitle: "Leave",

                         }}
                    />
                    {/* <Drawer.Screen name="User Tracking" component={UserTracking}
                         options={{
                              headerStyle: {
                                   backgroundColor: '#f2612b'
                              },
                              headerTitleStyle: {
                                   color: 'white',
                                   marginLeft: 'auto', // Align to the left
                                   marginRight: 'auto', // Align to the right
                                   justifyContent: 'center', // Center vertically
                                   alignItems: 'center', // Center horizontally
                              },
                              headerTintColor: 'white',
                              headerTitle: "User Tracking",

                         }}
                    /> */}
               </>) : (<><Drawer.Screen name="Dashboard" component={DashBoard}
                    options={{
                         headerStyle: {
                              backgroundColor: '#f2612b'
                         },
                         headerTitleStyle: {
                              color: 'white',
                              marginLeft: 'auto', // Align to the left
                              marginRight: 'auto', // Align to the right
                              justifyContent: 'center', // Center vertically
                              alignItems: 'center', // Center horizontally
                         }, headerTitleStyle: {
                              color: 'white',
                              marginLeft: 30,
                         },
                         headerTintColor: 'white',
                         headerTitle: "Kwic Pay",
                    }}
               />
                    <Drawer.Screen name="DSR Screen" component={DSRScreen}
                         options={{
                              headerStyle: {
                                   backgroundColor: '#f2612b'
                              },
                              headerTitleStyle: {
                                   color: 'white',
                                   marginLeft: 'auto', // Align to the left
                                   marginRight: 'auto', // Align to the right
                                   justifyContent: 'center', // Center vertically
                                   alignItems: 'center', // Center horizontally
                              },
                              headerTintColor: 'white',
                              headerTitle: "Daily Sales Report",
                         }}
                    />
                    <Drawer.Screen name="PaySlip" component={PaySlip}
                         options={{
                              headerStyle: {
                                   backgroundColor: '#f2612b'
                              },
                              headerTitleStyle: {
                                   color: 'white',
                                   marginLeft: 'auto', // Align to the left
                                   marginRight: 'auto', // Align to the right
                                   justifyContent: 'center', // Center vertically
                                   alignItems: 'center', // Center horizontally
                              },
                              headerTintColor: 'white',
                              headerTitle: "PaySlip",
                         }}
                    />
                    <Drawer.Screen name="Reimbursement Claim" component={ReimbursementClaim}
                         options={{
                              headerStyle: {
                                   backgroundColor: '#f2612b'
                              },
                              headerTitleStyle: {
                                   color: 'white',
                                   marginLeft: 'auto', // Align to the left
                                   marginRight: 'auto', // Align to the right
                                   justifyContent: 'center', // Center vertically
                                   alignItems: 'center', // Center horizontally
                              },
                              headerTintColor: 'white',
                              headerTitle: "Reimbursement Claim",
                         }}
                    />
                    <Drawer.Screen name="Leave" component={Holiday}
                         options={{
                              headerStyle: {
                                   backgroundColor: '#f2612b'
                              },
                              headerTitleStyle: {
                                   color: 'white',
                                   marginLeft: 'auto', // Align to the left
                                   marginRight: 'auto', // Align to the right
                                   justifyContent: 'center', // Center vertically
                                   alignItems: 'center', // Center horizontally
                              },
                              headerTintColor: 'white',
                              headerTitle: "Leave",

                         }}
                    />
               </>)}
          </Drawer.Navigator>
     );
}
export default DrawerNav;

const styles = StyleSheet.create({
     icon: {
          height: 30,
          width: 20,
          alignSelf: 'flex-end'
     },
})
