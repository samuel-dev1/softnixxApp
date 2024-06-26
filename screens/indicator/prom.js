import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet, Dimensions, Text } from "react-native";
import { Badge, Button, Icon } from "react-native-elements";
import CountdownTimer from "../functions/timmercomponet";
const { width } = Dimensions.get("window");
const extradata = require("../functions/gifting")
const Datascreen2 = ({ value }) => {

   const [dataR, setDataR] = useState([]);
   const [open, setOpen] = useState(true); 

   useEffect(() => {
      switch (value) {
         case "mtn-data":
            setDataR(extradata.find(item => item.title === "MTN")?.data.filter(item => item.save) || []);
            break;
         case "glo-data":
            setDataR(extradata.find(item => item.title === "GLO")?.data.filter(item => item.save) || []);
            break;
         case "etisalat-data":
            setDataR(extradata.find(item => item.title === "9MOBILE")?.data.filter(item => item.save) || []);
            break;
         case "airtel-data":
            setDataR(extradata.find(item => item.title === "AIRTEL")?.data.filter(item => item.save) || []);
            break;
         default:
            setDataR([]);
            break;
      }
   }, [value]);
   const renderItem = ({ item }) => (
      <View style={styles.item}>
         
         <Badge status="primary"
         value={"save" +" " + item?.save} />
         <Icon containerStyle={{
            padding:0,
            margin:0,
            alignSelf:"center"
         }} name="fire" color={'red'} size={10} raised  type="font-awesome"/>
         <Button
         disabled ={open}
            raised
            buttonStyle={styles.button}
            title={`${item?.name} ${item?.price}`}
         />
      </View>
   );
   return (
      <View style={styles.container}>
         <FlatList
            ListEmptyComponent={<Text style={styles.emptyText}>Kindly choose a network to get started.</Text>}
            ListHeaderComponent={<CountdownTimer open={setOpen} />}
            data={dataR}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3} // Adjust as per your preference
            contentContainerStyle={styles.flatList}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 10,
      paddingTop: 16,
   },
   flatList: {
      justifyContent: 'center',
      alignItems: 'center',
   },
   item: {
      width: width * 0.3, // Adjust based on your preference
      margin: 6,
      borderRadius: 5,
      overflow: 'hidden',
   },
   button: {
      backgroundColor: "darkblue",
      borderRadius: 3,
      padding: 12,
   },
   emptyText: {
      textAlign: 'center',
      marginTop: 20,
   },
   headerText: {
      color: "darkblue",
      fontSize: 16,
      marginBottom: 10,
   },
});

export default Datascreen2;
