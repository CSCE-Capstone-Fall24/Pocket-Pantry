import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PantryItem from '@/components/PantryItem';

export default function Pantry() {
  const [pantryItems, setPantryItems] = useState([]);

  useEffect(() => {
    const fetchPantryItems = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/indv_pantry?user_id=2');
        const data = await response.json();
        setPantryItems(data);
        console.log("FETCHING");
      } catch (error) {
        console.error('Error fetching pantry items:', error);
      }
    };

    fetchPantryItems();
  }, []);

  const renderPantryItem = ({ item }) => (
    <PantryItem
      name={item.food_name}
      quantity={item.quantity}
      unit={item.unit}
      expirationDate={item.expiration_date}
      location={item.location}
      category={item.category}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Pantry</Text>
      <FlatList
        data={pantryItems}
        keyExtractor={(item) => item.pantry_id.toString()}
        renderItem={renderPantryItem}
        ItemSeparatorComponent={() => <View style={styles.line}></View>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the FlatList takes the remaining screen space and is scrollable
  },
  title: {
    marginLeft: 25,
    marginTop: 25,
    fontSize: 32,
    fontWeight: '700',
  },
  line: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
});
