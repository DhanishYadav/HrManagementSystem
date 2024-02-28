import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Timeline from 'react-native-timeline-flatlist';
import { View, Text, StyleSheet, ImageBackground, ScrollView, RefreshControl, Image, TouchableOpacity, Alert, ActivityIndicator, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import Colors from '../constant/Colors';
const DashBoard = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [curentDistance, serCurrentDistance] = useState(0.0);
  const predefinedLocation = { latitude: 26.8630268, longitude: 81.0006124 };
  const [selected, setSelected] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loginDepartment, setLoginDepartment] = useState(null);
  const [name, setName] = useState("");
  const [Employeename, setEmployeeName] = useState("");
  const [employeeType, setEmployeeType] = useState('');
  const [showDash, setShowDash] = useState("")
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState(null);
  const [currentTimeDate, setCurrentTimeDate] = useState(new Date());
  const [isloading, setIsLoading] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);
  const [userShow, setHide] = useState(true);
  const [show, setShow] = useState(true);
  useEffect(() => {
    getEmailFromStorage();
    setCurrentTimeDate(new Date().toLocaleTimeString().toUpperCase());
    const intervalId = setInterval(() => {
      editForm()
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    calculateDistance();
    getCurrentLocation();
    CurrentDate();
    const intervalId = setInterval(getCurrentLocation, 60000);
    return () => clearInterval(intervalId);
  }, []);
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      error => {
        console.error('Error getting current location:', error);
      },
      { enableHighAccuracy: true, timeout: 50000, maximumAge: 1000 }
    );
  };
  const calculateDistance = () => {
    if (currentLocation && predefinedLocation) {
      const distance = haversine(currentLocation.latitude, currentLocation.longitude, predefinedLocation.latitude, predefinedLocation.longitude);
      //console.log('Distance:', distance, currentTimeDate);
      serCurrentDistance(distance)
      if (distance <= 100) {
        Alert.alert('Punch In', 'You are within 100 meters of the KWIC PAY location' + " " + distance.toFixed(2) + " " + "meters");
      } else {
        Alert.alert('Distance Alert', 'You are more than 100 meters away from the KWIC PAY  location' + " " + distance.toFixed(2) + " " + "meters");
      }
    }
  };
  const haversine = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = (R * c) * 1000;
    return distance;
  };
  const toRadians = angle => (Math.PI * angle) / 180;
  const getEmailFromStorage = async () => {
    try {
      setLoginDepartment(await AsyncStorage.getItem('environmentValue'));
      setShowDash(await AsyncStorage.getItem('EmployeeCode'));
      setEmployeeName(await AsyncStorage.getItem('EmployeeName'));
    } catch (error) {
    }
  };
  const editForm = async () => {
    try {
      setName(await AsyncStorage.getItem('name'));
      setEmployeeType(await AsyncStorage.getItem('employeeType'));
      setSelectedPhoto(await AsyncStorage.getItem('selectedPhoto'));
      setCurrentTime(await AsyncStorage.getItem('currentTime'));
    } catch (error) {
    }
  }
  const navigation = useNavigation();
  const data = [
    {
      time: '09:00',
      title: 'DSA Training',
      icon: require('../../asserts/admin.png'),
      description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
      lineColor: '#009688',
      imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg'
    },
    {
      time: '10:45',
      title: 'Meeting with Sales',
      icon: require('../../asserts/admin.png'),
      description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.',
      imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg'
    },
    {
      time: '12:00',
      title: 'Meeting with Team Leader',
      icon: require('../../asserts/admin.png'),
    },
    {
      time: '14:00',
      title: 'Lunch',
      icon: require('../../asserts/admin.png'),
      description: 'Team sport played between two teams of eleven players with a spherical ball. ',
      lineColor: '#009688',
      imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240419/1f553dee-0fe4-11e7-8638-6025682232b1.jpg'
    },
    {
      time: '16:30',
      title: 'Go to Sale Center',
      icon: require('../../asserts/admin.png'),
      description: 'Look out for the Best Gym & Fitness Centers around me :)',
      imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg'
    }
  ];
  const onEventPress = (data) => {
    setSelected(data);
  };
  const CurrentDate = () => {
    const currentDate = new Date();
    setCurrentDate(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`);
  }
  const renderSelected = () => {
    if (selected)
      return <Text style={{ marginTop: 40 }}>Selected event: {selected.title} at {selected.time}</Text>;
  };
  //console.log(predefinedLocation, showDash, Employeename, curentDistance)
  const dataLogin = async () => {
    setIsLoading(true);
    const url = `https://hrms.kwicpay.com/api/WebAPI/DepartmentIN?Emp_Name=${Employeename}&Emp_Code=${showDash}&Distance=${curentDistance}`;
    console.log(url)
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const textResponse = await response.json();
      console.log(textResponse, "dada")
      if (textResponse.API_STATUS === "OK") {
        Alert.alert('Data Send Successfully', textResponse.MSG);
        navigation.navigate("Dashboard");
        setIsLoading(false);
        setHide(!userShow)
      } else {
        setIsLoading(false);
        Alert.alert('Error Signed', textResponse.MSG);
        setHide(!userShow)
        //console.log(textResponse, "textResponsetextResponse");
        return;
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error Signed', textResponse.MSG);
      console.log(error);
    }
  };
  const departmentOut = async () => {
    setIsLoading(true);
    const url = `https://hrms.kwicpay.com/api/WebAPI/DepartmentOUT?Emp_Name=${Employeename}&Emp_Code=${showDash}&Distance=${curentDistance}&AT_INDATE=${currentDate}`;
    console.log(url)
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const textResponse = await response.json();
      //console.log(textResponse, "dada")
      if (textResponse.API_STATUS === "OK") {
        Alert.alert('Data Send Successfully', textResponse.MSG);
        navigation.navigate("Dashboard");
        setIsLoading(false);
        setHide(!userShow)
      } else {
        setIsLoading(false);
        setHide(!userShow)
        Alert.alert('Error Signed', textResponse.MSG);
        return;
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error Signed', textResponse.MSG);
      console.log(error);
    }
  };
  const UserPunchIN = () => {
    setShow(false)
    navigation.navigate("Attendance")
  }
  const UserPunchOUT = () => {
    setShow(true)
    navigation.navigate("CheckOut")
  }
  if (isloading) {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <ActivityIndicator size="40" color={Colors.accent} />
          <Text style={{ color: '#000', marginTop: 30, fontSize: 16, fontWeight: "bold" }}>Please wait while we process your request...</Text>
        </View>
      </View>);
  }
  return (
    <View style={styles.container}>
      <ScrollView
        style={{ backgroundColor: '#ffffff', flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={calculateDistance}
            progressViewOffset={80}
            colors={['#f2612b', '#2471A3', '#f2612b']}
          />
        }
      >
        <View style={styles.container}>


          <View style={styles.profile}>
            <View style={{ marginHorizontal: 5 }}>
              <TouchableOpacity onPress={() => navigation.navigate("EditScreen")}>
                {selectedPhoto == null ? (<Image style={styles.imageProfile} source={require("../../asserts/avatar.png")} ></Image>) : (<Image style={styles.imageProfile} source={{ uri: selectedPhoto }} ></Image>)}
              </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 5, paddingTop: 20 }}>
              {name == null ? (<Text style={{ color: "gray", fontSize: 16, fontWeight: "bold" }}>Employee Name</Text>) : <Text style={{ color: "gray", fontSize: 16, fontWeight: "bold" }}>{name}</Text>}
              {employeeType == null ? (<Text style={{ color: "gray", fontSize: 16, fontWeight: "bold" }}>Employee Type</Text>) : <Text style={{ color: "gray", fontSize: 16, fontWeight: "bold" }}>{employeeType}</Text>}
              <Text style={styles.text2}>One Key Technology "KwicPay"</Text>
            </View>
            <View style={{ marginHorizontal: 10, }}>
              <TouchableOpacity onPress={() => navigation.navigate("EditScreen")}>
                <Image style={styles.imageEdit} source={require("../../asserts/edit1.png")}></Image>
              </TouchableOpacity>
            </View>
          </View>
          {loginDepartment === "1" || loginDepartment === "4" || loginDepartment === "3" ? (
            <>
              {
                curentDistance <= 100 ? (<View style={styles.profile2}>
                  <>
                    {userShow && (
                      <View style={[styles.commonContainer]}>
                        <TouchableOpacity onPress={dataLogin} style={styles.commonUser}>
                          <FontAwesome6 name="fingerprint" size={50} color="green" style={styles.commoniImageOut} />
                          <Text style={[styles.text2, { color: "#669882", fontSize: 12, marginTop: 0 }]}>PUNCH IN</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </>
                  <>
                    {!userShow && (<><View style={[styles.common, { backgroundColor: "#f6f0e3", justifyContent: "center" }]}>
                      {currentTimeDate == null || currentTimeDate == "" ? (
                        <Text style={[styles.text1, { color: "red", textAlign: "center", marginTop: 0 }]}>TIME</Text>
                      ) : (
                        <Text style={[styles.text1, { color: "#f2612b", textAlign: "center", marginTop: 0 }]}>{currentTimeDate}</Text>
                      )}
                      <TouchableOpacity onPress={() => navigation.navigate("User Tracking")}>
                        <MaterialIcons name="more-time" size={50} color="#f2d779" style={styles.commoniImageOut} />
                        <Text style={[styles.text2, { color: "#b0a469", marginBottom: 5 }]}>IN TIME</Text>
                      </TouchableOpacity>
                    </View>
                      <View style={[styles.common, { backgroundColor: "#F5CBA7" }]}>
                        <Text style={[styles.text1, { color: "white", fontSize: 15 }]}> 8.00 HOURS</Text>
                        <MaterialIcons name="assured-workload" size={50} color="white" style={styles.commoniImageOut} />
                        <Text style={[styles.text1, { color: "white", fontSize: 14, textAlign: "center" }]}> WORKING TIME</Text>
                      </View>
                      <View style={[styles.common, { backgroundColor: "#ff6666" }]}>
                        <TouchableOpacity onPress={departmentOut}>
                          <MaterialCommunityIcons name="fingerprint-off" size={56} color="white" style={styles.commoniImageOut} />
                          <Text style={[styles.text2, { color: "white", marginTop: 15 }]}>PUNCH OUT</Text>
                        </TouchableOpacity>
                      </View></>)}
                  </>
                </View>) : (<View style={{ backgroundColor: "white", width: "auto", marginVertical: 5, height: 60, borderRadius: 10, marginHorizontal: 10, justifyContent: "center" }}>
                  <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", color: "red" }}>
                    'You are more than 100 meters away from the predefined location',{curentDistance.toFixed(2)} Meters
                  </Text>
                </View>
                )
              }
            </>
          ) : (
            <>
              <View style={styles.profile1}>
                <View style={{ width: "50%", marginHorizontal: 5, borderRightWidth: 1, borderColor: "gray", padding: 4 }}>
                  {currentTime == null ? (
                    <Text style={[styles.text1, { color: "red", textAlign: "center" }]}>TIME</Text>
                  ) : (
                    <Text style={[styles.text1, { color: "#f2612b", textAlign: "center" }]}>{currentTime}</Text>
                  )}
                  <Text style={[styles.text1, { fontSize: 16, textAlign: "center" }]}>ATTENDANCE TIME</Text>
                </View>
                <View style={{ width: "40%", marginHorizontal: 5, paddingTop: 4 }}>
                  <Text style={[styles.text1, { color: "#f2612b", fontSize: 15, textAlign: "center" }]}> 8.00 HOURS</Text>
                  <Text style={[styles.text1, { fontSize: 16, textAlign: "center" }]}> WORKING TIME</Text>
                </View>
              </View>
              <View style={styles.profile2}>
                {show === true ? (<><View style={[styles.commonContainer]}>
                  <TouchableOpacity onPress={UserPunchIN} style={styles.commonUser}>
                    <FontAwesome6 name="fingerprint" size={50} color="green" style={styles.commoniImageOut} />
                    <Text style={[styles.text2, { color: "#669882" }]}>PUNCH IN</Text>
                  </TouchableOpacity>
                </View></>) : (<>
                  <View style={[styles.common, { backgroundColor: "#f6f0e3", width: "50%" }]}>
                    <TouchableOpacity onPress={() => navigation.navigate("Attendance")}>
                      <FontAwesome6 name="map-location" size={50} color="#f2d779" style={styles.commoniImageOut} />
                      <Text style={[styles.text2, { color: "#b0a469" }]}>PUNCH LOCATION</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.common, { backgroundColor: "#ff6666", width: "48%" }]}>
                    <TouchableOpacity onPress={UserPunchOUT}>
                      <MaterialCommunityIcons name="fingerprint-off" size={56} color="white" style={styles.commoniImageOut} />
                      <Text style={[styles.text2, { color: "white" }]}>PUNCH OUT</Text>
                    </TouchableOpacity>
                  </View>
                </>)}

              </View>
            </>
          )}

          {!showDash ? (<ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.certificate}>
              <ImageBackground
                source={require("../../asserts/car4.png")}
                style={styles.image}
              >
                <View style={{ marginTop: 60 }}>
                  <Text style={[styles.text, { fontSize: 28 }]}>Certificate Of Achievement</Text>
                  <Text style={styles.text}>Proudly Presented To</Text>
                  <Text style={[styles.text, { fontSize: 22, color: "#f2612b" }]}>Dhanish Yadav</Text>
                  <Image style={styles.imageAdmin} source={require("../../asserts/admin.png")}></Image>
                  <Text style={[styles.text, { marginTop: 20 }]}>For his outstanding performance service, hard work, and dedication as Employee of the 1st Quarter 2023</Text>
                </View>
              </ImageBackground>
            </View>
            <View style={[styles.certificate, { marginBottom: 60, marginTop: 6 }]}>
              <ImageBackground
                source={require("../../asserts/car4.png")}
                style={styles.image}
              >
                <View style={{ marginTop: 60 }}>
                  <Text style={[styles.text, { fontSize: 28 }]}>Certificate Of Achievement</Text>
                  <Text style={styles.text}>Proudly Presented To</Text>
                  <Text style={[styles.text, { fontSize: 22, color: "#f2612b" }]}>Dhanish Yadav</Text>
                  <Image style={styles.imageAdmin} source={require("../../asserts/admin.png")}></Image>
                  <Text style={[styles.text, { marginTop: 20 }]}>For his outstanding performance service, hard work, and dedication as Employee of the 1st Quarter 2023</Text>
                </View>
              </ImageBackground>
            </View>
          </ScrollView>) : (
            <View>
              <View style={[styles.timeLine, { marginTop: 15 }]}>
                <TouchableOpacity style={styles.timeLine}>
                  <FontAwesome6 name="timeline" size={30} color="#9ed4ff" style={[styles.commoniImageOut, { paddingTop: 20 }]} />
                  <Text style={[styles.text1, { fontSize: 22, paddingBottom: 0 }]}>Time Line</Text>
                </TouchableOpacity>
              </View>
              {/* TimeLine Start */}
              <View style={styles.timeline}>
                {renderSelected()}
                <Timeline
                  style={styles.list}
                  data={data}
                  circleSize={20}
                  circleColor='rgba(0,0,0,0)'
                  lineColor='rgb(45,156,219)'
                  timeContainerStyle={{ minWidth: 52, marginTop: 3 }}
                  timeStyle={{ textAlign: 'center', backgroundColor: '#f2612b', color: 'white', padding: 5, borderRadius: 13, fontWeight: "bold" }}
                  descriptionStyle={{ color: 'gray' }}
                  options={{
                    style: { paddingTop: 5 }
                  }}
                  innerCircle={'icon'}
                  onEventPress={onEventPress}
                  separator={false}
                  detailContainerStyle={{ marginBottom: 20, paddingLeft: 5, paddingRight: 5, backgroundColor: "#BBDAFF", borderRadius: 10 }}
                  columnFormat='two-column'
                />
              </View>
              {/* TimeLine  */}
            </View>)}
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    height: 120,
    marginHorizontal: 6,
    backgroundColor: "white",
    marginTop: 4,
    borderRadius: 10,
    flexDirection: "row", paddingVertical: 10, elevation: 20
  },
  profile1: {
    height: 80,
    marginHorizontal: 6,
    backgroundColor: "white",
    marginTop: 4,
    borderRadius: 10,
    flexDirection: "row",
    paddingVertical: 10,
    width: "97%", elevation: 20,
    justifyContent: "space-between"
  },
  profile2: {
    height: 120,
    marginHorizontal: 6,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeLine: {
    height: 60,
    marginHorizontal: 6,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: 'center',
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  certificate: {
    height: 400,
    borderRadius: 10,
    width: 380,
    overflow: 'hidden',
    resizeMode: 'contain',
    marginHorizontal: 6,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 2
  },
  text1: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 16,
  },
  text2: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 13,
  },
  imageAdmin: {
    height: 100,
    width: 100,
    borderRadius: 30,
    alignSelf: "center",
    marginTop: 15
  },
  imageProfile: {
    height: 100,
    width: 100,
    borderRadius: 50,
    resizeMode: "center"
  },
  imageEdit: {
    height: 40,
    width: 40,
  },
  imageOut: {
    height: 30,
    width: 30,
    marginLeft: 10
  },
  commoniImageOut: {
    height: 60,
    width: 60,
    alignSelf: "center"
  },
  common: {
    width: "31%", marginHorizontal: 2,
    backgroundColor: "red", borderRadius: 10,
    justifyContent: "center", alignItems: "center",
    height: 100
  },
  commonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  commonUser: {
    width: "31%",
    backgroundColor: "#d8f7e7",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 100
  },
  timeline: {
    flex: 1,
    padding: 20,
    paddingTop: 5,
    backgroundColor: 'white',
    marginTop: 10
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  descriptionContainer: {
    flexDirection: 'row',
    paddingRight: 50
  },
  imageLine: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  textDescription: {
    marginLeft: 10,
    color: 'gray'
  }
});

export default DashBoard;
