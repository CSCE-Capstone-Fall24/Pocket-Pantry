import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PantryItem from '@/components/PantryItem';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Pantry () {
  const [items, setItems] = useState([
    { id: 1, name: "Ingredient1", quantity: 10, unit: "lbs" },
    { id: 2, name: "Ingredient2", quantity: 10, unit: "lbs" },
    { id: 3, name: "Ingredient3", quantity: 10, unit: "lbs" },
    { id: 4, name: "Ingredient4", quantity: 10, unit: "lbs" },
  ]);

  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [newItemUnit, setNewItemUnit] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => {
    setModalVisible(false);
    setNewItemName('');
    setNewItemQuantity('');
    setNewItemUnit('');
  };

  const addItem = () => {
    if (newItemName && newItemQuantity && newItemUnit) {
      const newItem = {
        id: items.length + 1,
        name: newItemName,
        quantity: Number(newItemQuantity),
        unit: newItemUnit,
      };
      setItems([...items, newItem]);
      closeModal();
    } else {
      Alert.alert('Please fill out all fields.');
    }
  };

  return (
    <ScrollView>
      <SafeAreaView>

        <View style={styles.header}>
          <Text style={styles.title}>Pantry</Text>
          <TouchableOpacity style={styles.addButton} onPress={addItem}>
            <Ionicons name="add-outline" size={40} color="white"/>
          </TouchableOpacity>
        </View>

        <Text style={styles.category}>MEAT, POULTRY & SEAFOOD</Text>
        {items.map((item) => (
          <View key={item.id}>
            <View style={styles.line}></View>
            <PantryItem name={item.name} quantity={item.quantity} unit={item.unit} />
          </View>
        ))}
        
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    marginTop: 25,
    marginLeft: 25,
    fontSize: 32,
    fontWeight: 700,
  },
  addButton: {
    marginTop: 25,
    marginRight: 25,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff8667',
  },
  category: {
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 25,
    color: 'gray',
    fontWeight: 600,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
});
