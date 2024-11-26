import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type ShoppingProps = {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  checked: boolean; // Checked state
  toggleCheckbox: () => void; // Function to toggle checkbox
};

const ShoppingItem = (props: ShoppingProps) => {
  return (
    <View style={styles.container}>
      {/* Item details */}
      <Text style={styles.itemText}>
        {props.name}: {props.quantity} {props.unit}
      </Text>

      {/* Checkbox */}
      <TouchableOpacity onPress={props.toggleCheckbox}>
        <Ionicons
          name={props.checked ? 'checkbox' : 'square-outline'}
          size={24}
          color={props.checked ? '#4CAF50' : '#888'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
});

export default ShoppingItem;
