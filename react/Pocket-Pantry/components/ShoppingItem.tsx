import React, { useState } from 'react'
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import { BlurView } from 'expo-blur';

type PantryProps = {
  name: string
  quantity: number
}

const ShoppingItem = (props: PantryProps) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <View>

      {/* Touch item to edit */}
      <TouchableOpacity style={styles.itemButton} onPress={openModal}>
          <Text style={styles.itemButtonText}>{props.name}</Text>
          <Text style={styles.itemButtonText}>{props.quantity}</Text>
      </TouchableOpacity>

      {/* Pop-up edit window */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        {/* Background blur */}
        <BlurView
          style={StyleSheet.absoluteFill}
          intensity={20}
        />
        {/* Window content */}
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
    itemButton: {
      paddingVertical: 12,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    itemButtonText: {
      marginHorizontal: 25,
      fontSize: 20,
    },
    modalContainerAlignment: {
      flex: 1,
      justifyContent: 'center',
    },
    modalContainer: {
      marginHorizontal: 50,
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'center',
    },
    modalText: {
      fontSize: 18,
      marginBottom: 20,
    },
    modalButton: {
      backgroundColor: '#ff8667',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    modalButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
});

export default ShoppingItem