import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useInventory } from './contexts/inventoryContext';

const InventoryView = () => {
  const { inventory } = useInventory();

  return (
    <View style={styles.displayContainer}>
      <Text style={styles.subTitle}>Current Inventory</Text>

      <FlatList
        data={inventory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text style={styles.itemText}>Name: {item.name}</Text>
            <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
            <Text style={styles.itemText}>Expiration Date: {item.expirationDate}</Text>
            <Text style={styles.itemText}>Comment: {item.comment}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No items in inventory.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  displayContainer: {
    flex: 1,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default InventoryView;
