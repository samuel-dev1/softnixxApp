import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';

const CountdownTimer = ({open}) => {
  const TOTAL_TIME = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
  const [time, setTime] = useState(TOTAL_TIME);
  const [startTime, setStartTime] = useState(0);
  
  useEffect(() => {
    AsyncStorage.getItem('startTime').then(value => {
      if (value) {
        const storedStartTime = parseInt(value);
        const now = new Date().getTime();
        const elapsedTime = now - storedStartTime;
        let remainingTime = TOTAL_TIME - (elapsedTime % TOTAL_TIME);
        if (remainingTime <= 0) {
          remainingTime += TOTAL_TIME; // Ensure positive remaining time
        }
        setTime(remainingTime);
        setStartTime(now - remainingTime); // Adjust start time to maintain cycle
      } else {
        const now = new Date().getTime();
        setStartTime(now);
        AsyncStorage.setItem('startTime', now.toString());
      }
    });
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(prevTime => {
        if (prevTime <= 0) {
          open(false); // Reset open state when timer completes a cycle
          return TOTAL_TIME; // Reset timer to TOTAL_TIME when it reaches zero
        } else if (prevTime <= 600000 && prevTime > 0) {
          open(true); // Set open state to true when timer is between 0 and 10 minutes
        }
        return prevTime - 1000; // Decrease time by 1 second
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [open]);

  // Calculate hours, minutes, seconds
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  return (
    <Text>
     Opening <Icon name='gift' size={10} raised type='font-awesome' /> In {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
    </Text>
  );
};

export default CountdownTimer;
