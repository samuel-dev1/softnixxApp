import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';

const ReadMore = ({ text, numberOfLines, open, close }) => {
  const [isExpanded, setIsExpanded] = useState(open);

  useEffect(() => {
    setIsExpanded(open);
  }, [open]);

  const toggleText = () => {
    if (isExpanded) {
      close();
    } else {
      setIsExpanded(true);
    }
  };

  return (
    <View style={styles.container}>
         
        <Button titleStyle={styles.readMoreText}
        buttonStyle={{
            width:150,
            borderRadius:20,
            backgroundColor:"darkblue"
        }}
        onPress={toggleText}
        title={isExpanded ? 'Read Less' : 'Read More'}
        />
      <Text
        style={styles.text}
        numberOfLines={isExpanded ? 15 : numberOfLines}
      >
        {text}
      </Text>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 1,
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  readMoreText: {
    color:'white',
    fontWeight: 'bold',
  },
});

export default ReadMore;
