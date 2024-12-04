import { View, Text, StyleSheet, ScrollView, Button, Alert, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ShoppingList from '@/components/ShoppingList';
import { useUserContext } from "@/components/contexts/UserContext";
import React, { useState, useEffect } from "react";

const API_URL = process.env["EXPO_PUBLIC_API_URL"];

interface RawList {
  userIds: string[]; // List of user IDs
  shoppingItems: { name: string }[]; // List of ingredient names as objects
  qnts: number[]; // Quantities for the ingredients
  units: string[]; // Units for the ingredients
}

interface Item {
  id: string; // Unique identifier for the item
  name: string; // Name of the ingredient
  quantity: number; // Corresponding quantity
  unit: string; // Corresponding unit
  checked: boolean; // Checkbox state
}

interface List {
  listId: string; // Unique identifier for the list
  userIds: string[]; // List of user IDs
  shoppingItems: Item[]; // Array of items with name, quantity, unit, and checked state
}

type Roommate = {
  id: string; 
  name: string; 
  isReciprocal: boolean;
};

const Shopping = () => {
  const [items, setItems] = useState<List[]>([]); // Store fetched shopping lists
  const [refreshing, setRefreshing] = useState(false);
  const { userData } = useUserContext(); // User context to get `user_id`
  const [recipRoommates, setRecipRoommates] = useState<Roommate[]>([]);

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

  // Function to fetch and transform items
  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_URL}/shopping_list/?user_id=${userData.user_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });


      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }

      const data: RawList[] = await response.json(); // Fetch raw data
      console.log(data);

      const transformedItems: List[] = data.map((listData, listIndex) => ({
        listId: `list-${listIndex + 1}`, // Generate a unique listId
        userIds: listData[3], // Extract user IDs from the 4th position in the array
        shoppingItems: listData[0].map((name: string, itemIndex: number) => ({
          id: `item-${listIndex}-${itemIndex}`, // Generate a unique item ID
          name: name, // Extract the item name
          quantity: listData[1][itemIndex], // Extract the corresponding quantity
          unit: listData[2][itemIndex], // Extract the corresponding unit
          checked: false, // Default to unchecked
        })),
      }));
      
      const singleUserLists = transformedItems.filter((list) => list.userIds.length === 1);
      const multiUserLists = transformedItems.filter((list) => list.userIds.length > 1);

      // Combine single-user lists first, followed by multi-user lists
      const sortedItems = [...singleUserLists, ...multiUserLists];

      setItems(transformedItems); // Store the transformed data in state
      console.log("Transformed items:", transformedItems);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true); // Start refreshing
    await fetchItems();  // Fetch the latest data
    setRefreshing(false); // End refreshing
  };

  // Fetch items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  // Function to toggle the checkbox state of an item
  const toggleCheckbox = (listId: string, itemId: string) => {
    setItems((prevLists) =>
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


  const formatListTitle = (userIds: string[]): string => {
    const roommateNames = userIds
      .filter((id) => id !== userData.user_id) // Exclude the current user
      .map((id) => recipRoommates.find((roommate) => roommate.id === id)?.name || 'Unknown');

    if (roommateNames.length === 0) {
      return "Your list";
    }

    const formattedNames =
      roommateNames.length === 1
        ? `You & ${roommateNames[0]}'s list`
        : `You & ${roommateNames.join(' & ')}'s list`;

    return formattedNames;
  };

  // Render the component
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh} // Handle pull-to-refresh
        />
    }
    >
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.title}>Shopping Lists</Text>
        </View>
      </SafeAreaView>

      {/* Render the fetched shopping lists */}
      {items.map((list) => (
        <View key={list.listId} style={styles.listContainer}>
          <Text style={styles.listTitle}>{formatListTitle(list.userIds)}</Text>
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
};

// Define styles for the component
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

export default Shopping;
