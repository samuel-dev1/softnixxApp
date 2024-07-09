import 'react-native-gesture-handler';

import React, { useState } from "react";
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { View, Text, Alert, Modal } from "react-native";
import { Icon, Button, ListItem, Tooltip, Badge } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import Dashboard from "../mainscreen/dashboard";
import { useNavigation, useRoute } from "@react-navigation/native";

const Drawer = createDrawerNavigator();
const CustomDrawerContent = (props) => {
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [email, setEmial] = React.useState(false)

    const handleEmail =  ()=>{
      setEmial(!email)
    }
  const navigation = useNavigation();
  const route = useRoute();
  const profile = route?.params?.profile;

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert('Logout successfully');
    } catch (error) {
      Alert.alert('Error occurred:', error.message);
    }
  };

  const handleLogout = () => {
    setShowLogoutConfirmation(true);
  };

  const logOut =()=>{
    navigation.replace("login");
    clearStorage();
    }

  const AlertSheet = () => {

    return (
      <Modal
        visible={showLogoutConfirmation}
        transparent={true}
        animationType="slide"
        onRequestClose={() => onClose()}
      >
        <View style={{ flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ alignItems: "center", padding: 20, backgroundColor: 'white', borderRadius: 10, width: '80%' }}>
            <Icon raised  name="exclamation" type="font-awesome" color="red" size={20} />
            <Text style={{ textAlign: "justify", padding: 10 }}>
              You are about to log out and your sessions will be cleared!
            </Text>
            <View style={{ flexDirection: "row", width:200, justifyContent: "space-around", marginTop: 20 }}>

              <View>
              <Button
                title="Log out"
                buttonStyle={{ backgroundColor: "transparent", borderColor: "darkblue" , margin:3, padding:10}}
                titleStyle={{ color: "red", fontWeight: "bold" }}
                onPress={logOut}
              />
              </View>
              <View>
              <Button
              type='outline'
          titleStyle={{
            color:"darkblue"
          }}
                 title="Cancel"
                    buttonStyle={{ borderRadius: 10, borderColor:"darkblue" }}
                    onPress={() => setShowLogoutConfirmation(false)}
              />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <Text style={{ alignSelf: "center", color: "darkblue", marginTop: 10 }}>Softnixx inc.</Text>
      <Text style={{ textAlign: 'center', color: "blue" }}>Data and Utility Management</Text>
      <DrawerItem
        label="Secured ©"
        icon={() => <Icon
           raised name="user-circle" type="font-awesome" color="gray" size={20} />}
        
      />
      <ListItem bottomDivider>
        <ListItem.Content>
            <Text>KYC</Text>
          <Text>Coming soon!</Text>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>

      <DrawerItem label="Email and Update" />
      <ListItem bottomDivider>
        <Icon size={10} raised name="envelope" type="font-awesome" color="brown" />
        <ListItem.Content>
          <Text>
            Send me Update
          </Text>
        </ListItem.Content>
        <Tooltip popover={<Text>Not a fully member</Text>}>
          <ListItem.CheckBox
          onPress={handleEmail}
          checked={email} checkedColor="blue" />
        </Tooltip>
      </ListItem>

      <DrawerItem label='Track Transaction' />
      <ListItem bottomDivider onPress={()=>Alert.alert("Please use any of our medium provided to contact us")}>
        <Icon size={10} raised type="font-awesome" name="history" color="darkgray" />
        <ListItem.Content>
          <Text>
            Help ?
          </Text>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>

      <DrawerItem label="App Privilege" />
      <ListItem bottomDivider onPress={() => showMessage({
        message: "Not available at the moment",
        type: "error",
        position: "center",
        backgroundColor: "darkblue",
        color: "white",
      })}>
        <ListItem.Content>
          <Text>
            Watch aids?
          </Text>
        </ListItem.Content>
       <Text>
       +&#8358;5
       </Text>
        <ListItem.Chevron />
      </ListItem>

      <DrawerItem label="LOAN" onPress={() => Alert.alert("You are not eligible for LOAN")} />
      <DrawerItem label="Terms and Conditions" onPress={() => navigation.navigate("check")} />

      <ListItem bottomDivider>
        <Badge status="error" value="Coming soon" />
      </ListItem>

      <DrawerItem
        label="Start Earning"
        onPress={() => Alert.alert("Please wait for update")}
        icon={() => <Icon  size={10} name="money" type="font-awesome" raised />}
      />

      <DrawerItem
        label="Logout"
        icon={() => <Icon  raised name='power-off' type="font-awesome" size={10} color="brown" />}
        onPress={handleLogout}
      />

      <AlertSheet />
    </DrawerContentScrollView>
  );
};
const SideBar = ({ route }) => {
  const { params } = route;
  return (
    <Drawer.Navigator
      initialRouteName="dashboard"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="dashboard"
        component={Dashboard}
        initialParams={{ profile: params?.profile, key:params?.key  }}
        options={{ headerShown: true }}
      />
    </Drawer.Navigator>
  );
};

export default SideBar;
