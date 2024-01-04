import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Timeline from 'react-native-timeline-flatlist';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const DashBoard = () => {
  const [selected, setSelected] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [name, setName] = useState("");
  const [employeeType, setEmployeeType] = useState('');
  const [showDash, setShowDash] = useState(null)
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    getEmailFromStorage();
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
      editForm()
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  const getEmailFromStorage = async () => {
    try {
      setShowDash(await AsyncStorage.getItem('EmployeeCode'));
    } catch (error) {
    }
  };
  const editForm = async () => {
    try {
      setName(await AsyncStorage.getItem('name'));
      setEmployeeType(await AsyncStorage.getItem('employeeType'));
      setSelectedPhoto(await AsyncStorage.getItem('selectedPhoto'));
    } catch (error) {
    }
  }
  const navigation = useNavigation();
  const data = [
    {
      time: '09:00',
      title: 'Archery Training',
      icon: require('../../asserts/admin.png'),
      description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
      lineColor: '#009688',
      imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg'
    },
    {
      time: '10:45',
      title: 'Play Badminton',
      icon: require('../../asserts/admin.png'),
      description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.',
      imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg'
    },
    {
      time: '12:00',
      title: 'Lunch',
      icon: require('../../asserts/admin.png'),
    },
    {
      time: '14:00',
      title: 'Watch Soccer',
      icon: require('../../asserts/admin.png'),
      description: 'Team sport played between two teams of eleven players with a spherical ball. ',
      lineColor: '#009688',
      imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240419/1f553dee-0fe4-11e7-8638-6025682232b1.jpg'
    },
    {
      time: '16:30',
      title: 'Go to Fitness center',
      icon: require('../../asserts/admin.png'),
      description: 'Look out for the Best Gym & Fitness Centers around me :)',
      imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg'
    }
  ];
  const onEventPress = (data) => {
    setSelected(data);
  };
  const renderSelected = () => {
    if (selected)
      return <Text style={{ marginTop: 40 }}>Selected event: {selected.title} at {selected.time}</Text>;
  };
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
    <View style={styles.container}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.profile}>
            <View style={{ marginHorizontal: 5 }}>
              <TouchableOpacity onPress={() => navigation.navigate("EditScreen")}>
                {selectedPhoto == null ? (<Image style={styles.imageProfile} source={require("../../asserts/avatar.png")} ></Image>) : (<Image style={styles.imageProfile} source={{ uri: selectedPhoto }} ></Image>)}
              </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 5, paddingTop: 10 }}>
              <Text style={styles.text1}>{name}</Text>
              <Text style={styles.text2}>{employeeType}</Text>
              <Text style={styles.text2}>React Native Developer</Text>
            </View>
            <View style={{ marginHorizontal: 80, }}>
              <TouchableOpacity onPress={() => navigation.navigate("EditScreen")}>
                <Image style={styles.imageEdit} source={require("../../asserts/edit1.png")}></Image>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.profile1}>
            <View style={{ width: "30%", marginHorizontal: 5, borderRightWidth: 1, borderColor: "gray", padding: 4 }}>
              <Text style={[styles.text1, { color: "green" }]}>{currentTime.toLocaleTimeString()}</Text>
              <Text style={styles.text2}>LOGIN</Text>
            </View>
            <View style={{ width: "30%", marginHorizontal: 5, borderRightWidth: 1, borderColor: "gray", paddingTop: 4 }}>
              <Text style={[styles.text1, { color: "#f2612b" }]}> 8.00 HOURS</Text>
              <Text style={styles.text2}> WORKING TIME</Text>
            </View>
            <View style={{ width: "30%", marginHorizontal: 10, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
              <TouchableOpacity onPress={handleLogout}>
                <AntDesign name="logout" size={26} color="#9ed4ff" style={{ marginLeft: 10 }} />
                <Text style={styles.text2}> LOGOUT</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.profile2}>
            <View style={[styles.common, { backgroundColor: "#d8f7e7" }]}>
              <TouchableOpacity onPress={() => navigation.navigate("Attendance")}>
                <AntDesign name="logout" size={50} color="green" style={styles.commoniImageOut} />
                <Text style={[styles.text2, { color: "#669882" }]}>LOGIN</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.common, { backgroundColor: "#f6f0e3" }]}>
              <TouchableOpacity onPress={() => navigation.navigate("User Tracking")}>
                <FontAwesome6 name="map-location" size={50} color="#f2d779" style={styles.commoniImageOut} />
                <Text style={[styles.text2, { color: "#b0a469" }]}> LOGIN POINT </Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.common, { backgroundColor: "#def5ff" }]}>
              <TouchableOpacity onPress={() => navigation.navigate("Attendance")}>
                <AntDesign name="logout" size={50} color="#9ed4ff" style={styles.commoniImageOut} />
                <Text style={[styles.text2, { color: "#a4bfd0" }]}> LOGOUT </Text>
              </TouchableOpacity>
            </View>
          </View>
          {showDash ? (<ScrollView contentContainerStyle={styles.scrollViewContent}>
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
            <View style={[styles.certificate, { marginBottom: 60 }]}>
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
              <View style={[styles.timeLine, { marginTop: 10 }]}>
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
        </ScrollView>
      </View>
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
  },
  profile2: {
    height: 120,
    marginHorizontal: 6,
    marginTop: 8,
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
    width: 390,
    marginTop: 16,
    overflow: 'hidden',
    resizeMode: 'contain',
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
    fontSize: 18,
    marginVertical: 2
  },
  text2: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 13,
    marginVertical: 2
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
    width: "30%", marginHorizontal: 2,
    backgroundColor: "red", borderRadius: 10,
    justifyContent: "center", alignItems: "center"
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
