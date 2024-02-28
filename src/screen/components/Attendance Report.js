import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import {
     LineChart,
} from "react-native-chart-kit";

const AttendanceReport = () => {
     return (
          <View>
               <Text style={{ textAlign: "center", marginVertical: 10, fontSize: 18, fontWeight: "bold" }}>Dhanish Yadav Attendance Report</Text>
               <LineChart
                    data={{
                         labels: ["January", "February", "March", "April", "May", "June"],
                         datasets: [
                              {
                                   data: [
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100
                                   ]
                              }
                         ]
                    }}
                    width={Dimensions.get("window").width - 8}
                    height={240}
                    yAxisLabel="$"
                    yAxisSuffix="k"
                    yAxisInterval={1}
                    chartConfig={{
                         backgroundColor: "#e26a00",
                         backgroundGradientFrom: "#fb8c00",
                         backgroundGradientTo: "#ffa726",
                         decimalPlaces: 2,
                         color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                         labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                         style: {
                              borderRadius: 16
                         },
                         propsForDots: {
                              r: "6",
                              strokeWidth: "2",
                              stroke: "#ffa726"
                         }
                    }}
                    bezier
                    style={{
                         marginHorizontal: 4,
                         borderRadius: 16
                    }}
               />
          </View>
     );
};

export default AttendanceReport;
