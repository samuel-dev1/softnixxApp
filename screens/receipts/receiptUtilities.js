import React from "react";

import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

import { View, Text, ScrollView, SafeAreaView, ActivityIndicator, Alert } from "react-native";
import { Badge, Divider, Icon, ListItem } from "react-native-elements";
import { showMessage } from "react-native-flash-message";
import { encode } from "base-64";
import ModalGropu from "../indicator/indicator";
import { useLayoutEffect } from "react";

export default function ReceiptUtilites({ route, navigation }) {

    const [loading, setLoading] = React.useState(true)
    const [loadingt, setLoadingT] = React.useState(false)
    const [data, setData] = React.useState(null)
    const id_or_code = route?.params?.id

    function formatDate(dateString) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const date = new Date(dateString);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const formattedDate = `${day} ${month} ${year}`;
        return formattedDate;
    }
    function MoneyConvert(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const time = (time) => {
        date = new Date(time)
        return { "year": date.getFullYear(), "month": date.toLocaleString('en-US', { month: 'long' }), "day": date.getDate(), "time": date.getHours(), "sec": date.getMinutes(), "hous": date.getHours >= 12 ? "PM" : "AM" }

    }

    useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle: () => (
            <View>
              <Text>Utilities Receipts</Text>
            </View>
    
          ),
        });
      }, [navigation]);
  

    const myData = () => {
        setLoadingT(true)
        const email = "samuelyyyy257@gmail.com";
        const password = "antydamilove1";
        const credentials = `${email}:${password}`;
        const encodedCredentials = encode(credentials);
        const url = `https://sandbox.vtpass.com/api/requery?request_id=${id_or_code}`;
        fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": `Basic ${encodedCredentials}`,
            }
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
                setLoadingT(false)
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
               .details {
                   margin-bottom: 10px;
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
                   .status p {
                       font-size: 1em;
                   }
                   .status span {
                       font-size: 0.875em;
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
               <h2>-&#8358;${MoneyConvert(data.amount)}</h2>
               <h3>${data.content.transactions.type}</h3>
               <p>${data.content.transactions.product_name}</p>
               <p>${data.content.transactions.unique_element}</p>
    
               <div class="status">
                   <p>${data.content.transactions.status}</p>
                   <span style="background-color: ${data.content.transactions.status == 'delivered' ? 'green' : 'red'};">${data.content.transactions.status == "delivered" ? "Success" : "Error"}</span>
               </div>
    
               <hr />
    
               <div class="details">
                   <div>
                       <div>Transaction Type</div>
                       <div>${data.content.transactions.type}</div>
                   </div>
                   <div>
                       <div>Transaction Code</div>
                       <div>${route.params.id}</div>
                   </div>
                   <div>
                       <div>Transaction Id</div>
                       <div>${data.content.transactions.transactionId}</div>
                   </div>
                   <div>
                       <div>Recipient Code</div>
                       <div>${data.requestId}</div>
                   </div>
                   <div>
                       <div>Date/Time</div>
                       <div>${time(data.transaction_date.date).day},${time(data.transaction_date.date).month} ${time(data.transaction_date.date).year} ${time(data.transaction_date.date).time}:${time(data.transaction_date.date).sec} ${time(data.transaction_date.date).hous}</div>
                   </div>
                   <div>
                       <div>Payment method</div>
                       <div>Balance</div>
                       <div>${data.purchased_code ? data.purchased_code : null}</div>
                   </div>
               </div>
           </div>
       </body>
    </html>
    `;
        const { uri } = await Print.printToFileAsync({ html });
        Alert.alert("In app Info",'File has been saved to:');
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    };

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
                        }}>-&#8358;{MoneyConvert(data.amount)}</Text>
                        <Text style={{
                            color: "#111",
                            fontSize: 20,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginTop: 10,
                        }}>{data.content.transactions.type}</Text>
                        <Text style={{
                            color: "#111",
                            fontSize: 15,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginTop: 10,
                        }}>{data.content.transactions.product_name}</Text>
                        <Text style={{
                            color: "#111",
                            fontSize: 13,
                            fontWeight: "normal",
                            textAlign: "center",
                        }}>{data.content.transactions.unique_element}</Text>

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
                            }}>{data.content.transactions.status}</Text>

                            </View>
                            <View>
                                <Badge textStyle={{
                                    fontSize: 18,

                                }} containerStyle={{
                                    padding: 5,
                                }} status={data.content.transactions.status == "delivered" ? "success" : "error"} />
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
                        }}>{data.content.transactions.type}</Text>
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
                        }}>{route.params.id}</Text>
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
                        }}>{data.content.transactions.transactionId}</Text>
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
                        }}>{data.requestId}</Text>
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
                        }} >{time(data.transaction_date.date).day},{time(data.transaction_date.date).month} {time(data.transaction_date.date).year} {time(data.transaction_date.date).time}:{time(data.transaction_date.date).sec} {time(data.transaction_date.date).hous}</Text>
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
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <Text>
                                Token
                            </Text>
                            <Text>
                                {data.purchased_code?data.purchased_code:null}
                            </Text>
                        </ListItem.Content>
                        <Text>
                            {data?.tokenAmount}
                        </Text>
                        <ListItem.Chevron />
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
                    
                        }}>
                        <Icon
                            onPress={() => PrintToFile()}
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
                </ScrollView>
            }
        </SafeAreaView>
    )

}