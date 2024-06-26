import React from 'react';
import { Dimensions } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Icon } from 'react-native-elements';
import SideBar from '../mainscreen/sidebar';
import Extra from '../extra/sellunit';
import Settings from '../management/settings';
import Contact from '../helps/contact';

const BottomTab = createMaterialBottomTabNavigator();
const { width, height } = Dimensions.get('window');

const tabBarIcon = (name, focused, size) => {
  let iconName, iconColor;
  switch (name) {
    case 'home':
      iconName = focused ? 'home' : 'home';
      break;
    case 'list':
      iconName = focused ? 'list' : 'list-outline';
      break;
    case 'cog':
      iconName = focused ? 'cog' : 'cog-outline';
      break;
    case 'help':
      iconName = focused ? 'help' : 'help';
      break;
    default:
      iconName = 'home';
  }
  iconColor = focused ? 'darkblue' : 'gray'; // Adjust colors based on focus
  
  return <Icon name={iconName} type='ionicon' size={size} color={iconColor} />;
};

const CustomTabBarIcon = ({ name, focused }) => (
  <Icon name={name} type='ionicon' size={focused ? 30 : 25} color={focused ? 'darkblue' : 'gray'} />
);
const MainTabNavigator = ({route}) => {
  return (
    <BottomTab.Navigator
    screenOptions={{
      headerShown:false
    }}
      initialRouteName='Home'
      activeColor='darkblue'
      inactiveColor='darkblue'
      barStyle={{
        backgroundColor: "#fff",
        width: width,
        alignSelf: "center",
        height: height * 0.1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        elevation: 8, 
        shadowOpacity: 0.8,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 }
      }}
      sceneAnimationType='shifting'
    >
      <BottomTab.Screen
      initialParams={route.params}
        name="List"
        component={Extra}
        options={{
          headerShown:false,
          tabBarLabel: 'List',
          tabBarIcon: ({ focused }) => <CustomTabBarIcon name="list-outline" focused={focused} />,
        }}
      />
      <BottomTab.Screen
      initialParams={route.params}
        name="Home"
        component={SideBar}
        options={{
          headerShown:false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => <CustomTabBarIcon name="home" focused={focused} />,
        }}
      />
      <BottomTab.Screen
      initialParams={route.params}
        name="Settings"
        component={Settings}
        options={{
          headerShown:false,
          tabBarLabel: 'Settings',
          tabBarIcon: ({ focused }) => <CustomTabBarIcon name="cog-outline" focused={focused} />,
        }}
      />
      <BottomTab.Screen
      initialParams={route.params}
        name="Help"
        component={Contact}
        options={{
          headerShown:false,
          tabBarLabel: 'Help',
          tabBarIcon: ({ focused }) => <CustomTabBarIcon name="help" focused={focused} />,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default MainTabNavigator;
