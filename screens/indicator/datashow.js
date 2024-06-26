import React from "react";
import { FlatList, View, StyleSheet, Dimensions, Text } from "react-native";
import { Button } from "react-native-elements";

const { width } = Dimensions.get("window");

const Datascreen = ({fetch ,value,check}) => {

   const handlePinInput =(option)=>{
      value(option)
   }

   const renderItem = ({ item }) => (
      <View style={styles.item}>
         <Button
         onPress={()=>handlePinInput(item)}
            raised
            buttonStyle={styles.button}
            title={item?.name}
         />
      </View>
   );
   return (
      <View style={styles.container}>
         <FlatList
         ListHeaderComponent={<View>
            <Text style={{
               color:"darkblue"
            }}>
               buy any of this data and get a softnixx point.
            </Text>
         </View>}
         ListEmptyComponent={<View>
            <Text>
            kindly choose a network!
            </Text>
            </View>}
            data={fetch}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            contentContainerStyle={styles.flatList}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 16,
      paddingTop: 16,
   },
   flatList: {
      justifyContent: 'center',
      alignItems: 'center',
   },
   item: {
      width: width * 0.25,
      margin: 6,
      borderRadius: 5,
      overflow: 'hidden',
   },
   button: {
      backgroundColor: "darkblue",
      borderRadius: 3,
      padding: 8,
      height: 130,
   },
});

export default Datascreen;
