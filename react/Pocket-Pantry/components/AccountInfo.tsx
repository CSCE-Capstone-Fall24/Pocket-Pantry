import React, { useState } from 'react'
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import { BlurView } from 'expo-blur';

type AccountProps = {
    name: string
    username: string
    userId: number
}

const AccountInfo = (props: AccountProps) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);
  return (
    <View>

        <TouchableOpacity style={styles.button} onPress={openModal}>
            <View style={styles.userContainer}>
                <Text style={styles.nameText}>{props.name}</Text>
                <Text style={styles.quantityText}>{props.username}</Text>
            </View>
        </TouchableOpacity>


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
            <Text style={styles.modalText}>{props.username}</Text>
            <Text style={styles.modalText}>{props.userId}</Text>
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
    button: {
        paddingVertical: 10,
    },
    nameText: {
        paddingLeft: 25,
        fontSize: 20,
        color: 'black',
    },
    quantityText: {
        paddingRight: 25,
        fontSize: 20,
        color: 'gray',
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
      userContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
});

export default AccountInfo