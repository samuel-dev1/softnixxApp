import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect } from "react";
import {SafeAreaView, Text, View,  ActivityIndicator, ScrollView, Linking, Alert } from "react-native";
import {  Button, Divider, Icon, ListItem,  Tooltip} from "react-native-elements";

import DisplayPicture from "../extra/displayCom";


export default function DisplayScreen({ route, navigation }) {
    const { item } = route.params
    const [data, setData] = React.useState([])
    const [loading, setloading] = React.useState(true)

    const [value, setValue] = React.useState(0)
    
    const sendWhatsAppMessage = () => {
        try{
        const phoneNumber = data.user.profile.phone_number
        const NewNumber = "234" + phoneNumber
        const whatsappURL = `whatsapp://send?phone=${NewNumber}`;
        Linking.canOpenURL(whatsappURL).then(supported => {
            if (supported) {
                return Linking.openURL(whatsappURL);
            } else {
                Alert.alert("WhatsApp is not installed on the device");
            }
        }).catch(error => Alert.alert('An error occurred', error));
    }
    catch{
        Alert.alert("something went wrong")
    }
    }

    const makePhoneCall = () => {

        const phoneCallURL = `tel:${data?.user?.profile?.phone_number}`;

        Linking.openURL(phoneCallURL)
            .catch(error => Alert.alert('An error occurred', error));
    }

    const truncatedString = (str, length) => {
        if (str.length <= length) {
            return str;
        }
        else {
            return str.slice(0, 10) + '....';
        }
    }

    const proDuctDetails = async () => {
        setloading(true)
        const itemUrL = `http://softnixx.com/api/details/${item}/`;
        try {
            const response = await fetch(itemUrL);
            const json = await response.json();
            setData(json);
        } catch (error) {
            null
        } finally {
            setloading(false)
        }
    }
    useEffect(() => {
        proDuctDetails();
    }, []);



    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>{data.length == 0 ? <ActivityIndicator /> : null}

                        <Text style={{ color: 'gray' }}>{data.length == 0 ? 'please wait...' : truncatedString(data?.feeds, 18)}</Text></View>
                </View>

            ),
        });
    }, [navigation, data]);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView>
                <DisplayPicture image={data?.image} />
                <View>
                    <Text style={{ textAlign: "center", fontSize: 30, fontWeight: "bold", includeFontPadding: true, color: "lightgray", padding: 5, margin: 3 }}>Discriptions</Text>
                    <Divider />
                    <ListItem containerStyle={{ backgroundColor: null }}>
                        <Tooltip containerStyle={{
                            height: 100,
                            width: 200,
                        }} pointerColor={'lightgray'} popover={<Text style={{ color: "#fff" }}>Need help on this product? contact admin <Icon name="comments" type="font-awesome" color={"lightgreen"} /></Text>} >
                            <Icon raised size={10} name="info-circle" type="font-awesome" color={"lightgray"} />
                        </Tooltip>
                        <ListItem.Content>
                           
                                <Text style={{
                                    textAlign: "justify",
                                    color: "#111",
                                }}>{data.feeds}</Text>
                            
                        </ListItem.Content>
                    </ListItem>
                </View>
               
                <Text>IRT On this: {value}</Text>
            </ScrollView>
            <Divider />
            <View style={{
                padding: 5,
                margin: 5,
                display: "flex",
                flexDirection: 'row',
                justifyContent: "space-around",
            }}>
                <Button
                disabled
                    onPress={() => {
                        fetch("https://softnixx.com/api/likes/", {
                            method: "POST",
                            body: JSON.stringify({
                                user: data?.user?.id,
                                post: data?.id,
                                user_n: data?.user?.username
                            })
                        }).then(() => proDuctDetails())
                            .catch((e) =>null)
                    }}
                    titleStyle={{
                       color:"red",
                        fontSize: 17,
                    }}
                    title={data.length == 0 ? 0 : data?.likes?.length}
                    buttonStyle={{
backgroundColor:null
                    }} icon={{ color: 'darkblue', name: "heart", type: "font-awesome" }} />
                <Icon onPress={() => makePhoneCall()} name="phone" type="font-awesome" color={"green"} />
                <Icon onPress={() => sendWhatsAppMessage()} name="whatsapp" type="font-awesome" color={"lightgreen"} />
            </View>
           
        </SafeAreaView>
    )
}




