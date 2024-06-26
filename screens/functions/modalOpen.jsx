import React from "react";
import { BottomSheet, Icon, Button } from "react-native-elements";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function ModalsForAirtime({ open, purchased,
    status}) {
  const navigation = useNavigation();

  return (
    <BottomSheet
      isVisible={open}
      containerStyle={{
        backgroundColor: "#0A1172",
        left: 0,
        right: 0,
        bottom: 0,
        position: "absolute"
      }}
    >
      <View style={styles.containermodal}>
        <View style={status=="fail"?styles.containerStyle1:styles.iconContainer}>
          <Icon raised name='check-circle-outline' size={40} color="lightgreen" />
        </View>
        <Text style={styles.firstT}>{status =="fail"?"Failed":"successfull"} Purchased! {purchased}</Text>
        <Text style={styles.secondT}>
          {status}<Text style={styles.sub}> status </Text>
        </Text>
        <Button
          buttonStyle={styles.buttonT}
          titleStyle={styles.title}
          onPress={() => navigation.navigate("Home")}
          title={"Continue"}
        />
        <Text style={{
         color:"white",
         padding:3,
         margin:3
        }}>This type of data purchase does not issues any receipt kindly check our terms and condictions to know more</Text>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  containermodal: {
    backgroundColor: "darkblue",
    padding: 20,
    alignItems: "center"
  },
  containerStyle1:{
   backgroundColor: "red",
   padding: 20,
   alignItems: "center"
  },
  iconContainer: {
    marginBottom: 20
  },
  firstT: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff"
  },
  secondT: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center"
  },
  sub: {
    fontWeight: "bold",
    color: "lightblue"
  },
  buttonT: {
    backgroundColor: "white",
    marginTop: 20
  },
  title: {
    color: "darkblue",
    fontWeight: "bold"
  }
});
