import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import { BlurView } from 'expo-blur';
import Ionicons from '@expo/vector-icons/Ionicons';

type ShoppingProps = {
  name: string
  quantity: number
}

const ShoppingItem = (props: ShoppingProps) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <View style={styles.container}>

      {/* Item information */}
      <View style={styles.itemContainer}>
        <Text style={styles.itemName}>{props.name}</Text>
        <View style={styles.itemDetailsContainer}>
          <Text style={styles.itemDetailsText}>{props.quantity} lbs   Exp. 11/30/24</Text>
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