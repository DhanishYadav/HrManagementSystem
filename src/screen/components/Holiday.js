import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Linking, ScrollView } from 'react-native';

const LeaveForm = () => {
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const handleSubmit = () => {
    // Perform form validation
    if (!leaveType || !startDate || !endDate || !reason || !name || !code) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }
    setLeaveType('');
    setStartDate('');
    setEndDate('');
    setReason('');
    setCode("");
    setName("");
    Alert.alert('Success', 'Leave request submitted successfully');
  };

  const handleSendEmail = () => {
    const subject = 'Leave Request';
    const body = `Leave Type: ${leaveType}\nStart Date: ${startDate}\nEnd Date: ${endDate}\nReason: ${reason}`;
    const recipient = 'trishapandey2783@gmail.com'; // Replace with HR's email address

    const mailToUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;
    Linking.openURL(mailToUrl);
    handleSubmit()
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Employee Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={text => setName(text)}
        />
        <Text style={styles.label}>Employee Code</Text>
        <TextInput
          style={styles.input}
          value={code}
          onChangeText={text => setCode(text)}
        />
        <Text style={styles.label}>Leave Type</Text>
        <TextInput
          style={styles.input}
          value={leaveType}
          onChangeText={text => setLeaveType(text)}
        />

        <Text style={styles.label}>Start Date</Text>
        <TextInput
          style={styles.input}
          value={startDate}
          onChangeText={text => setStartDate(text)}
          placeholder="YYYY-MM-DD"
        />

        <Text style={styles.label}>End Date</Text>
        <TextInput
          style={styles.input}
          value={endDate}
          onChangeText={text => setEndDate(text)}
          placeholder="YYYY-MM-DD"
        />

        <Text style={styles.label}>Reason</Text>
        <TextInput
          style={styles.input}
          maxLength={200}
          value={reason}
          onChangeText={text => setReason(text)}
          multiline
          placeholder="Enter reason for leave..."
          placeholderTextColor="#999"
          numberOfLines={9} // Adjust as needed
          textAlignVertical="top" // Align text to the top of the TextInput
        />
        <TouchableOpacity onPress={handleSendEmail}>
          <View style={[styles.button, { backgroundColor: '#f2612b' }]}>
            <Text style={styles.buttonText}>Send Email to HR</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LeaveForm;
