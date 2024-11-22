import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Pressable } from 'react-native'
import { BlurView } from 'expo-blur';
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker'

type PantryProps = {
  name: string
  quantity: number
  unit: string
};

const PantryItem = (props: PantryProps) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const [quantity, setQuantity] = useState(props.quantity.toString());
  const [tempQuantity, setTempQuantity] = useState(quantity);
  const handleQuantitySave = (value: string) => {
    if (value != '') {
      setQuantity(tempQuantity);
    } else {
      setTempQuantity(quantity);
    }
  };

  const [isScrollerVisible, setScrollerVisible] = useState(false);
  const openScroller = () => setScrollerVisible(true);
  const closeScroller = () => setScrollerVisible(false);
  const [expirationDate, setExpirationDate] = useState(new Date());

  const [isShared1, setShared1] = useState(false);
  const handleShared1 = () => { setShared1((prevState) => !prevState); };
  const [isShared2, setShared2] = useState(false);
  const handleShared2 = () => { setShared2((prevState) => !prevState); };
  const [isShared3, setShared3] = useState(false);
  const handleShared3 = () => { setShared3((prevState) => !prevState); };
  const [isShared4, setShared4] = useState(false);
  const handleShared4 = () => { setShared4((prevState) => !prevState); };
  
  return (
    <View style={styles.container}>

      {/* Displayed item information */}
      <View style={styles.infoContainer}>
        <View style={styles.sharedIcons}>
          <Text style={styles.itemName}>{props.name}</Text>
          {isShared1 ? (<Text>  <Ionicons name="ellipse" size={13} color="#e167a4"/></Text>) : (null)}
          {isShared2 ? (<Text>  <Ionicons name="ellipse" size={13} color="#f4737e"/></Text>) : (null)}
          {isShared3 ? (<Text>  <Ionicons name="ellipse" size={13} color="#ff8667"/></Text>) : (null)}
          {isShared4 ? (<Text>  <Ionicons name="ellipse" size={13} color="#ffb778"/></Text>) : (null)}
        </View>
        <Text style={styles.itemDetails}>{quantity} {props.unit}   Exp. {expirationDate.toLocaleDateString()}</Text>
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
                value={tempQuantity}
                onChangeText={(value) => setTempQuantity(value)}
              />
              <Text style={styles.modalContainerText}>  {props.unit}</Text>
            </View>

            {/* Edit expiration date */}
            <View style={styles.expirationContainer}>
              <Text style={styles.modalContainerText}>Edit expiration date:  </Text>
              <TouchableOpacity
                style={styles.expirationInput}
                onPress={openScroller}
              >
                <Text style={styles.modalContainerText}>{expirationDate.toLocaleDateString()}</Text>
              </TouchableOpacity>
            </View>

            {/* Set item as shared */}
            <View style={styles.sharedSpacer}>

              <View style={styles.sharedContainer}>
                <Text style={styles.modalContainerText}>Shared with user1:  </Text>
                <Pressable onPress={handleShared1}>
                  {isShared1 ? (
                    <Ionicons name="checkmark-circle" size={32} color="#e167a4"/>
                  ) : (
                    <Ionicons name="ellipse-outline" size={32} color="#e167a4"/>
                  )}
                </Pressable>
              </View>

              <View style={styles.sharedContainer}>
                <Text style={styles.modalContainerText}>Shared with user2:  </Text>
                <Pressable onPress={handleShared2}>
                  {isShared2 ? (
                    <Ionicons name="checkmark-circle" size={32} color="#f4737e"/>
                  ) : (
                    <Ionicons name="ellipse-outline" size={32} color="#f4737e"/>
                  )}
                </Pressable>
              </View>

              <View style={styles.sharedContainer}>
                <Text style={styles.modalContainerText}>Shared with user3:  </Text>
                <Pressable onPress={handleShared3}>
                  {isShared3 ? (
                    <Ionicons name="checkmark-circle" size={32} color="#ff8667"/>
                  ) : (
                    <Ionicons name="ellipse-outline" size={32} color="#ff8667"/>
                  )}
                </Pressable>
              </View>

              <View style={styles.sharedContainer}>
                <Text style={styles.modalContainerText}>Shared with user4:  </Text>
                <Pressable onPress={handleShared4}>
                  {isShared4 ? (
                    <Ionicons name="checkmark-circle" size={32} color="#ffb778"/>
                  ) : (
                    <Ionicons name="ellipse-outline" size={32} color="#ffb778"/>
                  )}
                </Pressable>
              </View>

            </View>     
          
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => {closeModal(); handleQuantitySave(tempQuantity); }}
            >
              <Text style={styles.closeButtonText}>Close</Text>
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
                  <TouchableOpacity onPress={closeScroller}>
                    <Text style={styles.doneButtonText}>Done</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.dateScroller}>
                  {isScrollerVisible && (
                    <DateTimePicker
                      value={expirationDate}
                      mode="date"
                      display="spinner"
                      onChange={(event, date) => {
                        if (date) setExpirationDate(date);
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
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoContainer: {
    marginVertical: 10,
    marginLeft: 25,
  },
  sharedIcons: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
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
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  expirationInput: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'lightgray',
    padding: 10,
  },
  sharedSpacer: {
    marginBottom: 15,
    alignItems: 'center',
  },
  sharedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
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
    marginTop: 15,
    marginHorizontal: 25,
    color: '#2fb1ff',
    fontSize: 20,
    fontWeight: 600,
  },
  closeButton: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ff8667',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PantryItem;