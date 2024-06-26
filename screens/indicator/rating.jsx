import React from 'react';
import { Modal, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Rating } from 'react-native-ratings'; // Assuming you're using react-native-ratings for the Rating component

const ShowRating = ({ isVisible, onClose }) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => onClose()}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ borderRadius: 15, backgroundColor: 'white', padding: 20, alignItems: 'center' }}>
          <Text style={{ textAlign: "center", fontSize: 25, margin: 5, padding: 5, color: "darkblue", fontWeight: "bold" }}>
            Are you enjoying softnixx?
          </Text>
          <Text style={{ color: "darkblue", textAlign: "center", marginBottom: 10 }}>
            Rate our App, by using your hands over the stars
          </Text>
          <Rating
            ratingColor="darkblue"
            ratingTextColor="darkblue"
            ratingBackgroundColor="darkblue"
            showRating
            fractions={0.5}
            startingValue={3.3}
            imageSize={40} // Adjust the size of stars as per your preference
            style={{ paddingVertical: 10 }}
          />
          <Button
         raised
            onPress={() => onClose()}
           buttonStyle={{
            backgroundColor:"darkblue"
           }}
            title={"Not now"}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ShowRating;
