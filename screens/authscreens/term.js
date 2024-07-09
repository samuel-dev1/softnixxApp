import React from "react";
import { useLayoutEffect } from "react";
import { View, Text, StyleSheet} from "react-native";
import WebView from "react-native-webview";
import ModalGropu from "../indicator/indicator";

const Checkterm= ({navigation, route}) => {
   useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: () => (
          <View>
            <Text>Terms and Condictions</Text>
          </View>
  
        ),
      });
    }, [navigation]);
    return (

    <WebView 
    startInLoadingState={true}
    onLoadProgress={()=><ModalGropu />}
    onError={()=><View>
        <Text>Something went wrong! </Text></View>}
source={{uri:"https://softnixx.com/read/"}}
    />
    );
  };

  export default Checkterm;