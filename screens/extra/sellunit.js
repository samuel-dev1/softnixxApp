import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { SafeAreaView,Platform, View, StyleSheet, FlatList, ActivityIndicator, Dimensions, Linking, Alert, Animated, TouchableOpacity, RefreshControl , Text} from "react-native";
import { Badge, Icon, ListItem, SearchBar, Accessory, Divider, Image, Button, Overlay } from "react-native-elements";
import { Avatar } from "react-native-elements";
import { showMessage } from "react-native-flash-message";
import axios from "axios";

const { width, height } = Dimensions.get('window')
export default function Extra({ route, navigation }) {
    const key = route.params
    const profile = route.params
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [searchloading, setSearchLo] = useState(false)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1);
    const [data2, setData2] = useState([]);
    const [previousData, setPreviousData] = useState([]);
    const [animating, setAnimating] = useState(new Animated.Value(0));

    const pressHandle = () => {
        Animated.spring(animating, {
            toValue: 0.2,
            useNativeDriver: false,
            speed: 100000,
        }).start(() => setAnimating(new Animated.Value(0)));
    }
    const animatedStyle = {
        transform: [{
            scale: animating.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.1],
            })
        }]
    }
    function MoneyConvert(num) {
        try {
            return num?.toLocaleString(); 
        }
        catch {
            return 0.0
        }
    }
    const Getdetails = async () => {
        const itemUrL = `https://softnixx.com/api/updateD/${profile.profile.username}/`;
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
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }
    useFocusEffect(() => {
        Getdetails()
    })

    const renderFooter = () => {
        if (!loading) return null;
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    };


    const time = (time) => {
        date = new Date(time)
        return { "year": date.getFullYear(), "month": date.toLocaleString('en-US', { month: 'long' }), "day": date.getDate(), "time": date.getHours(), "sec": date.getMinutes(), "hous": date.getHours >= 12 ? "PM" : "AM" }

    }

    const truncatedString = (str, length) => {
        if (str.length <= length) {
            return str;
        }
        else {
            return str.slice(0, 10) + '....';
        }
    }

    const searchP = () => {
        setSearchLo(true)
        const url = `https://softnixx.com/list/?search=${search.trim()}`

        try {
            fetch(url)
                .then(response => response.json())
                .then(data => setData2(data))
                .catch(error => showMessage({
                    message: `something went wrong! ${error}`,
                    type: "error",
                    floating: true,
                    position: "center",
                    backgroundColor: "darkblue",
                    color: "white",
                })).then(() => setSearchLo(false));
        }
        catch {
            null
        }
    }
    const proDuct = async () => {
        setLoading(true); // Start loading
        try {
            const response = await fetch("https://softnixx.com/api/product", {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Token ${key.key.key}`,
                },
            });
            const json = await response.json();
            
            setData2(prevPosts => [...prevPosts, ...json]);
            setPage(prevPage => prevPage + 1);
            if (!isEqual(json, previousData)) {
                setPreviousData(json);
            }
        } catch (error) {
            null
        } finally {
            setLoading(false);
        }
    };



    React.useEffect(() => {
            proDuct()
    }, []);

    function formatDate(dateString) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        // Create a Date object from the input string
        const date = new Date(dateString);

        // Extract day, month, and year components
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        // Construct the formatted date string
        const formattedDate = `${day} ${month} ${year}`;

        return formattedDate;
    }
    const sendWhatsAppMessage = (phone_number) => {
        try {
          const phoneNumber = phone_number?.toString().replace(/^0/, ''); 
          const NewNumber = "234" + phoneNumber;
          const whatsappURL = `whatsapp://send?phone=${NewNumber}`;
      
          Linking.canOpenURL(whatsappURL).then(supported => {
            if (supported) {
              return Linking.openURL(whatsappURL);
            } else {
              Alert.alert("WhatsApp is not installed on the device");
            }
          }).catch(error => {
            Alert.alert('An error occurred', error.message);
          });
        } catch (error) {
          Alert.alert("Something went wrong!", error.message);
        }
      };

    const makePhoneCall = () => {
        const phoneCallURL = `tel:${data.profile.phone_number}`;

        Linking.openURL(phoneCallURL)
            .catch(error => Alert.alert('An error occurred', error));
    }
    function Color(data) {
        if (data.includes(profile.profile.id)) {
            return "red";
        }
        else {

            return "darkgray";
        }

    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={style.header}>
                <ListItem topDivider>

                    {data?.profile?.ProfilePic ?
                        <Avatar
                            size={30}
                            rounded
                            source={{ uri: data?.profile.ProfilePic }}
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

                            size={90}
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
                    <ListItem.Content>
                        <Text style={{ color: "darkblue" }}>{loading ? null : data?.username?.toUpperCase()}</Text>
                        <Text>bals: {loading ? null : MoneyConvert(data?.profile?.account_balance)}</Text>
                    </ListItem.Content>
                    <Icon onPress={() => navigation.navigate('Gift')} name='gift' type='font-awesome' color={"red"} size={30} />
                </ListItem>
                <SearchBar
                    value={search}
                    keyboardType={"web-search"}
                    onChangeText={val => setSearch(val)}
                    showLoading={searchloading}
                    label={searchloading ? `matching ${search} on the server` : null}
                    onEndEditing={searchP}
                    theme={false}
                    searchIcon={{ name: "search", type: "font-awesome" }}
                    round={true}
                    containerStyle={{
                        backgroundColor: '#fff',
                        borderBottomWidth: 0,
                        borderTopWidth: 0,
                        borderLeftWidth: 0,
                        borderRightWidth: 0,
                        borderRadius: 0,
                        padding: 2,
                    }}
                    inputContainerStyle={{
                        backgroundColor: "#fafafa",
                        shadowColor: "#000",
                        shadowRadius: 10,
                        shadowOpacity: 0.1,
                        borderBottomWidth: 0.5, // Remove bottom border
                        borderTopWidth: 0.5,    // Remove top border
                        borderLeftWidth: 0.5,   // Remove left border
                        borderRightWidth: 0.5,  // Remove right border
                        borderRadius: 10,
                        padding: 2
                    }}
                />
            </View>
            <FlatList
                data={data2}
                keyExtractor={(item, index) => index.toString()}
                onRefresh={proDuct}
                refreshing={loading}
                onEndReachedThreshold={0.1}
                onEndReached={proDuct}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={7}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={proDuct}
                        colors={['#0000ff', "#0982", "#000B"]}
                    />
                }

                ListHeaderComponent={
                    <View>
                        {searchloading != true && search == '' ? <View style={style.styheaderOv}>
                        </View> :
                            <View><Text style={{ textAlign: "center" }}>Searched <Text h4Style={{
                                color: "#000"
                            }} h4>{search}</Text> found {data2.length}</Text>
                            </View>
                        }
                    </View>
                }
                ListEmptyComponent={<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text>Network issues kindly refresh?</Text>
                </View>}
                renderItem={({ item }) => (
                    <View>
                        <View>
                            <ListItem>
                                {data?.profile.ProfilePic ?
                                    <Avatar
                                        size={30}
                                        rounded
                                        source={{ uri: item.user.profile.ProfilePic }}
                                        icon={{
                                            size: 20,
                                            name: "user-circle",
                                            type: "font-awesome",
                                            color: "darkgray",
                                        }}
                                    >
                                    </Avatar>
                                    :
                                    <Icon name="user-circle" type="font-awesome" size={30} backgroundColor={"gray"} color={"darkgray"} />

                                }

                                <ListItem.Content>
                                    
                                        <View style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}>
                                            <View>
                                                <Text style={{
                                                    fontSize: 17
                                                }}>
                                                    {item?.user?.username}
                                                </Text>

                                            </View>
                                            <View>
                                                <Text>
                                                    {item?.user?.is_staff ? <Icon name="check-circle" size={16} type="font-awesome" color={'darkblue'} /> : null}
                                                </Text>
                                            </View>
                                        </View>
                                    
                                </ListItem.Content>
                                <Text>

                                    {time(item?.date_posted).day},{time(item?.date_posted).month} {time(item?.date_posted).year} {time(item?.date_posted).time}:{time(item?.date_posted).sec} {time(item?.date_posted).hous}
                                </Text>

                            </ListItem>

                            <ListItem onPress={() => navigation.navigate('display', { "item": item?.id })}>
                                <Text style={{
                                    marginLeft: 10,
                                }}> </Text>
                                <ListItem.Content>
                                    <Text>
                                        {truncatedString(item?.feeds, 300)}
                                    </Text>
                                </ListItem.Content>

                            </ListItem>

                            {item.image ?
                                <ListItem>
                                    <Text style={{
                                        color: "darkblue"
                                    }}>|||</Text>
                                    <ListItem.Content>
                                        <Image
                                            style={{ width: width * 0.85, height: height * 0.5, borderRadius: 10, objectFit: "cover", alignSelf: "center" }}
                                            PlaceholderContent={<ActivityIndicator />} source={loading ? null : { uri: item.image }} />
                                    </ListItem.Content>
                                </ListItem>
                                : null
                            }
                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-around",
                                padding: 10,
                                backgroundColor: "#fff",
                                shadowColor: "#000",
                                shadowRadius: 10,
                                shadowOpacity: 0.5,
                            }}>
                                <View>
                                    <Text>Call</Text>
                                    <Icon onPress={() => makePhoneCall()} name="phone" type="font-awesome" color={"green"} /></View>

                                <View>
                                    <Text>chat</Text>
                                    <Icon onPress={() => sendWhatsAppMessage(item?.user?.profile?.phone_number)} name="whatsapp" type="font-awesome" color={"lightgreen"} />
                                </View>
                                <View>
                                    <Animated.Text style={
                                        [animatedStyle]
                                    }>
                                        <Text>{item.likes.length}</Text>

                                        {loading ? <ActivityIndicator /> :
                                            <Icon 
                                            disabled
                                            onPress={

                                                () => {
                                                    try {
                                                        pressHandle();
                                                        const response = axios.post("https://softnixx.com/api/likes/", {
                                                            user: profile.profile.id,
                                                            post: item.id,
                                                            user_n: profile.username
                                                        }, {
                                                            headers: {
                                                                'Content-Type': 'application/json'
                                                            }
                                                        });

                                                        if (!response.ok) {
                                                            showMessage({
                                                                message: `Failed to like this product`,
                                                                position: 'center',
                                                                backgroundColor: "darkblue",
                                                                color: "white",
                                                            });
                                                        } else {
                                                            proDuct();
                                                        }
                                                    } catch (error) {
                                                        showMessage({
                                                            message: `Failed to like product: ${error.message}`,
                                                            type: 'danger',
                                                            position: 'center',
                                                            backgroundColor: "darkblue",
                                                            color: "white",
                                                        });

                                                    }

                                                }
                                            } name="heart" type="font-awesome" backgroundColor={"darkred"} color={Color(item.likes)} />
                                        }
                                    </Animated.Text>
                                </View>
                            </View>
                            <ListItem>
                                <ListItem.Content>
                                    <ListItem.Input
                                        disabled
                                        placeholder="write a Review"
                                        textAlign="left"
                                        inputStyle={{
                                            borderWidth: 0.5,
                                            borderColor: "lightgray",
                                            borderRadius: 8,
                                            fontSize: 17,
                                            padding: 10,
                                        }}
                                    />
                                </ListItem.Content>
                                <Button
                                    onPress={() => Alert.alert("App info!", "system is busy try again later")}
                                    buttonStyle={{
                                        backgroundColor: null,
                                    }}
                                    iconRight
                                    titleStyle={{
                                        color: "darkblue"
                                    }}
                                    type="outline"
                                    title={"send"} icon={{ name: "send", type: "font-awesome", color: 'darkblue', size: 10 }} />
                            </ListItem>
                            <Divider />
                        </View>
                    </View>
                )}
            />

            <View style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                zIndex: 1,
            }}>
                  <Icon
                    onPress={() => navigation.navigate("carousel", { "key": key, "id": profile.profile.id })}
                    name='play'
                    raised
                    style={{
                        backgroundColor: Platform.OS === 'android' ? 'white' : 'white',
                        borderRadius: 20,
                    }} size={20} backgroundColor={Platform.OS === 'android' ? 'white' : 'white'} color="red"
                    type="font-awesome" />

                <Icon
                    onPress={() => navigation.navigate("newpost", { "key": key, "id": profile.profile.id })}
                    name='plus'
                    raised
                    style={{

                        backgroundColor: Platform.OS === 'android' ? 'white' : 'white',
                        borderRadius: 20,
                    }} size={20} backgroundColor={Platform.OS === 'android' ? 'white' : 'white'} color="darkblue"
                    type="font-awesome" />

            </View>

        </SafeAreaView>
    )
}
const style = StyleSheet.create({
    header: {
        padding: 5,
        margin: 5,
        ...Platform.select({
            ios: {
                shadowColor: "#333",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                backgroundColor: "#fff",
            }
        })
    },
    styheader: {
        width: width,
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    styheaderOv: {
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
        alignContent: "center",
        justifyContent: "center",
        padding: 3,
        margin: 3,
    }
})