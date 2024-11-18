import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PantryItem from '@/components/PantryItem';

export default function Pantry () {

  return (
    <SafeAreaView style={styles.container}>
      
      <Text style={styles.header}>
        Pantry
      </Text>
      
      <PantryItem
        name="Burger1"
        quantity={10}
      />
      <PantryItem
        name="Burger2"
        quantity={10}
      />
      <PantryItem
        name="Burger3"
        quantity={10}
      />
      <PantryItem
        name="Burger4"
        quantity={10}
      />
        
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    
  },
  header: {
    marginLeft: 20,
    fontSize: 30,
    fontWeight: 700,
  }
});
