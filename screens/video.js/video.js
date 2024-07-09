import React from 'react';
import { View, FlatList, Dimensions, StyleSheet, Text, ActivityIndicator, Alert, Linking, ScrollView } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useLayoutEffect } from 'react';
import { Image, Icon, Avatar } from 'react-native-elements';
import ReadMore from '../functions/readmore';

const { height, width } = Dimensions.get('window');

const sendWhatsAppMessage = (phone_number) => {
  try {
    const phoneNumber = phone_number?.toString().replace(/^0/, ''); // Remove leading zero if present
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

const makePhoneCall = (phone_number) => {
  const phoneCallURL = `tel:${phone_number}`;

  Linking.openURL(phoneCallURL)
    .catch(error => Alert.alert('An error occurred', error));
};

const truncatedString = (str, length) => {
  return str.length <= length ? str : `${str.slice(0, length)}....`;
}; 

const VerticalCarousel = ({ data , open, close, numberoflines}) => {
  return (
    <FlatList
    initialNumToRender={5}
      data={data}
      keyExtractor={(item) => item?.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <View style={styles.overlay}>
            <Avatar
              title='hello'
              size={50}
              rounded
              source={{ uri: item?.user?.profile?.ProfilePic }}
              
              /
            >
              <Icon containerStyle={{
                position:"absolute",
                top:60,
              }} name='plus' color={"red"} raised size={10} type='font-awesome' />
           
            <Text style={styles.overlayText}>Phone: {item?.user?.username}</Text>
            <Text style={styles.overlayText}>Email: {item?.user?.email}</Text>
            <Text style={styles.overlayText}>Phone: {item?.user?.profile?.phone_number}</Text>
          </View>
          {item.image ?
            <Image
              style={styles.image}
              PlaceholderContent={<ActivityIndicator />}
              source={{ uri: item?.image }}
            />
            : 
            
            <ReadMore text={item?.feeds} numberOfLines={numberoflines} open={open} close={close} />
           
            }
          <View style={styles.wrapContent}>
            <Text style={styles.text}>Descriptions</Text>
            
            <ReadMore  text={item?.feeds} numberOfLines={numberoflines} open={open} close={close} />
            
          </View>
          <View style={styles.actionButtons}>
           
            <Icon 
              name="whatsapp"
              onPress={() => sendWhatsAppMessage(item?.user?.profile?.phone_number)}
              raised
              type='font-awesome'
              size={15}
              color="green"
              style={styles.icon} 
            />
            <Ionicons name="bookmark" size={30} color="white" style={styles.icon} />
            <Icon 
              onPress={() => makePhoneCall(item?.user?.profile?.phone_number)}
              name="phone"
              raised
              size={15}
              type='font-awesome'
              color="darkblue"
              style={styles.icon} 
            />
            <AntDesign name="like1" size={30} color="white" style={styles.icon} disabled />
          </View>
        </View>
      )}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      viewabilityConfig={{ itemVisiblePercentThreshold: 95 }}
      snapToAlignment="start"
      decelerationRate="fast"
      snapToInterval={height}
    />
  );
};

export default function Carousel({ route, navigation }) {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [open, isClosed] = React.useState(false)


 const onHnadleRead = ()=>{
    isClosed(!open)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View>
          <Text>Product in reels</Text>
        </View>
      ),
    });
  }, [navigation]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://softnixx.com/api/product', {
        
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${route?.params?.key?.key?.key}`,
        },

      });
      const json = await response.json();
      if (response.ok) {
        setData(json);
      }
    } catch (error) {
    
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
         <View style={{
           display:"flex",
           flexDirection:"row",
           justifyContent:'space-evenly',
           alignItems:"center",
           margin:5,
           width:width,
           padding:5,
          }}>

            <View style={{
      
            }}>
              <Icon raised onPress={()=>navigation.goBack()}  name='angle-left' type='font-awesome' size={15} color={"black"} />
            </View>
        
<View>
<Text style={styles.overlayText}>You are advised to make all payment through your softnixx account..</Text>
</View>
      </View>
      
      <VerticalCarousel numberoflines={1000} open={open} close={onHnadleRead} data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  item: {
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 5,
    left: 10,
    padding: 5,
    margin: 5,
  },
  overlayText: {
    color: 'white',
    fontSize:14,
  },
  image: {
    width: width * 0.95,
    height: height * 0.6,
    borderRadius: 10,
    alignSelf: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapContent: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    width: '70%',
    textAlign: 'left',
  },
  description: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButtons: {
    position: 'absolute',
    right: 10,
    bottom: 100,
    justifyContent: 'space-around',
    height: 200,
  },
  icon: {
    margin: 3,
  },
});
