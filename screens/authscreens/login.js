import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Alert, ScrollView } from 'react-native';
import { Avatar, Button, Icon, ListItem } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalGropu from '../indicator/indicator';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingI, setLoadingI] = useState(false);
  const [see, setSee] = useState(true);
  const [islogin, setLogin] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const autoLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (userData !== null && userData !== undefined) {
        const { data, data2 } = JSON.parse(userData);
        navigation.replace("tabBottom", { key: data, profile: data2 });
      } else {
        setLogin(false);
      }
    };
    autoLogin();
  }, []);

  const login = async () => {
    setLoading(true);
    setLoadingI(true);
    try {
      const response = await fetch('https://softnixx.com/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setUsername('');
        setPassword('');
        setLoading(false);
        await AsyncStorage.setItem('userData', JSON.stringify(data));
        setLogin(true);
        navigation.replace("tabBottom", { key: data.data, profile: data.data2 });
      } else {
        showMessage({
          message: 'Login Failed, User details not found or Not verified',
          type: 'danger',
          position: 'center',
          backgroundColor: 'darkblue',
          color: 'white',
        });
        setLoading(false);
        setLoadingI(false);
      }
    } catch (error) {
      Alert.alert(
        'Title',
        'Gift coming and will be activated on 27th of august 2024',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Try again', onPress: () => login() },
        ]
      );
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={mystyle.containerall}>
      {islogin ? (
        <ModalGropu />
      ) : (
        <ScrollView>
        <KeyboardAvoidingView>
          
          <View>
            <View style={mystyle.container1}>
              <Avatar
                containerStyle={{
                  backgroundColor: 'white',
                  borderRadius: 40,
                  alignSelf: 'center',
                }}
                size={'large'}
                source={require('../../assets/show.png')}
              />
              <Text style={mystyle.data}>
                Data <Text h4Style={mystyle.h4}>and Utilities</Text> Management
              </Text>
            </View>
            <View style={mystyle.container2}>
              <Text style={{
                color:"darkblue",
                fontWeight:"700",
                fontSize:20,
              }}>Login</Text>
              <ListItem containerStyle={{ marginTop: 20 }} bottomDivider>
                <Icon raised name='user-circle' type='font-awesome' size={16} color='gray' />
                <ListItem.Content>
                  <ListItem.Input
                    returnKeyType='next'
                    value={username}
                    inputContainerStyle={{ padding: 10 }}
                    onChangeText={(val) => setUsername(val)}
                    errorStyle={{ color: 'red' }}
                    placeholder='Enter your username'
                    textAlign='left'
                  />
                </ListItem.Content>
              </ListItem>
              <ListItem containerStyle={{ marginTop: 20 }} bottomDivider>
                <Icon raised name='key' size={16} color='gray' type='font-awesome' />
                <ListItem.Content>
                  <ListItem.Input
                    returnKeyType='done'
                    value={password}
                    onChangeText={(val) => setPassword(val)}
                    secureTextEntry={see}
                    style={mystyle.input}
                    errorMessage={loading ? 'Matching password, please wait' : null}
                    placeholder='password'
                    textAlign='left'
                  />
                </ListItem.Content>
                <Icon
                  onPress={() => setSee(!see)}
                  name={password == '' ? null : see ? 'eye-slash' : 'eye'}
                  type='font-awesome'
                />
              </ListItem>
              <Button
                onPress={login}
                buttonStyle={{ marginTop: 30, marginBottom: 20, padding: 10, width: 150, alignSelf: 'center', backgroundColor: 'darkblue' }}
                type='solid'
                title='login'
              />

              <View style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', alignItems: 'center', marginTop: 20, padding: 5 }}>
                <Button  onPress={() => navigation.navigate('register')} type='plain' title={'create account'} />
                <Button
                raised
                  onPress={() => {
                    navigation.navigate('passwordreset');
                  }}
                  icon={{ name: 'key', type: 'font-awesome', size: 16 }}
                  type='outline'
                  title={'forgot password?'}
                />
              </View>
            </View>

            {loading ? <ModalGropu /> : null}
          </View>
        </KeyboardAvoidingView>
        </ScrollView>
      )}

      <View style={{ position: 'absolute', bottom: 0, alignSelf: 'center', marginBottom: 25 }}>
        <Text>
          Provided by softtellex inc. 🧲
        </Text>
      </View>
    </SafeAreaView>
  );
};

const mystyle = StyleSheet.create({
  containerall: {
    padding: 5,
    margin: 5,
    flex: 1,
    backgroundColor: '#fff',
  },
  data: {
    textAlign: 'center',
    marginTop: 10,
    textTransform: 'capitalize',
    color: '#fff',
    fontSize: 14,
  },
  h4: {
    color: 'lightgreen',
    fontSize: 14,
  },
  container1: {
    backgroundColor: 'darkblue',
    padding: 6,
    margin: 6,
    borderRadius: 7,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    height: 200,
    alignContent: 'center',
    justifyContent: 'center',
  },
  container2: {
    marginTop: 10,
    padding: 5,
  },
  h3: {
    color: 'darkblue',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    textDecorationStyle: 'dotted',
  },
  input: {
    padding: 10,
    borderColor: 'lightgray',
  },
});

export default LoginScreen;
