import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ShoppingList from '@/components/ShoppingList';

export default function Shopping() {
  interface Item {
    id: string;
    name: string;
    unit: string;
    quantity: number;
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
        { id: "1", name: "Apple", unit: "count", quantity: 3 },
        { id: "2", name: "Bananas", unit: "count", quantity: 5 },
      ],
    },
    {
      listId: "2",
      userIds: ["You", "Roommate 1"],
      shoppingItems: [
        { id: "3", name: "Milk", unit: "gal", quantity: 0.5 },
        { id: "4", name: "Bread", unit: "loaf", quantity: 1 },
      ],
    },
    {
      listId: "3",
      userIds: ["You", "Roommate 2"],
      shoppingItems: [
        { id: "5", name: "Orange", unit: "count", quantity: 69 },
        { id: "6", name: "Juice", unit: "bottle", quantity: 2 },
      ],
    },
  ]);

  return (
    <ScrollView>
      <SafeAreaView>
        <Text style={styles.title}>Shopping Lists</Text>
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
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginLeft: 25,
    marginTop: 25,
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
