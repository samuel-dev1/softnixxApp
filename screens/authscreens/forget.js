import React from "react";
import { View, Text, StyleSheet} from "react-native";
import WebView from "react-native-webview";
import ModalGropu from "../indicator/indicator";
import { useLayoutEffect } from "react";

const ChangePass= ({route, navigation}) => {
   
    useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle: () => (
            <View>
              <Text>Reset Your password</Text>
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
source={{uri:"https://softnixx.com/password_reset/"}}
    />
    );
  };

  export default ChangePass