import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableHighlight, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import DropDownPicker from 'react-native-dropdown-picker';
import { Snackbar, TextInput } from 'react-native-paper';
const Example = () => {
     const [open, setOpen] = useState(false);
     const [value, setValue] = useState(null);
     const [name, setName] = useState(null);
     const [snackBarText, setSnackBarText] = useState('');
     const [visibleSnackBar, setVisibleSnackBar] = useState(false);
     const onShowSnackBar = () => setVisibleSnackBar(true);
     const onDismissSnackBar = () => setVisibleSnackBar(false);
     const [EmployeeName, setEmployeeName] = useState('');
     const [employeeCode, setEmployeeCode] = useState('');
     const NumberToWords = (number) => {
          const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
          const teens = ['Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
          const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

          const convertLessThanOneThousand = (num) => {
               if (num === 0) return '';
               if (num < 10) return units[num];
               if (num < 20) return teens[num - 11];
               const unitDigit = num % 10;
               const tenDigit = Math.floor(num / 10) % 10; // Fix this line
               const hundredDigit = Math.floor(num / 100);
               let result = '';
               if (hundredDigit) {
                    result += `${units[hundredDigit]} Hundred `;
               }
               if (tenDigit) {
                    if (tenDigit === 1 && unitDigit) {
                         result += teens[unitDigit];
                    } else {
                         result += tens[tenDigit];
                         if (unitDigit) {
                              result += ` ${units[unitDigit]}`;
                         }
                    }
               } else if (unitDigit) {
                    result += units[unitDigit];
               }

               return result;
          };

          const convert = (num) => {
               if (num === 0) return 'Zero';

               const billion = Math.floor(num / 1000000000);
               const million = Math.floor((num % 1000000000) / 1000000);
               const thousand = Math.floor((num % 1000000) / 1000);
               const remainder = num % 1000;

               let result = '';

               if (billion) {
                    result += `${convertLessThanOneThousand(billion)} Billion `;
               }
               if (million) {
                    result += `${convertLessThanOneThousand(million)} Million `;
               }
               if (thousand) {
                    result += `${convertLessThanOneThousand(thousand)} Thousand `;
               }
               if (remainder) {
                    if (thousand && remainder < 100) {
                         result += 'and ';
                    }
                    result += convertLessThanOneThousand(remainder);
               }

               return result.trim();
          };

          return convert(number);
     };
     const totalBalance = 90099;
     const formattedTotalBalance = Math.floor(totalBalance);
     const createPDF = async () => {

          const currentDate = new Date().toLocaleDateString();
          const receiptData = {
               date: currentDate,
               amount: '$100.00',
               payer: 'John Doe',
               purpose: 'Payment for goods/services',
          };
          const htmlContent = `
          <head>
           <meta charset="UTF-8">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <style>
           body {
               font-family: 'Arial', sans-serif;
               background-color: #ffffff;
               margin: 0;
               padding:10px;
           }
           #container {
                padding: 10px;
           }
           .custom-class {
               color: blue;
               font-weight: bold;
           }
           #image {
               display: block;
               height: 80px;
               color:white;
               font-size:16;
               align-items: center;
               align-self: center;
               text-align:center;
               width:80px;
               transform: skewX(30deg); /* Adjust the degree value as needed */
               border-radius: 10px; /* Adjust the border-radius value as needed */
               background-color:#e44f26;
               box-shadow: 
                   0 0 10px rgba(0,0,0,.5), /* Outer shadow */
                   inset 0 0 rgba(0,0,0,1) /* Inner shadow */
                   
           }
           img {
               display: block;
               height: 80px;
               width: 80px;
               border-radius: 10px;
           }

           .parent {
               display: flex;
               min-height: 100px;
               width: "100%";
               flex-direction: row;
               justify-content: space-between;
               align-items: center;
               align-self: center;
               border-bottom: 2px solid #ddd;
           }

           .parent div {
               margin-right: 10px;
           }
           .emp p {
               color: gray;
               font-size: medium;
               padding: 0px;
           }

           .emp1 p {
               color: black;
               font-size: medium;
               padding: 0px;
           }
           #payment {
               height: 200px;
               width: 210px;
               border: 2px solid gray;
               border-radius: 10px;
           }

           #border {
               height:80px;
               width: 210px;
               background-color: #edfcf1;
               border-bottom:1px dotted black;
               padding: 0px;
               border-radius: 10px;
               padding-top:10px;
           }
           #earnigDiv {
               min-height: 200px;
               margin-top: 11px;
               padding: 10px;
               min-width: "100%";
               border-radius: 10px;
               border: 2px solid #adabab;
           }
           #earingP1 {
               min-width: '100%';
               min-height: 50px;
               justify-content: space-between;
               flex-direction: row;
               display: flex;
           }
           #e1 {
               min-width:360px;
               min-height: 40px;
               align-items: center;
               justify-content: space-between;
               flex-direction: row;
               display: flex;
               border-bottom: 2px dotted #c3bebe;
           }

           #e1 span {
               color: gray;
               font-size: medium;
               padding: 0px;
               font-weight: bold
           }
           #e11 {
               min-width: 360px;
               min-height: 30px;
               align-items: center;
               justify-content: space-between;
               flex-direction: row;
               display: flex;

           }
           #spanText {
               color: gray;
               font-size: medium;
           }

            #spanNo {
               color: black;
               font-size: medium;
           }
           #earnig {
               min-height: 50px;
               margin-top:20px;
               min-width: "100%";
               border-radius: 10px;
               border: 2px solid #adabab;
               flex-direction: row;
               display: flex;
               justify-content: space-between;
               align-items: center;
           }

           #pay {
               background-color: #edfcf1;
               width: 200px;
               height:30px;
               text-align: center;
               justify-content: center;
               border-radius: 10px;
               padding-top:20px;
           }

           #last {
               min-height: 50px;
               min-width: "100%";
               border-radius: 10px;
               border-bottom: 2px solid #adabab;
               flex-direction: row;
               display: flex;
               justify-content: flex-end;
               align-items: center;
               margin-top: 20px;
               margin-left:10px;
           }
           </style>
           <title>Payment Details</title>
          </head>
<body>
     <div id="container" class="custom-class">
          <div class="parent">
               <div id="image">
                <h4 style=margin-top:6px> K <br/> KWICPAY<br/><span>Quick Secure</span></h4>
               </div >
               <div>
                    <span style="color:orange;font-size:large;">KWICPAY</span>
                    <p style="color:gray;font-size:15px;">B 3/42, Vibhuti Khand,Gomti Nagar Lucknow 226010
                         India</p>
               </div>
               <div>
                    <span style="color:gray;font-size:medium;padding:0px;">Payslip For The Month</span>
                    <p  style="color:black;font-size:large;">Date: ${receiptData.date}</p>
               </div>
          </div >
          <div class="parent" style="border-bottom:0px solid black;margin-top:10px;">
           <div style="flex-direction:row; display: flex;">
               <div class="emp">
                    <h4 style="color:gray;font-size:medium;padding:0px;font-weight:bold;">EMPLOYEE SUMMARY</h4>
                    <p>Employee Name </p>
                    <p>Employee Id</p>
                    <p>Pay Period</p>
                    <p>Pay Date</p>
               </div>
               <div class="emp1" style="margin-top:40px;;">
                    <h4> </h4>
                    <p>: &nbsp;&nbsp;&nbsp; Dhanish Yadav</p>
                    <p>: &nbsp;&nbsp;&nbsp; 10KP631</p>
                    <p>: &nbsp;&nbsp;&nbsp; December</p>
                    <p>: &nbsp;&nbsp;&nbsp; ${receiptData.date}</p>
               </div>
          </div>
          <div id="payment">
                    <div id="border">
                         <p style="color:black;font-size:medium;">&nbsp;  &nbsp;  &nbsp;₹ ${formattedTotalBalance}</p>
                         <p style="color:gray;font-size:medium;"> &nbsp; &nbsp;  &nbsp; Employee Net Pay</p>
                    </div>
                    <div>
                         <p style="color:black;font-size:medium;"> &nbsp;  &nbsp;Paid Days &nbsp; &nbsp;&nbsp; &nbsp;:&nbsp;31</p>
                         <p style="color:black;font-size:medium;"> &nbsp;  &nbsp;Paid LOF &nbsp;&nbsp;&nbsp; &nbsp; &nbsp;:&nbsp;0</p>
                    </div>
               </div>
     </div>
     <div id="earnigDiv" style="margin-top:20px;">
     <div id="earingP1">
          <div id="e1">
               <span>EARNINGS</span>
               <span>AMOUNT</span>
          </div>
          <div id="e1">
               <span>DEDUCTIONS</span>
               <span>AMOUNT</span>
          </div>
     </div>
     <div id="earingP1">
                    <div id="e11">
                         <span id="spanText">Basic</span>
                         <span id="spanNo">₹ 17,500</span>
                    </div>
                    <div id="e11">
                         <span id="spanText">Income Tax</span>
                         <span id="spanNo">₹ 0.00</span>
                    </div>
               </div>
               <div id="earingP1">
                    <div id="e11">
                         <span id="spanText">House Rent Allowance</span>
                         <span id="spanNo">₹ 9,000.00</span>
                    </div>
                    <div id="e11">
                         <span id="spanText">Provident Fund</span>
                         <span id="spanNo">₹2160.00</span>
                    </div>
               </div>
               <div id="earingP1">
                    <div id="e11">
                         <span id="spanText">Conveyance Allowance</span>
                         <span id="spanNo">₹ 1,000.00</span>
                    </div>
                    <div id="e11">
                    </div>
               </div>
               <div id="earingP1">
                    <div id="e11">
                         <span id="spanText">Medical Allowance</span>
                         <span id="spanNo">₹ 15,00.00</span>
                    </div>
                    <div id="e11">
                    </div>
               </div>
               <div id="earingP1">
                    <div id="e11">
                         <span id="spanText">Communication Allowance</span>
                         <span id="spanNo">₹ 660.00</span>
                    </div>
                    <div id="e11">
                    </div>
               </div>
               <div id="earingP1">
                    <div id="e11">
                         <span id="spanText">Travel Allowance</span>
                         <span id="spanNo">₹ 2,000.00</span>
                    </div>
                    <div id="e11">

                    </div>
               </div>
               <div id="earingP1" style="background-color: #f8f8fb;padding:0px;margin-top:10px;border-radius: 10px;">
                    <div id="e11" style="margin-left:20px;">
                         <span id="spanText">Gross Earnings</span>
                         <span id="spanNo">₹ 32,000.00</span>
                    </div>
                    <div id="e11" style="margin-right:20px;">
                         <span id="spanText" style="margin-left:20px">Total Deductions</span>
                         <span id="spanNo">₹ 2,160.00</span>
                    </div>
               </div>
</div>
<div id="earnig">
<div style="margin-left:20px;">
     <span id="spanNo">TOTAL NET PAYABLE</span>
     <br />
     <span id="spanText">Gross Earning - Total Deduction</span>
</div>
<div id="pay">
     <span id="spanNo" style="margin-right: 20px">₹ ${formattedTotalBalance}</span>
</div>
</div>
<div id="last">
<div>
<span id="spanText">Amount In Words:</span>
<span id="spanNo"> Indian Rupees ${NumberToWords(formattedTotalBalance)} Only</span>
</div>
</div>
     </div >
</body >
     `;
          const options = {
               html: htmlContent,
               fileName: 'payment_receipt',
               directory: 'Documents',
          };
          try {
               const file = await RNHTMLtoPDF.convert(options);
               Alert.alert(
                    'Successfully Created PDF',
                    'Path: ' + file.filePath,
                    [
                         { text: 'Cancel', style: 'cancel' },
                         { text: 'Open', onPress: () => openFile(file.filePath) },
                    ],
                    { cancelable: true }
               );
          } catch (error) {
               console.error('Error creating PDF:', error);
               Alert.alert('Error', 'Failed to create PDF');
          }
     };
     const openFile = (filePath) => {
          FileViewer.open(filePath)
               .then(() => {
               })
               .catch((error) => {
                    console.error('Error opening file:', error);

               });
     };
     const months = [
          { label: 'January', value: 'January' },
          { label: 'February', value: 'February' },
          { label: 'March', value: 'March' },
          { label: 'April', value: 'April' },
          { label: 'May', value: 'May' },
          { label: 'June', value: 'June' },
          { label: 'July', value: 'July' },
          { label: 'August', value: 'August' },
          { label: 'September', value: 'September' },
          { label: 'October', value: 'October' },
          { label: 'November', value: 'November' },
          { label: 'December', value: 'December' },
     ];
     const submitForm = async () => {
          if (EmployeeName === null || EmployeeName === '') {
               setSnackBarText('Enter Employee Name');
               setVisibleSnackBar(true);
          }
          else if (employeeCode === null || employeeCode === '') {
               setSnackBarText('Enter Employee Type');
               setVisibleSnackBar(true);
          }
          else if (value === null || value === '') {
               setSnackBarText('Please Choose Designation');
               setVisibleSnackBar(true);
          }
          else {
               setEmployeeCode("");
               setEmployeeName("");
               setValue("");
               createPDF()
          }
     };
     return (
          <View style={styles.container}>
               <ScrollView style={styles.container}>
                    <TextInput
                         style={styles.input}
                         autoCorrect={false}
                         placeholder='Enter Employee Name'
                         value={EmployeeName}
                         underlineColorAndroid="transparent"
                         // label={"Enter Employee Name"}
                         mode='outlined'
                         outlineColor='#f2612b'
                         underlineColor='#f2612b'
                         activeOutlineColor='#5DADE2'
                         activeUnderlineColor='#f2612b'
                         onChangeText={(value) => setEmployeeName(value)}
                         cursorColor='#f2612b'
                         left={<TextInput.Icon icon="account" size={25} color="#f2612b" />}
                    />
                    <TextInput
                         style={styles.input}
                         autoCorrect={false}
                         placeholder='Enter Employee Code'
                         value={employeeCode}
                         underlineColorAndroid="transparent"
                         // label={"Enter Employee Code"}
                         mode='outlined'
                         outlineColor='#f2612b'
                         underlineColor='#f2612b'
                         activeOutlineColor='#5DADE2'
                         activeUnderlineColor='#f2612b'
                         onChangeText={(value) => setEmployeeCode(value)}
                         cursorColor='#f2612b'
                         left={<TextInput.Icon icon="numeric-9-plus-box-multiple-outline" size={25} color="#f2612b" />}
                    />
                    <DropDownPicker
                         items={months}
                         open={open}
                         value={value}
                         setOpen={setOpen}
                         setValue={setValue}
                         // onChangeValue={(item) => createPDF(item)}
                         placeholder={'Select Months Name For PaySlip.'}
                         style={styles.dropdown}
                         itemStyle={{
                              justifyContent: 'flex-start',
                         }}
                         dropDownStyle={{ backgroundColor: "red", height: 200 }}
                    />
                    <View
                         style={{
                              backgroundColor: '#f2612b',
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 20,
                              width: "100%",
                              height: 50, marginTop: 60
                         }}>
                         <TouchableOpacity onPress={submitForm}>
                              <Text
                                   style={{
                                        color: 'white',
                                        fontSize: 20,
                                        fontWeight: "700"
                                   }}>Submit Now</Text>
                         </TouchableOpacity>
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
          marginHorizontal: 10,
          marginTop: 10
     },
     dropdown: {
          height: 50,
          borderColor: '#f2612b',
          borderWidth: 1,
          borderRadius: 8,
          marginVertical: 12,
          padding: 8,

     },
     label: {
          fontWeight: '300',
          paddingLeft: 5,
          fontSize: 15,
          color: 'black',
          fontWeight: "bold",
          marginVertical: 3
     },
     snackBar: {
          backgroundColor: '#003990',
     },
     input: {
          height: 35,
          margin: 5,
          borderRadius: 0,
          padding: 6,
          color: "white"
     },
});
export default Example;
