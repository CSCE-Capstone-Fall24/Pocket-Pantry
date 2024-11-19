import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile () {

  return (
    <SafeAreaView>
      
      <Text style={styles.header}>
        Profile
      </Text>
      

        
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginLeft: 25,
    marginVertical: 25,
    fontSize: 32,
    fontWeight: 700,
  }
});
