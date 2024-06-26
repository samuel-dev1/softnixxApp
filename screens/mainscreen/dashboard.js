import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, SafeAreaView, ScrollView, Modal, TouchableOpacity, Alert } from "react-native";
import { View, Text, StyleSheet, Platform, Animated, Easing, RefreshControl } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Icons from '@expo/vector-icons/MaterialCommunityIcons';
import GiftClaimComponent from "../management/giftgiver";
import GiftManagement from "../management/giftmanagement";
import { Button, Avatar, Icon, Badge, ListItem, Divider, Card, SocialIcon, PricingCard, Tooltip, BottomSheet, Input, Accessory } from "react-native-elements";

import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
const { width, height } = Dimensions.get("window")


export default function Dashboard({ route }) {
  const navigation = useNavigation()
  const key = route.params
  const profile = route.params
  const [loading, setLoading] = React.useState(true)
  const [see, setSee] = React.useState(false)
  const [openCa, setOpneca] = React.useState(false)
  const [contr, setContr] = React.useState(false)
  const [data, useData] = React.useState([])
  const [optional, setOptional] = React.useState(null)
  const [gift, GetGift] = React.useState(null)
  const [amount, Setamount] = React.useState(null)
  const [time_need, setTime] = React.useState(null)
  const [started_time, setstarTime] = React.useState(null)
  const [id, setId] = React.useState(null)
  const [loadingG, setLoadingG] = React.useState(false)
  const [user_needed, setNeeded] = React.useState(null)

  function Point(num) {
    try {
      let x = num.toExponential()
      let r = (x.split("+"))
      if (r[1] == '3') {
        return num(x[0] + "k")
      }

      else if (num == "6") {
        if (r[1] == "6") {
          return (x[0] + 'm')
        }
      }
      else {
        return num
      }
    }
    catch {
      null
    }
  }
  const handleOpenGift = (item) => {
    Setamount(item.price),
    setstarTime(item.started_time),
    setTime(item.time_need),
    setNeeded(item.neede_uer),
    setContr(true),
    setId(item.id)
  };
  const handleGetGift = async () => {
    setLoadingG(true)
    try {
      const response = await fetch("https://softnixx.com/api/get_gift/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `Token ${key.key.key}`,
        },
        body: JSON.stringify({
          amount: amount,
          time_need: time_need,
          started_time: started_time,
          id: id,
          user_need: user_needed,
        })
      });

      if (response.ok) {
        Alert.alert("App info?", `sucessfull claim ${amount}`)
        setLoadingG(false)
      } else {
        setLoadingG(false)
        Alert.alert("App info?", "gift exhuasted or not activated check back later")
      }
    } catch (error) {
      setLoadingG(false)
      showMessage({
        message: "Something went wrong!",
        type: "danger",
        position: "center",
        backgroundColor: "darkblue",
        color: "white",
        autoHide: false
      });
    }
  };
  function MoneyConvert(num) {
    try {
      return num.toLocaleString();
    }
    catch {
      return num
    }
  }

  const scrollX = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(scrollX, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    )
    animation.start();
  }, [scrollX]);

  const generateColor = (index) => {

    const colors = ['darkgreen', '#668', '#8bc34a', '#03a9f4', '#e91e63'];
    return colors[index % colors.length];
  };

  const translateXInterpolate = scrollX.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1000]
  });

  const returnAnimation = Animated.timing(scrollX, {
    toValue: 0,
    duration: 10, // Shorter duration for the return animation
    useNativeDriver: true,
  });
  const onScrollEnd = () => {
    returnAnimation.start();
  };
  React.useEffect(() => {
    const getDetails = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (userData !== null && userData !== undefined) {
        const { data, data2 } = JSON.parse(userData);
        setOptional({ profile: data2 });
      } else {
        setLogin(false);
      }
    };
    getDetails();
  }, []);

  const GetItemLoaded = () => {
    const [Discription, useDiscription] = React.useState('optional')
    const [amount, useAmount] = React.useState(null)

    return (
      <BottomSheet
        containerStyle={{
          backgroundColor: "#fff",
          left: 0,
          right: 0,
          bottom: 0,
          position: "absolute",
          zIndex: 100,
        }}
        isVisible={openCa}>
        <View style={{
          backgroundColor: "#fff",
          paddingBottom: 30,
          borderColor: "lightgray",
          borderWidth: 1,
          shadowColor: "#000",
          shadowOpacity: 0.5,
        }}>

          <View style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <Icon

              name="close"
              color="gray"
              iconStyle={{
                borderWidth: 0.5,
                borderRadius: 80,

              }}
              onPress={() => { setOpneca(!openCa) }}
            />
            <Text></Text>
          </View>
          <Text style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "gray",
            textAlign: "center",
            padding: 5,
            margin: 5,
          }}>Deposit</Text

          >
          <ListItem>
            <Icon name="user-circle" type="font-awesome" size={20} />
            <ListItem.Content>
              <ListItem.Input
                textAlign='left' value={data?.length == 0 ? profile?.profile?.email : data?.email} editable={false} />
            </ListItem.Content>
            <Icon name='lock' />
            <ListItem.Chevron />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItem.Content><ListItem.Input
              value={amount != null ? (amount) : null}
              onChangeText={(val) => useAmount(val)}
              keyboardType='number-pad' textAlign="left" placeholder="enter Amount" /></ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItem.Content><ListItem.Input
              value={Discription}
              onChangeText={(val) => useDiscription(val)}

              keyboardType='default' textAlign="left" placeholder="Optional" /></ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItem.Content>
              <ListItem.Input
                editable={false}
                textAlign="left"
                value={data?.length == 0 ? profile?.profile?.username : data?.username}
              />
            </ListItem.Content>
            <Text>
              to be credited
            </Text>
            <ListItem.Chevron />
          </ListItem>
          <Divider />
          <Button
            onPress={() => { navigation.navigate('Addfund', { 'amount': amount, "discription": Discription, "key": key.key.key }), setOpneca(false) }}
            type='solid' buttonStyle={{
              backgroundColor: "darkblue",
              width: 250,
              padding: 10,
              margin: 5,
              alignSelf: "center"
            }} titleStyle={{ color: "#fff" }} title={"Deposit"} />
        </View>
      </BottomSheet>
    )
  }
  const Getdetails = async () => {
    setLoading(true)
    const itemUrL = `https://softnixx.com/api/updateD/${data.length == 0 ? profile.profile.username : data.username}/`;
    try {
      const response = await fetch(itemUrL, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `Token ${key.key.key}`,
        },
      });
      const json = await response.json();
      useData(json)
      setLoading(false)
    } catch (error) {
      showMessage({
        message: "Something went wrong!",
        type: "danger",
        position: "center",
        backgroundColor: "darkblue",
        color: "white",
        autoHide: false
      });
    } finally {
      null
    }
  }

  useEffect(() => {
    Getdetails()
  }, [])
  const onRefresh = () => {
    setLoading(true);
    Getdetails().then(() => {
      setLoading(false);
    }).catch(error => {
      Alert.alert(
        "Network Issues",
        "Kindly close try again or check your connectivity!!",
        [
          { text: "Close", style: "cancel" },

        ]
      )
    });
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.header}>
          <View>
            <Tooltip containerStyle={{
              width: 200,
              backgroundColor: "darkblue"
            }} popover={<Text style={{
              color: "white"
            }}>Account is under Limited</Text>}>
              {data.length != 0 ?
                <Avatar
                  size={30}
                  rounded
                  source={{ uri: data?.profile?.ProfilePic }}
                  icon={{
                    size: 70,
                    name: "user-circle",
                    type: "font-awesome",
                    color: "darkgray",
                  }}
                >

                </Avatar>
                :
                <Avatar

                  size={20}
                  rounded
                  icon={{
                    size: 70,
                    name: "user-circle",
                    type: "font-awesome",
                    color: "darkgray",
                  }}
                >
                </Avatar>
              }

            </Tooltip>
          </View>
          <View style={{
            paddingLeft: 10,
            paddingRight: 10,
          }}>
            <Text style={styles.text2}>Sn acc: {profile?.profile?.profile?.tract_id}</Text>
          </View>
          <View style={styles.icon4}>
            <Badge
              status='error'
              containerStyle={{ position: 'absolute', top: -4, right: -4, zIndex: 100 }}
            />
            <Icons onPress={() => {
              if (data.length == 0) {
                showMessage({
                  message: "please hold on",
                  type: "danger",
                  backgroundColor: "darkblue",
                  color: "white",
                  icon: "danger",
                  autoHide: false
                })
              }
              else {
                navigation.navigate("notification", { 'key': key.key.key })
              }
            }

            } size={40} name="bell-outline" style={styles.iconstyle} />
          </View>
        </View>

      ),
    });
  }, [navigation, data]);


  const Getgift = async () => {
    const itemUrL = `https://softnixx.com/api/giftall`;
    try {
      const response = await fetch(itemUrL, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `Token ${key.key.key}`,
        },
      });
      const json = await response.json();
      GetGift(json)
    } catch (error) {
      null
    } finally {
      null
    }
  }

  useEffect(() => {
    Getgift()
  }, [])


  return (
    <SafeAreaView style={styles.container}>   
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            colors={['yellow', 'white', "green", "red", 'pink']}
            progressViewOffset={10}
            progressBackgroundColor="darkblue"
            tintColor="darkblue"
            titleColor={"darkblue"}
            accessibilityIgnoresInvertColors={['darkblue', "darkblue"]}
          />
        }
        style={styles.container2}>

{data?.is_staff||data?.is_superuser?
          <View style={{
            alignContent:"left",
            alignSelf:"flex-start"
          }}>
          <Icon 
          onPress={()=>{
            navigation.navigate("admin")
          }}
          size={19} raised type="material" name="store" color={"darkblue"}/>
          <Text
          style={{
            color:"darkblue",
            textAlign:"center",
          }}
          >Admin</Text>
          </View>
          :null
  }

        <View style={styles.containerSoft}>
          <ListItem>
            <ListItem.Content>
              <Text>
              Account Bals:
              </Text>
            </ListItem.Content>
            <Text style={{
              color: "darkblue",
              fontWeight: "bold"
            }} onPress={() => {
              if (data.length == 0 && loading) {
              }
              else {
                navigation.navigate("reciept", { "key": key.key.key, "id": data.id })
              }
            }
            } >
              check Receipts
            </Text>
            <ListItem.Chevron />
          </ListItem>
          <ListItem>
            <Icon onPress={() => setSee(!see)} name={see ? 'eye' : 'eye-slash'} type='font-awesome' />
            <ListItem.Content>
              <Text>
                {see ? "* * * *" :
                  <Text>
                    &#8358;{loading ? MoneyConvert(optional != null ? 0.00 : 0.00) : MoneyConvert(data?.profile?.account_balance)}
                  </Text>
                }
              </Text>
            </ListItem.Content>
            <Text style={{
              color: "darkblue"
            }} onPress={() => navigation.navigate('benefit', { "point": data?.profile?.point_bonus, "username": data?.username, "key": key?.key?.key })}>
              S.P {loading ? optional != null ? 0.00 : 0.00 : Point(data?.profile?.point_bonus)}
            </Text>
            <ListItem.Chevron />
          </ListItem>
          <View style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "baseline",
            padding: 7,
            margin: 2,
          }}>
            <TouchableOpacity onPress={() => {
              if (data.length == 0) {
                showMessage({
                  message: "please hold on",
                  type: "danger",
                  backgroundColor: "darkblue",
                  color: "white",
                  icon: "danger",
                  autoHide: false
                })
              }
              else {
                setOpneca(!openCa)
              }
            }
            }>
              <View style={{
                padding: 5, margin: 5
              }}>
                <Icon
                  raised
                  name='plus'
                  borderRadius={20} style={{
                    padding: 3,
                    backgroundColor: Platform.OS === 'android' ? 'darkblue' : 'darkblue',
                    borderRadius: 40,
                  }} backgroundColor={Platform.OS === 'android' ? 'darkblue' : 'darkblue'} color="darkblue"
                  type="font-awesome" />
                <Text
                  style={{
                    fontSize: 15,
                    textAlign: "center"
                  }}
                >Deposit</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              if (data.length == 0) {
                showMessage({
                  message: "please hold on",
                  type: "danger",
                  backgroundColor: "darkblue",
                  color: "white",
                  icon: "danger",
                  autoHide: false
                })
              }
              else {
                navigation.navigate('BankTransfer', { "data": data.username, "key": key.key, "pin": data.profile.transaction_pin })
              }
            }
            }>
              <View style={{
                padding: 5, margin: 5
              }}>
                <Icon
                  name='send'
                  raised
                  borderRadius={20} style={{
                    padding: 3,
                    backgroundColor: Platform.OS === 'android' ? 'darkblue' : 'darkblue',
                    borderRadius: 40,
                  }} backgroundColor={Platform.OS === 'android' ? 'darkblue' : 'darkblue'} color="darkblue"
                  type="font-awesome" />
                <Text
                  style={{
                    fontSize: 15,
                    textAlign: "center"
                  }}
                >Inline</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              if (data.length == 0) {
                showMessage({
                  message: "please hold on",
                  type: "danger",
                  backgroundColor: "darkblue",
                  color: "white",
                  icon: "danger",
                  autoHide: false
                })
              }
              else {
                navigation.navigate('transfer', { 'datas': data.username, "key": key.key, 'bals': data.profile.account_balance, 'pin': data.profile.transaction_pin })
              }
            }
            }>
              <View style={{
                padding: 5, margin: 5
              }}>
                <Icon
                  name='minus'
                  raised
                  borderRadius={20} style={{
                    padding: 3,
                    backgroundColor: Platform.OS === 'android' ? 'darkblue' : 'darkblue',
                    borderRadius: 40,
                  }} backgroundColor={Platform.OS === 'android' ? 'darkblue' : 'darkblue'} color="darkblue"
                  type="font-awesome" />
                <Text
                  style={{
                    fontSize: 15,
                    textAlign: "center"
                  }}
                >Withdraw</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              if (data.length == 0 && loading) {
                showMessage({
                  message: "please hold on",
                  type: "danger",
                  backgroundColor: "darkblue",
                  color: "white",
                  icon: "danger",
                  autoHide: false
                })
              }
              else {
                navigation.navigate("reciept", { "key": key.key.key, "id": data.id })
              }
            }

            }>
              <View style={{
                padding: 5, margin: 5
              }}>
                <Icon
                  raised
                  name='history'
                  borderRadius={20} style={{
                    padding: 3,
                    backgroundColor: Platform.OS === 'android' ? 'darkblue' : 'darkblue',
                    borderRadius: 40,
                  }} backgroundColor={Platform.OS === 'android' ? 'darkblue' : 'darkblue'} color="darkblue"
                  type="font-awesome" />
                <Text
                  style={{
                    fontSize: 15,
                    textAlign: "center"
                  }}
                >History</Text>
              </View>
            </TouchableOpacity>
            <View style={{
              padding: 5, margin: 5
            }}>


            </View>
          </View>
        </View>
        {Platform.OS == "android" ? <Divider /> : <Divider />}
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ width: width * 0.98 }}
          scrollEventThrottle={16}
          onScrollEndDrag={onScrollEnd}
          onMomentumScrollEnd={onScrollEnd}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
        >
          <Animated.View
            style={{
              transform: [{ translateX: translateXInterpolate }],
            }}
          >
            <Text style={{
              fontSize: 17,
              fontWeight: "normal",
              color: '#0A1172'
            }}><Icon name="bullhorn" color={"brown"} type={'font-awesome'} size={12} />  Use sftnw to get free Airtime terms and condictions applied </Text>
          </Animated.View>
        </Animated.ScrollView>

        <Text style={{ fontSize: 20, padding: 5, margin: 5, textAlign: "center" }}>Quick Access</Text>
        <View style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "center",

        }}>
          <Icon
            name='phone'
            raised
            borderRadius={20} style={{
              padding: 3,
              backgroundColor: Platform.OS === 'android' ? 'darkblue' : 'darkblue',
              borderRadius: 40,
            }} backgroundColor={Platform.OS === 'android' ? 'darkblue' : 'darkblue'} color="green"
            type="font-awesome"
            onPress={() => {
              if (data.length == 0) {
                showMessage({
                  message: "please hold on",
                  type: "danger",
                  backgroundColor: "darkblue",
                  color: "white",
                  icon: "danger",
                  autoHide: false
                })
              }
              else {
                navigation.navigate("airtime", { "key": key.key.key, "username": data.username, "phone": data.profile.phone_number })
              }
            }}
          />


          <Icon name="wifi"
            raised
            borderRadius={20} style={{
              padding: 3,
              backgroundColor: Platform.OS === 'android' ? 'darkblue' : 'darkblue',
              borderRadius: 40,
            }} backgroundColor={Platform.OS === 'android' ? 'darkblue' : 'darkblue'} color="darkred"
            type="font-awesome"
            onPress={() => {
              if (data.length == 0) {
                showMessage({
                  message: "please hold on",
                  type: "danger",
                  backgroundColor: "darkblue",
                  color: "white",
                  icon: "danger",
                  autoHide: false
                })
              }
              else {
                navigation.navigate("data", {
                  "key": key.key.key, "username": data.username, "phone": data.profile.phone_number
                })
              }

            }}
          />

          <Icon
            name="tv"
            raised
            borderRadius={20} style={{
              padding: 3,
              backgroundColor: Platform.OS === 'android' ? 'darkblue' : 'darkblue',
              borderRadius: 40,
            }} backgroundColor={Platform.OS === 'android' ? 'darkblue' : 'darkblue'} color="gray"
            type="font-awesome"
            onPress={() => {
              if (data.length == 0) {
                showMessage({
                  message: "please hold on",
                  type: "danger",
                  backgroundColor: "darkblue",
                  color: "white",
                  icon: "danger",
                  autoHide: false
                })
              }
              else {
                navigation.navigate("tvs", { "key": key.key.key, "username": data.username, "phone": data.profile.phone_number })
              }
            }
            }

          />

          <Icon
            name="school-outline"
            raised
            borderRadius={20} style={{
              padding: 3,
              backgroundColor: Platform.OS === 'android' ? 'darkblue' : 'darkblue',
              borderRadius: 40,
            }} backgroundColor={Platform.OS === 'android' ? 'darkblue' : 'darkblue'} color="darkblue"
            type="material-community"
            onPress={() => {
              if (data.length == 0) {
                showMessage({
                  message: "please hold on",
                  type: "danger",
                  backgroundColor: "darkblue",
                  color: "white",
                  icon: "danger",
                  autoHide: false
                })
              }
              else {
                navigation.navigate("education", { "key": key.key.key, "username": data.username, "phone": data.profile.phone_number })
              }
            }
            }

          />


        </View>

        <View style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}>

          <ListItem
            onPress={() => {
              if (data.length == 0) {
                showMessage({
                  message: "please hold on",
                  type: "danger",
                  backgroundColor: "darkblue",
                  color: "white",
                  icon: "danger",
                  autoHide: false
                })
              }
              else {
                navigation.navigate("allpage", { "key": key.key.key, "username": data.username, "phone": data.profile.phone_number })
              }
            }}
            bottomDivider>
            <Text>
              More
            </Text>
            <ListItem.Content>
            </ListItem.Content>
            <Text style={{
              color: "darkblue",
              fontSize: 17,
              fontWeight: "bold",
            }}>Service</Text>
            <ListItem.Chevron />
          </ListItem>
        </View>

        <Text style={{ fontSize: 20, padding: 5, margin: 5, textAlign: 'center' }}>
          Free gifts <Badge status="primary" badgeStyle={{
            backgroundColor: "darkblue"
          }} value={'t/c applied'} />
        </Text>
        <FlatList
          horizontal
          data={gift}
          ListEmptyComponent={() => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{
                textAlign: "center",
                justifyContent: "center",
                alignSelf: "center"
              }}>Empty list component</Text>
            </View>
          )}

          renderItem={({ item }) => (
            <View style={{ margin: 10 }}>
            <GiftClaimComponent item={item} onClaimPress={() => handleOpenGift(item)} />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
      <GetItemLoaded />
      <GiftManagement contrr={contr} useContl={setContr} 
      methodP={handleGetGift}
      loading ={loadingG}

      />
    </SafeAreaView>

  );
}
const styles = StyleSheet.create({
  mygreat: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    padding: 5,
    margin: 5,
  },
  buttonStyle6: {
    margin: 5,
    padding: 5,
    borderRadius: 5,
  },
  buttonStyle7: {
    backgroundColor: null,

  },
  container4: {
    padding: 5,
    margin: 5,
    width: width * 0.8,
    height: height * 0.5,
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 9,
  }
  ,
  horizontal: {
    padding: 2
  },
  capacity2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 2,
    margin: 1,
  },
  buttonStyle2: {
    backgroundColor: null,

  },
  buttonStyle8: {
    backgroundColor: "white",
  },
  butttext: {
    color: "#111",
    fontWeight: "bold",
  },
  softnixxhBal: {
    fontSize: 30,
    margin: 3,
    padding: 3,
    color: "#111",
    fontWeight: "bold"
  },

  softnixxhT: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#111",
  },
  containerSoft: {
    padding: 5,
    margin: 5,
    ...Platform.select({
      ios: {
        shadowColor: "#333",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        backgroundColor: "#fff",
      },
      android: {
        elavtion: 8,
        shadowColor: "0000",
      }

    })

  },
  softnixxh: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 1,
    padding: 1,
  },
  buttonStyle: {
    backgroundColor: "white",
    padding: 5,
    margin: 5,
  },
  titleStyle: {
    color: "black",
    fontSize: 16,
  },
  iconstyle: {
    color: "darkblue",
    fontSize: 20,

  },
  uper: {
    position: "absolute",
    top: 0,
    fontSize: 15,
    color: "red",
    fontWeight: "bold",
    zIndex: 1,
    backgroundColor: "lightgray",
    borderRadius: 90,
  },
  icon4: {
    backgroundColor: "lightgray",
    borderWidth: 4,
    borderRadius: 40,
    borderColor: "lightgray"
  },
  text1: {
    color: "#333",
    fontSize: 10
  },
  text2: {
    color: "#111",
    fontSize: 18,
    padding: 5,
  },
  icon2: {
    backgroundColor: "lightgreen",
    borderWidth: 4,
    borderRadius: 40,
    borderColor: "lightgray"
  },
  icon1: {

    color: "white",
  },
  container2: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",

  },
  usernameText: {
    fontWeight: "bold",
    fontSize: 12,
  },
  promoContainer: {
    marginTop: 10,
    backgroundColor: "#4f9d9d",
    padding: 10,
    borderRadius: 10,
    width: width * 0.98,
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center"

  },
  promoText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
    textAlign: "center"
  },
  marquee: {
    color: "#0A1172",
    padding: 2,
    fontSize: 10,
    fontWeight: "800"
  }
});




