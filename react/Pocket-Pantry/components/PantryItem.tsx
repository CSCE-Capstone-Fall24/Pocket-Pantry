import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PantryItem({ name, quantity, unit, expirationDate, location, category }) {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.details}>
        {quantity} {unit} | {category} | Stored in: {location}
      </Text>
      <Text style={styles.expiration}>Expires on: {new Date(expirationDate).toLocaleDateString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  expiration: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
});
