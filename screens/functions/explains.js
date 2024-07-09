import React, { useState, useEffect } from 'react';
import { Modal, Text, View, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Explain() {
    const expains = [
        "Deposit money into your account using any medium.",
        "Inline transfer, to transfer into any Softnixx user",
        "Use withdrawer to withdraw into your bank Bank",
        "Check all your transaction history.",
        "Buy any utilities with our product.",
        "Claim all point or redeem point for transaction",
        "All support available for you.",
        'use softnixx as transfer medium',
        'use your sn acc as your softnixx account.'
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState({ unit: false });

    useEffect(() => {
        const checkFirstTimeUser = async () => {
            const control = await AsyncStorage.getItem("control");
            if (control) {
                setModalVisible(JSON.parse(control));
            }
        };

        checkFirstTimeUser();
    }, []);

    const updateControlUnit = async () => {
        setModalVisible({ unit: false });
        try {
            const control = await AsyncStorage.getItem('control');
            if (control !== null) {
                const controlObj = JSON.parse(control);
                controlObj.unit = false;
                await AsyncStorage.setItem('control', JSON.stringify(controlObj));
            }
        } catch (error) {
            console.error('Error updating control unit:', error);
        }
    };

    const handleNext = async () => {
        if (currentIndex < expains.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            await AsyncStorage.setItem('hasSeenModal', 'true');
            updateControlUnit()
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <Modal
            visible={modalVisible.unit}
            transparent={true}
            animationType="fade"
        >
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.text}>Hello, welcome to Softnixx</Text>
                    <View style={{
                        display:"flex",
                        flexDirection:"row",
                        margin:4,
                        padding:3,

                    }}>
                    <Icon size={10} type='font-awesome'color={'darkblue'} name='phone' raised />
                    <Icon size={10} type='font-awesome'color={'green'} name='wifi' raised />
                    <Icon size={10} type='font-awesome' name='bitcoin' raised />
                    <Icon size={10} type='font-awesome' name='tv' raised />
                    </View>
                    
                    <Text style={styles.text}>{expains[currentIndex]}</Text>
                    <View style={styles.buttonContainer}>
                        {currentIndex > 0 && (
                            <Button
                                title="Previous"
                                onPress={handlePrevious}
                                buttonStyle={styles.button}
                            />
                        )}
                        <Button
                            title={currentIndex < expains.length - 1 ? "Next" : "Close"}
                            onPress={handleNext}
                            buttonStyle={styles.button}
                        />
                    </View>
                    <Icon onPress={updateControlUnit} name='forward' type='font-awesome' raised />
                </View>
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
        width: '80%', // Adjust width as needed
        padding: 10,
        backgroundColor: 'darkblue',
        borderRadius: 10,
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
        color: "darkblue",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 4,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        margin: 10,
        backgroundColor: "darkblue"
    },
});
