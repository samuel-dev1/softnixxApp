
import { DrawerActions } from "@react-navigation/native";
import React from "react";
import { useLayoutEffect } from "react";
import { View, Text, SafeAreaView , Image, ScrollView} from "react-native";
import { Overlay, Button, Icon, ListItem, Divider, Card } from "react-native-elements";
import { showMessage } from "react-native-flash-message";
import { Dimensions } from "react-native";
import Startover from "./startover";
import PointConverter from "./pointCon";


const {height, width} =  Dimensions.get("window")



const BenefitOverlay = ({ navigation, route }) => {
   const [start, setStar] = React.useState(true)
   const [loading, setLoading] = React.useState(false)
   const [data, useData] = React.useState(null)
   const [amount, setAmount] =  React.useState(null)
   const [off, on] = React.useState(false)

   function MoneyConvert(num) {
      if(num){
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
      }
      else{
         return num;
      }
  }

  function handleCheck(){
   on(!off)
  }



function handleStart(){
   setStar(!start)
}

function handleGoback(){
   navigation.goBack()
}

  useLayoutEffect(() => {
     navigation.setOptions({
        headerTitle: () => (
           <View>
              <Text>Benefit/Claim center</Text>
           </View>
        ),
     });
  }, [navigation]);



   const Getdetails = async () => {
   
      const itemUrL = `https://softnixx.com/api/updateD/${route.params.username}/`;
      try {
         const response = await fetch(itemUrL, {
            headers: {
               'Content-Type': 'application/json',
               Accept: 'application/json',
               'Authorization': `Token ${route.params.key}`,
            },
         });
         const json = await response.json();
         useData(json)
        
      } catch (error) {
         showMessage({
            message: "Something went wrong!",
            type: "danger",
            position: "center",
            backgroundColor: "darkblue",
            color: "white",
            autoHide: false
         });
      } finally {
         null
      }
   }

   React.useEffect(() => {
      Getdetails()
   }, [])

   return (

      <SafeAreaView>
         <ScrollView>

<View style={{
   padding:5,
   margin:5,
   backgroundColor:"white",

}}>
   <Text style={{
      color:"darkblue",
      fontSize:20,
      textTransform:"capitalize",
      textAlign:"center",
      padding:5,
      margin:5,
   }}>
      username: {data?.username}
   </Text>
   <Text style={{
        
        fontSize:20,
        textTransform:"capitalize",
        textAlign:"center",
        padding:5,
        margin:5,
   }}>ELIGIBLE FOR OFFERS</Text>
   <Text style={{
        
        fontSize:13,
        textTransform:"capitalize",
        textAlign:"center",
        
   }} >please meet the folloing condictions</Text>
  <ListItem topDivider >
   <Text>
   Email 
   </Text>
<ListItem.Content>
   <Text style={{
      color:"darkblue"
   }}>
   {data?.email}
   </Text>
</ListItem.Content>
<Icon color={'darkblue'} name="check-circle" type="font-awesome" />
  </ListItem>
  <Divider />
  <ListItem bottomDivider>
   <Text>
   {data?.profile?.point_bonus} softnix point 
   </Text>
<ListItem.Content>
<Text style={{
   color:data?.profile?.point_bonus<10?"red":"green"
}}>
{data?.profile?.point_bonus <10?'your account is not eligible':"please claim/Stake"}
</Text>
</ListItem.Content>
<Icon color={ Number(data?.profile?.point_bonus) >= 10?"darkblue":"red"} name={ Number(data?.profile?.point_bonus) >= 10?"check-circle":"close"} type="font-awesome" />
  </ListItem>
  <Text style={{
   textAlign:"center",
   color:"#111",
  }}>Your account has to have softnix point more than 10 to be eligible</Text>
</View>

<View style={{
   justifyContent:"center",
   alignContent:"center",
   alignSelf:"center",
   alignItems:"center",
   top:height*0.01

}}>
  <Card>
   <Text>
      Claim Your point Now
   </Text>
   <Card.Divider />
 <Text>
   Your 10 point will be converted to #10 to your account, you can decide to choose a amount convert
 </Text>
 <Button 
 onPress={()=>{on(true), setAmount(data?.profile?.point_bonus)}}
 title={"claim now"} 

 buttonStyle={{
   backgroundColor:"darkblue",
   padding:5,
   margin:5,

 }}

 titleStyle={{
   color:"white",
   padding:5,
   margin:5
 }}
 />
  </Card>

   <Text>Stake your point </Text>
   <Icon 
   iconStyle={{
      padding:5,
      margin:5,
   }}
   name="info" size={40} containerStyle={{
      padding:5,
      margin:5
   }} type="font-awesome" borderRadius={2} raised color={"darkblue"} backgroundColor={"darkblue"}/>
 <Button 
 onPress={()=>navigation.goBack()
 }
 disabled
 title={"stake"} 
 buttonStyle={{
   backgroundColor:"darkred",
   padding:5,
   margin:5,
   width:width*0.8,
 }}

 titleStyle={{
   color:"white",
   padding:5,
   margin:5
 }}
 />    
</View>
<PointConverter route={route} modal={off} setModalVisible={handleCheck} point={data?.profile?.point_bonus}/>
         <Startover start={start} setStart={handleStart} navigation={handleGoback} />
         </ScrollView>
      </SafeAreaView>

   )
}



export default BenefitOverlay;