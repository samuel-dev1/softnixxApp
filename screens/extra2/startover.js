import React from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

const Startover = ({ start, setStart, navigation }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={start}
      onRequestClose={() => {
        setStart(false);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Welcome to softnix Gift Center</Text>
          <Text style={styles.modalText}>
            Please read Terms and Conditions before continuing
          </Text>

          <Button
            type="solid"
            title={"Learn more"}
            icon={{
              name: "info",
              type: "font-awesome",
              color: "white",
              size: 20,
            }}
            titleStyle={{ color: "white" }}
            buttonStyle={{
              backgroundColor: "darkblue",
              padding: 10,
              marginVertical: 10,
            }}
            onPress={setStart}
          />

          <View style={styles.buttonContainer}>
            <Button
              onPress={() => {
                setStart(false); // Close the modal
              }}
              titleStyle={{ color: "darkblue" }}
              buttonStyle={[styles.button, { borderColor: "darkblue" }]}
              type="outline"
              title={"Continue"}
            />
            <Button
              onPress={navigation
                }
              titleStyle={{ color: "white" }}
              buttonStyle={[styles.button, { backgroundColor: "darkblue" }]}
              type="solid"
              title={"Back"}
            />
          </View>
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
    color: "darkblue",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  modalText: {
    color: "darkblue",
    textAlign: "center",
    fontSize: 14,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  button: {
    width: 100,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
  },
});

export default Startover;
