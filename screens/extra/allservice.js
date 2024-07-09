import React from "react";


import { View, Text, SafeAreaView, ScrollView, TouchableOpacity , Alert,Linking} from "react-native";
import {  Badge, Icon } from "react-native-elements";
import FadedImageComponent from "../indicator/indicateAdmin";
import { useLayoutEffect } from "react";

export default function AllServicePage({ route, navigation }) {



   const sendWhatsAppMessage = (phone_number) => {
      try {
        const phoneNumber = phone_number?.toString().replace(/^0/, ''); 
        const NewNumber = "234" + phoneNumber;
        const whatsappURL = `whatsapp://send?phone=${NewNumber}`;
    
        Linking.canOpenURL(whatsappURL).then(supported => {
          if (supported) {
            return Linking.openURL(whatsappURL);
          } else {
            Alert.alert("WhatsApp is not installed on the device");
          }
        }).catch(error => {
          Alert.alert('An error occurred', error.message);
        });
      } catch (error) {
        Alert.alert("Something went wrong!", error.message);
      }
    };

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
               
                  padding: 10,
                  borderRadius: 7,
                  margin: 5,
                  shadowColor: "#fff",

                  shadowOpacity: 0.7
               }}>
                  <Badge status='primary' value="100%" />
                  <Icon raised color={"red"} size={30} name="lightbulb" type="material-icon" />
                  <Text style={{
                     color: "darkblue",
                     fontSize: 20,
                     textAlign: "center"
                  }}  >Electricity</Text>
               </View>
            </TouchableOpacity>

            <Text style={{
               fontSize: 15,
               fontWeight: "bold",
               color: "darkblue",
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
                  
                     padding: 10,
                     borderRadius: 7,
                     margin: 5,
                     shadowColor: "#fff",

                     shadowOpacity: 0.7
                  }}>
                     <Badge status="error" value="instant" />
                     <Icon raised color={"darkblue"} size={30} name="phone-call" type="feather" />
                     <Text style={{
                        color: "darkblue",
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
                    
                     padding: 10,
                     borderRadius: 7,
                     margin: 5,
                     shadowColor: "#fff",

                     shadowOpacity: 0.7
                  }}>
                     <Badge status="error" value="instant" />
                     <Icon raised color={"darkblue"} size={30} name="wifi" type="font-awesome" />
                     <Text style={{
                        color: "darkblue",
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
               
                     padding: 10,
                     borderRadius: 7,
                     margin: 5,
                     shadowColor: "#fff",

                     shadowOpacity: 0.7
                  }}>
                     <Badge status='success' value="dependant" />
                     <Icon raised color={"darkblue"} size={30}  name="school-outline" type="material-community" />
                     <Text style={{
                        color: "darkblue",
                        fontSize: 20,
                        textAlign: "center"
                     }} >Education</Text>
                  </View>
               </TouchableOpacity>
            </View>
            <Text style={{
               fontSize: 15,
               fontWeight: "bold",
               color: "darkblue",
               textAlign: "center"
            }}>Extra and Profit</Text>
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
                     padding: 10,
                     borderRadius: 7,
                     margin: 5,
                     shadowColor: "#fff",

                     shadowOpacity: 0.7
                  }}>
                     <Badge status="error" value="soon" />
                     <Icon
                     onPress={()=>sendWhatsAppMessage(+'09061229992')}
                     raised color={"darkblue"} size={30} name="wallet-giftcard" type="material-commnuity" />
                     <Text style={{
                        color: "darkblue",
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
                    
                     padding: 10,
                     borderRadius: 7,
                     margin: 5,
                     shadowColor: "#fff",

                     shadowOpacity: 0.7
                  }}>
                     <Badge status="error" value="18+" />
                     <Icon 
                     raised color={"darkblue"} size={30} name="slot-machine-outline" type="material-community" />
                     <Text
                        style={{
                           color: "darkblue",
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
                    
                     padding: 10,
                     borderRadius: 7,
                     margin: 5,
                     shadowColor: "#fff",
                     shadowOpacity: 0.7
                  }}>
                     <Badge status='primary' value="100%" />
                     <Icon 
                      raised color={"darkblue"} size={30} 
                     name="tv" type="feather" />
                     <Text style={{
                        color: "darkblue",
                        fontSize: 20,
                        textAlign: "center"
                     }}  >Television</Text>
                  </View>
               </TouchableOpacity>
            </View>
            <Text
               style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "darkblue",
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
                  padding: 10,
                  borderRadius: 7,
                  margin: 5,
                  shadowColor: "#fff",
                  shadowOpacity: 0.7
               }}>
                  <Badge status='primary' value="100%" />
                  <Icon 
                   raised color={"darkblue"} size={30}  name="currency-btc" type="material-community" />
                  <Text style={{
                     color: "darkblue",
                     fontSize: 20,
                     textAlign: "center"
                  }}  >Cryto Transaction</Text>
               </View>
            </TouchableOpacity>


            <Text
               style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "darkblue",
                  textAlign: "center"
               }}
            >Games point and fun</Text>
            <TouchableOpacity
              onPress={()=>sendWhatsAppMessage(+'09061229992')} >
               <View style={{
                  display: "flex",
                  flexDirection: "column",
                  alignSelf: "auto",
                  width: 200,
                  padding: 10,
                  borderRadius: 7,
                  margin: 5,
                  shadowColor: "#fff",
                  shadowOpacity: 0.7
               }}>
                  <Badge status='error' value="manual" />
                  <Icon 
                   raised color={"darkblue"} size={30}  name="gamepad" type="type-fontawesome" />
                  <Text style={{
                     color: "darkblue",
                     fontSize: 20,
                     textAlign: "center"
                  }}  >All game pont here</Text>
               </View>
            </TouchableOpacity>
         </ScrollView>

<View style={{
    padding:5,
    margin:5,
    alignSelf:"center",
}}>


</View>
      </SafeAreaView>
   )
}