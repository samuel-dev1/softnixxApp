import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, Dimensions, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import VerticalCarousel from './verical';

const { width } = Dimensions.get('window');

export default function Carousel({ route, navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);

  const onHandleRead = () => {
    setIsExpanded(!isExpanded);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View>
          <Text>Product in reels</Text>
        </View>
      ),
    });
  }, [navigation]);

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`https://softnixx.com/api/product?page=${page}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${route?.params?.key?.key?.key}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        if (json.results.length > 0) {
          setData(prevData => [...prevData, ...json.results]);
          setCurrentPage(page);
          setHasMoreData(json.next !== null);
        } else {
          setHasMoreData(false);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const loadMoreData = () => {
    if (hasMoreData && !loading) {
      fetchData(currentPage + 1);
    }
  };

  if (loading && data.length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon raised onPress={() => navigation.goBack()} name='angle-left' type='font-awesome' size={15} color={"black"} />
        <Text style={styles.overlayText}>You are advised to make all payment through your softnixx account.</Text>
      </View>
      <VerticalCarousel
        data={data}
        numberOfLines={3}
        open={isExpanded}
        close={onHandleRead}
        loadMore={loadMoreData}
      />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 5,
    width: width,
    padding: 5,
  },
  overlayText: {
    color: 'white',
  },
});
