import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';  // Make sure to import this

export default function Profile () {
  return (
    <ScrollView>
      <SafeAreaView> 
        {/* <Text style={styles.title}>Welcome, {user.name}!</Text>
        <Text>Email: {user.email}</Text>
        <Text>Username: {user.username}</Text> */}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginLeft: 25,
    marginVertical: 25,
    fontSize: 32,
    fontWeight: 700,
  }
});
