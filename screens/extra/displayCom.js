import React from "react";
import {  View,Image, SafeAreaView } from "react-native";

const DisplayPicture = ({ image }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{borderBottomLeftRadius: 30, borderBottomRightRadius:30,padding:5, overflow: 'hidden' }}>
        <Image
          style={{ height: 300, }}
          source={{ uri: image }}
        />
      </View>
    </SafeAreaView>
  );
};

export default DisplayPicture;


