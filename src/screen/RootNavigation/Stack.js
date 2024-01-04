
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../components/Login';
import Onboarding from '../components/Onboarding';
import AdminScreen from '../components/AdminScreen';
import SignUpage from '../components/SignUpage';
import DrawerNav from './DrawerNav';
import CheckOut from '../components/CheckOut';
import EditScreen from '../components/EditScreen';
const Stack = createNativeStackNavigator();
const MyStack = () => {
     return (
          <Stack.Navigator initialRouteName='Onboarding'>
               <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
               <Stack.Screen name="CheckOut" component={CheckOut} options={{ headerShown: false }} />
               <Stack.Screen name="DrawerNav" component={DrawerNav} options={{ headerShown: false }} />
               <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
               <Stack.Screen name="SignUP" component={SignUpage} options={{ headerShown: false }} />
               <Stack.Screen name="AdminScreen" component={AdminScreen} options={{ headerShown: false }} />
               <Stack.Screen name="EditScreen" component={EditScreen} options={{
                    headerStyle: {
                         backgroundColor: '#f2612b'
                    },
                    headerTitleStyle: {
                         color: 'white',
                         marginLeft: 80,
                    },
                    headerTintColor: 'white',
                    headerTitle: "Kwic Pay",

               }} />

          </Stack.Navigator>
     );
}
export default MyStack;