import React from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Alert, Linking, Image } from "react-native";
import { Avatar, Accessory, Button, Icon, ListItem, Overlay, Text as Tx, Tooltip } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { Rating, AirbnbRating } from 'react-native-elements';
import { showMessage } from "react-native-flash-message";
import * as ImagePicker from "expo-image-picker";
import ModalGropu from "../indicator/indicator";
import ShowRating from "../indicator/rating";


export default function Settings({ route, navigation }) {
  const key = route.params
  const profile = route.params
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState(null)
  const [image, setImage] = React.useState(null);
  const [loadingc, setLoadingc] = React.useState(false)



const Onclose =()=>{
  setLoading(false)
}


const pickImage = async () => {
 
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    setLoadingc(true)
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: result.uri,
        type: 'image/png',
        name: 'image.png',
      });
      const response = await fetch("https://softnixx.com/api/image", {
        method: "POST",
        headers: {
          Accept: 'application/json',
          Authorization: `Token ${key.key.key}`,
        },
        body: formData,
      });

      if (response.ok) {
        showMessage({
          message: "Successfully updated!",
          type: "info",
          backgroundColor: "darkblue",
          color: "white",
        });
        setLoadingc(false)
      } else {
        showMessage({
          message: "Error updating",
          type: "info",
          backgroundColor: "darkblue",
          color: "white",
        });
      }
    } catch (error) {
      showMessage({
        message: "Something went wrong!",
        type: "info",
        backgroundColor: "darkblue",
        color: "white",
      });
      setLoadingc(false)
    }
    finally{
      Getdetails()
    }
  }
};



   const Getdetails = async () => {
    setLoading(true)
    const itemUrL = `https://softnixx.com/api/updateD/${data==null?key.profile.username:data.username}/`;
    try {
      const response = await fetch(itemUrL, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `Token ${key.key.key}`,
        },
      });
      const json = await response.json();
      setData(json)
      setLoading(false)
    } catch (error) {
      showMessage({
        message: "Something went wrong!",
        type: "danger",
        position: "center",
        backgroundColor:"darkblue",
        color:"white",
        autoHide:false
      });
    } finally {
      null
    }
  }
  React.useEffect(() => {
    Getdetails()
  }, [])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", marginTop:20 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.overall}>
          {data?.profile?.ProfilePic?
          <Avatar
          
            onPress={pickImage}
            size={100}
            rounded
            source={{ uri:data?.profile.ProfilePic}}
            icon={{
              size: 70,
              name: "user-circle",
              type: "font-awesome",
              color: "darkgray",
            }}
          >
            <Accessory size={30} />
          </Avatar>
          :
          <Avatar
          onPress={pickImage}
          size={100}
          rounded
          icon={{
            size: 70,
            name: "user-circle",
            type: "font-awesome",
            color: "darkgray",
          }}
        >
          <Accessory size={30} />
        </Avatar>
}
          <Text>SN Acc: <Text style={styles.ovarelText}>{profile?.profile?.profile?.tract_id}</Text><Tooltip
            containerStyle={{
              height: 200,
              width: 200,
            }}
            popover={<Text style={{ color: "#fff" }}><Icon name='user-circle' type="font-awesome" color={"#fff"} />Copy this to your friends using softnixx to tranfer into your account? for free</Text>} ><Icon name='question-circle' type='font-awesome' /></Tooltip></Text>
        </View>
        <ListItem>
          <Text>
          General
          </Text>
        </ListItem>
        <ListItem onPress={() => Alert.alert("App Info?", "Notifications not configured for you!")} bottomDivider>
          <Icon size={12} raised name="bell" color={"red"} type='font-awesome' />
          <ListItem.Content>
            <Text>Notification</Text>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem>
          <Text>Profile</Text>
        </ListItem>
        <ListItem bottomDivider onPress={() => navigation.navigate("profile", { 'profile': profile })}>
          <Icon size={12} raised name="user-circle" color={"#111"} type='font-awesome' />
          <ListItem.Content>
            <Text>Profile Editing</Text>
          </ListItem.Content>
          <Icon
            name='edit'
            size={24}
            color='black'
            type="font-awesome"
          />
          <ListItem.Chevron />
        </ListItem>
        <ListItem bottomDivider>
          <Icon size={12} raised name="language" color={"#f67"} type={'font-awesome'} />
          <ListItem.Content>
            <Text>
            Language
            </Text>
          </ListItem.Content>
          <Text style={{ color: "red" }}>coming soon!</Text>
          <ListItem.Chevron />
        </ListItem>
        <ListItem>
          <Text>Support</Text>
        </ListItem>
        <ListItem onPress={() => {
          Alert.alert("App info!", "All notice will be sent to your registered Email")
        }} bottomDivider>
          <Icon size={12} raised name="bullhorn" color={"brown"} type={'font-awesome'} />
          <ListItem.Content>
            <Text>
            Notices
            </Text>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem onPress={() => navigation.navigate("check")} bottomDivider>
          <Icon size={12} raised name="info" color={"#000"} type={'font-awesome'} />
          <ListItem.Content>
           <Text>
           Terms and Condictions
           </Text>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <ListItem bottomDivider>
          <Icon size={12} raised name="adn" color={"darkblue"} type={'font-awesome'} />
          <ListItem.Content>
           <Text>
           App Management
           </Text>
          </ListItem.Content>
          <Text>
          latest
          </Text>
          <ListItem.Chevron />
        </ListItem>
        <ListItem>
          <Text>
            About
          </Text>
        </ListItem>
        <ListItem
          onPress={() => Linking.openURL("https://www.softnixx.com")}
          bottomDivider>
          <Icon raised size={12} name="globe" color={"gray"} type={'font-awesome'} />
          <ListItem.Content>
           <Text>
            Our Website
           </Text>
          </ListItem.Content>
          <Text>click</Text>
          <ListItem.Chevron />
        </ListItem>
        <ListItem onPress={() => setLoading(true)} bottomDivider>
          <Icon raised size={12} name="star" color={"red"} type={'font-awesome'} />
          <ListItem.Content>
           <Text>Rate us</Text>
          </ListItem.Content>
          <Text>Open</Text>
          <ListItem.Chevron />
        </ListItem>

        <View><Text style={{ textAlign: "center", marginTop: 10, paddingTop: 10 }}>Softnix inc.</Text></View>
      </ScrollView>
      <ShowRating isVisible={loading} onClose={Onclose}  />
      {loadingc?<ModalGropu />:null}
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  overall: {
    display: "flex",
    flexDirection: "column",
    padding: 5,
    margin: 5,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  ovarelicon: {
    fontSize: 30,
    padding: 5,
    margin: 5,
  },
  ovarelText: {
    fontSize: 16,
    padding: 5,
    margin: 5,
  }
})