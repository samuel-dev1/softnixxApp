
import React from "react";


import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { View, Text, ScrollView, SafeAreaView, ActivityIndicator, Alert } from "react-native";
import { Badge, Divider, Icon, ListItem } from "react-native-elements";
import { showMessage } from "react-native-flash-message";
import ModalGropu from "../indicator/indicator";
import { useLayoutEffect } from "react";

export default function ReceiptDetails({ route, navigation }) {

    const [loading, setLoading] = React.useState(true)
    const [loadingt, setLoadingT] = React.useState(false)
    const [data, setData] = React.useState(null)
    const id_or_code = route?.params?.id


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
    const myData = () => {
        setLoadingT(true)
        const url = `https://api.paystack.co/transfer/${id_or_code}`;
        const secretKey = "sk_test_c72f103b229efd843ad772d466d6dbdaf64e52ac"; // Replace with your actual secret key
        const authorization = `Bearer ${secretKey}`
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': authorization
            }
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setData(data.data);
                setLoading(false);
                setLoadingT(false);
            })
            .catch(error => {
                showMessage({
                    message: "Network Error",
                    type: "danger",
                    position: "center",
                    backgroundColor:"darkblue",
                    color:"white",
                })

            });
    };

    React.useEffect(() => {
        myData();
    }, []);


    useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle: () => (
            <View>
              <Text>Deposit|Withdraw Receipt</Text>
            </View>
    
          ),
        });
      }, [navigation]);
  


    

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
               .status div {
                   background-color: ${data.status == 'success' ? 'green' : 'red'};
                   color: white;
                   padding: 5px;
                   border-radius: 5px;
                   font-size: 1.125em;
               }
               hr {
                   margin: 20px 0;
                   border: 1px solid #ddd;
               }
               .details div {
                   display: flex;
                   justify-content: space-between;
                   padding: 10px;
               }
               .details div div {
                   flex: 1;
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
                   .status div {
                       font-size: 1em;
                   }
                   .details div {
                       flex-direction: column;
                       text-align: left;
                   }
                   .details div div {
                       padding: 5px 0;
                   }
               }
           </style>
       </head>
       <body>
           <div class="container">
               <h2>-&#8358;${MoneyConvert(data?.amount)}</h2>
               <h3>${data?.recipient?.details.account_name}</h3>
               <p>${data?.recipient?.details?.account_number}</p>
               <p>${data?.recipient?.details?.bank_name}</p>
    
               <div class="status">
                   <div>${data?.status}</div>
               </div>
    
               <hr />
    
               <div class="details">
                   <div>
                       <div>Amount</div>
                       <div>&#8358;${data == null ? 0.0 : MoneyConvert(data?.amount)}</div>
                   </div>
    
                   <h3>Transaction Details</h3>
    
                   <div>
                       <div>Transaction Type</div>
                       <div>Transfer</div>
                   </div>
                   <div>
                       <div>Transaction Code</div>
                       <div>${route?.params?.id}</div>
                   </div>
                   <div>
                       <div>Transaction Id</div>
                       <div>${data?.id}</div>
                   </div>
                   <div>
                       <div>Recipient Code</div>
                       <div>${data?.recipient?.recipient_code}</div>
                   </div>
                   <div>
                       <div>Date/Time</div>
                       <div>${time(data?.createdAt).day},${time(data?.createdAt).month} ${time(data?.createdAt).year} ${time(data?.createdAt).time}:${time(data?.createdAt).sec} ${time(data?.createdAt).hous}</div>
                   </div>
                   <div>
                       <div>Payment Method</div>
                       <div>Balance</div>
                   </div>
               </div>
           </div>
       </body>
    </html>
    `;
        const { uri } = await Print.printToFileAsync({ html });
        Alert.alert("In app Info",'File has been saved to:', uri,   [
            { text: "Cancel", style: "cancel" }
        ]);
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    };    
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: "#fff"
        }}>

            {loading ? <ModalGropu /> :
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
                        }}>-&#8358;{MoneyConvert(data?.amount)}</Text>
                        <Text style={{
                            color: "#111",
                            fontSize: 20,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginTop: 10,
                        }}>{data?.recipient?.details?.account_name}</Text>
                        <Text style={{
                            color: "#111",
                            fontSize: 15,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginTop: 10,
                        }}>{data?.recipient?.details?.account_number}</Text>
                        <Text style={{
                            color: "#111",
                            fontSize: 13,
                            fontWeight: "normal",
                            textAlign: "center",

                        }}>{data?.recipient?.details?.bank_name}</Text>

                        <View style={{
                            alignSelf: "center",
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                            flexDirection: "row"
                        }}>
                            <View>
                                <Badge status={data?.status == "success" ? "success" : "error"} />
                            </View>
                            <View><Text style={{
                                textAlign: "center",
                                color: "green",
                                fontSize: 20,
                            }}>

                                {data?.status}</Text>

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
                            }}>&#8358;{data == null ? 0.0 : MoneyConvert(data?.amount)}</Text>
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
                        }}>Transfer</Text>
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
                        }}>{route?.params?.id}</Text>
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
                        }}>{data?.id}</Text>
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
                        }}>{data?.recipient?.recipient_code}</Text>
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
                        }}> {time(data?.createdAt).day},{time(data?.createdAt).month} {time(data?.createdAt).year} {time(data?.createdAt).time}:{time(data?.createdAt).sec} {time(data?.createdAt).hous}</Text>
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
                    

                </ScrollView>
                
            }
            <View style={{
                        marginTop: 20,
                        padding: 5,
                        display:"flex",
                        flexDirection:"row"
                        
                    }}>
                        <View 
                        style={{
                            justifyContent:"flex-start",
                            alignSelf:"left",
                            alignItems:"left",
                            alignContent:"flex-start",
                        }}
                        >
                        <Icon
                            onPress={() =>PrintToFile()}
                            name="export-variant"
                            type="material-community"
                            size={30}
                            color="gray"
                            raised

                        />
                        <Text style={{
                            textAlign: "center",

                        }}>Share now</Text>
                        </View>
                        
                    </View>
          
        </SafeAreaView>
    )

}