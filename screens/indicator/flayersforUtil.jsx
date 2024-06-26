
import React from 'react';
import { Modal, View, Text } from 'react-native';
import { Button , Icon} from 'react-native-elements';

const CustomOverlay = ({ isVisible, onClose, amount,route, selectedNumber, phone, view }) => {
   function MoneyConvert(num){
 return num?.toLocaleString();
   }
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={()=>onClose(false)}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ borderRadius: 15, backgroundColor: 'white', padding: 20, alignItems: 'center' }}>
        <Icon name="exclamation-circle" type="font-awesome" color={'red'} size={40} />
          <Text style={{ textAlign: "center", fontSize: 25, margin: 5, padding: 5, color: "darkblue", fontWeight: "bold" }}>
               You are about to Recharge with a sum of &#8358;{amount == null ? null : MoneyConvert(amount)} to this Bearer line {selectedNumber == null ?phone : selectedNumber}.
          </Text>
          <Text style={{ color: "darkblue", textAlign: "center", marginBottom: 10 }}>
            note:: No refund on any utilites payment
          </Text>
          <View style={{
               backgroundColor: null,
               borderRadius: 5,
               display: "flex",
               flexDirection: "row",
               justifyContent: "space-around",
               alignSelf: "center"
            }}>
               <Button
               onPress={view}
               buttonStyle={{
                  backgroundColor: null,
                  margin: 10,
                  width: 150,
                  padding: 10,
                  borderRadius: 10,
                  borderWidth: 0.5,
                  borderColor: "darkblue"
               }} titleStyle={{
                  color: "darkblue",
                  fontWeight: "bold"
               }} title={"Continue"} />
               <Button 
               onPress={()=>onClose(false)}
               buttonStyle={{
                  backgroundColor: "darkblue",
                  margin: 10,
                  width: 100,
                  padding: 10,
                  borderRadius: 10,
               }} title={"Cancel"} />
            </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomOverlay;

