import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Pressable } from 'react-native'
import { BlurView } from 'expo-blur';
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker';
import Roommates from './Roommates';

type Roommate = {
  id: number; 
  name: string; 
  isReciprocal: boolean;
};

type PantryProps = {
  id: number
  name: string
  quantity: number
  unit: string
  expiration: Date
  shared: boolean[]
  canShareWith: Roommate[]
};

const PantryItem = (props: PantryProps) => {
  {/* Functions - edit window */}
  const [isWindowVisible, setWindowVisible] = useState(false);
  const openWindow = () => setWindowVisible(true);
  const closeWindow = () => setWindowVisible(false);

  {/* Functions - edit quantity */}
  const [quantity, setQuantity] = useState(props.quantity.toString());
  const [tempQuantity, setTempQuantity] = useState(quantity);

  {/* Functions - edit unit */}
  const [unit, setUnit] = useState(props.unit);
  const [tempUnit, setTempUnit] = useState(unit);
  const [isUnitPickerVisible, setUnitPickerVisible] = useState(false);
  const openUnitPicker = () => setUnitPickerVisible(true);
  const closeUnitPicker = () => setUnitPickerVisible(false);  
  const units = [
    "pieces", "oz", "lbs", "tbsp", "tsp", "fl oz", "c", "pt",
    "qt", "gal", "mg", "g", "kg", "ml", "l", "drops", "dashes",
    "pinches", "handfuls", "cloves", "slices", "sticks", "cans",
    "bottles", "packets", "bunches", "leaves", "stones", "sprigs"
  ];

  {/* Functions - edit expiration date */}
  const [isExpirationPickerVisible, setExpirationPickerVisible] = useState(false);
  const openExpirationPicker = () => setExpirationPickerVisible(true);
  const closeExpirationPicker = () => setExpirationPickerVisible(false);
  const [expiration, setExpiration] = useState(props.expiration);
  const [tempExpiration, setTempExpiration] = useState(expiration);

  {/* Functions - set item as shared */}
  const [shared, setShared] = useState(props.shared);
  const [tempShared, setTempShared] = useState(shared);
  const tempSharedToggle = (index: number) => {
    setTempShared((prevState) =>
      prevState.map((item, i) => (i === index ? !item : item))
    );
  };

  {/* Functions - cancel/save user changes */}
  const handleCancel = () => {
    setTempQuantity(quantity)
    setTempUnit(unit)
    setTempExpiration(expiration)
    setTempShared(shared)
  }
  const handleSave = () => {
    if (tempQuantity != '' && !isNaN(Number(tempQuantity))) {
      setQuantity(tempQuantity)
    } else {
      setTempQuantity(quantity)
    }
    setUnit(tempUnit)
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
        <Text style={styles.itemDetails}>{quantity} {unit}   Exp. {expiration.toLocaleDateString()}</Text>
      </View>
      {/* <View style={styles.itemContainer}>
        <View style={styles.rowAlignment}>
          <Text style={styles.itemName}>{props.name}</Text>
          {props.canShareWith.map((roommate, index) =>
            shared[index] ? (
              <Ionicons
                key={roommate.id}
                name="ellipse"
                size={13}
                color={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
              />
            ) : null
          )}
        </View>
      </View> */}

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
              
              {/* Edit unit */}
              <TouchableOpacity
                  style={styles.pickerInput}
                  onPress={openUnitPicker}
                >
                  <Text style={styles.windowText}>{tempUnit}</Text>
                </TouchableOpacity>
            </View>

            {/* Unit picker */}
            <Modal
              transparent={true}
              animationType="slide"
              visible={isUnitPickerVisible}
              onRequestClose={closeUnitPicker}
            >
              <Pressable style={styles.pickerSpacer} onPress={closeUnitPicker}></Pressable>
              <View>
                <View style={styles.doneButtonContainer}>
                  <TouchableOpacity onPress={closeUnitPicker}>
                    <Text style={styles.doneButtonText}>Done</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.unitPicker}>
                  {isUnitPickerVisible && (
                    <Picker
                      selectedValue={tempUnit}
                      onValueChange={(value) => setTempUnit(value)}
                    >
                      {units.map((unit, index) => (
                        <Picker.Item key={index} label={unit} value={unit} />
                      ))}
                    </Picker>
                  )}
                </View>
              </View>
            </Modal>

            {/* Edit expiration date */}
            <View style={styles.expirationContainer}>
              <Text style={styles.windowText}>Edit expiration date:  </Text>
              <TouchableOpacity
                style={styles.pickerInput}
                onPress={openExpirationPicker}
              >
                <Text style={styles.windowText}>{tempExpiration.toLocaleDateString()}</Text>
              </TouchableOpacity>
            </View>

            {/* Expiration date picker */}
            <Modal
              transparent={true}
              animationType="slide"
              visible={isExpirationPickerVisible}
              onRequestClose={closeExpirationPicker}
            >
              <Pressable style={styles.pickerSpacer} onPress={closeExpirationPicker}></Pressable>
              <View>
                <View style={styles.doneButtonContainer}>
                  <TouchableOpacity onPress={closeExpirationPicker}>
                    <Text style={styles.doneButtonText}>Done</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.expirationPicker}>
                  {isExpirationPickerVisible && (
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
            {/* <View style={styles.sharedSpacer}>
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
            </View>   */}

            <View style={styles.sharedSpacer}>
              {props.canShareWith.map((roommate, index) => (
                <View key={roommate.id} style={styles.sharedContainer}>
                  <Text style={styles.windowText}>Shared with {roommate.name}: </Text>
                  <Pressable onPress={() => tempSharedToggle(index)}>
                    {tempShared[index] ? (
                      <Ionicons name="checkmark-circle" size={32} color="#2fb1ff" />
                    ) : (
                      <Ionicons name="ellipse-outline" size={32} color="#2fb1ff" />
                    )}
                  </Pressable>
                </View>
              ))}
            </View>


            {/* Cancel/save user changes */}
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
    marginRight: 10,
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
  pickerInput: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'lightgray',
    padding: 10,
  },
  pickerSpacer: {
    flex: 1,
  },
  unitPicker: {
    paddingBottom: 30,
    backgroundColor: 'gray',
  },
  expirationPicker: {
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

export default PantryItem;