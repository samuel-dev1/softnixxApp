import React, { useState, useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Dimensions } from "react-native";
import { Button, Divider, Icon, ListItem, BottomSheet, CheckBox } from "react-native-elements";
import { TextInput } from "react-native";
import { encode } from 'base-64';
import AntDesign from '@expo/vector-icons/AntDesign';
import { showMessage } from "react-native-flash-message";
import Icons from '@expo/vector-icons/MaterialCommunityIcons';
import { useLayoutEffect } from "react";
const { width, height } = Dimensions.get("window")
import { Overlay } from "react-native-elements";
import ModalGropu from "../indicator/indicator";

export default function Electricity({ route, navigation }) {

    const [check, setCheck] = useState(false)
    const [meters, setMetter] = useState('postpaid');
    const [dataR, setdataR] = useState([]);
    const [phone, setPhone] = useState(null)
    const [value, setValue] = useState(null)
    const [isFocus, setIsFocus] = useState(false)
    const [overlay, setOverlay] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [Amount, setAmount] = useState(null)
    const [loading, setLoading] = useState(true)
    const [dataT, setDataT] = useState(null)
    const [show, useShow] = useState(false)
    const [smartcardMettP, useSmartcarmetP] = useState('')



    function MoneyConvert(num) {
        try{
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
        }
        catch{
            return 0.0
        }
    }

    const dataCard = [
        { label: 'IKEJA -ELECTRICTY', value: "ikeja-electric" },
        { label: 'PHED', value: "portharcourt-electric" },
        { label: 'JED', value: "jos-electric" },
        { label: 'KAEDCO', value: "kaduna-electric" },
        {label:"IBDC", value:"ibadan-electric"},
        {label:"BENIN-ELECTRICITY",value:"benin-electric"},
        {label:"EKO ELECTRICITY", value:"eko-electric"},
        {label:"KADUNA ELECTRICITY",value:"kaduna-electric"}
    ]

    const GetUser = async () => {
        const email = "samuelyyyy257@gmail.com";
        const password = "antydamilove1";
        const credentials = `${email}:${password}`;
        const encodedCredentials = encode(credentials);
        useShow(true)
        const url = `merchant-verify?billersCode=${smartcardMettP}&serviceID=${value}&type=${meters}`;
        fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${encodedCredentials}`,
            }
        })
        .then(resp => resp.json())
        .then(dataresp => {
            if (dataresp.content.Customer_Name) {
                setDataT(dataresp);
            } else {
                showMessage({
                    message: "Please check your smartcard and try again or select a platform.",
                    type: "danger",
                    position: "center",
                    backgroundColor:"darkblue",
                    color:"white",
                });
            }
        })
        .catch(error => {
            showMessage({
                message: "Network error",
                type: "danger",
                position: "center",
                backgroundColor:"darkblue",
                color:"white",
            });
        })
        .finally(() => {
            useShow(false);

        })
    };
    
    useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle: () => (
            <View>
              <Text>Pay Electricity Bill</Text>
            </View>
    
          ),
        });
      }, [navigation]);
    



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



function  MyoverLay(){

    return(
        <Overlay overlayStyle={{
            padding:10,
            borderRadius:20,
        }} style={{
            padding:10,
        }} visible={overlay}>
            <View style={{
                padding:30,

            }}>
                <Icon name="exclamation-circle" type="font-awesome" color={'red'} size={40} />
                <Text style={{
                    padding:6,
                    textAlign:"center",
                    color:"darkblue",
                    fontSize:19,

                }}>
                    You are about to make a transaction of &#8358;{Amount==null?null:MoneyConvert(Amount)} for {value} of {meters}.
                </Text>

                <View style={{
                    backgroundColor:null,
                   
                    borderRadius:5,
                    display:"flex",
                    flexDirection:"row",
                    justifyContent:"space-around",
                    alignSelf:"center"
                }}>
                    <Button onPress={()=>{setIsVisible(!isVisible), setOverlay(false)}} buttonStyle={{
                        backgroundColor:null,
                        margin:10,
                        width:150,
                        padding:10,
                        borderRadius:10,
                        borderWidth:0.5,
                        borderColor:"darkblue"

                    }} titleStyle={{
                        color:"darkblue", 
                        fontWeight:"bold",

                    }}  title={"Continue"} />
                    <Button  onPress={()=>setOverlay(false)} buttonStyle={{
                        backgroundColor:"darkblue",
                        margin:10,
                        width:100,
                        padding:10,
                        borderRadius:10,
                    }} title={"Cancel"} />
                </View>
            </View>
        </Overlay>
    )
}

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
            try{
            useShow(true)
            if (pin.length !== 4) {
                Alert.alert("Your PIN must be 4 digits");
                useShow(false)
                return;
            }
            if (pin.trim() === dataR.profile.transaction_pin) {
                
                const randomString = generateRandomString(12);
                const y_id = (requestId + randomString).toString()
                const email = "samuelyyyy257@gmail.com";
                const password = "antydamilove1";
                const credentials = `${email}:${password}`;
                const encodedCredentials = encode(credentials);

                const url = `https://api-service.vtpass.com/api/pay?billersCode=${smartcardMettP}&serviceID=${value}&phone=${phone}&request_id=${y_id}&amount=${Amount}&variation_code=${meters}`;

                fetch(url, {
                    method: "POST",
                    headers: {
                        "Authorization": `Basic ${encodedCredentials}`,
                    }
                })
                    .then(resp => resp.json())
                    .then(dataresp => {
                    
                        setLoading(true)
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
                        }).then(() => navigation.navigate("Status", { "data": dataresp.content.response_description, 'key': route.params.key }))
                    }).then(()=>setIsVisible(!isVisible)).then(setLoading(false))
                    .catch(error =>{
                        setLoading(false)
                        
                    }

                    ).finally(()=>useShow(false));

            }
            else {
                Alert.alert("invalid pin, do you forget your pin?")
                useShow(false)
            }
        }
        catch{
            useShow(false)
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
                    <Icon
                    disabled={show}
                        onPress={() => setIsVisible(false)}
                        name='chevron-down'
                        size={20}
                        color={"lightgray"}
                        type="font-awesome"
                    />
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
                                disabled={show}
                                onPress={handleSubmit}
                                style={styles.submitButton}

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
        }}>
           
            <ScrollView>
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
                    >Hello, you can Pay for your Electricity bill</Text>
                    <Text
                        style={{
                            fontSize: 26,
                            color: "white",
                            textAlign: "center",
                            fontWeight: "normal",
                        }}
                    > bal, &#8358;{loading ? null : MoneyConvert(dataR.profile.account_balance)}</Text>
                </View>

                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={dataCard}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select item' : '...'}
                    searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}
                    renderLeftIcon={() => (
                        <AntDesign
                            style={styles.icon}
                            color={isFocus ? 'blue' : 'black'}
                            name="Safety"
                            size={20}
                        />
                    )}
                />

                <View style={{
                    display: 'flex',
                    flexDirection: "row",
                    alignSelf: "center",
                    justifyContent: "center"
                }}>

                    <CheckBox
                        textStyle={{
                            color: "#111",

                        }}
                        onPress={() => {
                            setCheck(!check),
                                setMetter("prepaid")
                        }}
                        containerStyle={{
                            backgroundColor: check ? 'lightgreen' : null,
                        }} checked={check} title={"Prepaid"} />

                    <CheckBox
                        textStyle={{
                            color: "#111",
                        }}
                        onPress={() => {
                            setCheck(!check)
                            setMetter("postpaid")
                        }
                        }

                        checked={!check}
                        containerStyle={{
                            backgroundColor: !check ? 'lightgreen' : null,
                        }} title={"Postpaid"} />

                </View>
                <ListItem>
                    <ListItem.Content>
                        <ListItem.Input
                            inputMode='numeric'
                            disabled={value == null ? true : false}
                            maxLength={11}
                            value={phone}
                            onChangeText={val => setPhone(val)}
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
                <Divider />

                <ListItem topDivider>
                    <ListItem.Content>
                        <ListItem.Input
                            returnKeyType='next'
                            keyboardType='number-pad'
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
                                <ListItem.Subtitle style={{
                                    color: "green",
                                    textAlign: "justify",
                                }}>
                                    {dataT.content.Customer_Name}
                                </ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem.Content>
                        <ListItem.Subtitle>
                            {dataT.content.Address}
                        </ListItem.Subtitle>
                    </ListItem>
                }

                {dataT != null ?
                    <ListItem bottomDivider>
                        <Icon name="money" color={"green"} />
                        <ListItem.Content>
                            <ListItem.Input
                                value={Amount}
                                onChangeText={val => setAmount(val)}
                                keyboardType="number-pad"
                                inputStyle={{
                                    borderWidth: 0.5,
                                    padding: 4,
                                    borderRadius: 5,
                                    borderColor: "lightgray"
                                }}
                                textAlign="left" placeholder="amount in numbers" />
                        </ListItem.Content>
                        <ListItem.CheckBox
                            checked={Number(Amount) > Number(500) ? true : false}
                            uncheckedIcon={'close'}
                        />
                    </ListItem>
                    : null}
                {dataT == null ? null :
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        alignSelf: "center",
                        justifyContent: "space-around",
                        alignItems: "center",
                    }}>
                        {Amount == null ? null :
                            <Button
                                onPress={()=>
                                setOverlay(true)
                                }
                                buttonStyle={{
                                    margin: 5,
                                    padding: 6,
                                }} type="solid" title={`${'Pay N'}${MoneyConvert(Amount)}`} />
                        }

                    </View>
                }
            
            </ScrollView>
            {loading?<ModalGropu />:null}
<MyoverLay />
            <OpenModal />
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
        height: 100,
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