import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ShoppingItem from '@/components/ShoppingItem';

export default function Shopping () {
  return (
    <ScrollView>
      <SafeAreaView> 

        <Text style={styles.title}>
          Shopping List
        </Text>      
          
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginLeft: 25,
    marginTop: 25,
    fontSize: 32,
    fontWeight: 700,
  },
});