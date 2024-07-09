import React from "react";
import { View, Text, ScrollView, StyleSheet, Alert} from "react-native";
import { BottomSheet, Icon } from "react-native-elements";
import { Dimensions } from "react-native";
import { TextInput } from "react-native";
import { Button } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import { showMessage } from "react-native-flash-message";
import Icons from '@expo/vector-icons/MaterialCommunityIcons';
import MyPopup from "../indicator/flayerpop";

import ModalGropu from "../indicator/indicator";
const { width, height } = Dimensions.get("window")
import { useLayoutEffect } from "react";
export default function Finalize({ route, navigation }) {
   const [amount, setAmount] = React.useState(null)
   const [discrip, usediscrip] = React.useState('')
   const [isVisible, setIsVisible] = React.useState(false)
   const [loading, setLoading] = React.useState(true)
   const [data, Usedata] = React.useState(null)
   const [visible, setVisble] = React.useState(false)


   function MoneyConvert(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
   }

   useLayoutEffect(() => {
      navigation.setOptions({
         headerTitle: () => (
            <View>
               <Text>Send Money</Text>
            </View>
         ),
      });
   }, [navigation]);


   const Getdetails = async () => {
      setLoading(true)
      const itemUrL = `https://softnixx.com/api/updateD/${route.params.username}/`;
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
            backgroundColor: "darkblue",
            color: "white",
         })
      } finally {
         setLoading(false)
      }
   }
   React.useEffect(() => {
      Getdetails()
   }, [])


   function HandleStep() {
      if (data?.profile?.account_balance < amount) {
         showMessage({
            message: "insuficenit account bals",
            position: "center",
            type: "danger",
            backgroundColor: "darkblue",
            color: "white",
         })
      }
      else if (amount == null) {
         showMessage({
            message: "Amount is empty",
            position: "center",
            type: "danger",
            backgroundColor: "darkblue",
            color: "white",
         })
      }
      else if (discrip == '') {
         showMessage({
            message: "discriptions cannnot be empty",
            position: "center",
            type: "danger",
            backgroundColor: "darkblue",
            color: "white",
         })

      }
      else if (Number(amount) < Number(1000)) {
         Alert.alert("the amount is less than N1,000")
      }
      else {
         setVisble(true)
      }
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
         setLoading(true);

         // Check if PIN is exactly 4 digits
         if (pin.length !== 4) {
            Alert.alert("Your PIN must be 4 digits");
            setLoading(false);
            return;
         }

         // Check if entered PIN matches stored PIN
         if (pin.trim() === route.params.pin) {
            const apiUrl = "https://api.paystack.co/transfer";
            const secretKey = 'pk_live_46758e921078ab1b44d7e515c862b337ad6968d0';
            const requestData = {
               source: 'balance',
               reason: discrip,
               amount: amount,
               recipient: route.params.bank_code,
            };
            fetch(apiUrl, {
               method: 'POST',
               headers: {
                  'Authorization': `Bearer ${secretKey}`,
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(requestData),
            })
               .then(response => {
                  if (!response.ok) {
                     throw new Error('Network response was not ok');
                  }
                  return response.json();
               })
               .then(data => {
                  setIsVisible(false);
                  setLoading(false);
                  fetch('https://softnixx.com/api/createR/', {
                     method: "POST",
                     headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'Authorization': `Token ${route?.params?.key?.key}`,
                     },
                     body: JSON.stringify({
                        amount: data.data.amount + 5,
                        status: data.data.status,
                        reference: data.data.transfer_code,
                        request_id: data.data.id,
                        name: 'transfer',
                     })
                  }).then(() => { navigation.navigate("status", { "data": data.data.status, 'key': route.params.key.key }), setIsVisible(false) })
                     .catch(error => {
                        setIsVisible(false)
                        showMessage({
                           message: "error procssing Receipt",
                           type: "danger",
                           position: "center",
                           backgroundColor: "darkblue",
                           color: "white",
                           description: "please use another other type",
                           autoHide: false
                        })
                        navigation.goBack()
                     });
               })
               .catch(error => {
                  setIsVisible(false)
                  showMessage({
                     message: "An error occurred while processing your request",
                     type: "error",
                     position: "center",
                     duration: 300,
                     backgroundColor: "darkblue",
                     color: "white",
                     description: "please check your network connections and try again",
                     autoHide: false
                  });
                  navigation.goBack()
                  setLoading(false);
               });
         } else {
            Alert.alert("Invalid PIN");
            setLoading(false);
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
                        padding: 10,
                        margin: 5,

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
                        style={styles.submitButton}>
                        <Icons name={"arrow-right"} color="white" size={40} />
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
         </BottomSheet>
      )
   }



   const button = () => {

      return (setVisble(false))
   }

   const button2 = () => {
      return setIsVisible(true)
   }


   return (
      <View
         style={{
            backgroundColor: "#fff",
            flex: 1,
         }}
      >
         <ScrollView>
            <View style={{
               width: width * 0.90,
               alignSelf: "center",
               backgroundColor: "darkblue",
               padding: 10,
               marginTop: 10,
               borderRadius: 10,
            }}>
               <Text
                  style={{
                     color: "white",
                     fontSize: 10,
                     fontWeight: "bold",
                     textAlign: "center"
                  }}
               >
                  Tranfer to
               </Text>
               <Text style={{
                  color: "white",
                  fontSize: 17,
                  fontWeight: "bold",
                  textAlign: "center"
               }}>
                  {data == null ? null : route?.params?.bank}
               </Text>
               <Text
                  style={{
                     color: "white",
                     fontSize: 17,
                     fontWeight: "bold",
                     textAlign: "center"
                  }}
               >
                  acc. {route?.params?.acc_number}

               </Text>
               <Text style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: "normal",
                  textAlign: "center"
               }}>Minimum Withdraw (N1,000)</Text>
            </View>
            <Text style={{
               color: "darkblue",
               fontSize: 19,
               padding: 10,
               fontWeight: "bold",
               textAlign: "center"
            }}>bals: &#8358;{MoneyConvert(data == null ? 0.0 : data?.profile?.account_balance)}</Text>
            <TextInput
               style={{
                  padding: 15,
                  borderWidth: 0.5,
                  fontSize: 20,
                  borderColor: "lightgray",
                  width: width * 0.95,
                  alignSelf: "center"
               }}
               value={amount != null ? amount : null}
               onChangeText={(val) => setAmount(val)}
               keyboardType="name-phone-pad"
               textAlign="left"
               placeholder="enter Amount"
            />
            <Text style={{
               color: "blue",
               fontSize: 19,
               padding: 10,
               fontWeight: "normal",
               textAlign: "center"
            }} > &#8358;{MoneyConvert(amount != null ? amount : 0.00 + 5)}</Text>
            <Text style={{
               textAlign: "center",
               fontSize: 10,
               color: "red",
            }}>
               {data == null ? null : data?.profile?.account_balance < amount ? "insuficent bals" : null}
            </Text>
            <TextInput
               style={{
                  padding: 15,
                  borderWidth: 0.5,
                  fontSize: 20,
                  borderColor: "lightgray",
                  width: width * 0.95,
                  alignSelf: "center"
               }}
               value={discrip != '' ? discrip : null}
               onChangeText={(val) => usediscrip(val)}
               keyboardType='default'
               textAlign="left"
               placeholder="Discription"
            />
            <Button
               onPress={
                  HandleStep
               }
               buttonStyle={{
                  width: 150,
                  paddingTop: 10,
                  marginTop: 10,
                  paddingBottom: 10,
                  marginBottom: 30,
                  alignSelf: "center"
               }} title={"Send"} type='outline' />
         </ScrollView>
         <Bottomsheetfinal />
         {loading ? <ModalGropu /> : null}
         <MyPopup visible={visible} amount={amount} charge={'N5'} setvisble={button} reference={route?.params?.bank_code}
            button={button2}
            reason={discrip} />
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
