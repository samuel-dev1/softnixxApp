import React from "react";


import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { View, Text, ScrollView, SafeAreaView, ActivityIndicator, Alert } from "react-native";
import { Badge, Divider, Icon, ListItem } from "react-native-elements";
import { showMessage } from "react-native-flash-message";
import ModalGropu from "../indicator/indicator";
import { useLayoutEffect } from "react";

export default function ReceiptSoft({ route, navigation }) {


    const [loading, setLoading] = React.useState(true)
    const [data, setData] = React.useState(null)
    const [loadingt, setLoadingT] = React.useState(false)

  
    function MoneyConvert(num) {
      try{
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "00";
      }
      catch{
         return num
      }
    }
    const time = (time) => {
        date = new Date(time)
        return { "year": date.getFullYear(), "month": date.toLocaleString('en-US', { month: 'long' }), "day": date.getDate(), "time": date.getHours(), "sec": date.getMinutes(), "hous": date.getHours >= 12 ? "PM" : "AM" }
    }
    const PrintToFile = async () => {
        const html = `
    <html>
       <head>
           <title>Receipt Details</title>
           <meta name="viewport" content="width=device-width, initial-scale=1">
           <style>
               body {
                   font-family: Arial, sans-serif;
                   margin: 0;
                   padding: 0;
                   background-color: #f4f4f4;
                   color: #111;
               }
               .container {
                   padding: 10px;
                   background-color: #fff;
                   max-width: 600px;
                   margin: auto;
               }
               h2, h3, p {
                   text-align: center;
                   margin: 10px 0;
               }
               h2 {
                   font-size: 2em;
               }
               h3 {
                   font-size: 1.5em;
               }
               p {
                   font-size: 1em;
               }
               .status {
                   display: flex;
                   align-items: center;
                   justify-content: center;
                   margin: 10px 0;
               }
               .status p {
                   color: green;
                   font-size: 1.25em;
                   margin: 0 10px;
               }
               .status span {
                   font-size: 1.125em;
                   padding: 5px;
                   color: white;
               }
               hr {
                   margin: 20px 0;
                   border: 1px solid #ddd;
               }
               @media (max-width: 600px) {
                   h2 {
                       font-size: 1.5em;
                   }
                   h3 {
                       font-size: 1.25em;
                   }
                   p {
                       font-size: 0.875em;
                   }
                   .status p {
                       font-size: 1em;
                   }
                   .status span {
                       font-size: 0.875em;
                   }
               }
           </style>
       </head>
       <body>
           <div class="container">
               <h2>${data.client.id == route.params.user ? '+' : '-'}&#8358;${MoneyConvert(data.amount)}</h2>
               <h3>Softnixx App</h3>
               <p>${data.client.id === route.params.user ? `Transfer Received Acc: ${data.user.profile.tract_id}` : `Transfer Out Acc: ${data.client.profile.tract_id}`}</p>
               <p>${data.client.id == route.params.user ? `From ${data.user.username}` : `To ${data.client.username}`}</p>
    
               <div class="status">
                   <p>Successful</p>
                   <span style="background-color: ${data.status ? 'green' : 'red'};">${data.status ? 'Success' : 'Error'}</span>
               </div>
    
               <hr />
    
               <div>
                   <p>Amount</p>
                   <p>&#8358;${MoneyConvert(data.amount)}</p>
               </div>
    
               <h3>Transaction Details</h3>
    
               <div>
                   <p>Transaction Type</p>
                   <p>${data.type}</p>
               </div>
    
               <div>
                   <p>Transaction Code</p>
                   <p>${data.reference}</p>
               </div>
    
               <div>
                   <p>Transaction Id</p>
                   <p>${data.request_id}</p>
               </div>
    
               <div>
                   <p>Recipient Code</p>
                   <p>${null}</p>
               </div>
    
               <div>
                   <p>Date/Time</p>
                   <p>${time(data.createdAt).day},${time(data.createdAt).month} ${time(data.createdAt).year} ${time(data.createdAt).time}:${time(data.createdAt).sec} ${time(data.createdAt).hous}</p>
               </div>
    
               <div>
                   <p>Payment Method</p>
                   <p>Balance</p>
               </div>
           </div>
       </body>
    </html>
    `;
try {
    const { uri } = await Print.printToFileAsync({ html });
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
} catch (error) {
    Alert.alert("Error printing or sharing file:", error);
}
};
    const Getdetailr = async () => {
        setLoadingT(true)
        const itemUrL = `https://softnixx.com/api/receiptC/${route.params.id}`;
        try {
            const response = await fetch(itemUrL, {
                headers: { 
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Token ${route.params.key}`,
                },
            });
            const json = await response.json();
            setData(json)
            setLoading(false);
            setLoadingT(false)
        } catch (error) {
            showMessage({
                message: "server went wrong!",
                type: "info",
                backgroundColor:"darkblue",
                color:"white",
            })
           
        } finally {
           null
        }
    }

    React.useEffect(() => {
        Getdetailr()
    }, [])



    useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle: () => (
            <View>
              <Text>Softnixx Receipts </Text>
            </View>
    
          ),
        });
      }, [navigation]);
  





    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: "#fff"
        }}>

            {loading ? <ModalGropu />:
                <ScrollView
                >
                    <View style={{
                        paddingTop: 5,
                        backgroundColor: "#fff",
                    }}>
                        <Text style={{
                            color: "#111",
                            fontSize: 30,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginTop: 10,
                        }}> {data.client.id == route.params.user ? '+' : '-'}&#8358;{MoneyConvert(data.amount)}</Text>
                        <Text style={{
                            color: "#111",
                            fontSize: 20,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginTop: 10,
                        }}>{"Softnixx App"}</Text>
                        <Text style={{
                            color: "#111",
                            fontSize: 15,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginTop: 10,
                        }}> {data.client.id === route.params.user ? `Transfer Recieved Acc: ${data.user.profile.tract_id}` : `Transfer Out Acc: ${data.client.profile.tract_id}`}</Text>
                        <Text style={{
                            color: "#111",
                            fontSize: 13,
                            fontWeight: "normal",
                            textAlign: "center",
                        }}>{data.client.id == route.params.user ? `From ${data.user.username}` : `To ${data.client.username}`}</Text>

                        <View style={{
                            alignSelf: "center",
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                            flexDirection: "row"
                        }}>
                            <View><Text style={{
                                textAlign: "center",
                                color: "green",
                                fontSize: 20,
                            }}>Successfull</Text>

                            </View>
                            <View>
                                <Badge textStyle={{
                                    fontSize: 18,

                                }} containerStyle={{
                                    padding: 5,
                                }} status={data.status ? "success" : "error"} />
                            </View>
                        </View>
                        <Divider />
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <Text style={{
                                    color: "#111",
                                    fontSize: 20,
                                }}>
                                    Amount
                                </Text>
                            </ListItem.Content>
                            <Text style={{
                                color: "#111",
                                fontSize: 15,
                            }}> &#8358;{MoneyConvert(data.amount)}</Text>
                        </ListItem>
                    </View>
                    <Text style={{
                        fontSize: 20,
                        color: "#111",
                        padding: 5,
                        margin: 5,
                        alignSelf: "center"
                    }}>Transaction Details</Text>
                    <ListItem>
                        <ListItem.Content>
                            <Text style={{
                                color: "#111",
                                fontSize: 20,
                            }}>
                                Transaction Type
                            </Text>
                        </ListItem.Content>
                        <Text style={{
                            color: "#111",
                            fontSize: 15,
                        }}>{data.type}</Text>
                    </ListItem>
                    <ListItem>
                        <ListItem.Content>
                            <Text style={{
                                color: "#111",
                                fontSize: 20,
                            }}>
                                Transaction Code
                            </Text>
                        </ListItem.Content>
                        <Text style={{
                            color: "#111",
                            fontSize: 15,
                        }}>{data.reference}</Text>
                    </ListItem>
                    <ListItem>
                        <ListItem.Content>
                            <Text style={{
                                color: "#111",
                                fontSize: 20,
                            }}>
                                Transaction Id
                            </Text>
                        </ListItem.Content>
                        <Text style={{
                            color: "#111",
                            fontSize: 15,
                        }}>{data.request_id}</Text>
                    </ListItem>
                    <ListItem>
                        <ListItem.Content>
                            <Text style={{
                                color: "#111",
                                fontSize: 20,
                            }}>
                                Recipient Code
                            </Text>
                        </ListItem.Content>
                        <Text style={{
                            color: "#111",
                            fontSize: 15,
                        }}>{null}</Text>
                    </ListItem>
                    <ListItem>
                        <ListItem.Content>
                            <Text style={{
                                color: "#111",
                                fontSize: 20,
                            }}>
                                Date/time
                            </Text>
                        </ListItem.Content>
                        <Text style={{
                            color: "#111",
                            fontSize: 15,
                        }} >{time(data.createdAt).day},{time(data.createdAt).month} {time(data.createdAt).year} {time(data.createdAt).time}:{time(data.createdAt).sec} {time(data.createdAt).hous}</Text>
                    </ListItem>
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <Text style={{
                                color: "#111",
                                fontSize: 20,
                            }}>
                                Payment method
                            </Text>
                        </ListItem.Content>
                        <Text style={{
                            color: "#111",
                            fontSize: 15,
                        }}> Balance</Text>
                    </ListItem>
                    <View style={{
                        marginTop: 20,
                        padding: 5,
                        display:"flex",
                        flexDirection:"row"
                    }}>
                        <View style={{
                              justifyContent:"flex-start",
                              alignSelf:"left",
                              alignItems:"left",
                              alignContent:"flex-start",
                        }}><Icon
                            onPress={() => PrintToFile()}
                            name="export-variant"
                            type="material-community"
                            size={30}
                            color="gray"
                            raised
                        />
                        <Text style={{
                            textAlign: "center",

                        }}>Share now</Text></View>
                       
                    </View>
                </ScrollView>
            }
        </SafeAreaView>
    )

}