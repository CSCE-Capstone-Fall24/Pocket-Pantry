import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ShoppingList from '@/components/ShoppingList';

export default function Shopping() {
  interface Item {
    id: string;
    name: string;
    unit: string;
    quantity: number;
    checked: boolean; // New property to track if the item is checked
  }

  interface List {
    listId: string;
    userIds: string[];
    shoppingItems: Item[];
  }

  const [testLists, setTestLists] = useState<List[]>([
    {
      listId: "1",
      userIds: ["You"],
      shoppingItems: [
        { id: "1", name: "Apple", unit: "count", quantity: 3, checked: false },
        { id: "2", name: "Bananas", unit: "count", quantity: 5, checked: false },
      ],
    },
    {
      listId: "2",
      userIds: ["You", "Roommate 1"],
      shoppingItems: [
        { id: "3", name: "Milk", unit: "gal", quantity: 0.5, checked: false },
        { id: "4", name: "Bread", unit: "loaf", quantity: 1, checked: false },
      ],
    },
    {
      listId: "3",
      userIds: ["You", "Roommate 2"],
      shoppingItems: [
        { id: "5", name: "Orange", unit: "count", quantity: 69, checked: false },
        { id: "6", name: "Juice", unit: "bottle", quantity: 2, checked: false },
      ],
    },
  ]);

  // Function to handle checkbox toggling for an item
  const toggleCheckbox = (listId: string, itemId: string) => {
    setTestLists((prevLists) =>
      prevLists.map((list) =>
        list.listId === listId
          ? {
              ...list,
              shoppingItems: list.shoppingItems.map((item) =>
                item.id === itemId ? { ...item, checked: !item.checked } : item
              ),
            }
          : list
      )
    );
  };

  // Function to handle submit action
  const handleSubmit = () => {
    setTestLists((prevLists) =>
      prevLists
        .map((list) => ({
          ...list,
          shoppingItems: list.shoppingItems.filter((item) => !item.checked), // Remove checked items
        }))
        .filter((list) => list.shoppingItems.length > 0) // Remove empty lists
    );
  
    Alert.alert('Submitted', 'Checked items have been removed from your shopping lists.');
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.title}>Shopping Lists</Text>
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </SafeAreaView>

      {/* Render each shopping list */}
      {testLists.map((list) => (
        <View key={list.listId} style={styles.listContainer}>
          <Text style={styles.listTitle}>
            Shopping List ({list.userIds.join(", ")})
          </Text>
          <ShoppingList
            listId={list.listId}
            userIds={list.userIds}
            shoppingItems={list.shoppingItems}
            toggleCheckbox={toggleCheckbox} // Pass down the toggle function
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
  },
  listContainer: {
    marginBottom: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
  },
});
