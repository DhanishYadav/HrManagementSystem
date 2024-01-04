import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Alert } from 'react-native';
import { Text } from 'react-native-paper';

const OtpScreen = () => {
     const [pin1, setPin1] = useState('');
     const [pin2, setPin2] = useState('');
     const [pin3, setPin3] = useState('');
     const [pin4, setPin4] = useState('');
     const input2Ref = useRef(null);
     const input3Ref = useRef(null);  
     const input4Ref = useRef(null);
     const handlePinChange = (pin, setter, nextRef, currentRef) => {
          if (pin.length === 1) {
               setter(pin);
               if (nextRef && nextRef.current) {
                    nextRef.current.focus();
               } else {
                    submitOTP();
               }
          } else if (pin === '') {
               if (currentRef === input4Ref) {
                    input3Ref.current.focus();
               } else if (currentRef === input3Ref) {
                    input2Ref.current.focus();
               } else if (currentRef === input2Ref) {
                    input2Ref.current.focus();
               }
          }
     };
     const submitOTP = () => {
          Alert.alert('OTP Confirmation', '', [
               {
                    text: 'Ok',
                    onPress: () => {
                         setPin1('');
                         setPin2('');
                         setPin3('');
                         setPin4('');
                    },
               },
          ]);
     };
     useEffect(() => {
          if (pin1 && pin2 && pin3 && pin4) {
             submitOTP();
          }
     },[pin1, pin2, pin3, pin4]);
     return (
          <View style={{ flex: 1, backgroundColor: '#170c8d', }}>
               <Text style={{ fontSize: 23, fontWeight:"bold", color: "white", alignSelf: "center", 
               position:"absolute",
               left:140,
               top:170
               }}>OTP SCREEN</Text>
               <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center', margin: 0 }}>
                         <TextInput
                              maxLength={1}
                              // editable={pin1.length === 0}
                              cursorColor={"white"}
                              onChangeText={(pin1) => handlePinChange(pin1, setPin1, input2Ref, input2Ref)}
                              value={pin1}
                              style={{
                                   backgroundColor: '#f2612a',
                                   color: 'white',
                                   fontSize: 20,
                                   borderWidth:1,
                                   width: 50,
                                   fontWeight: '600',
                                   elevation: 30,
                                   height: 50,
                                   borderRadius: 10,
                                   textAlign: 'center',
                                   borderColor:"white"
                              }}
                         />
                    </View>
                    <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center', padding: 0 }}>
                         <TextInput
                              maxLength={1}
                              // editable={pin2.length === 0}
                              cursorColor={"white"}
                              onChangeText={(pin2) => handlePinChange(pin2, setPin2, input3Ref, input2Ref)}
                              value={pin2}
                              style={{
                                   backgroundColor: '#f2612a',
                                   color: 'white',
                                   fontSize: 20,
                                   borderWidth: 1,
                                   width: 50,
                                   fontWeight: '600',
                                   elevation: 30,
                                   height: 50,
                                   borderRadius: 10,
                                   textAlign: 'center',
                                   borderColor:"white"
                              }}
                              ref={input2Ref}
                         />
                    </View>
                    <View style={{ flex: 0.2, justifyContent: 'center', color: 'white', alignItems: 'center' }}>
                         <TextInput
                              maxLength={1}
                              cursorColor={"white"}
                              onChangeText={(pin3) => handlePinChange(pin3, setPin3, input4Ref, input3Ref)}
                              value={pin3}
                              style={{
                                   backgroundColor: '#f2612a',
                                   color: 'white',
                                   fontSize: 20,
                                   borderWidth:1,
                                   width: 50,
                                   fontWeight: '600',
                                   elevation: 20,
                                   height: 50,
                                   borderRadius: 10,
                                   textAlign: 'center',
                                   borderColor:"white"
                              }}
                              ref={input3Ref}
                         />
                    </View>
                    <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                         <TextInput
                              maxLength={1}
                              cursorColor={"white"}
                              onChangeText={(pin4) => handlePinChange(pin4, setPin4, null, input4Ref)}
                              value={pin4}
                              style={{
                                   backgroundColor: '#f2612a',
                                   color: 'white',
                                   fontSize: 20,
                                   borderWidth:1,
                                   width: 50,
                                   fontWeight: '600',
                                   elevation: 20,
                                   height: 50,
                                   borderRadius: 10,
                                   textAlign: 'center',
                                   borderColor:"white"
                              }}
                              ref={input4Ref}
                         />
                    </View>
               </View>
          </View>
     );
};
export default OtpScreen; 
 