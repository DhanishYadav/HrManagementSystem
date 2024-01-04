import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableHighlight, View, Image } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';

const Example = () => {

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
     const totalBalance = 95966;
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
               width: 80px;
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
               <img src='../../asserts/appicon.png'/>
               </div>
               <div>
                    <span style="color:black;font-size:large;">KWICPAY</span>
                    <p style="color:gray;font-size:15px;">B 3/42, Vibhuti Khand,Gomti Nagar Lucknow 226010
                         India</p>
               </div>
               <div>
                    <span style="color:gray;font-size:medium;padding:0px;">Payslip For The Month</span>
                    <p  style="color:black;font-size:large;">Date: ${receiptData.date}</p>
               </div>
          </div>
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
                    <p>: &nbsp;&nbsp;&nbsp; 03/01/2024</p>
               </div>
          </div>
          <div id="payment">
                    <div id="border">
                         <p style="color:black;font-size:medium;">&nbsp;  &nbsp;  &nbsp;₹ 300000.00</p>
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
     </div>
</body>
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
                    // success
               })
               .catch((error) => {
                    console.error('Error opening file:', error);
                    // handle error
               });
     };

     return (
          <View style={styles.container}>
               <TouchableHighlight onPress={createPDF}>
                    <Text style={{ fontSize: 22, fontWeight: '700' }}>Create PDF</Text>
               </TouchableHighlight>
          </View>
     );
};
const styles = StyleSheet.create({
     container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
     },
});

export default Example;
