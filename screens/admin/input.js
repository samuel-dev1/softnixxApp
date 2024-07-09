import React, { useState } from "react";
import { Modal, View, StyleSheet, SafeAreaView } from "react-native";
import Check from "./listComponent";
import {
  ListItem,
  Icon,
  Button,
  Input as RNEInput,
} from "react-native-elements";

export default function Input({ visible, onClose, route}) {
    const [see, setSee] = useState(false)
    const [value, setValue] = useState("")


    const handleOpen = ()=>{
        setSee(true)
    }

    const handleClose = ()=>{
        setSee(false)
    }
  return (

    <SafeAreaView>
    <Modal 
    
    visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalBackground}>
        
        <View style={styles.modalContainer}>
        <Icon raised
        onPress={onClose}
        size={15} name="close" type="font-awesome" />
          <ListItem>
            <Icon raised size={15} name="input" />
            <ListItem.Content>
              <RNEInput
              value={value}
              onChangeText={val=>setValue(val)}
                textAlign="left"
                placeholder="Please add a text or something to look up"
              />
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          <Button
          onPress={handleOpen}
            buttonStyle={{
              backgroundColor: "darkblue",
            }}
            title="Search"
          />
        </View>
      </View>
    </Modal>
    
<Check 
onClose={handleClose}
id={value}
route={route} 
vissible={see} 
/>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent background
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});
