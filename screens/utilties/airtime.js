import React from "react";

import { useState, useEffect } from "react";
import { View, Text, Dimensions, TextInput, StyleSheet, Modal, ActivityIndicator, FlatList, TouchableOpacity, Alert } from "react-native";
import { ScrollView } from "react-native";

import { BottomSheet, Button, Overlay } from "react-native-elements";
import { useLayoutEffect } from "react";
import * as Contacts from 'expo-contacts';
import Icons from '@expo/vector-icons/MaterialCommunityIcons';
import { showMessage } from "react-native-flash-message";
import { encode } from "base-64";
import ModalGropu from "../indicator/indicator";
import CustomOverlay from "../indicator/flayersforUtil";
import CustomUtilesDrop from "../indicator/utilitiesSelect";

const { width, height } = Dimensions.get("window")

export default function Airtime({ route, navigation }) {
   const [datar, setDatar] = useState(null)
   const [loading, setLoading] = useState(true)
   const [value, setValue] = useState(null);
   const [selectedNumber, setSelectedNumber] = useState(null)
   const [contact, setContact] = useState([])
   const [visible, setIsVisible] = useState(false)
   const [control, setControl] = useState(false)
   const [amount, setAmount] = useState('')
   const [overlay, setOverlay] = useState(false)
   const [show, setShow] = useState(false)


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

      const requestIdPrefix = year + month + day + hour + minute;

      const additionalCharacters = 'ad8ef08acd8fc0f'; // Example additional characters

      // Ensure the Request ID is at least 12 characters long
      const requestId = requestIdPrefix + additionalCharacters.slice(0, Math.max(0, 12 - requestIdPrefix.length));

      return requestId;
   }

   const requestId = generateRequestId().toString();

   const handleOpen=()=>{
      setIsVisible(true)
   
   }

   function generateRandomString(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';

      for (let i = 0; i < length; i++) {
         const randomIndex = Math.floor(Math.random() * characters.length);
         result += characters.charAt(randomIndex);
      }

      return result;
   }


   function MoneyConvert(num) {
      try {
         return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
      }
      catch {
         return 0.00
      }
   }
   useLayoutEffect(() => {
      navigation.setOptions({
         headerTitle: () => (
            <View>
               <Text>Airtime Top Up </Text>
            </View>
         ),
      });
   }, [navigation]);
 

   const OpenModal = () => {
      const [pin, setPin] = React.useState("");
      const handlePinInput = (val) => {
         if (pin.length < 4) {
            setPin(pin + val);
         }
      };
      function handleSubmit() {
         try {
            setShow(true);
            if (pin.length !== 4) {
               Alert.alert("Your PIN must be 4 digits");
               setShow(false);
               return;
            }
            if (pin.trim() === datar.profile.transaction_pin) {
               const randomString = generateRandomString(12);
               const y_id = requestId + randomString;
               const email = "samuelyyyy257@gmail.com";
               const password = "antydamilove1";
               const credentials = `${email}:${password}`;
               const encodedCredentials = encode(credentials);
               const url = `https://api-service.vtpass.com/api/pay?serviceID=${value}&request_id=${y_id}&amount=${amount}&phone=${selectedNumber}`;
               if (value == null) {
                  Alert.alert("Kindly select a network");
                  setShow(false)
               } else if (selectedNumber == null) {
                  Alert.alert("Kindly input or select a Number");
                  setIsVisible(false);
                  setShow(false)
               } else {
                  fetch(url, {
                     method: "POST",
                     headers: {
                        "Authorization": `Basic ${encodedCredentials}`,
                     },
                  })
                     .then((resp) => resp.json())
                     .then((data) => {
                        if (data.content.transactions.status === "failed") {
                           showMessage({
                              message: "Payment Failed!",
                              type: 'danger',
                           });
                           setIsVisible(false);
                           setShow(false)
                        } else {
                           setIsVisible(false);
                           fetch('https://softnixx.com/api/createR/', {
                              method: "POST",
                              headers: {
                                 'Content-Type': 'application/json',
                                 Accept: 'application/json',
                                 'Authorization': `Token ${route.params.key}`,
                              },
                              body: JSON.stringify({
                                 amount: data.amount,
                                 status: data.content.transactions.status,
                                 reference: data.content.transactionId,
                                 request_id: y_id,
                                 name: 'Utility',
                              })
                           })
                              .then(() => navigation.navigate("Status", { "data": data.content.response_description, 'key': route.params.key }))
                              .catch(() => {
                                 showMessage({
                                    message: "Error processing receipt",
                                    type: "danger",
                                    position: "center",
                                 });
                              }).finally(() => setShow(false));
                        }
                     })
                     .catch(() => {
                        Alert.alert(
                           "Admin",
                           "Please wait...",
                           [
                              { text: "Cancel", style: "cancel" },
                           ]
                        );
                        setIsVisible(false);
                        setShow(false)
                     })
                     .finally(() => {
                        setShow(false);
                        setIsVisible(!visible);
                     });
               }
            } else {
               Alert.alert("Error", "Invalid PIN", [{ "text": "Try again" }]);
               setShow(false);
            }
         } catch (error) {
            setShow(false);
         }
      }

      
      const handleDelete = () => {
         if (pin.length > 0) {
            setPin(pin.slice(0, -1));
         }
      };


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
            isVisible={visible}>
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
                        disabled={show}
                        onPress={handleSubmit}
                        style={styles.submitButton}

                     >
                        {show ? <ActivityIndicator /> :
                           <Icons name={"arrow-right"} color="white" size={40} />
                        }

                     </TouchableOpacity>

                  </View>
               </View>
            </View>
         </BottomSheet>
      )
   }

   const pickPhoneNumber = async () => {
      try {
         const { status } = await Contacts.requestPermissionsAsync();
         if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
               fields: [Contacts.Fields.PhoneNumbers],
            });
            if (data.length > 0 && data[0].phoneNumbers.length > 0) {
               setContact(data);
               setLoading(false);
               setControl(true);
            } else {
               setSelectedNumber(null);
            }
         }
      } catch (error) {
         showMessage({
            message: "Please wait, or set your requirement for easy processing!",
            type: "danger",
            color: "white",
            backgroundColor: "darkblue",
         })
      }
   }
   const dataCard = [
      { label: 'Mtn', value: 'mtn' },
      { label: 'Glo', value: 'glo' },
      { label: 'Etisalat', value: 'etisalat' },
      { label: 'Airtel', value: 'Airtel' },
   ];

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
         setDatar(json);
         setLoading(false)
      } catch (error) {
         setLoading(false)
      } finally {
         null
      }
   }
   useEffect(() => {
      prouseR();
   }, [])

   const CheckContact = () => {
      return (

         <Modal
            style={{
               backgroundColor: "white",
               width: width,
               height: height,
            }}

            presentationStyle="pageSheet"
            visible={control}>
            <View style={{
               flex: 1,
               marginTop: 20,
               padding: 20,
            }}>
               <Icon
                  onPress={() => setControl(false)}
                  name='chevron-down'
                  size={20}
                  color={"lightgray"}
                  type="font-awesome"
               />



               <Text style={{
                  fontSize: 20,
                  color: "darkblue",
                  fontWeight: "bold",
                  alignSelf: "center",
                  justifyContent: 'center',
                  alignContent: "center",
                  alignItems: "center",
               }}>Select A Contact</Text>

               {loading ? <ActivityIndicator /> :
                  <FlatList
                     ItemSeparatorComponent={<View style={{

                        borderWidth: 0.4,
                        borderColor: "lightgray",
                     }}>
                     </View>}
                     ListEmptyComponent={<View><Text style={{
                        color: "red",
                        fontSize: 19,
                     }}>No Contact Found</Text></View>}
                     keyExtractor={(item) => item.id}
                     data={contact}
                     renderItem={({ item }) => (
                        <TouchableOpacity
                           onPress={() => {
                              if (item.phoneNumbers && item.phoneNumbers.length > 0) {
                                 setSelectedNumber(item.phoneNumbers[0].number);
                                 setControl(false);
                              }
                           }}
                        >
                           <View style={{
                              padding: 10,
                              margin: 10,
                           }}><View><Text style={{
                              fontSize: 16,
                              color: "darkgray"
                           }}>{item.name}</Text></View>
                              <View>{item.phoneNumbers && item.phoneNumbers.length > 0 && (
                                 <Text style={{
                                    color: "darkgray",
                                    fontSize: 19,
                                 }}>{item.phoneNumbers[0].number}</Text>
                              )}</View>
                           </View>
                        </TouchableOpacity>
                     )}
                  />
               }
               <View style={{
                  alignSelf: "center",
                  position: "absolute",
                  bottom: 0,
                  marginBottom: 20,
               }}>
                  <Text
                     style={{
                        fontSize: 16,
                        fontWeight: "bold",
                     }}
                  >softnixx inc.</Text>
               </View>
            </View>
         </Modal>
      )
   }
   return (
      <View
         style={{
            flex: 1
         }}
      >
         <ScrollView style={{}}>
            <View style={{
               padding: 15,
               backgroundColor: "darkblue",
               width: width * 0.98,
               alignSelf: "center",
               alignItems: "center",
               justifyContent: "center",
               shadowColor: "#00000",
               shadowOpacity: 0.2,
            }}>
               <Text style={{
                  textAlign: "center",
                  fontSize: 15,
                  color: "#fff"
               }}>
                  Instant Airtime
               </Text>
               <Text
                  style={{
                     fontSize: 16,
                     color: "white",
                     textAlign: "center",
                     fontWeight: "normal",
                  }}
               > bal: {loading ? MoneyConvert(0.0) : <Text style={{
                  fontSize: 23,
                  fontWeight: "bold",
               }}> &#8358;{loading ? null : MoneyConvert(datar.profile.account_balance)}</Text>}</Text>
            </View>
            <View style={{
               display: "flex",
               flexDirection: "row",
               justifyContent: "flex-start",
               padding: 5,
            }}>
               <View>
                 <CustomUtilesDrop value={setValue} visible ={overlay}  options={dataCard}  />
               </View>
               <View><TextInput

                  maxLength={11}
                  style={{
                     color: "#111",
                     fontSize: 25,
                     padding: 10,

                     width: width * 0.6,
                     borderBottomColor: "darkblue",
                     borderBottomWidth: 1,
                  }}
                  inputMode="numeric"
                  placeholder={"e.g (08130423221)"}
                  value={selectedNumber == null ? route?.params?.phone : selectedNumber}

                  onChangeText={(val) => setSelectedNumber(val)}
               /></View>
               <View>
                  <Button
                     buttonStyle={{
                        backgroundColor: null,
                     }}
                     icon={() => <Icons name='account-sync' size={35} color="darkgray" />} onPress={pickPhoneNumber} />

               </View>
            </View>
            <View>
               <View
                  style={{
                     alignContent: "space-around",
                     justifyContent: 'space-around',
                     alignItems: "center",
                     alignSelf: "center",
                     display: "flex",
                     flexDirection: "row",
                     width: width,
                     margin: 10,
                     marginTop: 30,
                  }}
               >
                  <Text
                     onPress={() => { setAmount('50') }}
                     style={{
                        padding: 10,
                        margin: 5,
                        borderWidth: 1,
                        backgroundColor: "lightgray",
                        color: "darkgray",
                        borderColor: "darkgray",
                        fontSize: 25,
                     }}
                  >&#8358; 50</Text>
                  <Text
                     onPress={() => { setAmount('100') }}
                     style={{
                        padding: 10,
                        margin: 5,
                        borderWidth: 1,
                        backgroundColor: "lightgray",
                        color: "darkgray",
                        borderColor: "darkgray",
                        fontSize: 25,
                     }}
                  >&#8358; 100</Text>
                  <Text
                     onPress={() => { setAmount('200') }}
                     style={{
                        padding: 10,
                        margin: 5,
                        borderWidth: 1,
                        backgroundColor: "lightgray",
                        color: "darkgray",
                        borderColor: "darkgray",
                        fontSize: 25,
                     }}
                  >&#8358; 200</Text>
               </View>

               <View
                  style={{
                     alignContent: "space-around",
                     justifyContent: 'space-around',
                     alignItems: "center",
                     alignSelf: "center",
                     display: "flex",
                     flexDirection: "row",
                     width: width,
                     margin: 10,

                  }}
               >
                  <Text
                     onPress={() => { setAmount('500') }}
                     style={{
                        padding: 10,
                        margin: 5,
                        borderWidth: 1,
                        backgroundColor: "lightgray",
                        color: "darkgray",
                        borderColor: "darkgray",
                        fontSize: 25,
                     }}
                  >&#8358; 500</Text>

                  <Text
                     onPress={() => { setAmount('1000') }}
                     style={{
                        padding: 10,
                        margin: 5,
                        borderWidth: 1,
                        backgroundColor: "lightgray",
                        color: "darkgray",
                        borderColor: "darkgray",
                        fontSize: 25,
                     }}
                  >&#8358; 1000</Text>
                  <Text
                     onPress={() => { setAmount('2000') }}
                     style={{
                        padding: 10,
                        margin: 5,
                        borderWidth: 1,
                        backgroundColor: "lightgray",
                        color: "darkgray",
                        borderColor: "darkgray",
                        fontSize: 25,
                     }}
                  >&#8358; 2000</Text>
               </View>
            </View>

            <View style={{
               alignContent: "space-around",
               justifyContent: 'center',
               alignItems: "center",
               alignSelf: "center",
               display: "flex",
               flexDirection: "column",
               width: width,
            }}>
               <View>
                  <TextInput
                     value={amount}
                     onChangeText={val => setAmount(val)}
                     style={{
                        color: "#111",
                        fontSize: 25,
                        padding: 10,
                        margin: 10,
                        width: width * 0.6,
                        borderBottomColor: "darkgray",
                        borderBottomWidth: 1,
                     }}
                     inputMode="numeric"
                     numberOfLines={1}
                     placeholder={"N50 - N50,000"}
                  />
               </View>
            </View>
            <Button
               onPress={
                  () => {
                     if (value == null) {
                        Alert.alert("App info!", "Choose error!, please select a Network?", [{ "text": "ok" }])
                     }
                     else if (datar != null && amount > datar.profile.account_balance) {
                        showMessage({
                           message: "low bals insufficient bals",
                           type: "error",
                           position: "center",
                           duration: 4000,
                           backgroundColor: "darkblue",
                           color: "white",
                        })
                     }
                     else if (Number(amount) <= Number(0)) {
                        showMessage({
                           message: "Amount must be greater than 0",
                           type: "error",
                           position: "center",
                           duration: 4000,
                           backgroundColor: "darkblue",
                           color: "white",
                        })
                     }
                     else {
                        setOverlay(true)
                     }


                  }
               }
               titleStyle={{
                  fontSize: 20,
                  color: "white",
                  padding: 10,
               }}
               buttonStyle={{
                  backgroundColor: "darkblue",
                  borderRadius: 20,
                  padding: 10,
                  margin: 10,
                  width: width * 0.6,
                  alignSelf: "center"

               }}
               title={`Reacharge ${'N'}${MoneyConvert(amount)}`}
            />
            <Text style={{
               color: "red",
               fontSize: 11,
               fontWeight: "normal",
               textAlign: "center"
            }}>{datar != null && amount > datar.profile.account_balance ? ("pls add more to your account") : null}</Text>
         </ScrollView>
         <View style={{
            position: "absolute",
            bottom: 0,
            marginBottom: 20,
            alignSelf: "center"
         }}>
            <Text
               style={{
                  color: "#111",
                  fontSize: 10,
                  fontWeight: "bold",
                  textAlign: "center",
                  padding: 10,
                  margin: 10,
               }}
            >Brought to you by SOftTellxx Inc.</Text>
         </View>
         {loading ? <ModalGropu /> : null}
         <CheckContact />
         <OpenModal />
         <CustomOverlay isVisible={overlay}  onClose={setOverlay} view={handleOpen} amount={amount} route={route} selectedNumber={selectedNumber} phone={selectedNumber} />
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
      width: 100,
      alignSelf: "center",
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