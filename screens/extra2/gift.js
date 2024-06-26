
import React from "react";

import { View, Text } from "react-native";
import { Icon } from "react-native-elements";

export default function Gift(){


    

return(

    <View style={{
       flex:1,
       backgroundColor:"white",
       justifyContent:"center",
       alignContent:"center",
       
       alignItems:"center"
    }}>

<Icon name='gift' type='font-awesome' color={"red"} size={30} />
        <Text h3Style={{color:"#111", fontSize:20}} h3>
No gift available for you 
        </Text>
        <Text h4 h4Style={{color:"#111", fontSize:13}}>Check back later</Text>
    </View>
)
}
