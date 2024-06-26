import React from "react";


import { View, Text, SafeAreaView, ScrollView,Linking, TouchableOpacity , Alert} from "react-native";
import { Avatar, Badge, Icon, ListItem, Tile } from "react-native-elements";
import FadedImageComponent from "../indicator/indicateAdmin";
import { useLayoutEffect } from "react";

export default function AllServicePage({ route, navigation }) {


   useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: () => (
          <View>
            <Text>Utilities and services</Text>
          </View>
        ),
      });
    }, [navigation]);

   return (
      <SafeAreaView style={{
         flex: 1,
      }}>
         <ScrollView>
            <View>
             <FadedImageComponent />
            </View>
            <TouchableOpacity
               onPress={() => navigation.navigate("electricity", {
                  "key": route.params.key,
                  "username": route.params.username, "phone": route.params.phone_number
               })}
            >
               <View style={{
                  display: "flex",
                  flexDirection: "column",
                  alignSelf: "auto",
                  width: 120,
                  backgroundColor: "darkblue",
                  padding: 10,
                  borderRadius: 7,
                  margin: 5,
                  shadowColor: "#fff",

                  shadowOpacity: 0.7
               }}>
                  <Badge status='primary' value="100%" />
                  <Icon color={"white"} size={40} name="lightbulb" type="material-icon" />
                  <Text style={{
                     color: "lightgray",
                     fontSize: 20,
                     textAlign: "center"
                  }}  >Electricity</Text>
               </View>
            </TouchableOpacity>

            <Text style={{
               fontSize: 30,
               fontWeight: "bold",
               color: "darkgray",
               textAlign: "center"
            }}>Utilities</Text>
            <View style={{
               display: "flex",
               flexDirection: "row",
               alignItems: "center",
               justifyContent: "space-around",

            }}>


               <TouchableOpacity
               
               onPress={()=> navigation.navigate("airtime", {  "key": route.params.key,"username": route.params.username, "phone": route.params.phone_number })}
               >
                  <View style={{
                     display: "flex",
                     flexDirection: "column",
                     alignSelf: "auto",
                     width: 100,
                     backgroundColor: "darkblue",
                     padding: 10,
                     borderRadius: 7,
                     margin: 5,
                     shadowColor: "#fff",

                     shadowOpacity: 0.7
                  }}>
                     <Badge status="error" value="instant" />
                     <Icon color={"white"} size={40} name="phone-call" type="feather" />
                     <Text style={{
                        color: "lightgray",
                        fontSize: 20,
                        textAlign: "center"
                     }}>Airtime</Text>
                  </View>
               </TouchableOpacity>

               <TouchableOpacity
               
               onPress={()=> navigation.navigate("data", {  "key": route.params.key,"username": route.params.username, "phone": route.params.phone_number })}
               >
                  <View style={{
                     display: "flex",
                     flexDirection: "column",
                     alignSelf: "auto",
                     width: 100,
                     backgroundColor: "darkblue",
                     padding: 10,
                     borderRadius: 7,
                     margin: 5,
                     shadowColor: "#fff",

                     shadowOpacity: 0.7
                  }}>
                     <Badge status="error" value="instant" />
                     <Icon color={"white"} size={40} name="wifi" type="font-awesome" />
                     <Text style={{
                        color: "lightgray",
                        fontSize: 20,
                        textAlign: "center"
                     }}>Data</Text>
                  </View>
               </TouchableOpacity>

               <TouchableOpacity
                  onPress={() => navigation.navigate("education", {
                     "key": route.params.key,
                     "username": route.params.username, "phone": route.params.phone_number
                  })}
               >
                  <View style={{
                     display: "flex",
                     flexDirection: "column",
                     alignSelf: "auto",
                     width: 120,
                     backgroundColor: "darkblue",
                     padding: 10,
                     borderRadius: 7,
                     margin: 5,
                     shadowColor: "#fff",

                     shadowOpacity: 0.7
                  }}>
                     <Badge status='success' value="dependant" />
                     <Icon color={"white"} size={40} name="school-outline" type="material-community" />
                     <Text style={{
                        color: "lightgray",
                        fontSize: 20,
                        textAlign: "center"
                     }} >Education</Text>
                  </View>
               </TouchableOpacity>
            </View>
            <Text style={{
               fontSize: 30,
               fontWeight: "bold",
               color: "darkgray",
               textAlign: "center"
            }}>Extra and Upcoming</Text>


            <View style={{
               display: "flex",
               flexDirection: "row",
               alignItems: "center",
               justifyContent: "space-around",

            }}>

               <TouchableOpacity
               
               onPress={()=>Alert.alert("Not available","This service is currently down")}
               >
                  <View style={{
                     display: "flex",
                     flexDirection: "column",
                     alignSelf: "auto",
                     width: 100,
                     backgroundColor: "#333",
                     padding: 10,
                     borderRadius: 7,
                     margin: 5,
                     shadowColor: "#fff",

                     shadowOpacity: 0.7
                  }}>
                     <Badge status="error" value="soon" />
                     <Icon color={"green"} size={40} name="wallet-giftcard" type="material-commnuity" />
                     <Text style={{
                        color: "lightgray",
                        fontSize: 20,
                        textAlign: "center"
                     }}  >
                        GiftCard
                     </Text>
                  </View>
               </TouchableOpacity>

               <TouchableOpacity
                onPress={()=>Alert.alert("Not available","This service is currently down")}
               
               >
                  <View style={{
                     display: "flex",
                     flexDirection: "column",
                     alignSelf: "auto",
                     width: 100,
                     backgroundColor: "#333",
                     padding: 10,
                     borderRadius: 7,
                     margin: 5,
                     shadowColor: "#fff",

                     shadowOpacity: 0.7
                  }}>
                     <Badge status="error" value="18+" />
                     <Icon color={"green"} size={40} name="slot-machine-outline" type="material-community" />
                     <Text
                        style={{
                           color: "lightgray",
                           fontSize: 20,
                           textAlign: "center"
                        }}
                     >Betting</Text>
                  </View>
               </TouchableOpacity>

               <TouchableOpacity
                 onPress={() => navigation.navigate("tvs", {
                  "key": route.params.key,
                  "username": route.params.username, "phone": route.params.phone_number
               })}
               >
                  <View style={{
                     display: "flex",
                     flexDirection: "column",
                     alignSelf: "auto",
                     width: 120,
                     backgroundColor: "darkblue",
                     padding: 10,
                     borderRadius: 7,
                     margin: 5,
                     shadowColor: "#fff",

                     shadowOpacity: 0.7
                  }}>
                     <Badge status='primary' value="100%" />
                     <Icon color={"white"} size={40} name="tv" type="feather" />
                     <Text style={{
                        color: "lightgray",
                        fontSize: 20,
                        textAlign: "center"
                     }}  >Television</Text>
                  </View>
               </TouchableOpacity>
            </View>
            <Text
               style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  color: "darkgray",
                  textAlign: "center"
               }}
            >Crypto Transaction</Text>
            <TouchableOpacity
             onPress={()=>Alert.alert("Not available","This service is currently down")} >
               <View style={{
                  display: "flex",
                  flexDirection: "column",
                  alignSelf: "auto",
                  width: 200,
                  backgroundColor: "#333",
                  padding: 10,
                  borderRadius: 7,
                  margin: 5,
                  shadowColor: "#fff",

                  shadowOpacity: 0.7
               }}>
                  <Badge status='primary' value="100%" />
                  <Icon color={"green"} size={40} name="currency-btc" type="material-community" />
                  <Text style={{
                     color: "lightgray",
                     fontSize: 20,
                     textAlign: "center"
                  }}  >Cryto Transaction</Text>
               </View>
            </TouchableOpacity>

         </ScrollView>

<View style={{
    padding:5,
    margin:5,
    alignSelf:"center",
}}>


</View>
         <View style={{
            alignSelf: "center",
            position: "absolute",
            bottom: 0,
            marginBottom: 20,
            backgroundColor:"darkblue",
            padding:5,
            margin:5,
            borderRadius:10,
            
         }}>
            <Text
               style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color:"white"
               }}
            >softnixx inc.</Text>
         </View>
      </SafeAreaView>
   )
}