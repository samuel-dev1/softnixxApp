import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Dimensions,
  ActivityIndicator
} from 'react-native';
const {height, width} = Dimensions.get("window")
import { AntDesign } from '@expo/vector-icons';
import { Button, Icon, ListItem } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';

const CustomDropdown = ({ options, item,value }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  const toggleDropdown = () => {
   if(item=='')
   {
      showMessage({
         message:"enter a response",
         backgroundColor:"darkblue",
         color:"white"
      })
   }
   else{
      setIsVisible(!isVisible);
   }
    
  };
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsVisible(false);
    value(option)
  };



  const handleSearch = (text) => {
   setSearchQuery(text);
   
   const filteredData = options.filter((item) =>
     item.name.toLowerCase().includes(text.toLowerCase())
   );
   setFilteredOptions(filteredData);
 };
  return (
    <View >
      <View style={{
         display:"flex",
         flexDirection:"row",
         backgroundColor:"white",
         elevation:8,
         justifyContent:"space-between",
         alignSelf:"center",
         alignContent:"center",
         alignItems:"center",
         width:200
      }}>
         <View>
         <Button 
         buttonStyle={{
            backgroundColor:"white",
            paddingLeft:5,
            paddingRight:5,
            margin:5
         }}
         titleStyle={{
            color:"darkblue"
         }}
         onPress={toggleDropdown} title={selectedOption?.name?selectedOption.name:"select a bank"}
         iconRight={false}
         icon={<AntDesign name='Safety' size={20} style={{
            padding:5, margin:4
         }} /> }
         color={isVisible ? 'blue' : 'green'}
         />
         </View>
         <Text style={styles.dropdownIcon}>{options?.length==0?(<ActivityIndicator
         color={"darkblue"}
         />) :(isVisible? '▲' : '▼')}</Text>
         <View>
         </View>
      </View>
     
      <Modal presentationStyle='overFullScreen'
      
      visible={isVisible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setIsVisible(false)}
        />
        <View style={styles.modalContent}>
          <FlatList
          ListHeaderComponent={<View>
            <ListItem>
               <Icon name='search' />
               <ListItem.Content>
                  <ListItem.Input
                  placeholder='Search bank ...'
                  textAlign='left'
                  onChangeText={handleSearch}
                  value={searchQuery}
                  />
               </ListItem.Content>
               <ListItem.Chevron />
            </ListItem>
          </View>}
             data={searchQuery==''?options:filteredOptions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelectOption(item)}
              >
               <View>
                  <ListItem>
                     <Icon name='bank' type='font-awesome' raised size={10} color="darkblue" />
                     <ListItem.Content>
                        <Text>
                           {item.name}
                        </Text>
                     </ListItem.Content>
                     <ListItem.Chevron />
                  </ListItem>
               </View>
               
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  selectedOption: {
    fontSize: 16,
  },
  dropdownIcon: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: '#fff',
    marginTop: 'auto',
    maxHeight:height*0.9,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default CustomDropdown;
