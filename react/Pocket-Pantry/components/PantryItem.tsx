import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Pressable } from 'react-native'
import { BlurView } from 'expo-blur';
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker'

type PantryProps = {
  id: number
  name: string
  quantity: number
  unit: string
  expiration: Date
  shared: boolean[]
};

const PantryItem = (props: PantryProps) => {
  const [isWindowVisible, setWindowVisible] = useState(false);
  const openWindow = () => setWindowVisible(true);
  const closeWindow = () => setWindowVisible(false);

  const [quantity, setQuantity] = useState(props.quantity.toString());
  const [tempQuantity, setTempQuantity] = useState(quantity);

  const [isScrollerVisible, setScrollerVisible] = useState(false);
  const openScroller = () => setScrollerVisible(true);
  const closeScroller = () => setScrollerVisible(false);
  const [expiration, setExpiration] = useState(props.expiration);
  const [tempExpiration, setTempExpiration] = useState(expiration);

  const [shared, setShared] = useState(props.shared);
  const [tempShared, setTempShared] = useState(shared);
  const tempSharedToggle = (index: number) => {
    setTempShared((prevState) =>
      prevState.map((item, i) => (i === index ? !item : item))
    );
  };

  const handleCancel = () => {
    setTempQuantity(quantity);
    setTempExpiration(expiration);
    setTempShared(shared)
  }
  const handleSave = () => {
    if (tempQuantity != '' && !isNaN(Number(tempQuantity))) {
      setQuantity(tempQuantity);
    } else {
      setTempQuantity(quantity);
    }
    setExpiration(tempExpiration);
    setShared(tempShared)
  };

  return (
    <View style={styles.container}>

      {/* Displayed item information */}
      <View style={styles.itemContainer}>
        <View style={styles.rowAlignment}>
          <Text style={styles.itemName}>{props.name}</Text>
          {shared[0] ? (<Text>  <Ionicons name="ellipse" size={13} color="#e167a4"/></Text>) : (null)}
          {shared[1] ? (<Text>  <Ionicons name="ellipse" size={13} color="#f4737e"/></Text>) : (null)}
          {shared[2] ? (<Text>  <Ionicons name="ellipse" size={13} color="#ff8667"/></Text>) : (null)}
          {shared[3] ? (<Text>  <Ionicons name="ellipse" size={13} color="#ffb778"/></Text>) : (null)}
        </View>
        <Text style={styles.itemDetails}>{quantity} {props.unit}   Exp. {expiration.toLocaleDateString()}</Text>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={openWindow}>
        <Ionicons name="pencil" size={26} color="gray"/>
      </TouchableOpacity>

      {/* Edit window */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isWindowVisible}
        onRequestClose={closeWindow}
      >
        <BlurView
          style={StyleSheet.absoluteFill}
          intensity={20}
        />
        <View style={styles.windowAlignment}>
          <View style={styles.window}>
            <Text style={styles.windowTitle}>{props.name}</Text>
            
            {/* Edit quantity */}
            <View style={styles.quantityContainer}>
              <Text style={styles.windowText}>Edit quantity:  </Text>
              <TextInput
                style={styles.quantityInput}
                value={tempQuantity}
                onChangeText={(value) => setTempQuantity(value)}
              />
              <Text style={styles.windowText}>  {props.unit}</Text>
            </View>

            {/* Edit expiration date */}
            <View style={styles.expirationContainer}>
              <Text style={styles.windowText}>Edit expiration date:  </Text>
              <TouchableOpacity
                style={styles.expirationInput}
                onPress={openScroller}
              >
                <Text style={styles.windowText}>{tempExpiration.toLocaleDateString()}</Text>
              </TouchableOpacity>
            </View>

            {/* Expiration date scroller */}
            <Modal
              transparent={true}
              animationType="slide"
              visible={isScrollerVisible}
              onRequestClose={closeScroller}
            >
              <Pressable style={styles.scrollerSpacer} onPress={closeScroller}></Pressable>
              <View>
                <View style={styles.doneButtonContainer}>
                  <TouchableOpacity onPress={closeScroller}>
                    <Text style={styles.doneButtonText}>Done</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.scroller}>
                  {isScrollerVisible && (
                    <DateTimePicker
                      value={tempExpiration}
                      mode="date"
                      display="spinner"
                      onChange={(event, date) => {
                        if (date) setTempExpiration(date);
                      }}
                    />
                  )}
                </View>
              </View>
            </Modal>

            {/* Set item as shared */}
            <View style={styles.sharedSpacer}>
              <View style={styles.sharedContainer}>
                <Text style={styles.windowText}>Shared with user1:  </Text>
                <Pressable onPress={() => tempSharedToggle(0)}>
                  {tempShared[0] ? (
                    <Ionicons name="checkmark-circle" size={32} color="#e167a4"/>
                  ) : (
                    <Ionicons name="ellipse-outline" size={32} color="#e167a4"/>
                  )}
                </Pressable>
              </View>

              <View style={styles.sharedContainer}>
                <Text style={styles.windowText}>Shared with user2:  </Text>
                <Pressable onPress={() => tempSharedToggle(1)}>
                  {tempShared[1] ? (
                    <Ionicons name="checkmark-circle" size={32} color="#f4737e"/>
                  ) : (
                    <Ionicons name="ellipse-outline" size={32} color="#f4737e"/>
                  )}
                </Pressable>
              </View>

              <View style={styles.sharedContainer}>
                <Text style={styles.windowText}>Shared with user3:  </Text>
                <Pressable onPress={() => tempSharedToggle(2)}>
                  {tempShared[2] ? (
                    <Ionicons name="checkmark-circle" size={32} color="#ff8667"/>
                  ) : (
                    <Ionicons name="ellipse-outline" size={32} color="#ff8667"/>
                  )}
                </Pressable>
              </View>

              <View style={styles.sharedContainer}>
                <Text style={styles.windowText}>Shared with user4:  </Text>
                <Pressable onPress={() => tempSharedToggle(3)}>
                  {tempShared[3] ? (
                    <Ionicons name="checkmark-circle" size={32} color="#ffb778"/>
                  ) : (
                    <Ionicons name="ellipse-outline" size={32} color="#ffb778"/>
                  )}
                </Pressable>
              </View>
            </View>  

            {/* Cancel/save changes */}
            <View style={styles.rowAlignment}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => {
                  closeWindow();
                  handleCancel();
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.saveButton}
                onPress={() => {
                  closeWindow();
                  handleSave();
                }}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
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
  itemContainer: {
    marginVertical: 10,
    marginLeft: 25,
  },
  rowAlignment: {
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
  windowAlignment: {
    flex: 1,
    justifyContent: 'center',
  },
  window: {
    marginHorizontal: 50,
    borderRadius: 8,
    padding: 35,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  windowTitle: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 30,
  },
  windowText: {
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
  scrollerSpacer: {
    flex: 1,
  },
  scroller: {
    paddingBottom: 30,
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
  sharedSpacer: {
    marginBottom: 15,
    alignItems: 'center',
  },
  sharedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cancelButton: {
    marginRight: 35,
    width: 90,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#ff8667",
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  cancelButtonText: {
    color: '#ff8667',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    width: 90,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#ff8667",
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#ff8667',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PantryItem