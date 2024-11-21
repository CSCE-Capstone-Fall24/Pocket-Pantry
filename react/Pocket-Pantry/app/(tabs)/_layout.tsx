import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { API_URL } from '@env';
import { useUserContext } from '@/components/contexts/UserContext';

export default function TabLayout() {
  const [userData, setUserData] = useState(null);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ff8667',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Meal Plan',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'calendar' : 'calendar-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Pantry"
        options={{
          title: 'Pantry',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'list' : 'list-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Shopping"
        options={{
          title: 'Shopping',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'cart' : 'cart-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />

      {/* <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
        // Use `component` to directly pass props
        component={(props) => <Profile {...props} user={userData} />}
      /> */}
    </Tabs>
  );
}