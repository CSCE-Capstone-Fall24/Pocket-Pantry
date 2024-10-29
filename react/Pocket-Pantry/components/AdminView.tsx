import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useInventory } from './contexts/inventoryContext';

const AdminView = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [comment, setComment] = useState('');
  
  const { addItemToInventory } = useInventory();

  const handleAddItem = () => {
    if (!name || !quantity || !expirationDate) {
      alert('Please fill out all fields');
      return;
    }

    addItemToInventory({
      name,
      quantity: parseInt(quantity),
      expirationDate,
      comment,
    });

    setName('');
    setQuantity('');
    setExpirationDate('');
    setComment('');
  };

  return (
    <View style={styles.adminContainer}>
      <Text style={styles.subTitle}>Add Item to Inventory</Text>

      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Expiration Date (YYYY-MM-DD)"
        value={expirationDate}
        onChangeText={setExpirationDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Comment"
        value={comment}
        onChangeText={setComment}
      />

      <Button title="Add Item" onPress={handleAddItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  adminContainer: {
    marginBottom: 30,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
});

export default AdminView;
