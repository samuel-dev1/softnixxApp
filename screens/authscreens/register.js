
import React from 'react';

import { View, Text, StyleSheet, Dimensions, TextInput, Modal, SafeAreaView, ScrollView, Linking, StatusBar } from 'react-native';
import { Avatar, Button, Switch, BottomSheet, Text as Tx, ListItem, Icon, Badge, Tooltip } from 'react-native-elements';
import Icons from '@expo/vector-icons/MaterialCommunityIcons';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get("window")
import ModalGropu from '../indicator/indicator';


export default function SignInPage() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [open, setOpen] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [firstname, setFirstname] = React.useState('')
  const [passwordR, setPasswordR] = React.useState('')
  const [lastname, setLastname] = React.useState('')
  const [loading, isLoading] = React.useState(false)
  const [isEnabled, setIsEnabled] = React.useState(false);
  const navigation = useNavigation()
  const [passwordError, setPasswordError] = React.useState('');

  const handlePasswordChange = (val) => {
    setPassword(val);
    if (val.length < 6 || !/[A-Z]/.test(val)) {
      setPasswordError('Password must be at least 6 characters long and contain an uppercase letter');
    } else {
      setPasswordError('');
    }
  };

  const createUser = () => {
    if (isEnabled != true) {
      showMessage({
        message: "pls accept the Terms and condictions",
        type: 'info',
        position: "center",
        backgroundColor: "darkblue",
        color: "white",
      })
    }
    else {
      isLoading(true);
      try {
        fetch('https://softnixx.com/api/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            username: username.trim(),
            password: password.trim(),
            lastname: lastname.trim(),
            firstname: firstname.trim(),
            email: email.trim(),
            passwordR: passwordR.trim(),
          }),

        })
          .then(res => res.json())
          .then(data => {
            if (data.status === 'success') {
              isLoading(false)
              setOpen(true)
            }
            else if (data.status === "failed") {
              isLoading(false)
              showMessage({
                message: "Try Again server issues if problem insist contact us for help",
                type: 'info',
                backgroundColor: "darkblue",
                color: "white",
                position: "center",
              })
            }
            else if (data.status === "ufound") {
              isLoading(false)
              showMessage({
                message: "Username or Email already exist",
                type: "warning",
                backgroundColor: "darkblue",
                color: "white",
                position: "center",
              })
            }
            else if (data.status === "emailEr") {
              isLoading(false)
              showMessage({
                message: "Email format not valid",
                type: "danger",
                backgroundColor: "darkblue",
                color: "white",
                position: "center",
              })
            }
            else if (data.status === "passwordEr") {
              isLoading(false)
              showMessage({
                message: "password does not match! try again",
                type: "danger",
                backgroundColor: "darkblue",
                color: "white",
                position: "center",
              })
            }
          }).catch((error) => {

            isLoading(false)
          })
      }
      catch (error) {
        isLoading(false);

      }

    }
  }

  function Modals() {
    return (
      <BottomSheet
        containerStyle={{
          backgroundColor: "#0A1172",
          left: 0,
          right: 0,
          bottom: 0,
          position: "absolute"
        }}
        isVisible={open}>
        <View style={styles.containnermodal}>
          <View style={styles.iconContainer}>
            <Icon raised name='check-circle-outline' size={40} color="lightgreen" />
          </View>
          <Text style={styles.firstT}>Successfully Registered!</Text>
          <Text style={styles.secondT}>Please kindly follow the instruction sent to your email, to <Text style={styles.sub}>Activate</Text> your account.</Text>
          <Button rised buttonStyle={styles.buttonT} titleStyle={styles.tit} onPress={() => navigation.navigate("login")} title={"login here"} />
          <Tooltip backgroundColor='#0A1172' containerStyle={{
            padding: 10,
            height: 100,
            width: 200,
            bottom: 0,
          }} popover={<Text style={{ color: "white" }}>Can't find Email? kindly check your spam folder</Text>}>
            <Icon raised name='info-circle' type='font-awesome' size={20} color="darkblue" />
          </Tooltip>
        </View>
      </BottomSheet>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar />

      <ScrollView>

        <View style={styles.container1}>
          <Avatar containerStyle={{
            backgroundColor: "white",
            borderRadius: 40,
            alignSelf: "center",
            marginTop: 10,

          }} size={"large"} source={require("../../assets/show.png")} />
          <Text style={styles.data}>Hi,<Text style={styles.h3} h3>create account</Text>Very easy!</Text>
        </View>
        <ListItem bottomDivider>
  <Icon raised name='user-circle' type='font-awesome' size={16} color="gray" />
  <ListItem.Content >
    <ListItem.Input value={firstname} onChangeText={val => setFirstname(val)} placeholder='Firstname' textAlign='left' />
  </ListItem.Content>
</ListItem>
<ListItem bottomDivider>
  <Icon raised name='user-circle' type='font-awesome' size={16} color="gray" />
  <ListItem.Content >
    <ListItem.Input value={lastname} onChangeText={val => setLastname(val)} placeholder='lastname' textAlign='left' />
  </ListItem.Content>
</ListItem>
<ListItem bottomDivider>
  <Icon raised name='user' type='font-awesome' size={16} color="gray" />
  <ListItem.Content >
    <ListItem.Input value={username} onChangeText={val => setUsername(val)} placeholder='username' textAlign='left' />
  </ListItem.Content>
</ListItem>
<ListItem bottomDivider>
  <Icon raised name='envelope' type='font-awesome' size={16} color="gray" />
  <ListItem.Content >
    <Badge />
    <ListItem.Input 
      value={email}
      onChangeText={(val) => setEmail(val)}
      placeholder='Email'
      textAlign='left' />
  </ListItem.Content>
</ListItem>
<ListItem bottomDivider>
  <Icon raised name='key' type='font-awesome' size={16} color="gray" />
  <ListItem.Content >
    <ListItem.Input 
      value={password}
      onChangeText={handlePasswordChange}
      errorMessage={passwordError}
      secureTextEntry={true}
      placeholder='Password'
      textAlign='left' />
  </ListItem.Content>
</ListItem>
<ListItem bottomDivider>
  <Icon raised name='key' type='font-awesome' size={16} color="gray" />
  <ListItem.Content>
    <ListItem.Input
      secureTextEntry={true}
      value={passwordR}
      onChangeText={val => setPasswordR(val)}
      errorMessage={passwordR !== '' && password !== passwordR ? "Passwords do not match" : null}
      placeholder='Re-type Password'
      textAlign='left' />
  </ListItem.Content>
</ListItem>
<ListItem >
  <ListItem.CheckBox checked={isEnabled} onPress={() => setIsEnabled(!isEnabled)} size={20} />
  <ListItem.Content>
    <Text>
      Terms and Conditions
    </Text>
  </ListItem.Content>
  <Icon raised onPress={() => navigation.navigate("check")} name='info' />
</ListItem>
<Button onPress={createUser} buttonStyle={{ padding: 10, width: 150, alignSelf: "center", backgroundColor: "darkblue" }} type='solid' title="Register" />
<ListItem>
</ListItem>




        <View style={{ display: "flex", flexDirection: 'row', alignSelf: "center", alignItems: "center", margin: 5, padding: 5 }}>
          <Button onPress={() => navigation.navigate("login")} type='plain' title={"Login"} />
          <Button onPress={() => Linking.openURL('mailto:softtellex@example.com')} icon={{ name: "question-circle", type: "font-awesome", size: 16 }} type="outline" title={"Help?"} />
        </View>
        {loading ? <ModalGropu /> : null}
        <Modals />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  data: {
    textAlign: 'center',
    textTransform: "capitalize",
    color: "white",
    fontSize: 14,
  },
  h3: {
    color: "green",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    textDecorationStyle: "dotted",
  },
  container1: {
    backgroundColor: "darkblue",
    padding: 20,
    margin: 10,
    borderRadius: 7,
  },
  containnermodal: {
    padding: 20,
    flex: 1,
  },
  firstT: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    margin: 10,
    fontSize: 19,
  },
  secondT: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    margin: 10,
    fontSize: 15,
  },
  buttonT: {
    backgroundColor: "#fff",
    padding: 10,
    width: 200,
    alignSelf: "center",
  },
  tit: {
    color: "#0A1172",
    fontSize: 16,
    fontWeight: "bold"
  },
  iconContainer: {
    justifyContent: 'center',  // Center the icon vertically
    alignItems: 'center',  // Center the icon horizontally
    marginBottom: 20,  // Adjust margin as needed
  },
})