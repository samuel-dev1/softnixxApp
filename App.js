import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlashMessage from 'react-native-flash-message';
import Coursel from './screens/video.js/video';
// Import screens
import DisplayScreen from './screens/extra2/display';
import AdminPanel from './screens/admin/admin';
import BenefitOverlay from './screens/extra2/benefit';
import ReceiptTab from './screens/receipts/receiptproc.js/allinIne';
import NewPost from './screens/extra2/userUpload';
import LoginScreen from './screens/authscreens/login';
import SignInPage from './screens/authscreens/register';
import ChangePass from './screens/authscreens/forget';
import Checkterm from './screens/authscreens/term';
import SetPinPage from './screens/management/pin';
import Airtime from './screens/utilties/airtime';
import DataPAGE from './screens/utilties/data';
import Education from './screens/utilties/education';
import Electricity from './screens/utilties/electricity';
import Tv from './screens/utilties/tv';
import AllServicePage from './screens/extra/allservice';
import Contact from './screens/helps/contact';
import Extra from './screens/extra/sellunit';
import Profile from './screens/personal/profile';
import ReceiptDetails from './screens/receipts/receitpay';
import ReceiptSoft from './screens/receipts/receiptSoft';
import ReceiptUtilites from './screens/receipts/receiptUtilities';
import Settings from './screens/management/settings';
import Status from './screens/extra/status';
import AddFund from './screens/widthdraw/withdraw';
import Transfer from './screens/widthdraw/widthdrawFunds';
import Gift from './screens/extra2/gift';
import Finalize from './screens/payment/finalize';
import Notification from './screens/alert/alert';
import BankTransfer from './screens/payment/payments';
import MainTabNavigator from './screens/navigators/bottomnav';
const Stack = createNativeStackNavigator();
export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="login"
      >
        <Stack.Screen name="recept" component={ReceiptTab} />
        <Stack.Screen name="tabBottom" component={MainTabNavigator} />
        <Stack.Screen
          name="notification"
          options={{
            headerShown: true,
          }}
          component={Notification}
        />
        <Stack.Screen name='carousel' component={Coursel} 
        options={{
          headerShown:false,
        }}
        />
        <Stack.Screen
          name="reciept"
          component={ReceiptTab}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="newpost"
          component={NewPost}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="display"
          component={DisplayScreen}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="BankTransfer"
          component={BankTransfer}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Gift"
          component={Gift}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="transfer"
          component={Transfer}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Addfund"
          component={AddFund}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="status"
          component={Status}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="settings"
          component={Settings}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="receptutils"
          component={ReceiptUtilites}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="stacksoft"
          component={ReceiptSoft}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="stasckrecipt"
          component={ReceiptDetails}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="profile"
          component={Profile}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="extra"
          component={Extra}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="contact"
          component={Contact}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="allpage"
          component={AllServicePage}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="tvs"
          component={Tv}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="electricity"
          component={Electricity}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="education"
          component={Education}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="data"
          component={DataPAGE}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="airtime"
          component={Airtime}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="pin"
          component={SetPinPage}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen name="check" component={Checkterm} />
        <Stack.Screen
          name="password change"
          component={ChangePass}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="register"
          component={SignInPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="finalize"
          component={Finalize}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="benefit"
          component={BenefitOverlay}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="admin"
          component={AdminPanel}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
      <FlashMessage position={"center"} backgroundColor={"darkblue"} color={"white"} type="error" />
    </NavigationContainer>
  );
}




