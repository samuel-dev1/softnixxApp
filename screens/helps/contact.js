import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Dimensions, TouchableOpacity, Alert, FlatList, Linking, ActivityIndicator } from "react-native";
import { Button, ListItem, Input, Icon, Tooltip, Badge, SocialIcon } from "react-native-elements";
import Icons from '@expo/vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from "@react-navigation/native";

import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8806729694496674/9982521906';

const { height, width } = Dimensions.get('window');


export default function Contact({ route, navigation }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [datas, setDatas] = useState(null);

    const proDuctDetails = async () => {
        const itemUrl = 'https://softnixx.com/api/messages/';
        try {
            const response = await fetch(itemUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Token ${route.params.key.key}`,
                },
            });
            const json = await response.json();
            setData(json);
        } catch (error) {
            
        } finally {
            setLoading(false);
        }
    };
    useFocusEffect(
        () => {
            proDuctDetails();
        }
    )
    const Getdetails = async () => {
        setLoading(true);
        const itemUrl = `https://softnixx.com/api/updateD/${route.params.profile.username}/`;
        try {
            const response = await fetch(itemUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Token ${route.params.key.key}`,
                },
            });
            const json = await response.json();
            setDatas(json);
        } catch (error) {
            setLoading(false);
            Alert.alert(
                "Network Error",
                "network error! check your network and try again",
                [
                    { text: "Cancel", style: "cancel" },
                    { text: "Try again", onPress: () => Getdetails() },
                ]
            );
        }
    };
    useEffect(() => {
        Getdetails();
    }, []);


    
const sendWhatsAppMessage = () => {        
        const NewNumber = +2349061229992
        const message ="hi from softnixx";
        const whatsappURL = `whatsapp://send?phone=${NewNumber}&text=${encodeURIComponent(message)}`;
        Linking.canOpenURL(whatsappURL).then(supported => {
            if (supported) {
                return Linking.openURL(whatsappURL);
            } else {
                Alert.alert("WhatsApp is not installed on the device");
            }
        }).catch(error => Alert.alert('An error occurred', error));
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <View>
                    <Tooltip containerStyle={{
                        height: height * 0.3,
                        width: width * 0.4,
                        backgroundColor: "darkblue",
                    }} popover={<Text style={{
                        color: "#fff",
                        textAlign: "auto",
                        fontSize: 16,
                    }}>
                        1. Adhere to the uses of Words english?
                        2. Report any form agent to us
                    </Text>}>
                        <Text style={{ color: "darkblue", fontSize: 25, fontWeight: "bold", padding: 3, margin: 0, marginTop: 10, marginLeft: 20 }}>
                            Rules <Icon name="gavel" color={"darkblue"} size={30} type="font-awesome" />
                        </Text>
                    </Tooltip>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: 5, margin: 5, marginTop: 0, paddingTop: 0, marginBottom: 0, borderRadius: 10 }}>
                        <Button
                            onPress={() => Linking.openURL('mailto:softtellex@example.com')}
                            buttonStyle={{ backgroundColor: "transparent" }}
                            titleStyle={{ color: "darkgray", fontWeight: "bold" }}
                            title={"Report"}
                            iconLeft={true}
                            icon={() => <Icons name='heart-circle' size={25} color={"darkgreen"} />}
                        />
                        <Text style={{ color: "darkgray", fontSize: 19, fontWeight: "bold" }}>hey! <Text style={{ color: "darkblue", fontSize: 16 }}>{datas?.username?.toUpperCase()}</Text></Text>
                        <Button

                            buttonStyle={{ backgroundColor: "transparent" }}
                            titleStyle={{ color: "darkgray", fontWeight: "bold" }}
                            iconLeft={true}
                            onPress={() =>
                                Alert.alert("System", "Disabled function", [{ "text": "close" }])}
                            icon={() => <Icons name='account-cog' size={25} color={"darkblue"} />}
                        />
                    </View>

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={
                            <View>
                                <View style={{ paddingVertical: 5, paddingHorizontal: 5 }}>
                                    <Text style={{ fontSize: 30, fontWeight: "bold", color: "darkblue" }}>Chats</Text>
                                    <Input placeholder="Search messages" clearButtonMode="while-editing" mode="outlined" style={{ width: width }} outlineStyle={{ borderRadius: 15 }} />
                                </View>
                            </View>
                        }
                        data={data}
                        ListEmptyComponent={
                            <View>
                                <Button

                                   
                                    onPress={()=>Alert.alert("App info?","please use other methods")}
                                    buttonStyle={{
                                        backgroundColor: "darkblue",
                                        borderRadius: 5,
                                        width: 250,
                                        alignSelf: "center",
                                        padding: 10,

                                    }}
                                    title={"Chat with Agent"} icon={{ name: "user-secret", color: "lightgray", size: 50, type: "font-awesome" }} />
                            </View>
                        }
                        renderItem={({ item }) => (
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        fetch("https://softnixx.com/api/messages/", {
                                            method: "POST",
                                            body: JSON.stringify({
                                                'item': item.uuid
                                            })
                                        })
                                            .then(response => {
                                                proDuctDetails()
                                            })
                                            .then(res => {
                                                navigation.navigate("chats", { datas: datas, key: route.params.key.key, item: item.uuid, client: item.client, agent: item.angent.username })
                                            })
                                            .catch(error => {
                                                null
                                            })
                                    }}
                                >
                                    <ListItem bottomDivider containerStyle={{ backgroundColor: "transparent", padding: 10, justifyContent: "space-around" }} >
                                        <Icon size={40} name="chat" type="material-community" color={'darkblue'} />
                                        <ListItem.Content>
                                            <ListItem.Title>
                                                {datas.is_staff ? `Customer ${item.id}` :
                                                    <Text>Softtellex Agent</Text>}
                                            </ListItem.Title>
                                        </ListItem.Content>
                                        <Text>
                                            {item.roomNotification == "seen" || item.client === datas.username ? 'to chat' : 'new message'}
                                            <Badge containerStyle={{ marginLeft: 10 }} status={item.roomNotification == "seen" || item.client === datas.username ? 'success' : 'error'} />
                                        </Text>
                                        <ListItem.Chevron />
                                    </ListItem>
                                </TouchableOpacity>

 
                            </View>
                        )}
                    />
                    <Text style={{
                        textAlign: "center",
                        fontSize: 18,
                        marginTop: 10,
                        color: "darkgray"
                    }}>Options</Text>
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: 30,
                        alignContent: "center",
                        justifyContent: "center"
                    }}>
                        <SocialIcon
                        onPress={()=>Alert.alert("admin", "disable function")}
                            type="facebook"
                            iconColor="white"
                        />
                        <SocialIcon
                        onPress={()=>Linking.openURL('mailto:softtellex@example.com')}
                            type="envelope"
                            iconColor="white"
                        />
                        <SocialIcon
                        onPress={sendWhatsAppMessage}
                            type="whatsapp"
                            iconColor="white"
                        />
                    </View>
                </View>
<View style={{
    padding:5,
    margin:5,
    alignSelf:"center",
}}>
<BannerAd
        unitId={adUnitId}
        size={BannerAdSize.LARGE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />

</View>
        </SafeAreaView>
    );
}