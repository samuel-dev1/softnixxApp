import React, { useRef, useEffect, useState, useLayoutEffect} from 'react';
import { Paystack } from 'react-native-paystack-webview';
import { Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddFund({navigation, route }) {
    const [userData, setUserData] = useState(null);
    useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle: () => (
            <View>
              <Text>Deposit money into your account</Text>
            </View>
          ),
        });
      }, [navigation]);
  
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('userData');
                if (storedData) {
                    const { data2 } = JSON.parse(storedData);
                    setUserData(data2);

                } else {

                    showMessage({
                        message: 'User data not found',
                        type: 'warning',
                        backgroundColor:"darkblue",
                        color:"white",
                    });
                }
            } catch (error) {

                showMessage({
                    message: 'Error retrieving user data',
                    type: 'danger',
                    backgroundColor:"darkblue",
                    color:"white",
                });
            }
        };

        fetchUserData();
    }, []);
    const paystackRef = useRef(null);
    return (
        <Paystack
            paystackKey="pk_live_46758e921078ab1b44d7e515c862b337ad6968d0"
            amount={route?.params?.amount}
            onLoadProgress={() => <Spinner visible={isLoading} size={"large"} />}
            ref={paystackRef}
            label={route?.params?.discription}
            billingName={userData?.profile?.name || 'John Doe'}
            billingEmail={userData?.email || 'example@gmail.com'} // Default email if user data is not available
            activityIndicatorColor="darkblue"
            channels={['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer']}
            onCancel={() => {
                navigation.navigate('Home');
                showMessage({
                    message: 'Payment cancelled',
                    type: 'warning',
                    backgroundColor:"darkblue",
                    color:"white",
                });
            }}
            onSuccess={() => {
                const url = "https://softnixx.com/api/transac/";
                try {
                    fetch(url, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                            'Authorization': `Token ${route.params.key}`,
                        },
                        body: JSON.stringify({
                            token: route.params.key,
                            amount: route.params.amount,
                            id: userData.id,
                        }),
                    })
                        .then(()=> {
                            navigation.goBack();
                        })
                        .catch(error => {
                           
                        });
                } catch (error) {
                   
                }

            }}

            autoStart={true}
        />

    );
}
