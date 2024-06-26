import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const GiftClaimComponent = ({ item, onClaimPress }) => {
   function MoneyConvert(num) {
      try {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
      }
      catch {
        return num
      }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.product}</Text>
      <Text style={styles.price}>N{MoneyConvert(item.price)}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          {item.neede_uer === 0 ? 'Exhausted' : `Users Needed: ${item.neede_uer}`}
        </Text>
        <Text style={styles.infoText}>{`${item.started_time}pm`}</Text>
        <Text style={styles.infoText}>{`Time Needed: ${item.time_need}`}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onClaimPress}>
        <Text style={styles.buttonText}>CLAIM GIFT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: 'green',
    marginBottom: 10,
  },
  infoContainer: {
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: 'darkblue',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GiftClaimComponent;
