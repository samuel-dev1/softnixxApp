import React, { useState } from "react";
import { View, Image, SafeAreaView, Text, ScrollView, Dimensions } from "react-native";
import { Button, Icon, ListItem } from "react-native-elements";
import { showMessage } from "react-native-flash-message";
import * as ImagePicker from "expo-image-picker";
import ModalGropu from "../indicator/indicator";

const { height } = Dimensions.get('window');

const NewPost = ({ route, navigation }) => {
  const [image, setImage] = useState(null);
  const [feeds, setFeeds] = useState('');
  const [buttc, setButtonc] = useState(false);

const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        showMessage({
          message: 'Permission to access media library denied',
          type: 'danger',
        });
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        // Assuming you want to set the URI of the first selected image
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      showMessage({
        message: 'Something went wrong!',
        type: 'danger',
      });
      console.error('ImagePicker Error:', error);
    }
  };
  const newpost = async () => {
    setButtonc(true);
    try {
      const formData = new FormData();
      if (image) {
        formData.append('image', {
          uri: image,
          type: 'image/png',
          name: 'image.png',
        });
      }
      formData.append('feed', feeds);
      formData.append('token', route.params.key.key.key);

      const response = await fetch('https://softnixx.com/api/create/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Token ${route.params.key.key.key}`,
        },
        body: formData,
      });

      if (response.ok) {
        showMessage({
          message: 'Successfully uploaded',
          type: 'success',
          backgroundColor: "darkblue",
          color: "white",
        });
        navigation.goBack();
      } else {
        const errorData = await response.json();
        showMessage({
          message: `Uploading Error: ${errorData.message}`,
          type: 'danger',
          backgroundColor: "darkblue",
          color: "white",
        });
        console.log('Response error:', response.status, response.statusText, errorData);
      }
    } catch (error) {
      showMessage({
        message: 'An unexpected error occurred.',
        type: 'danger',
        backgroundColor: "darkblue",
        color: "white",
      });
      console.log('Catch error:', error);
    } finally {
      setButtonc(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{
        justifyContent: "center",
        backgroundColor: "#fff",
        padding: 10,
        margin: 10,
      }}>
        <ScrollView>
          <ListItem>
            <ListItem.Input
              containerStyle={{
                borderWidth: 0.5,
              }}
              inputStyle={{
                height: height * 0.4,
              }}
              placeholder="Write something about your product..."
              multiline={true}
              value={feeds}
              onChangeText={(val) => setFeeds(val)}
              textAlign="left"
            />
          </ListItem>

          {image && (
            <Image
              source={{ uri: image }}
              style={{
                height: 200,
                width: '100%',
                borderRadius: 6,
                marginTop: 10,
              }}
            />
          )}

          <Button
            onPress={pickImage}
            buttonStyle={{
              margin: 10,
              width: 300,
              padding: 10,
              backgroundColor: "darkblue",
              alignSelf: "center",
            }}
            title={image ? "Replace Image" : "Add Image"}
          />
        </ScrollView>

        <Button
          onPress={() => {
            if (feeds.length < 15) {
              showMessage({
                message: "Please write more about your product",
                backgroundColor: "darkblue",
                color: "white",
              });
            } else {
              newpost();
            }
          }}
          buttonStyle={{
            margin: 10,
            width: 300,
            padding: 10,
            backgroundColor: "darkblue",
            alignSelf: "center",
          }}
          title={"CONTINUE"}
          disabled={buttc}
        />
      </View>

      {buttc && <ModalGropu />}

      <View style={{ position: "absolute", bottom: 0, marginBottom: 20, alignSelf: "center" }}>
        <Text style={{ color: "#111", fontSize: 16 }}>By Softtellex Inc.</Text>
      </View>
    </SafeAreaView>
  );
};

export default NewPost;
