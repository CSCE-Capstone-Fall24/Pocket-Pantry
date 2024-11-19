import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PantryItem from '@/components/PantryItem';

export default function Pantry () {

  return (
    <ScrollView>
    <SafeAreaView>
        <Text style={styles.title}>
          Pantry
        </Text>
      
        <Text style={styles.header}>
          Category 1
        </Text>
        <View style={styles.line}></View>
        <PantryItem
          name="Ingredient1"
          quantity={10}
        />
        <View style={styles.line}></View>
        <PantryItem
          name="Ingredient2"
          quantity={10}
        />
        <View style={styles.line}></View>
        <PantryItem
          name="Ingredient3"
          quantity={10}
        />
        <View style={styles.line}></View>
        <PantryItem
          name="Ingredient4"
          quantity={10}
        />

        <Text style={styles.header}>
          Category 2
        </Text>
        <View style={styles.line}></View>
        <PantryItem
          name="Ingredient5"
          quantity={10}
        />
        <View style={styles.line}></View>
        <PantryItem
          name="Ingredient6"
          quantity={10}
        />
        <View style={styles.line}></View>
        <PantryItem
          name="Ingredient7"
          quantity={10}
        />
        <View style={styles.line}></View>
        <PantryItem
          name="Ingredient8"
          quantity={10}
        />
       
      
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
  header: {
    marginTop: 25,
    marginLeft: 25,
    marginBottom: 8,
    fontSize: 16,
    fontStyle: 'italic',
    color: '#c0c0c0'
  },
  line: {
    borderBottomWidth: 1,
    borderColor: 'lightgray'
  }
});
