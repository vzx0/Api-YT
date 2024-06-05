import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text } from 'react-native';
import YoutubeTela from './YoutubeTela';
import VimeoTela from './VimeoTela';

const Tab = createBottomTabNavigator();

function TabBarIcon({ iconName }) {
  return (
    <Image source={iconName} style={{ width: 25, height: 25 }} />
  );
}

export default function MenuInicio() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          let iconName;

          if (route.name === 'YouTube') {
            iconName = require('./assets/youtube_logo.png');
          } else if (route.name === 'Vimeo') {
            iconName = require('./assets/vimeo_logo.png');
          }

          return <TabBarIcon iconName={iconName} />;
        },
        tabBarLabel: ({ focused }) => {
          return (
            <Text style={{ fontSize: 12, color: focused ? '#c4302b' : 'gray' }}>
              {route.name}
            </Text>
          );
        },
      })}
      tabBarOptions={{
        showIcon: true,
        showLabel: true,
        style: { height: 60 },
        labelStyle: { fontSize: 12 },
      }}
    >
      <Tab.Screen name="YouTube" component={YoutubeTela} options={{ headerShown: false }} />
      <Tab.Screen name="Vimeo" component={VimeoTela} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
