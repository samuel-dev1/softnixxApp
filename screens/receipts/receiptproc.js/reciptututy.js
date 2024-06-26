import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, FlatList, ActivityIndicator } from "react-native";
import { Badge, Divider, Icon, ListItem, Avatar } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const Receipt = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [optional, setOptional] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const { data, data2 } = JSON.parse(userData);
          setOptional({ profile: data2 });
        }
      } catch (error) {
        null
      } finally {
        setLoading(false);
      }
    };

    getDetails();
  }, []);

  const MoneyConvert = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
  };

  const Truncate = (input) => {
    return input.length > 20 ? input.substring(0, 18) + ".." : input;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = {
      year: date.getFullYear(),
      month: date.toLocaleString('en-US', { month: 'long' }),
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      period: date.getHours() >= 12 ? "PM" : "AM"
    };
    return formattedDate;
  };

  const fetchReceipts = () => {
    setLoading(true);
    fetch("https://softnixx.com/api/fetchE/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Token ${route?.params?.key}`,
      },
      body: JSON.stringify({
        category: "softnix",
      }),
    })
    .then(response => response.json())
    .then(data => {
      setData(data);
    })
    .catch(error => {
      null
    })
    .finally(() => {
      setLoading(false);
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchReceipts();
    }, [])
  );

  const renderItem = ({ item }) => (
    <ListItem 
      onPress={() => {
        navigation.navigate('stacksoft', { id: item.id, key: route.params.key, user: optional.profile.id });
      }}
      containerStyle={{
        backgroundColor: "#fff",
        padding: 10,
        margin: 5,
      }}
      bottomDivider
    >
      <Avatar size={40} source={require("../../../assets/show.png")} />
      <ListItem.Content>
        <Text style={{ fontSize: 17, paddingVertical: 5 }}>
          {item.client ? (
            item.client.id === optional.profile.id ? 
            <Text>{Truncate(`Transfer from ${item.user.username}`)}</Text> : 
            <Text>{Truncate(`Transfer to ${item.client.username}`)}</Text>
          ) : (
            <Text>Unknown Client</Text>
          )}
        </Text>
        <Text style={{ fontSize: 15, paddingVertical: 5 }}>
          {`${formatTime(item.createdAt).day}, ${formatTime(item.createdAt).month} ${formatTime(item.createdAt).year} ${formatTime(item.createdAt).hour}:${formatTime(item.createdAt).minute} ${formatTime(item.createdAt).period}`}
        </Text>
      </ListItem.Content>
      <View style={{ justifyContent: "flex-end", alignItems: "flex-end" }}>
        <Text style={{ fontSize: 18, color: item.client ? (item.client.id === optional.profile.id ? "blue" : "red") : "black" }}>
          {item.client ? (
            item.client.id === optional.profile.id ? '+' : '-'
          ) : (
            'Unknown'
          )}
          &#8358;{MoneyConvert(item.amount)}
        </Text>
        <Badge status='success' value="Successful" />
      </View>
      <ListItem.Chevron />
    </ListItem>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} size="large" color="darkblue" />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          ListHeaderComponent={
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 10,
              marginVertical: 10,
            }}>
              <View>
                <Text style={{ color: "#333", fontSize: 17 }}>Categories</Text>
                <Icon size={15} color="darkgray" name="chevron-down" type="font-awesome" />
              </View>
              <View>
                <Text style={{ color: "#333", fontSize: 17 }}>All Status</Text>
                <Badge status="success" />
              </View>
            </View>
          }
          onRefresh={fetchReceipts}
          refreshing={loading}
          progressViewOffset={10}
        />
      )}
    </SafeAreaView>
  );
};

export default Receipt;
