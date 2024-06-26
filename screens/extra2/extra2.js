import React from 'react';
import { BottomSheet, ListItem, Icon } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { TextInput } from 'react-native';

const BottomSheetComments = ({ comments, isVisible, onClose, comment, Setcoment, getAll }) => {


  return (
    <BottomSheet

    containerStyle={{
      backgroundColor:"#0A1172",
      left:0,
      right:0,
      bottom:0,        
      position:"absolute"
    }}
    isVisible={isVisible}>
      {comments.map((comment, index) => (
        <ListItem key={index} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{comment.author}</ListItem.Title>
            <ListItem.Subtitle>{comment.text}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}

      <ListItem bottomDivider >
         <ListItem.Content >
            <ListItem.Input
            multiline
            value={comment}
            onChangeText={Setcoment}
            placeholder='Add a comment'  textAlign='left' inputStyle={{
              borderWidth:0.5,
              borderRadius:5,
             padding:10,
            }}/>
         </ListItem.Content>
         <Icon onPress={()=>getAll} name='send' color={'darkblue'} type="font-awesome" />
        
      </ListItem>
      <Button
      onPress={onClose}
      title={"close"}
      buttonStyle={{
         padding:10,
         marginBottom:10,
         width:200,
         alignSelf:"center",
      }}
      />
    </BottomSheet>
  );
};

export default BottomSheetComments;
