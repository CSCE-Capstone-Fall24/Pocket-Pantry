import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ShoppingItem from '@/components/ShoppingItem';

export default function Shopping () {

  interface Item {
    id: string;
    name: string;
    unit: string;
    quantity: number;
  }

  const [testItems, setTestItems] = useState<Item[]>([
    { id: "1", name: "Apple", unit: "count", quantity: 3 },
    { id: "2", name: "Bananas", unit: "count", quantity: 5 },
    { id: "3", name: "Milk", unit: "gal", quantity: 0.5 },
    { id: "4", name: "Orange", unit: "count", quantity: 69 }
  ]);

  const [items, setItems] = useState<Item[]>([]);

  return (
    <ScrollView>
      <SafeAreaView>
        <Text style={styles.title}>
          Shopping List
        </Text> 
      </SafeAreaView>

      {/* Display items */}
      {testItems.map((item) => (
        <View key={item.id}>
          <ShoppingItem
            id={item.id}
            name={item.name}
            unit={item.unit}
            quantity={item.quantity}
          />
        </View>
      ))}
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