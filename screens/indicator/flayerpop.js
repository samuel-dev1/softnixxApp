  

import React from "react";
import { StyleSheet, View } from "react-native";
import { BottomSheet, Button, ListItem } from "react-native-elements";
import { Icon } from "react-native-elements";
import { Text} from "react-native";



export default function MyPopup({data, amount, visible, setvisble, button, reference, charge, reason}){


   function MoneyConvert(num) {
      try{
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
      }
      catch{
        return num
      }
    }
return(
   <BottomSheet
   containerStyle={{
      backgroundColor: "#fff",
      left: 0,
      right: 0,
      bottom: 0,
      position: "absolute",
      elevation:10,
      padding:10,
      margin:5,
  }}
   isVisible={visible}
   >
<View style={{
              display:"flex",
              flexDirection:"row",
              justifyContent:"space-between",
              alignItems:"center",
          }}>
<Icon 
        name="close" 
        color="gray"
        iconStyle={{
          borderWidth:0.5,
          borderRadius:80,

        }} 
        onPress={()=>setvisble(false)} 
      />
      
          </View> 
          <Text style={style.firsttext}> you about to made a transaction to {data?.toUpperCase()}</Text>
          <ListItem bottomDivider>
            <ListItem.Content>
               <Text>
               Amount
               </Text>
            </ListItem.Content>
           <Text>
           N{MoneyConvert(amount)}
           </Text>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
               <Text>
                  Ref
               </Text>
            </ListItem.Content>
          <Text>{reference?reference:'none'}</Text>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
               <Text>
                  Charges
               </Text>
            </ListItem.Content>
            <Text>
            {charge?charge:0.0}
            </Text>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
             <Text>Reason</Text>
            </ListItem.Content>
           <Text>
           {reason?reason:'none'}
           </Text>
          </ListItem>
          <Text style={
            style.secountext
          }>
            please do verify this above information is correct before sending money?
            this can only be revert by our angent in 20min after trannsaction
          </Text>
          <Button 
          onPress={button}
          buttonStyle={style.Button}
          title={'Continue'} />
   </BottomSheet>
)

}

const style =  StyleSheet.create({

   firsttext:{
      color:"darkblue",
      textAlign:"center",
      fontSize:19,
      fontWeight:"bold",
   
   },
   secountext:{
color:"red",
padding:10,
margin:5,
textAlign:"justify",
   },
   Button:{
      color:"white",
      backgroundColor:"darkblue",
      margin:5,
   }
})