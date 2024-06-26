import React from "react";
import { BottomSheet, Icon } from "react-native-elements";
import Icons from '@expo/vector-icons/MaterialCommunityIcons';
import { Alert } from "react-native";
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native";
import generateRequestID from "../functions/generate";
const { width, height } = Dimensions.get("window")

export default function PaymentAll({
   amount,
   bankAmount,
   pin,
   phone,
   network,
   id,
   visible,
   final,
   meter,
   view }) {
   const [userPin, setPin] = React.useState("");
   const [show, setShow] = React.useState(false)
   const handlePinInput = (val) => {
      if (userPin.length < 4) {
         setPin(userPin + val);
      }
   };

   async function handleSubmit() {
      setShow(true)
      if (userPin.length !== 4 ) {
         Alert.alert("Your PIN must be 4 digits");
         setShow(false);
         return;
      }
      if (userPin.trim() == pin && amount <= bankAmount) {
         const payload = {
            network: network,
            phone: phone,
            data_plan: id,
            bypass: false,
            'request-id': generateRequestID()
         };
         const authHeader = 'Token 764c20d5169ea982d692e273b417bf33275e70efc741949214525d6dd84f';
         try {
            const response = await fetch('https://n3tdata.com/api/data', {
               method: 'POST',
               headers: {
                  Authorization: authHeader,
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (!response.ok) {
               final(data.status)
            }
            else {
               final(data.status)
               fetch('https://softnixx.com/api/createR/', {
                  method: "POST",
                  headers: {
                     'Content-Type': 'application/json',
                     Accept: 'application/json',
                     'Authorization': `Token ${meter}`,
                  },
                  body: JSON.stringify({
                     amount: amount,
                     status: data.status,
                     reference: generateRequestID(),
                     request_id: generateRequestID(),
                     name: 'gift',
                  })
               })

            }
         } catch (error) {
            Alert.alert(data.message || data.status);
            setShow(false)

         }
      }
      else{
         Alert.alert("incorrect pin")
         setShow(false)
      }

   }
   const handleDelete = () => {
      if (userPin.length > 0) {
         setPin(userPin.slice(0, -1));
      }
   };
   function Changepass(val) {
      if (userPin.length == 1) {
         return ('* Ø Ø Ø')
      }
      else if (userPin.length == 2) {
         return ('* * Ø Ø')
      }
      else if (userPin.length == 3) {
         return ('* * * Ø')
      }
      else if (userPin.length == 4) {
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
                  onPress={view}
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
            }}>{userPin == "" ? <Text style={{
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

})
