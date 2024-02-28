import { NavigationContainer, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Snackbar } from 'react-native-paper';

const ReimbursementClaimForm = () => {
  const navigation = useNavigation();
  const [employeeName, setEmployeeName] = useState("");
  const [designation, setDesignation] = useState(null);
  const [location, setLocation] = useState(null);
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [snackBarText, setSnackBarText] = useState('');
  const [visibleSnackBar, setVisibleSnackBar] = useState(false);
  const onShowSnackBar = () => setVisibleSnackBar(true);
  const onDismissSnackBar = () => setVisibleSnackBar(false);
  const [openEmployeeName, setOpenEmployeeName] = useState(false);
  const [openDesignation, setOpenDesignation] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [openFromLocation, setOpenFromLocation] = useState(false);
  const [openToLocation, setOpenToLocation] = useState(false);
  const [openVehicle, setOpenVehicle] = useState(false);

  const employeeNames = [
    { label: 'John Doe', value: 'John Doe' },
    { label: 'Jane Smith', value: 'Jane Smith' },
    // Add more employee names as needed
  ];

  const designations = [
    { label: 'Software Engineer', value: 'Software Engineer' },
    { label: 'Project Manager', value: 'Project Manager' },
    // Add more designations as needed
  ];

  const locations = [
    { label: 'Head Office', value: 'Head Office' },
    { label: 'Branch Office 1', value: 'Branch Office 1' },
    // Add more locations as needed
  ];

  const vehicles = [
    { label: 'Car', value: 'Car' },
    { label: 'Bike', value: 'Bike' },
    // Add more vehicles as needed
  ];

  const loginFormValidate = async () => {
    if (employeeName === null || employeeName === '') {
      setSnackBarText('Please Select Employee Name');
      setVisibleSnackBar(true);
    } else if (designation === null || designation === '') {
      setSnackBarText('Please Select Designation');
      setVisibleSnackBar(true);
    }
    else if (location === null || location === '') {
      setSnackBarText('Please Select location');
      setVisibleSnackBar(true);
    }
    else if (fromLocation === null || fromLocation === '') {
      setSnackBarText('Please Select fromLocation ');
      setVisibleSnackBar(true);
    }
    else if (toLocation === null || toLocation === '') {
      setSnackBarText('Please Select toLocation ');
      setVisibleSnackBar(true);
    }
    else if (selectedVehicle === null || selectedVehicle === '') {
      setSnackBarText('Please Select selectedVehicle ');
      setVisibleSnackBar(true);
    }
    else {
      navigation.navigate("DrawerNav")
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.text}>Employee Name</Text>
          <DropDownPicker
            open={openEmployeeName}
            setOpen={setOpenEmployeeName}
            items={employeeNames}
            value={employeeName}
            setValue={setEmployeeName}
            setItems={setEmployeeName}
            containerStyle={[styles.dropdown, { height: openEmployeeName ? 140 : null }]}
            placeholder='Please Select Employee Name'
          //onChangeItem={(item) => setEmployeeName(item.value)}
          />
        </View>

        <View>
          <Text style={styles.text}>Designation</Text>
          <DropDownPicker
            open={openDesignation}
            setOpen={setOpenDesignation}
            value={designation}
            items={designations}
            setValue={setDesignation}
            setItems={setDesignation}
            defaultValue={designation}
            placeholder='Please Select Designation'
            containerStyle={[styles.dropdown, { height: openDesignation ? 140 : null }]}
          />
        </View>

        <Text style={styles.text}>Location</Text>
        <DropDownPicker
          open={openLocation}
          setOpen={setOpenLocation}
          items={locations}
          value={location}
          setValue={setLocation}
          setItems={setLocation}
          defaultValue={location}
          containerStyle={[styles.dropdown, { height: openLocation ? 140 : null }]}
          placeholder='Please Select Location'
          onChangeItem={(item) => setLocation(item.value)}
        />

        <Text style={styles.text}>From Location</Text>
        <DropDownPicker
          open={openFromLocation}
          setOpen={setOpenFromLocation}
          items={locations}
          value={fromLocation}
          setValue={setFromLocation}
          setItems={setFromLocation}
          containerStyle={[styles.dropdown, { height: openFromLocation ? 140 : null }]}
          placeholder='Please Select From Location'
          onChangeItem={(item) => setFromLocation(item.value)}
        />

        <Text style={styles.text}>To Location</Text>
        <DropDownPicker
          open={openToLocation}
          setOpen={setOpenToLocation}
          items={locations}
          value={toLocation}
          setValue={setToLocation}
          setItems={setToLocation}
          containerStyle={[styles.dropdown, { height: openToLocation ? 140 : null }]}
          placeholder='Please Select To Location'
          onChangeItem={(item) => setToLocation(item.value)}
        />

        <Text style={styles.text}>Vehicle</Text>
        <DropDownPicker
          open={openVehicle}
          setOpen={setOpenVehicle}
          items={vehicles}
          value={selectedVehicle}
          setValue={setSelectedVehicle}
          setItems={setSelectedVehicle}
          containerStyle={[styles.dropdown, { height: openVehicle ? 140 : null }]}
          placeholder='Please Select Vehicle'
          onChangeItem={(item) => setSelectedVehicle(item.value)}
        />

        <View style={{ flexDirection: "row", marginVertical: 40 }}>
          <View
            style={{
              backgroundColor: '#f2612b',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              width: "100%",
              height: 40
            }}>
            <TouchableOpacity onPress={loginFormValidate}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: "700"
                }}>Submit</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
      <Snackbar
        visible={visibleSnackBar}
        onDismiss={onDismissSnackBar}
        style={styles.snackBar}
        action={{
          label: 'Dismiss',
          onPress: () => {
            onDismissSnackBar();
          },
        }}>
        {snackBarText}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  view: {
    height: "40%",
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
    marginVertical: 6,
  },
  dropdown: {
    height: 50,
    // borderColor: '#f2612b',
    // borderWidth: 1,
    borderRadius: 8,
    marginVertical: 4,
  },
  snackBar: {
    backgroundColor: '#003990',
  },
});

export default ReimbursementClaimForm;
