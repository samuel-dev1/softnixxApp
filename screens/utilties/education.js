import React, { useState, useEffect } from "react";
import { useLayoutEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableOpacity, Alert, SafeAreaView, ActivityIndicator } from "react-native";
import { Dimensions } from "react-native";
import { Button, Icon, BottomSheet, CheckBox } from "react-native-elements";
import { TextInput } from "react-native";
import { encode } from 'base-64';
import AntDesign from '@expo/vector-icons/AntDesign';
import { showMessage } from "react-native-flash-message";
import Icons from '@expo/vector-icons/MaterialCommunityIcons';
import { Overlay } from "react-native-elements";
import ModalGropu from "../indicator/indicator";
import CustomOverlay from "../indicator/flayersforUtil";
import CustomUtilesDrop1 from "../indicator/flatlist";
const { width, height } = Dimensions.get("window")

export default function Education({ route, navigation }) {
   const [check, setCheck] = useState(false)
   const [serviceId, setServiceId] = useState('waec')
   const [data, setData] = useState(null)
   const [isFocus, setIsFocus] = useState(false)
   const [value, setValue] = useState(null)
   const [phone, setPhone] = useState(null)
   const [datar, setDatar] = useState(null)
   const [loading, setLoading] = useState(true)
   const [isVisible, setIsVisible] = useState(false)
   const [show, setShow]= useState(false)
   const [overlay, setOverlay] = useState(false)


   function MoneyConvert(num) {
      return num?.toLocaleString();
   }
   const handleOpen =()=>{
      {
         if(value.variation_amount > datar.profile.account_balance){
            Alert.alert("App Info","your acount Balance is low!")
         }
        else{
         setIsVisible(true), setOverlay(false)}
        }
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



  useLayoutEffect(() => {
   navigation.setOptions({
     headerTitle: () => (
       <View>
         <Text>Schools/Education</Text>
       </View>
     ),
   });
 }, [navigation]);



 


   const fetchData = async (serviceID) => {
      try {
         if (serviceID) {
            const itemUrl = `https://api-service.vtpass.com/api/service-variations?serviceID=${serviceId}`;
            const response = await fetch(itemUrl, {
               method: "GET"
            });
            const json = await response.json();
            return json.content.varations;
         }
      } catch (error) {
        
         return null;
      }
   };

   React.useEffect(() => {
      fetchData(serviceId)
         .then(data => {
            setData(data);
         })
         .catch(error => {
           
         });
   }, [serviceId]);


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
            setShow(true)
          if (pin.length !== 4) {
              Alert.alert("Your PIN must be 4 digits");
              setShow(false)
              return;
          }
          if (pin.trim() === datar.profile.transaction_pin) {
              const randomString = generateRandomString(12);
              const y_id = (requestId + randomString).toString()
              const email = "samuelyyyy257@gmail.com";
              const password = "antydamilove1";
              const credentials = `${email}:${password}`;
              const encodedCredentials = encode(credentials);

              const url = `https://api-service.vtpass.com/api/pay?&serviceID=${serviceId}&phone=${phone}&request_id=${y_id}&amount=${value.variation_amount}&variation_code=${value.variation_code}`;

              fetch(url, {
                  method: "POST",
                  headers: {
                      "Authorization": `Basic ${encodedCredentials}`,
                  }
              })
                  .then(resp => resp.json())
                  .then(dataresp => {
                      showMessage({
                          message: "pleaseb wait",
                          type: "info",
                          backgroundColor:"darkblue",
                          color:"white",
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
                      }).then(() => navigation.navigate("Status", { "data": dataresp.content.response_description, 'key': route.params.key }))
                  }).then(()=>setIsVisible(false)).finally(()=>setShow(false))
                  .catch( error=>
                     setShow(false)
                  );
          }
          else {
              Alert.alert("invalid pin, do you forget your pin?")
              setShow(false)
          }

         }
         catch{
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

   return (
      <SafeAreaView style={{
         flex: 1,
         backgroundColor: "white",
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
                     setServiceId("waec")
               }}
               containerStyle={{
                  backgroundColor: check ? 'lightgreen' : null,
               }} checked={check} title={<Text>WAEC Result</Text>} />

            <CheckBox
               textStyle={{
                  color: "#111",
               }}
               onPress={() => {
                  setCheck(!check)
                  setServiceId("waec-registration")
               }
               }
               checked={!check}
               containerStyle={{
                  backgroundColor: !check ? 'lightgreen' : null,
               }} title={<Text>WAEC Registration</Text>} />

         </View>
         <TextInput
            style={{
               padding: 15,
               width: width * 0.98,
               borderWidth: 0.5,
               borderColor: "gray",
               marginTop: 10,
               alignSelf: "center"
            }}
            inputMode='numeric'
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

        <CustomUtilesDrop1 
        options={data == null ? [] : data}
        extra={"select WAEC Type"}
        value={setValue}
        />
         {value == null ? null :
            <Button
            onPress={()=>{
               setOverlay(!overlay)
            }}
            buttonStyle={{
               width:150,
               alignSelf:"center",
               marginTop:30,
               backgroundColor:"darkblue"
            }}
               title={`Pay N${MoneyConvert(value.variation_amount)}`}
            />
         }
<OpenModal />
<CustomOverlay 
view={handleOpen}
isVisible={overlay}
onClose={setOverlay}
amount={value?.variation_amount}  route={route} selectedNumber={value?.name} />
{loading?<ModalGropu />:null}
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