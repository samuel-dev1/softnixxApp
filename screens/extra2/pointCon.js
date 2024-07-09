import React, { useState } from "react";
import { View, Text, Dimensions, Modal, StyleSheet } from "react-native";
import { Button, Divider, Icon, ListItem } from "react-native-elements";
import { showMessage } from "react-native-flash-message";

const { width } = Dimensions.get("window");

const PointConverter = ({ route, modal, setModalVisible, point}) => {
  const [amountc, setAmountc] = useState(""); // State for input amount
  const [loading, setLoading] = useState(false); // State to manage loading state

  const GetUrl = () => {
    if (!amountc.trim()) {
      showMessage({
        message: "Please enter an amount to convert.",
        type: "danger",
        backgroundColor: "darkblue",
        color: "white",
        icon: "danger",
        autoHide: false,
      });
      return;
    }
    setLoading(true);
    fetch("https://softnixx.com/api/convert", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Token ${route?.params?.key}`,
      },
      body: JSON.stringify({
        point: parseFloat(amountc), // Convert amountc to a float number
      }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then(errorData => {
            throw new Error(errorData.error);
          });
        }
      })
      .then(data => {
        showMessage({
          message: `Successfully converted ${amountc} points to ${MoneyConvert(amountc * 0.3)} dollars.`,
          type: "success",
          backgroundColor: "darkblue",
          color: "white",
          icon: "success",
          autoHide: false,
        });
      })
      .catch(error => {
        showMessage({
          message: `Conversion error: ${error.message}`,
          type: "danger",
          backgroundColor: "darkblue",
          color: "white",
          icon: "danger",
          autoHide: false,
        });
      })
      .finally(() => {
        setLoading(false);
        setModalVisible(false); 
      });
  };

 
  const MoneyConvert = (points) => {
    return points.toFixed(2);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modal}
      onRequestClose={setModalVisible}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
          }}>
            <Icon
              onPress={setModalVisible}
              backgroundColor={"darkgray"}
              borderRadius={20}
              color={"gray"}
              name="close"
              size={30}
            />
            <Text style={styles.modalTitle}>Converter</Text>
          </View>

          <Text style={styles.modalText}>
            {point >= 10
              ? `Amount to receive: N${MoneyConvert(amountc * 0.3)}`
              : "Insufficient points"}
          </Text>

          <ListItem topDivider>
            <ListItem.Content>
              <ListItem.Input
              style={{
               backgroundColor:"lightgray",
               
              }}
                value={amountc}
                onChangeText={(val) => setAmountc(val)}
                inputStyle={styles.input}
                containerStyle={styles.inputContainer}
                inputMode="decimal"
                textAlign="left"
                
                placeholder="Enter amount to convert"
              />
            </ListItem.Content>
          </ListItem>

          <Divider />

          <Button
            loading={loading}
            buttonStyle={styles.button}
            onPress={GetUrl}
            titleStyle={styles.buttonText}
            title={point < 10 ? "Less points" : "Convert now"}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
    color: "darkblue",
  },
  modalText: {
    color: "darkblue",
    textAlign: "center",
    marginVertical: 10,
  },
  inputContainer: {
    padding: 5,
    margin: 5,
    width:200,
    alignSelf:"center",


  },
  input: {
    padding: 5,
    margin: 5,
  },
  button: {
    backgroundColor: "darkblue",
    padding: 10,
    margin: 5,
  },
  buttonText: {
    color: "white",
  },
});

export default PointConverter;
