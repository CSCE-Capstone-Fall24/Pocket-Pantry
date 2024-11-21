import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Pressable } from 'react-native'
import { BlurView } from 'expo-blur';
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker'

type PantryProps = {
  name: string
  quantity: number
  unit: string
}

const PantryItem = (props: PantryProps) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const [quantity, setQuantity] = useState(props.quantity.toString());

  const [isScrollerVisible, setScrollerVisible] = useState(false);
  const openScroller = () => setScrollerVisible(true);
  const closeScroller = () => setScrollerVisible(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  return (
    <View style={styles.container}>

      {/* Displayed item information */}
      <View style={styles.infoContainer}>
        <Text style={styles.itemName}>{props.name}</Text>
        <Text style={styles.itemDetails}>{props.quantity} {props.unit}   Exp. 11/30/24</Text>
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
            
            {/* Edit quantity */}
            <View style={styles.quantityContainer}>
              <Text style={styles.modalContainerText}>Edit quantity:  </Text>
              <TextInput
                style={styles.quantityInput}
                value={quantity}
                onChangeText={(value) => setQuantity(value)}
              />
              <Text style={styles.modalContainerText}>  {props.unit}</Text>
            </View>

            {/* Edit expiration date */}
            <View style={styles.expirationContainer}>
              <Text style={styles.modalContainerText}>Edit expiration date:  </Text>
              <TouchableOpacity
                style={styles.expirationInput}
                onPress={() => { setScrollerVisible(true); openScroller(); }}
              >
                <Text style={styles.modalContainerText}>{selectedDate.toLocaleDateString()}</Text>
              </TouchableOpacity>
            </View>
          
            <TouchableOpacity style={styles.saveButton} onPress={closeModal}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>

            {/* Expiration date scroller */}
            <Modal
              transparent={true}
              animationType="slide"
              visible={isScrollerVisible}
              onRequestClose={closeScroller}
            >
              <View style={styles.dateScrollerAlignment}>
                <View style={styles.doneButtonContainer}>
                  <TouchableOpacity onPress={() => { setScrollerVisible(false); closeScroller(); }}>
                    <Text style={styles.doneButtonText}>Done</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.dateScroller}>
                  {isScrollerVisible && (
                    <DateTimePicker
                      value={selectedDate}
                      mode="date"
                      display="spinner"
                      onChange={(event, date) => {
                        if (date) setSelectedDate(date);
                      }}
                    />
                  )}
                </View>
              </View>
            </Modal>
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
  infoContainer: {
    marginVertical: 10,
    marginLeft: 25,
  },
  itemName: {
    marginBottom: 5,
    fontSize: 20,
  },
  itemDetails: {
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
    borderRadius: 8,
    padding: 25,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modalContainerText: {
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  quantityInput: {
    width: 70,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'lightgray',
    padding: 10,
    fontSize: 16,
  },
  expirationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  expirationInput: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'lightgray',
    padding: 10,
  },
  dateScrollerAlignment: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  dateScroller: {
    paddingBottom: 25,
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  doneButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'gray',
  },
  doneButtonText: {
    paddingTop: 15,
    paddingHorizontal: 25,
    color: '#50ccff',
    fontSize: 20,
    fontWeight: 600,
  },
  saveButton: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ff8667',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PantryItem