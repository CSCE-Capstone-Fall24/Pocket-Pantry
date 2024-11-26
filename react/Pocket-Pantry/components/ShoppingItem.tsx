import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import { BlurView } from 'expo-blur';
import Ionicons from '@expo/vector-icons/Ionicons';

// One "Shopping Item" will be a list. "ShoppingListProps" would probably be a more discriptive name, but that's the idea
type ShoppingProps = {
  id: string;
  name: string;
  unit: string;
  quantity: number;
};

// Or, ShoppingProps could be just a Shopping Item, like how PantryProps is just a Pantry Item,
// and then create a List item that takes in an array of Shopping Items

const ShoppingItem = (props: ShoppingProps) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <View style={styles.container}>

      {/* Shopping item line */}
      <View style={styles.itemContainer}>
          <View style={styles.rowAlignment}>
            <Text style={styles.itemName}>Ground Beef 2 lbs </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={openModal}>
        <Ionicons name="pencil" size={26} color="gray"/>
      </TouchableOpacity>

      {/* Pop-up edit window */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <BlurView
          style={StyleSheet.absoluteFill}
          intensity={20}
        />
        <View style={styles.modalContainerAlignment}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Edit Ingredient</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemContainer: {
    marginVertical: 10,
    marginLeft: 25,
  },
  rowAlignment: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemName: {
    marginBottom: 5,
    fontSize: 20,
  },
  itemDetailsContainer: {
    flexDirection: 'row',
  },
  itemDetailsText: {
    color: 'gray',
  },
  editButton: {
    marginRight: 5,
    padding: 20,
  },
  modalContainerAlignment: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    marginHorizontal: 50,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modalText: {
    marginBottom: 20,
    fontSize: 18,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#ff8667',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ShoppingItem