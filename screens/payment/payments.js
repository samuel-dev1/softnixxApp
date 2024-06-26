import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, Text, TextInput, Dimensions, ActivityIndicator, SafeAreaView, Alert, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { BottomSheet, Button, Divider, Icon, ListItem, SearchBar, Text as Tx } from "react-native-elements";
import { showMessage } from "react-native-flash-message";
import { useFocusEffect } from "@react-navigation/native";
import Icons from '@expo/vector-icons/MaterialCommunityIcons';
const { width, height } = Dimensions.get("window")
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from "react-native";
import ModalGropu from "../indicator/indicator";
import MyPopup from "../indicator/flayerpop";


export default function BankTransfer({ route, navigation }) {
    const [userDatas, setUserData] = useState(null);
    const [search, setSearch] = useState('')
    const [searchdata, useSearchData] = useState(null)
    const [searchloading, setSearchLo] = useState(false)
    const [bottomsheet, useBottomshet] = useState(false)
    const [amount2, setAmount2] = useState(null)
    const [discrp2, setdiscrp2] = useState('')
    const [visible, setVisble] =  useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [data, Usedata] = useState(null)
    const [loading, setLoading] =useState(true)
    function MoneyConvert(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
    }
    const appendItemIfNotExists = async (key, value) => {
        try {
            const existingValue = await AsyncStorage.getItem(key);
            const parsedValue = existingValue ? JSON.parse(existingValue) : [];
            const valueExists = parsedValue.includes(value);

            if (!valueExists) {
                parsedValue.push(value);
                await AsyncStorage.setItem(key, JSON.stringify(parsedValue));
                null
            } else {
                null
            }
        } catch (error) {
            null
        }
    };


    const getAllItemsFromAsyncStorage = async () => {
        try {
            // Get all keys stored in AsyncStorage
            const keys = await AsyncStorage.getAllKeys();

            // Initialize an object to store all items
            const allItems = {};

            // Loop through each key and retrieve its associated item
            for (const key of keys) {
                const item = await AsyncStorage.getItem(key);
                allItems[key] = item ? JSON.parse(item) : null;
            }

            useSearchData(allItems.username)
        } catch (error) {

            return null;
        }
    };
    const Getdetails = async () => {
        setLoading(true)
        const itemUrL = `https://softnixx.com/api/updateD/${route.params.data}/`;
        try {
            const response = await fetch(itemUrL, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Token ${route.params.key.key}`,
                },
            });
            const json = await response.json();
            Usedata(json)

        } catch (error) {
            showMessage({
                message: "server went wrong!",
                type: "info",
                backgroundColor:"darkblue",
                color:"white",
            })
        } finally {
            setLoading(false)
        }
    }



    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View>
                    <Text>Instant Transfer </Text>
                </View>

            ),
        });
    }, [navigation]);



    useEffect(() => {
        Getdetails()
    }, [])
    const GetUser = async () => {
        setSearchLo(true)
        const itemUrL = `https://softnixx.com/userlook/`;
        try {
            const response = await fetch(itemUrL, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Token ${route.params.key.key}`,
                },
                method: 'POST',
                body: JSON.stringify({
                    person: search.trim().toLowerCase(),
                })
            });

            if (!response.ok) {
               
                setSearchLo(false)
                useBottomshet(false)
            }
            const data = await response.json();
            setUserData(data)
            appendItemIfNotExists("username", data.data.username)
            setSearchLo(false)
        } catch (error) {
            setSearchLo(false)
            showMessage({
                message: "No match, account block or user not found",
                type: "danger",
                position: "center",
                backgroundColor:"darkblue",
                color:"white",
            })
        }

    }
    const GetItemLoaded = () => {
        const [Discription, useDiscription] = React.useState('optional');
        const [amount, useAmount] = React.useState(null);

        const handleNav = () => {
            if (amount == null) {
                showMessage({
                    message: "Amount cannot be empty",
                    type: "info",
                    position: "center",
                    backgroundColor:"darkblue",
                    color:"white",
                })
            }
            else {
                setAmount2(amount);
                setdiscrp2(Discription);
                useBottomshet(!bottomsheet);
                setVisble(true);
            }
        }
        return (
            <BottomSheet
                containerStyle={{
                    backgroundColor: "#fff",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    position: "absolute",
                    elevation:10,

                }}
                isVisible={bottomsheet}
            >
                <View
                    style={{
                        backgroundColor: "#fff",
                        paddingBottom: 30,
                    }}
                >
                  
<View style={{
              display:"flex",
              flexDirection:"row",
              justifyContent:"space-between",
              alignItems:"center",
              
          }}>
<Icon 
        name="close" 
        color="gray"
        iconStyle={{
          borderWidth:0.5,
          borderRadius:80,

        }} 
        onPress={() => useBottomshet(false)}
      />
      <Text></Text>
          </View>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            color: "gray",
                            textAlign: "center",
                            padding: 5,
                            margin: 5,
                        }}
                    >
                        Transfer
                    </Text>
                    <Divider />
                    <ListItem>
                        <ListItem.Content>
                            <ListItem.Input
                                value={amount != null ? amount : null}
                                onChangeText={(val) => useAmount(val)}
                                keyboardType="number-pad"
                                textAlign="left"
                                placeholder="enter Amount"
                            />
                            {amount == null ? null :
                                <Text>&#8358;{MoneyConvert(amount)} {amount > data.profile.account_balance ? <Text style={{
                                    color: "red",

                                }}>insufficent bal</Text> : null}</Text>
                            }
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItem.Content>
                            <ListItem.Input
                                value={Discription}
                                onChangeText={(val) => useDiscription(val)}
                                keyboardType="default"
                                textAlign="left"
                                placeholder="Optional"
                            />
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                    <Divider />
                    <Divider />
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Addfund', { 'amount': amount, "discription": Discription });
                            setIsVisible(false); 
                        }}
                        type="solid"
                        buttonStyle={{
                            backgroundColor: "darkblue",
                            width: 250,
                            padding: 10,
                            margin: 5,
                            alignSelf: "center",
                        }}
                        titleStyle={{ color: "#fff" }}
                        title={"Pay Out"}
                    >
                        <Button
                            onPress={
                                () => {
                                    if (amount > data.profile.account_balance) {
                                        Alert.alert("insuficenit fund")
                                    }
                                    else {
                                        handleNav()
                                    }
                                }}
                            title={"Continue"}
                            buttonStyle={{
                                backgroundColor: "darkblue",
                                width: 250,
                                padding: 10,
                                margin: 5,
                                alignSelf: "center"
                            }}
                        />
                    </TouchableOpacity>
                </View>
                
            </BottomSheet>
        );
    };
const button =()=>{
    return(
        setIsVisible(true)
    )
}

    const Bottomsheetfinal = () => {
        const [pin, setPin] = React.useState("");

        const handlePinInput = (val) => {
            if (pin.length < 4) {
                setPin(pin + val);
            }
        };
  
        const handleDelete = () => {
            if (pin.length > 0) {
               setPin(pin.slice(0, -1));
            }
         };

        function handleSubmit() {
            setLoading(true)

            if (pin.trim() == route.params.pin) {
                const url = "https://softnixx.com/payup/"
                try {
                    fetch(url, {
                        method: "POST",
                        body: JSON.stringify({
                            client: userDatas.data.username,
                            amount: amount2,
                            name: 'softnix',
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                            Authorization: `Token ${route.params.key.key}`,
                        }
                    }).then(response => response.json())
                        .then(data => {
                            if (data.status == "inbal") {
                                Alert.alert("you don't have enough found in your wallet bal")
                            }
                            useBottomshet(false)

                        }).then(() => navigation.navigate("status", { "data": data.status, 'key':route.params.key.key,"id":data.id}))
                        .catch(()=>{
                            Alert.alert("App info","seomething went wrong")
                            useBottomshet(false)
                            setLoading(false)
                        }).finally(()=>{setLoading(false), useBottomshet(false)})
                }
                catch (e) {
                    Alert.alert("App info","seomething went wrong")
                    useBottomshet(false)
                    setLoading(false)
                }
            }
            else {
                Alert.alert("invalid pin " + pin)
                setLoading(false)
            }


        }
        function Changepass(val) {
            if (pin.length == 1) {
                return ('* Ø Ø Ø')
            }
            else if (pin.length == 2) {
                return ('* * Ø Ø')
            }
            else if (pin.length == 3) {
                return ('* * * Ø')
            }
            else if (pin.length == 4) {
                return ('* * * *')
            }
        }

        return (
            <BottomSheet
                containerStyle={{
                    backgroundColor: "#fff",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    position: "absolute",
                }}
            
                isVisible={isVisible}>
                <View style={{
                    backgroundColor: "#fff",
                    paddingBottom: 30,
                    borderColor: "lightgray",
                    borderWidth: 1,
                    shadowColor: "#000",
                    shadowOpacity: 0.5,
                }}>
            
<View style={{
              display:"flex",
              flexDirection:"row",
              justifyContent:"space-between",
              alignItems:"center",
              padding:5,
              margin:5,
          }}>
<Icon 
        name="close" 
        color="gray"
        iconStyle={{
          borderWidth:0.5,
          borderRadius:80,

        }} 
        onPress={() => setIsVisible(false)}
      />
      <Text></Text>
          </View>
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
                            Enter Your Transaction Pin
                        </Text>
                    </View>
                    <View style={{
                        padding: 15,
                        margin: 15,
                        borderColor: "darkgray",
                        borderWidth: 1,
                        alignContent: "center",
                        justifyContent: "center",
                        alignSelf: "center",
                        backgroundColor: "lightgray",
                        borderRadius: 10,
                    }}>{pin == "" ? <Text style={{
                        fontSize: 30,
                        padding: 10,
                    }}>Ø Ø Ø Ø</Text> : <Text style={{
                        fontSize: 30,
                        padding: 10,
                    }}>{Changepass(pin)}</Text>}</View>
                    <View style={styles.keypad}>
                        <View style={styles.digitRow}>
                            {[1, 2, 3].map((num) => (
                                <TouchableOpacity
                                    key={num}
                                    onPress={() => handlePinInput(num.toString())}
                                    style={styles.digitButton}
                                >
                                    <Text style={styles.digitText}>{num}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.digitRow}>
                            {[4, 5, 6].map((num) => (
                                <TouchableOpacity
                                    key={num}
                                    onPress={() => handlePinInput(num.toString())}
                                    style={styles.digitButton}
                                >
                                    <Text style={styles.digitText}>{num}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.digitRow}>
                            {[7, 8, 9].map((num) => (
                                <TouchableOpacity
                                    key={num}
                                    onPress={() => handlePinInput(num.toString())}
                                    style={styles.digitButton}
                                >
                                    <Text style={styles.digitText}>{num}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View style={styles.digitRow}>
                            <TouchableOpacity
                                onPress={handleDelete}
                                style={styles.cancelButton}
                            >
                                <Icons name="cancel" color="white" size={20} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => handlePinInput("0")}
                                style={styles.digitButton}
                            >
                                <Text style={styles.digitText}>0</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleSubmit}
                                style={styles.submitButton}

                            >
                                {loading?<ActivityIndicator />:
                                <Icons name={"arrow-right"} color="white" size={40} />
                            }
                               
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </BottomSheet>
        )
    }






    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View>
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
                        Bals: &#8358;{data == null ? null : MoneyConvert(data.profile.account_balance)}
                    </Text>
                </View>
                <View>
                    <Text style={{
                        margin: 5,
                        padding: 5,
                        fontSize: 17,
                    }}>Recipitant SN/ID</Text>
                    <SearchBar
                        value={search}
                        keyboardType={"web-search"}
                        onChangeText={val => setSearch(val)}
                        showLoading={searchloading}
                        label={searchloading ? `loading` : null}
                        onEndEditing={GetUser}
                        theme={false}
                        placeholder={"Search with softnixx sn number / with Username"}
                        searchIcon={{ name: "search", type: "font-awesome" }}
                        round={true}
                        containerStyle={{
                            backgroundColor: '#fff',
                            borderBottomWidth: 0, // Remove bottom border
                            borderTopWidth: 0,    // Remove top border
                            borderLeftWidth: 0,   // Remove left border
                            borderRightWidth: 0,  // Remove right border
                            borderRadius: 0,
                            padding: 2,
                        }}
                        inputContainerStyle={{
                            backgroundColor: "#fafafa",
                            shadowColor: "#000",
                            shadowRadius: 10,
                            shadowOpacity: 0.1,
                            borderBottomWidth: 0, // Remove bottom border
                            borderTopWidth: 0,    // Remove top border
                            borderLeftWidth: 0,   // Remove left border
                            borderRightWidth: 0,  // Remove right border
                            borderRadius: 10,
                            padding: 2     // Remove border radius (if any)
                        }}
                    />
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "normal",
                        margin: 5,
                        padding: 5,
                    }}>Free service  T/C includes</Text>
                </View>
                {userDatas == null ? null :
                    <View
                        style={{
                            alignSelf: "center",
                            backgroundColor: "darkblue",
                            padding: 7,
                            marginTop: 10,
                            borderRadius: 10,
                            display: "flex",
                            flexDirection: "row",
                            alignItems:"center",
                            justifyContent:"space-evenly",
                        }}>
                        <View style={{
                            margin:5,
                        }}>
                            <Icon iconStyle={{
                               
                            }} type="font-awesome" name="check-circle" size={20} color="lightblue" />
                        </View>
                        <View>
                            <Text style={{
                            color: "white",
                            fontSize: 17,
                            fontWeight: "bold",
                            textAlign: "center",
                        }}>
                            {userDatas.data == undefined ? userDatas.message : (userDatas.data.first_name + " " + userDatas.data.last_name)}
                        </Text></View>

                    </View>
                }
                <View style={{
                    padding: 10,
                    justifyContent: "flex-start",
                    alignSelf: "flex-start",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                    {userDatas === null ? null :
                        <View>
{userDatas.message =='account block'?null:
                            <Button
                                onPress={() => {
                                    if (data.username == userDatas.data.username) {
                                        Alert.alert("App info?","please look up another user")
                                    }
                               
                                    else {
                                        useBottomshet(!bottomsheet)
                                    }

                                }}
                                buttonStyle={{
                                    alignSelf: "flex-start",
                                    
                                }} title={"continue"} type="outline" titleStyle={{
                                    color: "darkblue",
                                    fontWeight: "bold",
                                }} />

                            }

                            <Divider />
                        </View>
                    }
                </View>

                <View>
                    <Text style={{
                        color: "darkgray",
                        fontSize: 18,
                        fontWeight: "bold",
                        padding: 5,
                        margin: 5
                    }}>Beneficiary</Text>
                </View>
                <FlatList
                    data={searchdata}
                    renderItem={({ item }) => (

                        <View>
                            <ListItem bottomDivider>
                                <Icon name='user-circle' type="font-awesome" size={20} />
                                <ListItem.Content>
                                    <ListItem.Title>
                                        <Text>{item}</Text>
                                    </ListItem.Title>
                                </ListItem.Content>
                            </ListItem>


                        </View>
                    )}
                />
            </View>
            <GetItemLoaded />
            <Bottomsheetfinal />
    
           <MyPopup data={userDatas?.data?.username} amount={amount2} visible={visible} setvisble={setVisble} button={button} />
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
