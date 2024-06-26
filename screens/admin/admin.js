import React, { useState, useEffect } from "react";
import { useLayoutEffect } from "react";
import { View, Text, TextInput, Dimensions, SafeAreaView, Linking, ScrollView } from "react-native";
import { Button, Divider, Icon, ListItem } from "react-native-elements";
import { showMessage } from "react-native-flash-message";


export default function AdminPanel({ route, navigation }) {

   
   useLayoutEffect(() => {
      navigation.setOptions({
         headerTitle: () => (
            <View>
               <Text>Welcome back! </Text>
            </View>

         ),
      });
   }, [navigation]);
   return (
      <SafeAreaView style={{
         backgroundColor: "#fff",
         flex: 1
      }}>
         <ScrollView>
            <View>
               <Text style={{
                  color: "darkblue",
                  fontSize: 20,
                  textAlign: "center",
               }}>Basic Commands</Text>
               <Divider />
               <ListItem>
                  <Icon
                     onPress={() => Linking.openURL("https://www.vtpass.com/process-wallet")}
                     name="plus" color="darkblue" type="font-awesome" raised />
                  <ListItem.Content>
                     <Text>
                        Fund wallet For utilites
                     </Text>
                  </ListItem.Content>
                  <ListItem.Chevron />
               </ListItem>
               <ListItem>
                  <Icon
                     onPress={() => Linking.openURL("https://paystack.com")}
                     name="money" color="darkblue" type="font-awesome" raised />
                  <ListItem.Content>
                     <Text>
                        Fund wallet withdraw
                     </Text>
                  </ListItem.Content>
                  <ListItem.Chevron />
               </ListItem>
            </View>


            <Divider />
            <View>
               <Text
                  style={{
                     color: "darkblue",
                     fontSize: 20,
                     textAlign: "center",
                  }}
               >
                  Advance Commands
               </Text>
               <Divider />
               <View style={{
                  display: "flex",
                  flexDirection: "row"
               }}>

                  <View>
                     <Icon
                     onPress={()=>showMessage({
                        message:"Features coming in soon!",
                     })}
                     size={30} color="darkblue" raised name="calendar" type="font-awesome" />
                     <Text style={{
                        textAlign: "center"
                     }}>
                        Today Sales
                     </Text>
                  </View>

               </View>
            </View>
            <Text
               style={{
                  color: "darkblue",
                  fontSize: 20,
                  textAlign: "center",
               }}
            >
               Customers
            </Text>
            <Divider />
            <View style={{
               display: "flex",
               flexDirection: "row",
               alignItems: "center",
               alignContent: "space-between",
               justifyContent: "space-around"

            }}>
               <View><Icon size={30} color="darkblue" raised name="receipt" />

                  <Text style={{
                     textAlign: "center"
                  }}>Check receipt</Text></View>
               <View><Icon size={30} color="darkblue" raised name="send" />
                  <Text style={{
                     textAlign: "center"
                  }}>Refund</Text></View>

            </View>
         </ScrollView>

      </SafeAreaView>
   )
}