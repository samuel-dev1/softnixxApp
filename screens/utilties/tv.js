import React, { useState, useEffect,useLayoutEffect} from "react";
import { Dropdown } from "react-native-element-dropdown";
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableOpacity, Alert, FlatList } from "react-native";
import { Dimensions } from "react-native";
import { Button, Divider, Icon, ListItem, BottomSheet } from "react-native-elements";
import { TextInput } from "react-native";
import { encode } from 'base-64';
import AntDesign from '@expo/vector-icons/AntDesign';
import { showMessage } from "react-native-flash-message";
import Icons from '@expo/vector-icons/MaterialCommunityIcons';
import { ActivityIndicator } from "react-native";
const { width, height } = Dimensions.get("window")
import { Overlay } from "react-native-elements";
import ModalGropu from "../indicator/indicator";
import CustomUtilesDrop from "../indicator/utilitiesSelect";
import CustomOverlay from "../indicator/flayersforUtil";
import Listult from "../indicator/flatlist";
import CustomUtilesDrop1 from "../indicator/flatlist";

export default function Tv({ route, navigation }) {
    const [data, setData] = useState([]);
    const [value2, setValue2] = useState(null)
    const [focus2, setIsFocus2] = useState(false)
    const [show, setShow] = useState(false)
    const [dataR, setdataR] = useState([]);
    const [phone, setPhone] = useState(null)
    const [drop, setDrop] = useState(false);
    const [value, setValue] = useState(null)
    const [isFocus, setIsFocus] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [Amount, setAmount] = useState(null)
    const [variation, setVariation] = useState(null)
    const [subcr, setSubcrip] = useState(null)
    const [loading, setLoading] = useState(true)
    const [dataT, setDataT] = useState(null)
    const [smartcardMettP, useSmartcarmetP] = useState('')
    const [overlay, setOverlay] = useState(false)

    function MoneyConvert(num) {
          return num?.toLocaleString();
      }

    const dataCard = [
        { label: 'GOTV', value: "gotv" },
        { label: 'STARTIME', value: "startimes" },
        { label: 'Dstv', value: "dstv" },
        {label:"SHOW-MAX",value:"showmax"},
    ]

    const fetchData = async (serviceID) => {
        try {
            const itemUrl = `https://api-service.vtpass.com/api/service-variations?serviceID=${serviceID}`;
            const response = await fetch(itemUrl);
            const json = await response.json();
            setData(json.content);
        } catch (error) {
            
        }
    };


    const handleView=()=>{
        setIsVisible(true)
    }

    useEffect(() => {
        fetchData(value);
    }, [value]);



  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View>
          <Text>Cables</Text>
        </View>
      ),
    });
  }, [navigation]);
 
    const GetUser = async () => {
        setShow(true)
        const email = "samuelyyyy257@gmail.com";
        const password = "antydamilove1";
        const credentials = `${email}:${password}`;
        const encodedCredentials = encode(credentials);
        const url = `https://api-service.vtpass.com/api/merchant-verify?billersCode=${smartcardMettP}&serviceID=${value}`;
        fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${encodedCredentials}`,
            }
        })
            .then(resp => resp.json())
            .then(dataresp => {
                if (dataresp.content.Customer_Name) {
                    setDataT(dataresp)
                }
                else {
                    showMessage(
                        {
                            message: "pls check your smartcard and try again? or select a plaftform",
                            type: "danger",
                            position: "center",
                        }
                    )
                }
            })
            .catch(error => showMessage(
                {
                    message: "Network error",
                    type: "danger",
                    position: "center",
                }

            )).finally(()=>setShow(false));

    }


    function generateRequestId() {
        // Get the current date and time in Africa/Lagos timezone
        const lagosTimezoneOffset = 60; // Lagos timezone is GMT+1, so the offset is 60 minutes
        const now = new Date();
        const lagosTime = new Date(now.getTime() + lagosTimezoneOffset * 60000);

        // Extract year, month, day, hour, and minute components
        const year = lagosTime.getUTCFullYear().toString();
        const month = (lagosTime.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = lagosTime.getUTCDate().toString().padStart(2, '0');
        const hour = lagosTime.getUTCHours().toString().padStart(2, '0');
        const minute = lagosTime.getUTCMinutes().toString().padStart(2, '0');

        // Combine the components to create the Request ID
        const requestIdPrefix = year + month + day + hour + minute;

        // You can append additional characters as desired to make it 12 characters or more
        const additionalCharacters = 'ad8ef08acd8fc0f'; // Example additional characters

        // Ensure the Request ID is at least 12 characters long
        const requestId = requestIdPrefix + additionalCharacters.slice(0, Math.max(0, 12 - requestIdPrefix.length));

        return requestId;
    }

    // Example usage:
    const requestId = generateRequestId().toString();
    // This will output a Request ID in the specified format

    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }

        return result;
    }

    const randomString = generateRandomString(12);
    const y_id = (requestId + randomString).toString()


    const OpenModal = () => {
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
            setShow(true)
            if (pin.length !== 4) {
                Alert.alert("Your PIN must be 4 digits");
                setShow(false)
                return;
            }
            if (pin.trim() === dataR.profile.transaction_pin) {
                const randomString = generateRandomString(12);
                const y_id = (requestId + randomString).toString()
                const email = "samuelyyyy257@gmail.com";
                const password = "antydamilove1";
                const credentials = `${email}:${password}`;
                const encodedCredentials = encode(credentials);
                let url =''
                if(subcr =="change"){
                 url = `https://api-service.vtpass.com/api/pay?billersCode=${smartcardMettP}&serviceID=${value}&phone=${phone}&request_id=${y_id}&amount=${Amount}&variation_code=${variation}&subscription_type=${subcr}`;
                }
                else{
                 url = `https://api-service.vtpass.com/api/pay?billersCode=${smartcardMettP}&serviceID=${value}&phone=${phone}&request_id=${y_id}&amount=${Amount}&subscription_type=${subcr}`;
                }
                fetch(url, {
                    method: "POST",
                    headers: {
                        "Authorization": `Basic ${encodedCredentials}`,
                    }
                })
                    .then(resp => resp.json())
                    .then(dataresp => {
                        showMessage({
                            message:"Please wait, or set your requirement for easy processing!",
                            type:"danger",
                            color:"white",
                            backgroundColor:"darkblue",
                          })

                        fetch('https://softnixx.com/api/createR/', {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json',
                                Accept: 'application/json',
                                'Authorization': `Token ${route.params.key}`,
                            },
                            body: JSON.stringify({
                                amount: dataresp.amount,
                                status: dataresp.content.transactions.type,
                                reference: dataresp.content.transactions.transactionId,
                                request_id: y_id,
                                name:'Utility',
                            })
                        }).then(() => navigation.navigate("Status", { "data":dataresp.content.response_description, 'key': route.params.key }))
                    }).then(()=>setIsVisible(!isVisible)).finally(()=>setShow(false))
                    .catch(error => 
                     setShow(false)
                       
                    );
                   
            

            }
            else{
                Alert.alert("invalid pin, do you forget your pin?")
                setShow(false)
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
                    borderColor: "darkgray",
                    borderWidth: 1,
                    shadowColor: "#000",
                    shadowOpacity: 0.5,
                }}>
                     <View style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
               }}>
                  <Icon
                     name="close"
                     color="gray"
                     iconStyle={{
                        borderWidth: 0.5,
                        borderRadius: 80,
                        padding:10,
                        margin:5,

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
                            Enter your transaction Pin
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
                                disabled={show}

                            >
                                                              {show?<ActivityIndicator />:
                                <Icons name={"arrow-right"} color="white" size={40} />
                            }

                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </BottomSheet>
        )
    }

    const prouseR = async () => {

        const itemUrL = `https://softnixx.com/api/updateD/${route.params.username}/`;
        try {
            const response = await fetch(itemUrL, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Token ${route.params.key}`,
                },
            });
            const json = await response.json();
            setdataR(json);
            setLoading(false)

        } catch (error) {
            null
            
        } finally {
            null

        }
    }
    React.useEffect(() => {
        prouseR();
    }, []
    );

    return (

        <View style={{
            flex: 1,
            backgroundColor: "#fff"
        }}><ScrollView>
                <View style={{
                    padding: 10,
                    backgroundColor: "darkblue",
                    width: width * 0.97,
                    alignSelf: "center",
                    borderRadius: 10,
                }}>
                    <Text
                        style={{
                            fontSize: 14,
                            textAlign: "center",
                            color: "#fff",

                        }}
                    >hello, you can connect Your tv in a minute</Text>
                    <Text
                        style={{
                            fontSize: 26,
                            color: "white",
                            textAlign: "center",
                            fontWeight: "normal",
                        }}
                    > bal, &#8358;{loading ? null : MoneyConvert(dataR.profile.account_balance)}</Text>
                </View>

<View>
    <View><CustomUtilesDrop
        options={dataCard}
        value={setValue}
        extra={"select provider"}
        label={"label"}
            /></View>

            <View>
                 <ListItem>
                    <ListItem.Content>
                        <ListItem.Input
                        inputMode='numeric'
                        disabled={value==null?true:false}
                        maxLength={11}
                        value={phone}
                        onChangeText={val =>setPhone(val)}
                        placeholder="Enter your Phone number"
                        textAlign="left"
                        containerStyle={{
                            borderColor: "lightgray",
                            borderWidth: 1,
                            padding: 10,
                            borderRadius: 5,
                        }}
                        />
                    </ListItem.Content>
                </ListItem>
            </View>
                </View>
                        <Divider />
                <ListItem topDivider>
                    <ListItem.Content>
                        <ListItem.Input
                        returnKeyType='next'
                            maxLength={10}
                            value={smartcardMettP}
                            onEndEditing={GetUser}
                            onChangeText={val => useSmartcarmetP(val)}
                            placeholder="enter your iuc/smarcard number"
                            textAlign="left"
                            containerStyle={{
                                borderColor: "lightgray",
                                borderWidth: 1,
                                padding: 10,
                                borderRadius: 5,
                            }}
                        />
                    </ListItem.Content>
                </ListItem>
                {show?<ActivityIndicator />:null}
                <Divider />
                {dataT == null ? null :
                    <ListItem>
                        <Icon name="check-circle" type="font-awesome" color={"darkblue"} />
                        <ListItem.Content>
                            <ListItem.Content>
                                <Text style={{
                                    color: "green",
                                    textAlign: "justify",
                                }}>
                                    {dataT.content.Customer_Name}
                                </Text>
                            </ListItem.Content>
                        </ListItem.Content>
                        <Text>
                            {dataT.content.Current_Bouquet}
                        </Text>
                    </ListItem>
                }

                {dataT == null ? null :
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        alignSelf: "center",
                        justifyContent: "space-around",
                        alignItems: "center",
                    }}>
                        <Button
                            onPress={() =>{ 
                               setDrop(!drop)
                            }}
                            buttonStyle={{
                                margin: 5,
                                padding: 6,
                            }} type="outline" title={"Change package"} />

                        {dataT?.content?.Renewal_Amount == undefined ? null :
                            <Button
                            onPress={()=>
                            {
                                setAmount(dataT.content.Renewal_Amount);
                                setSubcrip("renew");
                                if(dataR != null && dataR.profile.account_balance < Amount ){
                                    showMessage({
                                        message:"Low account bals:!",
                                        type:"danger",
                                        color:"white",
                                        backgroundColor:"darkblue",
                                      })
                                }
                                else{
                                    setOverlay(true)
                                }
                            }}
                            buttonStyle={{
                                margin: 5,
                                padding: 6,
                                backgroundColor:"darkblue"
                            }} type="solid" title={`Pay N ${MoneyConvert(dataT.content.Renewal_Amount)}`} />
                        }
                    </View>
                }
                {drop ?
                  <CustomUtilesDrop1 options={data?.variations} value={setValue2} extra={"select plan"}  />
                    : null
                }
                {value2 == null ? null : <Button

                    onPress={()=>{
                        setAmount(value2.variation_amount);
                        setVariation(value2.variation_code);
                        setSubcrip("change");
                        if(dataR != null && dataR.profile.account_balance < Amount ){
                            showMessage({
                                message:"ACCOUNT BALANCE IS LOW?",
                                type:"danger",
                                position:"center",
                                backgroundColor:"darkblue",
                                color:"white",
                            })
                        }
                        else{
                        setOverlay(!overlay)
                        }
                    }}
                    buttonStyle={{
                        padding: 10,
                        marginTop: 10,
                        width: 200,
                        alignSelf: "center",
                        backgroundColor:"darkblue"
                    }}
                    title={`pay N ${value2 != null?(MoneyConvert(value2.variation_amount)):0.0}`}
                />}
            </ScrollView>
{loading?<ModalGropu />:null}
            <OpenModal />
            <CustomOverlay isVisible={overlay} onClose={setOverlay} route={route} amount={Amount} phone={smartcardMettP} view={handleView}  />
        </View>
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
        width: width * 0.8,
        alignSelf: "center",
        marginTop: 10,
    },
    dropdown2: {
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 5,
        width: width * 0.90,
        alignSelf: "center",
        marginTop: 20,
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
    },
    selectedTextStyle: {
        fontSize: 16,
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