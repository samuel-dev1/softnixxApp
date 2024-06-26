import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import {SafeAreaView, Text, View, Dimensions, ActivityIndicator, ScrollView, Linking, Alert } from "react-native";
import {  Button, Divider, Icon, ListItem, Overlay, Tile, Tooltip, Image} from "react-native-elements";
import DisplayPicture from "../extra/displayCom";
import { Slider } from 'react-native-elements';
const { width, height } = Dimensions.get('window')


export default function DisplayScreen({ route, navigation }) {
    const { item } = route.params
    const [data, setData] = React.useState([])
    const [loading, setloading] = React.useState(true)

    const [value, setValue] = React.useState(0)
    const [show, useshow] = React.useState(false)
    const sendWhatsAppMessage = (datas) => {
        const phoneNumber = data.user.profile.phone_number
        const NewNumber = "234" + phoneNumber
        const message = "is this product available? "+datas;
        const whatsappURL = `whatsapp://send?phone=${NewNumber}&text=${encodeURIComponent(message)}`;
        Linking.canOpenURL(whatsappURL).then(supported => {
            if (supported) {
                return Linking.openURL(whatsappURL);
            } else {
                Alert.alert("WhatsApp is not installed on the device");
            }
        }).catch(error => Alert.alert('An error occurred', error));
    }

    const makePhoneCall = () => {

        const phoneCallURL = `tel:${data.user.profile.phone_number}`;

        Linking.openURL(phoneCallURL)
            .catch(error => Alert.alert('An error occurred', error));
    }


    const time = (time) => {
        date = new Date(time)
        return { "year": date.getFullYear(), "month": date.toLocaleString('en-US', { month: 'long' }), "day": date.getDate(), "time": date.getHours(), "sec": date.getMinutes(), "hous": date.getHours >= 12 ? "PM" : "AM" }

    }
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

    const toggleBottomSheet = () => {
        setIsBottomSheetVisible(!isBottomSheetVisible);
    };


    const truncatedString = (str, length) => {
        if (str.length <= length) {
            return str;
        }
        else {
            return str.slice(0, 10) + '....';
        }
    }

    const proDuctDetails = async () => {
        const itemUrL = `http://softnixx.com/api/details/${item}/`;
        try {
            const response = await fetch(itemUrL);
            const json = await response.json();
            setData(json);
            setloading(true);
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
                    onPress={() => {
                        fetch("https://softnixx.com/api/likes/", {
                            method: "POST",
                            body: JSON.stringify({
                                user: data.user.id,
                                post: data.id,
                                user_n: data.user.username
                            })
                        }).then(() => proDuctDetails())
                            .catch((e) =>null)
                    }}
                    titleStyle={{

                       color:"red",
                        fontSize: 17,
                    }}
                    title={data.length == 0 ? 0 : data.likes.length}

                    buttonStyle={{
backgroundColor:null
                    }} icon={{ color: 'darkblue', name: "heart", type: "font-awesome" }} />
                <Icon onPress={() => makePhoneCall()} name="phone" type="font-awesome" color={"green"} />
                <Icon onPress={() => sendWhatsAppMessage(item.feeds)} name="whatsapp" type="font-awesome" color={"lightgreen"} />
            </View>
           
        </SafeAreaView>
    )
}




