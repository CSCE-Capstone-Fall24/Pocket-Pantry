import { View, Text, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ShoppingList from '@/components/ShoppingList';
import { useUserContext } from "@/components/contexts/UserContext";
import React, { useState, useEffect, useMemo } from "react";

const API_URL = process.env["EXPO_PUBLIC_API_URL"];

export default function Shopping() {
  interface Item {
    //id: string;
    name: string;
    unit: string;
    quantity: number;
    checked: boolean; // New property to track if the item is checked
  }

  interface List {
    //listId: string;
    userIds: string[];
    shoppingItems: Item[];
    qnts: number[]
    units: string[]
  }

  const [items, setItems] = useState<Item[][]>([]);
  const { userData, setUserData } = useUserContext(); 

  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_URL}/shopping_list/?user_id=${userData.user_id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }
      const data: List[][] = await response.json();
      console.log("GOT DATA AS")
      console.log(data);

      const transformedItems: Item[][] = data.map((list) => [
        //a matrix of lists - return_matrix [x][3] - matrix dimensions
        //return_matrix [x] - each row is a list of things to shop based on users for shared meal groups
        //return_matrix [x][0] - column 0 is the list of users for that shoppiing list portion (starting user's individual shopping list)
        //return_matrix [x][1] - column 1 is the list of the ingredients to be shopped for that group
        //return_matrix [x][2] - column 2 is the of list of quantities for the ingredients
        //return_matrix [x][3] - column 3 is the list of units for the ingredients

        // need to move date into item[][]

        list.userIds, // Column 0: List of user IDs
        list.shoppingItems, // Column 1: List of shopping items
        list.qnts, // Column 2: Quantities for the items
        list.units, // Column 3: Units for the items

      ]);
      setItems([...transformedItems]);      
      console.log("GOT ITEMS AS\n");
      console.log(transformedItems)

      } catch (error) {
        console.error("Error fetching items:", error);
      }
  };


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
  /*
  useEffect(() => {
    const rms: Roommate[] = userData.roommates
      .filter((item: any) => item.is_reciprocated)
      .map((item: any) => ({
        id: item.roommate_id,
        name: item.username,
        isReciprocal: item.is_reciprocated,
      })).sort((a: Roommate, b: Roommate) => Number(a.id) - Number(b.id));

    setRecipRoommates(rms);

    fetchItems();
  }, [userData.reciprocatedRoommates, userData.roommates]);
  */

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
