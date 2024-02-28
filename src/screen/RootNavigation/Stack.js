
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../components/Login';
import Onboarding from '../components/Onboarding';
import AdminScreen from '../components/AdminScreen';
import SignUpage from '../components/SignUpage';
import DrawerNav from './DrawerNav';
import CheckOut from '../components/CheckOut';
import EditScreen from '../components/EditScreen';
import ForgetScreen from '../components/ForgetScreen';
import Attendance from "../components/Attendance";
const Stack = createNativeStackNavigator();
const MyStack = () => {
     return (
          <Stack.Navigator initialRouteName='Onboarding'>
               <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
               <Stack.Screen name="CheckOut" component={CheckOut} options={{
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
                    headerTitle: "Attendance Punch OUT",

               }} />
               <Stack.Screen name="Attendance" component={Attendance} options={{
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
                    headerTitle: "Attendance Punch IN",

               }} />
               <Stack.Screen name="DrawerNav" component={DrawerNav} options={{ headerShown: false }} />
               <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
               <Stack.Screen name="SignUP" component={SignUpage} options={{ headerShown: false }} />
               <Stack.Screen name="AdminScreen" component={AdminScreen} options={{ headerShown: false }} />
               <Stack.Screen name="ForgetScreen" component={ForgetScreen} options={{ headerShown: false }} />
               <Stack.Screen name="EditScreen" component={EditScreen} options={{
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
                    headerTitle: "Kwic Pay",

               }} />

          </Stack.Navigator>
     );
}
export default MyStack;