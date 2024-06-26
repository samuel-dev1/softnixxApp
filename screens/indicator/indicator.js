import React, { useEffect, useRef } from "react";
import { SafeAreaView, Text, Animated, StyleSheet,Dimensions, Modal, View } from "react-native";
import { Avatar } from "react-native-elements";


const {height, width} = Dimensions.get("window")
export default function ModalGroup() {
   const spinValue = useRef(new Animated.Value(0)).current;

   const startAnimation = () => {
      Animated.loop(
         Animated.timing(
            spinValue,
            {
               toValue: 1,
               duration: 1000,
               useNativeDriver: true,
            }
         )
      ).start();
   };

   useEffect(() => {
      startAnimation();
   }, []);

   const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
   });

   return (
      <SafeAreaView style={styles.container}>
         <Modal
            visible={true} 
            transparent={true} // Make modal background transparent
            animationType="fade" // Optional: Choose animation type
            statusBarTranslucent={true} // Ensure status bar doesn't overlap
            onRequestClose={() => {}} // Handle modal close event
         >
            <View style={styles.modalContainer}>
               <View style={styles.modalContent}>
                  <Animated.View style={{ transform: [{ rotate: spin }] }}>
                     <Avatar
                        rounded
                        size={"large"}
                        source={require("../../assets/show.png")}
                     />
                  </Animated.View>
                  <Text>please wait..</Text>
               </View>
            </View>
         </Modal>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:30,
      backgroundColor: "#fff", // Semi-transparent background
   },
   modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:50,
   },
   modalContent: {
      backgroundColor: null, // White background for the modal content
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      borderRadius:30,
      height:height*0.1,
   },
});
