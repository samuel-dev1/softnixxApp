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

  const AlertSheet = () => {
    return (
      <Modal
        visible={showLogoutConfirmation}
        transparent={true}
        animationType="slide"
        onRequestClose={() => onClose()}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ alignItems: "center", padding: 20, backgroundColor: 'white', borderRadius: 10, width: '80%' }}>
            <Icon raised name="exclamation" type="font-awesome" color="red" size={40} />
            <Text style={{ textAlign: "justify", padding: 10 }}>
              You are about to log out and your sessions will be cleared!
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
              <Button
                title="Log out"
                buttonStyle={{ backgroundColor: "transparent", borderWidth: 0.5, borderColor: "darkblue" }}
                titleStyle={{ color: "red", fontWeight: "bold" }}
                onPress={() => { navigation.replace("login"); clearStorage(); onClose(); }}
              />
              <Button
                 title="Cancel"
                    buttonStyle={{ backgroundColor: "darkblue", borderRadius: 10 }}
                    onPress={() => setShowLogoutConfirmation(false)}
              />
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
        icon={() => <Icon raised name="user-circle" type="font-awesome" color="gray" size={20} />}
        
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
        <Icon name="envelope" type="font-awesome" color="brown" />
        <ListItem.Content>
          <Text>
            Send me Update
          </Text>
        </ListItem.Content>
        <Tooltip popover={<Text>Not a fully member</Text>}>
          <ListItem.CheckBox checked={true} checkedColor="blue" />
        </Tooltip>
      </ListItem>

      <DrawerItem label='Track Transaction' />
      <ListItem bottomDivider onPress={()=>Alert.alert("Please use anyof of medium to contact us")}>
        <Icon type="font-awesome" name="history" color="darkgray" />
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
      <DrawerItem label="Terms and Conditions" onPress={() => navigation.navigate("term")} />

      <ListItem bottomDivider>
        <Badge status="error" value="Coming soon" />
      </ListItem>

      <DrawerItem
        label="Start Earning"
        onPress={() => Alert.alert("Please wait for update")}
        icon={() => <Icon name="money" type="font-awesome" raised />}
      />

      <DrawerItem
        label="Logout"
        icon={() => <Icon raised name='power-off' type="font-awesome" size={30} color="brown" />}
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
