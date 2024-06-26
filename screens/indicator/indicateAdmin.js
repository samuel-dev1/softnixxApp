import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Linking, StyleSheet } from 'react-native';

const FadedImageComponent = () => {
  const handlePress = () => {
    Linking.openURL('mailto:samuelyyy257@gmail.com');
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <ImageBackground
        source={require("../../assets/icon.png")}
        style={styles.imageBackground}
        imageStyle={styles.image}>
        <Text style={styles.title}>This page is available for Advertisement</Text>
        <Text style={styles.caption}>Contact Admin</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 10,
    resizeMode: 'cover', 
    opacity: 0.8, 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay to improve text readability
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  caption: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay to improve text readability
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default FadedImageComponent;
