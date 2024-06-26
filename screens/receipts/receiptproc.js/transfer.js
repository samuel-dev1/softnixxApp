
import React from "react";

import { View, Text, ScrollView, SafeAreaView, FlatList, Alert } from "react-native";
import { Badge, Divider, Icon, ListItem } from "react-native-elements";
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TransferPage({ route, navigation }) {
   const [data, setData] = React.useState([])
   const [optional, setOptional] = React.useState(null)
   const [loading, setLoading] = React.useState(true)
   function MoneyConvert(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
   }
   function formatDate(dateString) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const date = new Date(dateString);
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      const formattedDate = `${day} ${month} ${year}`;
      return formattedDate;
   }
   const time = (time) => {
      date = new Date(time)
      return { "year": date.getFullYear(), "month": date.toLocaleString('en-US', { month: 'long' }), "day": date.getDate(), "time": date.getHours(), "sec": date.getMinutes(), "hous": date.getHours >= 12 ? "PM" : "AM" }

   }
   React.useEffect(() => {
      const getDetails = async () => {
         const userData = await AsyncStorage.getItem('userData');
         if (userData !== null && userData !== undefined) {
            const { data, data2 } = JSON.parse(userData);
            setOptional({ profile: data2 });
         } else {
            setLogin(false);
         }
      };
      getDetails();
   }, []);

   const ApiPost = () => {
      fetch("https://softnixx.com/api/fetchE/", {
         method: "POST",
         body: JSON.stringify({
            category: "Utility",
         }),
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token ${route?.params?.key}`,
         }
      })
         .then(response => {
            return response.json();
         })
         .then(data => {

            setData(data);
            setLoading(false);
         })
         .catch(e => null);
   };

   useFocusEffect(() => {
      ApiPost();
   });

   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
         {loading ? (
           <ActivityIndicator />
         ) : data.length === 0 ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
               <Text>No data available</Text>
            </View>
         ) : (
            <FlatList
            onRefresh={ApiPost}
            refreshing={loading}
            refreshControl={loading?<ActivityIndicator />:null}
               ListHeaderComponent={
                  <View style={{
                     display: "flex",
                     flexDirection: "row",
                     alignItems: "center",
                     justifyContent: "space-around",
                     padding: 10,
                     margin: 5,
                     marginBottom: 10,
                  }}>
                     <View><Text style={{
                        color: "#333",
                        fontSize: 17,
                     }}>Categories</Text><Icon size={15} color="darkgray" name="chevron-down" type="font-awesome" /></View>
                     <View><Text style={{
                        color: "#333",
                        fontSize: 17,
                     }}>All status</Text>
                        <Badge status="success" />
                     </View>
                  </View>
               }
               data={data}
               renderItem={({ item }) => (
                  <SafeAreaView>
                     {item.client ?
                        <ListItem onPress={()=>
                           navigation.navigate("receptutils",{'id':item.request_id})
                        } containerStyle={{
                           backgroundColor: "#fff",
                           padding: 10,
                           margin: 5,
                        }} bottomDivider>
                           <Icon color={"darkblue"} size={40} name="account-balance-wallet" type="material" />
                           <ListItem.Content>
                              <Text style={{
                                 color: "#333",
                                 fontSize: 17,
                                 padding: 5,
                                 margin: 3,
                              }}>
                                 {item.client.id == optional.profile.id ? <Text style={{
                                    fontSize: 17,
                                    padding: 5,
                                    margin: 3,
                                 }}>{item.type =="delivered"?"data and airtime":item.type}</Text> : <Text style={{
                                    fontSize: 17,
                                    padding: 5,
                                    margin: 3,
                                 }}>Transfer to {item.client.username}</Text>}
                              </Text>
                              <Text style={{
                                 fontSize: 15,
                                 padding: 5,
                                 margin: 3,
                              }}>
                                 {time(item.createdAt).day}, {time(item.createdAt).month} {time(item.createdAt).year}
                                 <Text style={{
                                    fontSize:14,
                                    color:"#333",
                                    marginLeft:10,
                                 }}> {time(item.createdAt).time}:{time(item.createdAt).sec} {time(item.createdAt).hous}</Text>
                              </Text>
                           </ListItem.Content>
                           <View>
                              <Text style={{
                                 color: "#333",
                                 fontSize: 18,
                                 padding: 10,
                              }}>
          <Text style={{ color: 'red' }}>-</Text>{item.amount}
                              </Text>
                              <Text><Badge status='primary' value={"Delivered"} /></Text>
                           </View>
                           <ListItem.Chevron />
                        </ListItem>
                        : null}
                  </SafeAreaView>
               )}
            />
         )}
        
      </SafeAreaView>
   );


}