import React, { useState } from "react";
import { View, Text, SafeAreaView, Dimensions, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Icons from '@expo/vector-icons/MaterialCommunityIcons';
import { Icon, Tooltip } from "react-native-elements";
import { showMessage } from "react-native-flash-message";
import ModalGropu from "../indicator/indicator";
import { useLayoutEffect } from "react";

import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8806729694496674/9982521906';

const { width } = Dimensions.get("window");
export default function SetPinPage({route, navigation}) {
    const profile =  route.params
    const [pin, setPin] = useState("");
    const [see, setSee] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const handleDelete = () => {
        if (pin.length > 0) {
          setPin(pin.slice(0, -1));
        }
      };

    const handlePinInput = (val) => {
        if (pin.length < 4) {
            setPin(pin + val);
        }
    };

    function changeall(set){
       if (see == true){
        return ('* * * *')
       } 
       else{
        return (set)
       }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle: () => (
            <View>
              <Text>Change your pin</Text>
            </View>
          ),
        });
      }, [navigation]);

    const SendOver =()=>{
        setLoading(true)
        if(pin !="" && pin !== profile.profile.profile.profile.profile.transaction_pin){           
                fetch('https://softnixx.com/api/update/', {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: profile.profile.profile.profile.id,
                        key:profile.profile.profile.key.key,
                        tran :pin,
                     }),
                  }).then(res => res.json())
                  .then(data => {
                    if (data.status === "success") {
                        showMessage({
                            message:"succesfully updated!",
                            type:"success",
                            backgroundColor:"darkblue",
                            color:"white",
                        })
                        setLoading(false)
                         setPin('')
                        navigation.navigate("Settings")
                    }

                    else{
                        showMessage({message:"server error",
                        type:"danger",
                        backgroundColor:"darkblue",
                        color:"white",
                    })
                    setLoading(false)
                   
                    }

                  })
        }
        else if(pin ===profile.profile.profile.profile.profile.transaction_pin ){
            showMessage({
                message:"you cant use old pin",
                type:"danger",
                backgroundColor:"darkblue",
                color:"white",
            })
            setLoading(false)
        }
        else if(pin.length ==4){
            showMessage({message:"PIN does not match!",
        type:"danger",
        backgroundColor:"darkblue",
        color:"white",
        })
        setLoading(false)  
        }
    }
    const handleSubmitPin = () => {
        if (pin.length === 4) {
            SendOver()
        } else {
            Alert.alert("Please fill all four digits of PIN.");
        }
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.subHeaderText}>Follow the instructions <Tooltip
                    containerStyle={{
                        width:200,
                        height:200,
                        backgroundColor:"darkblue"
                    }}
                    popover={
                        <View><Text style={{
                            color:"white",
                            fontSize:15,
                            fontWeight:"bold",
                        }}>
                            A.Four degit pin required
                            B.default pin (0000) can't use this
                            C.press (arrow) the blue button to submit
                            </Text></View>
                    }>
                        <Icon raised name="info-circle" type="font-awesome" color={"red"} /> 
                        </Tooltip>
                    </Text>
                </View>
                <View style={{
                    margin:"auto"
                }}>
                <Icon raised onPress={()=>setSee(!see)} name={see?'eye-slash':'eye'} type="font-awesome" />
                </View>
                <View style={{
                    padding:10,
                    marginBottom:10,
                    borderColor:"darkgray",
                    alignContent:"center",
                    justifyContent:"center",
                    alignSelf:"center",
                    backgroundColor:"lightgray",
                    borderRadius:10,
                
                }}>{pin ==""?<Text style={{
                    fontSize:30,
                    padding:10,
                }}>• • • •</Text>:<Text style={{
                    fontSize:30,
                    padding:10,
                }}>{changeall(pin)}</Text>}</View>
                    
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
                            onPress={handleSubmitPin}
                            style={styles.submitButton}
                        >
                            <Icons name="arrow-right" color="white" size={40} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {loading?<ModalGropu />:null}

         <View>
         <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.LARGE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        
      />
         </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 30,
        fontWeight: '600',
        marginBottom: 5,
    },
    subHeaderText: {
        fontSize: 20,
        textAlign: 'center',
    },
    keypad: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 5,
    },
    digitRow: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    digitButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "lightgray",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 7,
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
