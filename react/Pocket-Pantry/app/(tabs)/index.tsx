import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MealPlan () {
  return (
    <ScrollView>
      <SafeAreaView> 

        <Text style={styles.title}>
          Meal Plan
        </Text>
          
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
