import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet, Dimensions, Text } from "react-native";
import { Button } from "react-native-elements";
import ModalsForAirtime from "../functions/modalOpen";
const data = require("../functions/functions")
const { width } = Dimensions.get("window");
const generatedId = require("../functions/generate")
import CustomOverlay from "./flayersforUtil";
import PaymentAll from "./payfordata";

const Datascreen2 = ({
   value, 
   phone,
   pin,
   bankAmount,
   params }) => {
   const [dataR, setDataR] = useState(null);
   const [options, selectOptions] = useState(null)
   const [close, setClose] = useState(false)
   const [network, setnewrk] = useState(null)
   const [visible, isVisible] = useState(false)
   const [open, setOpen] = useState(false)
   const [status, setStatus] = useState(null)

   const setStatusON = (item) => {
      setStatus(item)
      setOpen(true)
   }
   const handleselection = (option) => {
      selectOptions(option)
      setClose(true)
   }
   const reemoveConst = () => {
      if (options) {
         const splitsam = options?.price.toString().split("₦")
         return splitsam[1]
      }
   }
   const handleOpenSub = () => {
      isVisible(!visible)
   }

   useEffect(() => {
      // Handle data selection based on value prop
      switch (value) {
         case "mtn-data":
            setDataR(data.find(item => item.title === "MTN")?.data || []);
            setnewrk(1)
            break;
         case "glo-data":
            setDataR(data.find(item => item.title === "GLO")?.data || []);
            setnewrk(3)
            break;
         case "etisalat-data":
            setDataR(data.find(item => item.title === "9MOBILE")?.data || []);
            setnewrk(4)
            break;
         case "airtel-data":
            setDataR(data.find(item => item.title === "AIRTEL")?.data || []);
            setnewrk(2)
            break;
         default:
            setDataR([]);
            break;
      }
   }, [value]);
   const renderItem = ({ item }) => (
      <View style={styles.item}>
         <Button
            onPress={() => handleselection(item)}
            raised
            buttonStyle={styles.button}
            title={item?.name + " " + item.price}
         />
      </View>
   );
   return (
      <View style={styles.container}>
         <FlatList
            ListEmptyComponent={<Text style={styles.emptyText}>Kindly choose a network to get started.</Text>}
            ListHeaderComponent={<Text style={styles.headerText}>No receipt and no point data offers.</Text>}
            data={dataR}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            contentContainerStyle={styles.flatList}
         />
         <CustomOverlay
            isVisible={close}
            view={handleOpenSub} onClose={setClose} amount={reemoveConst()} phone={phone} />
         <PaymentAll
            view={handleOpenSub}
            pin={pin}
            phone={phone}
            bankAmount={bankAmount}
            visible={visible}
            amount={reemoveConst()}
            id={options?.plan_id}
            network={network}
            final={setStatusON}
            meter={params}
         />
         <ModalsForAirtime
            purchased={options?.name}
            open={open}
            status={status}

         />
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 16,
      paddingTop: 16,
   },
   flatList: {
      justifyContent: 'center',
      alignItems: 'center',
   },
   item: {
      width: width * 0.4, // Adjust based on your preference
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
