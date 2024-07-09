import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Datascreen from "../indicator/datashow";
import Datascreen2 from "../indicator/gifting";
import Datascreen3 from "../indicator/prom";
const BottomTab = createMaterialTopTabNavigator()


const DatascreenNav = ({ data,
   value,
   check,
   type,
   pin,
   amount,
   bankAmount,
   phone, route }) => {
    
   return (
      <BottomTab.Navigator
         style={{
            marginTop: 0,
            paddingTop: 0
         }}
         tabBarPosition="top"
         sceneContainerStyle={{
            marginTop: 0,
            paddingTop: 0
         }}
      >
         <BottomTab.Screen
            name="Soft data">
            {() => <Datascreen fetch={data} value={value} />}
         </BottomTab.Screen>
         <BottomTab.Screen

            name="cheap">
            {() => <Datascreen2 value={type} 
            pin ={pin}
            phone={phone}
            
             params={route.params.key} 
            bankAmount={bankAmount} />}
         </BottomTab.Screen>
         <BottomTab.Screen

            name="offers">
            {() => <Datascreen3 value={type} />}
         </BottomTab.Screen>
      </BottomTab.Navigator>
   );
};

export default DatascreenNav;
