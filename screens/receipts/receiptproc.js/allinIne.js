

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useLayoutEffect } from "react";
import { useNavigation} from "@react-navigation/native";
import { SafeAreaView, Text, View } from "react-native";
//screens
import Receipt from "./reciptututy";
import TransferPage from "./transfer";
import InlineTransfer from "./receiptline";

const Tab = createMaterialTopTabNavigator();


export default function ReceiptTab({route}){
   const { params } = route;
   const navigation = useNavigation();
   useLayoutEffect(() => {
      navigation.setOptions({
          headerTitle: () => (
              <View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                      <Text style={{ color: 'gray' }}>
                        receipt
                        </Text></View>
              </View>

          ),
      });
  }, [navigation]);
return(
   <Tab.Navigator
   initialRouteName="Utilities">
     <Tab.Screen  initialParams={params} component={TransferPage} name="Utilities" /> 
      <Tab.Screen initialParams={params} component={Receipt} name="Softnixx" />
      <Tab.Screen initialParams={params} component={InlineTransfer} name="Transfer" />
     
     
     
   </Tab.Navigator>
)}

