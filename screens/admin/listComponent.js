import React, { useState } from "react";

import {
  View,
  Text,
  Modal,
  ActivityIndicato,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Icon, Badge, Divider, ListItem } from "react-native-elements";

export default function Check({ vissible, onClose, id, route }) {
  function MoneyConvert(num) {
    return num?.toLocaleString();
  }

  const time = (time) => {
    date = new Date(time);
    return {
      year: date.getFullYear(),
      month: date.toLocaleString("en-US", { month: "long" }),
      day: date.getDate(),
      time: date.getHours(),
      sec: date.getMinutes(),
      hous: date.getHours >= 12 ? "PM" : "AM",
    };
  };

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const Getdetailr = async ({}) => {
    setLoadingT(true);
    const itemUrL = `https://softnixx.com/api/receiptC/${id ? id : null}`;
    try {
      const response = await fetch(itemUrL, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Token ${route}`,
        },
      });
      const json = await response.json();
      setData(json);
      setLoading(false);
    } catch (error) {
      showMessage({
        message: "server went wrong!",
        type: "info",
        backgroundColor: "darkblue",
        color: "white",
      });
    } finally {
      setLoading(false);
    }
  };

  if (vissible) {
    Getdetailr();
  }

  console.log(data)
  return (
    <Modal visible={vissible} transparent={false} presentationStyle="pageSheet">
        <View>
            <Icon onPress={onClose} name="close" type="font-awesome" />
            <Text>getting started</Text>
        </View>
      </Modal>
  )
           
}
