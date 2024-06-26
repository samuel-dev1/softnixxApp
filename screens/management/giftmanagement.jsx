
import React from 'react';
import { View, Text, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import { Icon, Button } from 'react-native-elements'; // Assuming you are using react-native-elements for icons and buttons

const GiftManagement = ({contrr, methodP, useContl, amount,loadingG}) => {
  
  const MoneyConvert = (amount) => {
    return amount?.toLocaleString(); // Example function, replace with your actual money conversion logic
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={contrr}
      onRequestClose={() => {
        useContl(false);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Icon name="info" color="red" size={50} />
          <View style={styles.header}>
            <Text style={styles.infoText}>
              This will be converted Into N{MoneyConvert(amount)} into your wallet balance, to be used from now till December 15.
            </Text>
            <Icon
              name="close"
              color="gray"
              size={30}
              onPress={() =>useContl(false)}
              style={styles.closeIcon}
            />
          </View>
          {loadingG ? (
            <ActivityIndicator style={styles.activityIndicator} />
          ) : (
            <View style={styles.buttonContainer}>
              <Button
                type="outline"
                title="Continue"
                buttonStyle={styles.continueButton}
                titleStyle={styles.buttonTitle}
                onPress={methodP}
              />
              <Button
                title="Go back"
                buttonStyle={styles.goBackButton}
                titleStyle={{}}
                onPress={() => setContr(false)}
              />
            </View>
          )}
          <View style={styles.learnMore}>
            <Text>Learn more</Text>
            <Button
              icon={{ name: "info" }}
              iconRight
              buttonStyle={styles.readButton}
              titleStyle={styles.buttonTitle}
              title="Read"
              
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoText: {
    flex: 1,
    color: 'darkblue',
    textAlign: 'center',
  },
  closeIcon: {
    borderWidth: 0.5,
    borderRadius: 80,
  },
  activityIndicator: {
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  continueButton: {
    backgroundColor: null,
    borderColor: 'darkblue',
    margin: 5,
  },
  goBackButton: {
    backgroundColor: 'darkblue',
    margin: 5,
  },
  learnMore: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  readButton: {
    backgroundColor: null,
  },
  buttonTitle: {
    color: 'darkblue',
  },
});

export default GiftManagement;
