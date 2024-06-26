import React, { useState } from "react";


import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { Badge, ListItem } from "react-native-elements";
import { useLayoutEffect } from "react";



export default function Notification({ navigation, route }) {
    const key = route.params
    const [data, setData] = useState(null)
    function MoneyConvert(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
      }
    const [loading, setLoading] = useState(true)
    const GetReceipt = () => {
        setLoading(true)
        const url = "https://softnixx.com/api/generate_receipt/"
        try {
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Token ${key.key}`,
                },
            }).then(response => response.json())
                .then(data => {
                    setData(data)
                    setLoading(false)
                })
        }
        catch (e) {
            
            setLoading(false)
        }

    }

    React.useEffect(() => {
        GetReceipt();
    }, []);

    function formatDate(dateString) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        // Create a Date object from the input string
        const date = new Date(dateString);

        // Extract day, month, and year components
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        // Construct the formatted date string
        const formattedDate = `${day} ${month} ${year}`;

        return formattedDate;
    }

    useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle: () => (
            <View>
              <Text>Notifications</Text>
            </View>
    
          ),
        });
      }, [navigation]);
    


    return (
        
        <View style={{
            flex:1,
            backgroundColor:"#fff"
        }}>
            
            <FlatList

            initialNumToRender={5}
                ListEmptyComponent={<View style={{flex: 1,
                    alignContent: "center",
                    justifyContent: "center",
                    alignSelf: "center"}}>
                    <Text style={{ color: "red" }}>
                        Can't fecth Notifications
                    </Text>
                </View>}
                ListHeaderComponent={<View>
                    
                    <Text style={{
                        fontSize:20,
                        fontWeight:"bold",
                        color:"#111",
                        textAlign:"center",
                    }}>
                        Notification Center{data==null?null:<Badge status="error" value={data?.length} />}
                    </Text>
                </View>}
                data={data}
                renderItem ={({item})=>(
                    <View>
                       <ListItem bottomDivider>
                       <Text style={{
                        fontSize:50,
                        color:"darkblue",
                       }}>
                       •
                       </Text>
                        <ListItem.Content>
                            <Text>
                            you did a transaction of &#8358;{MoneyConvert(item?.amount)}
                            </Text>
                            <Text>
                                 {formatDate(item?.createdAt)}
                            </Text>
                        </ListItem.Content>
                        <ListItem.Chevron />
                       </ListItem>
                
                    </View>
                )}
            />
                
        </View>
    )
}