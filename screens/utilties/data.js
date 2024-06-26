import React, { useState, useLayoutEffect } from "react";
import { View, Text, SafeAreaView, Modal } from "react-native";
import { Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import { Dropdown } from "react-native-element-dropdown";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native";
import { Button } from "react-native-elements";
import { FlatList } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import * as Contacts from 'expo-contacts';
import Icons from '@expo/vector-icons/MaterialCommunityIcons';
import { ActivityIndicator } from "react-native";
const { width, height } = Dimensions.get("window")
import { BottomSheet } from "react-native-elements";
import { Alert } from "react-native";
import { encode } from "base-64";
import { Overlay } from "react-native-elements";
import { showMessage } from "react-native-flash-message";
import ModalGropu from "../indicator/indicator";
import CustomOverlay from "../indicator/flayersforUtil";
import CustomUtilesDrop from "../indicator/utilitiesSelect";
import DatascreenNav from "./datascreemanage";


export default function DataPAGE({ navigation, route }) {
   const [loading, setLoading] = useState(true)
   const [datar, setDatar] = useState(null)
   const [value, setValue] = useState(null);
   const [value1, setValue1] = useState(null)
   const [selectedNumber, setSelectedNumber] = useState(null)
   const [contact, setContact] = useState([])
   const [isVisible, setIsVisible] = useState(false)
   const [control, setControl] = useState(false)
   const [data, setData] = useState(null)
   const [show, setShow] = useState(false)
   const [overlay, setOverlay] = useState(false)


   function generateRequestId() {
      const lagosTimezoneOffset = 60;
      const now = new Date();
      const lagosTime = new Date(now.getTime() + lagosTimezoneOffset * 60000);
      const year = lagosTime.getUTCFullYear().toString();
      const month = (lagosTime.getUTCMonth() + 1).toString().padStart(2, '0');
      const day = lagosTime.getUTCDate().toString().padStart(2, '0');
      const hour = lagosTime.getUTCHours().toString().padStart(2, '0');
      const minute = lagosTime.getUTCMinutes().toString().padStart(2, '0');
      const requestIdPrefix = year + month + day + hour + minute;
      const additionalCharacters = 'ad8ef08acd8fc0f';
      const requestId = requestIdPrefix + additionalCharacters.slice(0, Math.max(0, 12 - requestIdPrefix.length));

      return requestId;
   }

   const requestId = generateRequestId().toString();
   useLayoutEffect(() => {
      navigation.setOptions({
         headerTitle: () => (
            <View>
               <Text>Data subcriptions</Text>
            </View>
         ),
      });
   }, [navigation]);

const handleOpen =()=>{
setIsVisible(!isVisible),
 setOverlay(false) 
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
      return num?.toLocaleString();
   }
   const pickPhoneNumber = async () => {
      try {
         const { status } = await Contacts.requestPermissionsAsync();
         if (status === 'granted') {
            const { data } = await Contacts.getPagedContactsAsync({
               fields: [Contacts.Fields.PhoneNumbers],
            });
            if (data.length > 0 && data[0].phoneNumbers.length > 0) {

               setContact(data)
               setLoading(false)
               setControl(true)
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
                  icon={() => <Icons name='close-circle' size={40} color="red" />} />
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
   React.useEffect(() => {
      prouseR();
   }, [])
   const dataCard = [
      { label: 'Mtn', value: 'mtn-data' },
      { label: 'Glo', value: 'glo-data' },
      { label: 'Etisalat', value: 'etisalat-data' },
      { label: 'Airtel', value: 'airtel-data' },
      { label: 'Smile', value: "smile-direct" },
      { label: "spectranet", value: "spectranet" }
   ];

   const fetchData = async (serviceID) => {
      try {
         if (serviceID) {
            const itemUrl = `https://api-service.vtpass.com/api/service-variations?serviceID=${value}`;
            const response = await fetch(itemUrl, {
               method: "GET"
            });
            const json = await response.json();
            return json.content.varations;
         }
      } catch (error) {
         Alert.alert(
            "Admin",
            "Please wait...",
            [
               { text: "Cancel", style: "cancel" },

            ]
         )
         return null;
      }
   };

   React.useEffect(() => {
      fetchData(value)
         .then(data => {
            setData(data);
         })
         .catch(error => {
            Alert.alert(
               "Admin",
               "Please wait...",
               [
                  { text: "Cancel", style: "cancel" },

               ]
            )
         });
   }, [value]);
   // final payment bottom
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
         try {
            setShow(true)
            if (pin.length !== 4) {
               showMessage({
                  message: "your pin must be 4 digit",
                  type: 'danger',
                  backgroundColor: "darkblue",
                  color: "white",
                  icon: "danger",
                  autoHide: false,
               })
            }
            else {
               setShow(false)
            }
            if (pin.trim() === datar.profile.transaction_pin && value1.variation_amount <= datar.profile.account_balance) {
               const randomString = generateRandomString(12);
               const email = "samuelyyyy257@gmail.com";
               const password = "antydamilove1";
               const y_id = (requestId + randomString).toString()
               const serviceID = value
               const credentials = `${email}:${password}`;
               const encodedCredentials = encode(credentials);
               const url = `https://api-service.vtpass.com/api/pay?serviceID=${serviceID}&request_id=${y_id}&phone=${selectedNumber}&billersCode=${datar.profile.phone_number}&variation_code=${value1.variation_code}`;
               fetch(url, {
                  method: "POST",
                  headers: {
                     "Authorization": `Basic ${encodedCredentials}`,
                  },
               })
                  .then((resp) => resp.json())
                  .then((data) => {
                     if (data.content.transactions.status == "failed") {
                        {
                           showMessage({
                              message: "error occure payment Failed!",
                              type: 'danger',
                           })
                        }
                     }
                     else {
                        fetch('https://softnixx.com/api/createR/', {
                           method: "POST",
                           headers: {
                              'Content-Type': 'application/json',
                              Accept: 'application/json',
                              'Authorization': `Token ${route?.params?.key}`,
                           },
                           body: JSON.stringify({
                              amount: value1.variation_amount,
                              status: data?.content?.transactions?.type,
                              reference: data?.content?.transactions?.transactionId,
                              request_id: y_id,
                              name: 'Utility',
                           })
                           
                        }).then(() => navigation.navigate("Status", { "data": data.content.response_description, 'key': route.params.key }))
                     
                     }

                  })
                  .catch((error) => {
                     Alert.alert(
                        "App info!",
                        "Something went wrong",
                        [
                           { text: "Cancel", style: "cancel" },

                        ]
                     )
                  }).then(() => setIsVisible(!isVisible))
                  .then(() => setShow(false))
                  .finally(() => setShow(false))
            } else {

               Alert.alert("Invalid PIN or insufficeint bals");

               setShow(false)
            }

         }
         catch {
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
                        style={styles.submitButton}>
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

   return (
      <SafeAreaView style={{
         flex: 1,
         backgroundColor: "#fff"
      }}>
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
               Reconnect your Data instant
               Top Up
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
            marginBottom: 20,
            marginTop: 20,
         }}>
            <View>
            <CustomUtilesDrop
            options={dataCard}
            value={setValue}
            />
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
         
     <DatascreenNav
     bankAmount={datar?.profile?.account_balance}
     pin={datar?.profile?.transaction_pin}
     route={route}
     data={data == null ? [] : data} value={setValue1} type={value} phone={selectedNumber}  />
         <Text style={{
            fontSize: 16,
            marginTop: 10,
            color: "darkblue",
            textAlign: "center"
         }}>{value1 == null ? null : (<Text>you are paying &#8358; {MoneyConvert(value1.variation_amount)}</Text>)}</Text>
         {value1 == null ? null :
            <Button
               onPress={() => {
                  if (Number(value1.variation_amount) <= Number(datar.profile.account_balance)) {
                     setOverlay(true)
                  }
                  else {
                     Alert.alert("insuficent account bals")
                  }
               }}
               title={"Continue"}
               type="solid"
               buttonStyle={{
                  width: 150,
                  alignSelf: "center",
                  marginTop: 30,
                  backgroundColor: "darkblue"
               }}
            />
         }
         <CustomOverlay view={handleOpen} isVisible={overlay} amount={value1?.variation_amount+" for "+ value1?.name}  selectedNumber={selectedNumber} phone={selectedNumber} route={route} onClose={setOverlay} />
         <CheckContact />
         <Bottomsheetfinal />
         {loading ? <ModalGropu /> : null}
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
      width: 100,
      alignSelf: "center",
   },
   dropdown2: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      width: width * 0.9,
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