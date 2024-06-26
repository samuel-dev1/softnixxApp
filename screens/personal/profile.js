

import React from "react";
import { useLayoutEffect } from "react";
import { View, Text, Alert, SafeAreaView, ScrollView } from "react-native";
import { Avatar, Divider, Icon, ListItem, Overlay ,Tooltip } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";

import { showMessage } from "react-native-flash-message";


export default function Profile({ route, navigation }) {
    const profile = route.params
    const [loading, setLoading] = React.useState(true)
    const [data, setData] = React.useState([])
    const [username, setsername] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [lastName, setLastname] = React.useState('')
    const [firstName, setFirstname] = React.useState('')

    const proDuctDetails = async () => {
        const itemUrL = `https://softnixx.com/api/updateD/${profile?.profile?.profile?.username}/`;
        try {
            const response = await fetch(itemUrL, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Token ${profile.profile.key.key}`,
                },
            });
            const json = await response.json();
            setData(json)
            setLoading(false)
        } catch (error) {
            Alert.alert(
                "Network Issues",
                "Kindly close try again or check your connectivity!!",
                [
                    { text: "Cancel", style: "cancel", onPress: () => { navigation.goBack(), setLoading(false) } },


                ]
            )
        } finally {
            null

        }
    }


    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View>
                    <Text>Profile Editing</Text>
                </View>

            ),
        });
    }, [navigation]);


    useFocusEffect(() => {

        proDuctDetails();
    });


    const UpdateProfile = async () => {
        setLoading(true)
        const response = await fetch('https://softnixx.com/api/update/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                key: profile.profile.key.key,
                id: profile.profile.profile.id,
                username: username,
                phone: phone,
                firstName: firstName,
                lastName: lastName,
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'exits') {
                    showMessage({
                        message: `Username already taken`,
                        type: "danger",
                        backgroundColor: "darkblue",
                        color: "white",
                    })
                    setLoading(false)
                }
                else if (data.status === "empty") {
                    setLoading(false)
                    showMessage({
                        message: "Username character not up to 5",
                        backgroundColor: "darkblue",
                        color: "white",
                    })
                    setLoading(false)
                }

                else if (data.status === "success") {

                    showMessage({
                        message: `Updated succesfully your info will reflex in next login`,
                        type: "info",
                        backgroundColor: "darkblue",
                        color: "white",
                    })
                    setsername('')
                    setFirstname('')
                    setLastname('')
                    setPhone('')
                    setLoading(false)
                }
                else if (data.status === "failed") {

                    showMessage({
                        message: `Error Authentication failed`,
                        type: "danger", backgroundColor: "darkblue",
                        color: "white",
                    })
                    setLoading(false)

                }
                else if (data.status === "error") {

                    showMessage({
                        message: `Server error`,
                        type: "danger",
                        backgroundColor: "darkblue",
                        color: "white",
                    })
                    setLoading(false)
                }

                else if (data.status === "sucessN") {

                    showMessage({
                        message: `Number ${phone} not up 11`,
                        type: "danger",
                        backgroundColor: "darkblue",
                        color: "white",
                    })
                    setLoading(false)
                }


                else {

                    showMessage({
                        message: `Server Error try again`,
                        type: "danger",
                        backgroundColor: "darkblue",
                        color: "white",
                    })
                    setLoading(false)
                }

            }

            )

    }
    return (
        <SafeAreaView style={{ backgroundColor: "white" }}>
                <ScrollView style={{ backgroundColor: "white" }}>
                    <ListItem bottomDivider>
                        <Tooltip containerStyle={{ width: 200, height: 200 }} popover={<Text style={{ color: "#fff" }}><Text h4 h3Style={{ color: "#111" }}><Icon name="user-circle" color={"white"} type="font-awesome" />Softnixx </Text>To update the required parameters kindly send a message to admin.</Text>} ><Avatar icon={{ name: 'envelope', type: "font-awesome", size: 30, color: "darkgray" }} /></Tooltip>
                        <ListItem.Content>
                            <Text style={{ color: "red" }}>
                                Admin
                            </Text>
                        </ListItem.Content>

                    </ListItem>
                    <Divider />

                    <Text h4 h4Style={{ color: "#111", textAlign: "center", alignSelf: "center", fontSize: 17, paddingTop: 10 }}>Edi Your Details Below</Text>
                    <ListItem bottomDivider>
                        <Avatar icon={{ name: 'user-circle', type: "font-awesome", size: 30, color: "darkgray" }} />
                        <ListItem.Content>
                            <Text>
                                {loading ? null : data?.first_name.toUpperCase()}
                            </Text>
                            <ListItem.Input
                                editable={!loading}
                                value={firstName}
                                onChangeText={val => setFirstname(val)}
                                onEndEditing={UpdateProfile}
                                placeholder="edit firstname" rightIcon={<Icon
                                    name='edit'
                                    size={24}
                                    color='black'
                                    type="font-awesome"
                                />} textAlign="left" style={{ padding: 10, marginTop: 15 }} />

                        </ListItem.Content>
                    </ListItem>
                    <ListItem bottomDivider>
                        <Avatar icon={{ name: 'user-circle', type: "font-awesome", size: 30, color: "darkgray" }} />
                        <ListItem.Content>
                            <Text>
                                {loading ? null : data?.last_name.toUpperCase()}
                            </Text>
                            <ListItem.Input
                                value={lastName}
                                onChangeText={val => setLastname(val)}
                                onEndEditing={UpdateProfile}
                                editable={!loading} placeholder="edit lastname" rightIcon={<Icon
                                    name='edit'
                                    size={24}
                                    color='black'
                                    type="font-awesome"
                                />} textAlign="left" style={{ padding: 10, marginTop: 15 }} />
                        </ListItem.Content>
                    </ListItem>

                    <ListItem bottomDivider>

                        <Avatar icon={{ name: 'user-circle', type: "font-awesome", size: 30, color: "darkgray" }} />
                        <ListItem.Content>
                            <Text>
                                {loading ? null : data?.username.toUpperCase()}
                            </Text>
                            <ListItem.Input
                                value={username}
                                onChangeText={val => setsername(val)}
                                onEndEditing={UpdateProfile}
                                editable={!loading}
                                placeholder="edit username" rightIcon={<Icon
                                    name='edit'
                                    size={24}
                                    color='black'
                                    type="font-awesome"
                                />} textAlign="left" style={{ padding: 10, marginTop: 15 }} />

                        </ListItem.Content>
                    </ListItem>
                    <ListItem bottomDivider>

                        <Avatar icon={{ name: 'phone', type: "font-awesome", size: 30, color: "darkgray" }} />
                        <ListItem.Content>
                            <Text>
                                {loading ? null : data.profile.phone_number}
                            </Text>
                            <ListItem.Input
                                value={phone}
                                onChangeText={val => setPhone(val)}
                                onEndEditing={UpdateProfile}
                                editable={!loading}
                                placeholder="edit phone number" rightIcon={<Icon
                                    name='edit'
                                    size={24}
                                    color='black'
                                    type="font-awesome"
                                />} textAlign="left" style={{ padding: 10, marginTop: 15 }} />

                        </ListItem.Content>
                    </ListItem>
                    <Text h4 h4Style={{ color: "#111", textAlign: "center", alignSelf: "center", fontSize: 17, paddingTop: 10 }}>Security</Text>
                    <ListItem bottomDivider>

                        <Avatar icon={{ name: 'envelope', type: "font-awesome", size: 30, color: "darkgray" }} />
                        <ListItem.Content>
                            <Text>
                                {loading ? null : data.email}
                            </Text>
                            <ListItem.Input

                                placeholder="email" editable={false} rightIcon={<Icon
                                    name='check-circle'
                                    size={24}
                                    color='lightgreen'
                                    type="font-awesome"
                                />} textAlign="left" style={{ padding: 10, marginTop: 15 }} />


                        </ListItem.Content>
                    </ListItem>
                    <ListItem bottomDivider onPress={() => navigation.navigate("passwordreset")}>

                        <Avatar icon={{ name: 'key', type: "font-awesome", size: 30, color: "darkgray" }} />
                        <ListItem.Content>
                            <Text>
                                Password
                            </Text>

                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>

                    <Text h4 h4Style={{ color: "#111", textAlign: "center", alignSelf: "center", fontSize: 17, paddingTop: 10 }}>Pin and Account</Text>
                    <ListItem bottomDivider onPress={() => navigation.navigate('Change transaction pin', { 'profile': profile })}>
                        <ListItem.Content>
                            <Text>
                                Transaction Pin
                            </Text>

                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                    <ListItem onPress={() => Alert.alert("App info?", "Can't pefrom operation now check back!.")} bottomDivider>
                        <Avatar icon={{ name: 'remove', type: "font-awesome", size: 30, color: "red" }} />

                        <ListItem.Content>
                            <Text>
                                Delete Account!
                            </Text>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>

                    <View>
                    </View>
                </ScrollView>
            

        </SafeAreaView>

    )
}