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
import ReimbursementClaim from '../components/ReimbursementClaim';
import WeekOff from '../components/WeekOff';
import Holiday from '../components/Holiday';
const Drawer = createDrawerNavigator();
function DrawerNav() {
     const navigation = useNavigation();
     const handleLogout = async () => {
          Alert.alert(
               'Logout',
               'Are you sure you want to log out?',
               [
                    {
                         text: 'Cancel',
                         onPress: () => console.log('Cancel Pressed'),
                         style: 'cancel',
                    },
                    {
                         text: 'Logout',
                         onPress: () => {
                              AsyncStorage.removeItem('EmployeeCode');
                              navigation.navigate("Login")
                         },
                    },
               ],
               { cancelable: false }
          );
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
                         } else if (route.name === 'Attendance Report') {
                              iconName = 'filetext1';
                         } else if (route.name === 'User Tracking') {
                              iconName = 'user';
                         }
                         else if (route.name === 'Reimbursement Claim') {
                              iconName = 'retweet';
                         }
                         else if (route.name === 'Holiday') {
                              iconName = 'calendar';
                         }
                         else if (route.name === 'Week Off') {
                              iconName = 'save';
                         }
                         return <AntDesign name={iconName} size={size} color="red" />;
                    },
               })}
          >
               <Drawer.Screen name="Dashboard" component={DashBoard}
                    options={{
                         headerStyle: {
                              backgroundColor: '#f2612b'
                         },
                         headerTitleStyle: {
                              color: 'white',
                              marginLeft: 80,
                         },
                         headerTintColor: 'white',
                         headerTitle: "Kwic Pay",
                         headerRight: () => (
                              <TouchableOpacity onPress={handleLogout}>
                                   <View style={{ marginRight: 10 }}>
                                        <AntDesign name="logout" size={24} color="white" />
                                   </View>
                              </TouchableOpacity>
                         ),
                    }}
               />
               <Drawer.Screen name="Attendance" component={Attendance}
                    options={{
                         headerStyle: {
                              backgroundColor: '#f2612b'
                         },
                         headerTitleStyle: {
                              color: 'white',
                              marginLeft: 70,
                         },
                         headerTintColor: 'white',
                         headerTitle: "Attendance",
                         headerRight: () => (
                              <TouchableOpacity onPress={handleLogout}>
                                   <View style={{ marginRight: 10 }}>
                                        <AntDesign name="logout" size={24} color="white" />
                                   </View>
                              </TouchableOpacity>
                         ),
                    }}
               />
               <Drawer.Screen name="Attendance Report" component={AttendanceReport}
                    options={{
                         headerStyle: {
                              backgroundColor: '#f2612b'
                         },
                         headerTitleStyle: {
                              color: 'white',
                              marginLeft: 50,
                         },
                         headerTintColor: 'white',
                         headerTitle: "Attendance Report",
                         headerRight: () => (
                              <TouchableOpacity onPress={handleLogout}>
                                   <View style={{ marginRight: 10 }}>
                                        <AntDesign name="logout" size={24} color="white" />
                                   </View>
                              </TouchableOpacity>
                         ),
                    }}
               />
               <Drawer.Screen name="Reimbursement Claim" component={ReimbursementClaim}
                    options={{
                         headerStyle: {
                              backgroundColor: '#f2612b'
                         },
                         headerTitleStyle: {
                              color: 'white',
                              marginLeft: 70,
                         },
                         headerTintColor: 'white',
                         headerTitle: "Reimbursement Claim",
                         headerRight: () => (
                              <TouchableOpacity onPress={handleLogout}>
                                   <View style={{ marginRight: 10 }}>
                                        <AntDesign name="logout" size={24} color="white" />
                                   </View>
                              </TouchableOpacity>
                         ),
                    }}
               />
               <Drawer.Screen name="Week Off" component={WeekOff}
                    options={{
                         headerStyle: {
                              backgroundColor: '#f2612b'
                         },
                         headerTitleStyle: {
                              color: 'white',
                              marginLeft: 70,
                         },
                         headerTintColor: 'white',
                         headerTitle: "Week Off",
                         headerRight: () => (
                              <TouchableOpacity onPress={handleLogout}>
                                   <View style={{ marginRight: 10 }}>
                                        <AntDesign name="logout" size={24} color="white" />
                                   </View>
                              </TouchableOpacity>
                         ),
                    }}
               />
               <Drawer.Screen name="Holiday" component={Holiday}
                    options={{
                         headerStyle: {
                              backgroundColor: '#f2612b'
                         },
                         headerTitleStyle: {
                              color: 'white',
                              marginLeft: 70,
                         },
                         headerTintColor: 'white',
                         headerTitle: "Holiday",
                         headerRight: () => (
                              <TouchableOpacity onPress={handleLogout}>
                                   <View style={{ marginRight: 10 }}>
                                        <AntDesign name="logout" size={24} color="white" />
                                   </View>
                              </TouchableOpacity>
                         ),
                    }}
               />
               <Drawer.Screen name="User Tracking" component={UserTracking}
                    options={{
                         headerStyle: {
                              backgroundColor: '#f2612b'
                         },
                         headerTitleStyle: {
                              color: 'white',
                              marginLeft: 70,
                         },
                         headerTintColor: 'white',
                         headerTitle: "User Tracking",
                         headerRight: () => (
                              <TouchableOpacity onPress={handleLogout}>
                                   <View style={{ marginRight: 10 }}>
                                        <AntDesign name="logout" size={24} color="white" />
                                   </View>
                              </TouchableOpacity>
                         ),
                    }}
               />
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
