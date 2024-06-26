import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, SafeAreaView, StyleSheet } from "react-native";
import { BottomSheet, Button, Divider, Icon, Input, ListItem } from "react-native-elements";
import { showMessage } from "react-native-flash-message";

import CustomDropdown from "../extra/dropdown";
import AntDesign from '@expo/vector-icons/AntDesign';


const { width, height } = Dimensions.get("window")
export default function Transfer({ route, navigation }) {
    const [bankData, SetbankData] = useState([])
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState(null)
    const [isFocus, setIsFocus] = useState(false);
    const [bankResolved, setBankResloved] = useState(null)
    const [accountinput, setinput] = useState('')
    const [buttonc, setBottonc] = React.useState(false)
    const [data, setData] = React.useState(null)


    const getbanks = () => {
        setBottonc(true)
        const secretKey = 'sk_test_c72f103b229efd843ad772d466d6dbdaf64e52ac';
        const url = 'https://api.paystack.co/bank?currency=NGN';

        const headers = {
            'Authorization': `Bearer ${secretKey}`
        };
        try {
            fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: headers,
                },
            })
                .then(response => response.json())
                .then(data => {
                    SetbankData(data.data)
                    setLoading(false)
                    setBottonc(false)

                })
        }
        catch {
            showMessage({
                message: "Account Details not found?",
                type: "danger",
                position: "center",
                backgroundColor:"darkblue",
                color:"white",
            })
            setLoading(false)
            setBottonc(false)

        }
    }
    const verifyName = () => {
        setBottonc(true)
        const url = `https://api.paystack.co/bank/resolve?account_number=${accountinput}&bank_code=${value?.code}`;
        const secretKey = 'sk_test_c72f103b229efd843ad772d466d6dbdaf64e52ac';
        try {

            fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${secretKey}`
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data?.status === false) {
                        showMessage({
                            message: data.message,
                            type: "danger",
                            position: "center",
                            backgroundColor:"darkblue",
                            color:"white",
                        })
                        setBottonc(false)
                    }
                    else {
                        setBankResloved(data)
                        setBottonc(false)
                    }
                })
        }
        catch {
            null
        }
        finally {
            null
        }
    }
    const sendMoney = () => {
        const apiUrl = "https://api.paystack.co/transferrecipient";
        const secretKey = 'sk_test_c72f103b229efd843ad772d466d6dbdaf64e52ac';
        const requestData = {
           type: "nuban",
           name:bankResolved?.data?.account_name ,
           account_number:accountinput,
           bank_code:value?.code,
           currency: "NGN"
        };
        fetch(apiUrl, {
           method: 'POST',
           headers: {
              'Authorization': `Bearer ${secretKey}`,
              'Content-Type': 'application/json',
           },
           body: JSON.stringify(requestData),
        })
           .then(response => response.json())
           .then(data => {
              setData(data);
           }).then(()=>navigation.navigate("finalize",{'username':route.params.datas, "bank":bankResolved.data.account_name,"bank_code":data?.data?.recipient_code, 'acc_number':accountinput,
        'pin':route.params.pin, "key":route.params.key
        }))
           .catch((error) => {
              showMessage({
                 message: "pls try again in 10s",
                 type: "danger",
                 position: "center",
                 backgroundColor:"darkblue",
                 color:"white",
              })
  
           });
     }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={{
                width: width * 0.90,
                alignSelf: "center",
                backgroundColor: "darkblue",
                padding: 10,
                marginTop: 10,
                borderRadius: 10,
            }}>
                <Text style={{
                    color: "white",
                    fontSize: 17,
                    fontWeight: "bold",
                    textAlign: "center"
                }}>
                    Transfer cost &#8358;5
                </Text>
            </View>
          <Text style={{
             color: "gray",
             fontSize:20,
             fontWeight:"normal",
             padding:10,
             margin:5,
             textAlign:"center"
          }}>
            Enter Account Details
          </Text>
            <ListItem containerStyle={{
                marginBottom:10,
                marginTop:20,
            }}>
                <ListItem.Content>
                    <ListItem.Input
                    inputStyle={{
                        padding:10,
                        margin:0,
                        borderWidth:0.5,
                        borderColor:"lightgray",
                        borderRadius:5,

                    }}
                    keyboardType='decimal-pad'
                        value={accountinput}
                        onChangeText={(val) => setinput(val)}
                        onEndEditing={getbanks}
                        placeholderTextColor={'darkgray'}
                        maxLength={10} textAlign="left" placeholder="Enter 10 digit of account number" />
                </ListItem.Content>
            </ListItem>
           
            <View style={{
                marginTop:20,
                width:width*0.90,
                alignSelf:"center"
            }}>
<CustomDropdown
options={bankData ? bankData : null}
item={accountinput}
value={setValue}
/>
            </View>
            <Divider />
            {bankResolved == null ? null :
                <View
                    style={{
                        alignSelf: "center",
                        backgroundColor: "darkblue",
                        padding: 7,
                        marginTop: 10,
                        borderRadius: 10,
                        display:"flex",
                        flexDirection:"row",
                        alignItems:"center",
                    }}>
                        <View>
                        <Icon raised type="font-awesome" name="check-circle" size={10} color="green" />
                        </View>
                        <View>      
                    <Text style={{
                        color: "white",
                        fontSize: 15,
                        fontWeight: "bold",
                        textAlign: "center",
                    }}>
                        {bankResolved?.data?.account_name}
                    </Text>
                        </View>
                  
                </View>
            }
            <View>
                {loading ? null :
                    (
                        <Button
                            loading={buttonc}
                            type='outline'
                            onPress={bankResolved == null ? verifyName :sendMoney}
                            buttonStyle={{
                                width: 150,
                                marginTop: 20,
                                alignSelf: "center",
                                backgroundColor: "darkblue",
                            }}
                            titleStyle={{
                                color:"white"
                            }}
                            title={bankResolved == null ? "Continue" : "pay"} />
                    )
                }
            </View>
            <ListItem>
                <Icon color={"red"} name="question-circle" type="font-awesome" />
                <ListItem.Content>
                    <Text>
                        Failed to get recent Tranfer
                    </Text>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            
            <View style={{
                position: "absolute",
                bottom: 0,
                marginBottom: 20,
                alignSelf: "center"
            }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: "normal",
                    color: "gray",
                    alignSelf: "center"
                }}>provided by softtellex inc.</Text>
            </View>

        </SafeAreaView>
    )

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
        color: "gray",
    },
    selectedTextStyle: {
        fontSize: 16,
        color: "gray",
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 30,
        fontWeight: '600',
        marginBottom: 10,
    },
    subHeaderText: {
        fontSize: 20,
        textAlign: 'center',
    },
    keypad: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
    },
    digitRow: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    digitButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "lightgray",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
    },
    digitText: {
        fontSize: 25,
        fontWeight: "bold",
    },
    emptyButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "lightgray",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
    },
    submitButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "darkblue",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
    },
    cancelButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "brown",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
    },

});