
import React from "react";

import { View, Text, Linking } from "react-native";
import { Button, Icon } from "react-native-elements";
import { SafeAreaView } from "react-native";
import { Image } from "react-native-elements";


export default function Status({route, navigation}){
      
   return(
      <SafeAreaView style={{
         flex:1,
         backgroundColor:"white",
      }}>
         <View style={{
            padding:4,
            margin:5,
            marginTop:20,
         }}>
            <View style={{
               justifyContent:"center",
               alignContent:"center",
               alignSelf:"center"
            }}>
            <Icon raised type="font-aweomse" size={50} name="check-circle" color={"lightgreen"} />
            </View>
                  
         <Text style={{
            color:route?.params?.data=="success"?"green":"red",
            fontSize:30,
            textAlign:"center"
         }}>
Kindly check your receipt for transaction details and confirmation
         </Text>
         <Button 
          buttonStyle={{
            width: 200,
            paddingTop: 10,
            marginTop: 10,
            paddingBottom: 10,
            marginBottom: 30,
            alignSelf: "center",
            backgroundColor:"darkblue"
         }} 
         onPress={()=>
            navigation.navigate("receiutis",{'key':route.params.key,"id":route.params.id})
         }
         title={"Go to receipt"} type='solid' />
         </View>

<View style={{
   margin:5,
   padding:5,
   justifyContent:"center",
   alignSelf:"center",
   borderColor:"darkblue",
   borderWidth:0.5,
   backgroundColor:"darkblue",

}}>
   <Text style={{
      color:"white",
      fontSize:20,
   }}>
      Softtellex INC.
   </Text>
   <Button 
   buttonStyle={{
      backgroundColor:null,

   }}
   titleStyle={{
      color:"darkblue"
   }}
   title={"contact now"} 
    />
</View>
<View 
style={{
   margin:5,
   padding:5,
   justifyContent:"center",
   alignSelf:"center",
   borderColor:"green",
   borderWidth:0.5,
   backgroundColor:"green",
}}
>
<Text style={{
   color:"yellow"
}}>Newsriffic</Text>
<Button
onPress={()=>Linking.openURL("app.newriffic.com")}
buttonStyle={{
   backgroundColor:null,
}} titleStyle={{
   color:"yellow"
}} title={"read now"} />
</View>

<View style={{
   margin:5,
   padding:5,
   alignSelf:"center"
}}>
 <Image style={{
            height:200,
            width:100,
         }} source={require("../../assets/show.png")} />
      </View>
      </SafeAreaView>
   )
}