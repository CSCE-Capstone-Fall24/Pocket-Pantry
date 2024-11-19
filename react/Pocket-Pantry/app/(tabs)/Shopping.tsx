import ShoppingItem from '@/components/ShoppingItem';
import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Shopping () {

  return (
    <ScrollView>
      <SafeAreaView> 
        <Text style={styles.title}>
          Shopping List
        </Text>
        
        <Text style={styles.header}>
          Category 1
        </Text>
        <View style={styles.line}></View>
        <ShoppingItem
          name="Item1"
          quantity={10}
        />
        <View style={styles.line}></View>
        <ShoppingItem
          name="Item2"
          quantity={10}
        />
        <View style={styles.line}></View>
        <ShoppingItem
          name="Item3"
          quantity={10}
        />
        <View style={styles.line}></View>
        <ShoppingItem
          name="Item4"
          quantity={10}
        />

        <Text style={styles.header}>
          Category 2
        </Text>
        <View style={styles.line}></View>
        <ShoppingItem
          name="Item5"
          quantity={10}
        />
        <View style={styles.line}></View>
        <ShoppingItem
          name="Item6"
          quantity={10}
        />
        <View style={styles.line}></View>
        <ShoppingItem
          name="Item7"
          quantity={10}
        />
        <View style={styles.line}></View>
        <ShoppingItem
          name="Item8"
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