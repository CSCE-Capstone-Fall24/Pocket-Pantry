import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Pressable, Alert } from "react-native";
import { BlurView } from "expo-blur";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

type PantryProps = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiration: Date;
  shared: boolean[];
  roommates: string[];
  deleteItem: (id: string) => void;
};

const PantryItem = (props: PantryProps) => {
  const units = [
    "pieces", "oz", "lbs", "tbsp", "tsp", "fl oz", "c", "pt",
    "qt", "gal", "mg", "g", "kg", "ml", "l", "drops", "dashes",
    "pinches", "handfuls", "cloves", "slices", "sticks", "cans",
    "bottles", "packets", "bunches", "leaves", "stones", "sprigs",
  ];
  const sharedColors = [
    "#e167a4", "#f4737e", "#ff8667", "#ffb778",
    "#fde289", "#ade693", "#89e0b3", "#78dbde",
    "#6eabd7", "#7a6ed7","#ae5da2",
  ];
  
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

  {/* Functions - edit expiration date */}
  const [isExpirationPickerVisible, setExpirationPickerVisible] = useState(false);
  const openExpirationPicker = () => setExpirationPickerVisible(true);
  const closeExpirationPicker = () => setExpirationPickerVisible(false);
  const [expiration, setExpiration] = useState(props.expiration);
  const [tempExpiration, setTempExpiration] = useState(expiration);

  {/* Functions - set item as shared */}
  const [shared, setShared] = useState(props.shared);
  const [tempShared, setTempShared] = useState(shared);
  const sharedToggle = (index: number) => {
    setTempShared((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = !updatedState[index];
      return updatedState;
    });
  };

  {/* Functions - cancel/save user changes */}
  const handleCancel = () => {
    setTempQuantity(quantity);
    setTempUnit(unit);
    setTempExpiration(expiration);
    setTempShared(shared);
  }
  const handleSave = () => {
    if (isNaN(Number(tempQuantity))) {
      Alert.alert("Please enter a valid quantity.");
    } else if (tempQuantity != "" && Number(tempQuantity) <= 0) {
      props.deleteItem(props.id);
    } else {
      if (tempQuantity != "") {
        setQuantity(tempQuantity);
      } else {
        setTempQuantity(quantity);
      }
      setUnit(tempUnit);
      setExpiration(tempExpiration);
      setShared(tempShared);
      closeWindow();
    }
  };

  {/* Functions - confirm choice to delete item */}
  const confirmDelete = () => {
    // Alert.alert(
    //   "Delete item?",
    //   ``,
    //   [{ text: "Cancel", style: "cancel", }, { text: "OK", onPress: () => props.deleteItem(props.id), }],
    //   { cancelable: true }
    // );
    props.deleteItem(props.id);
  };

  return (
    <View style={styles.container}>

      {/* Displayed item information */}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.itemContainer}>
        <View style={styles.rowAlignment}>
          <Text style={styles.itemName}>{props.name} </Text>
          {props.roommates.map((roommate: string, index: number) => {
            return shared[index] ? (<Text key={index}> <Ionicons name="ellipse" size={13} color={sharedColors[index%11]}/></Text>) : null;
          })}
        </View>
        <Text style={styles.itemDetails}>{quantity} {unit}   Exp. {expiration.toLocaleDateString()}</Text>
      </View>
      </ScrollView>

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
        <View style={[StyleSheet.absoluteFill, styles.blurOverlay]}>
          <BlurView style={StyleSheet.absoluteFill} intensity={30}/>
        </View>
        <View style={styles.windowAlignment}>
          <View style={styles.windowContainer}>
            <Text style={styles.windowTitle} numberOfLines={1} ellipsizeMode="tail">{props.name}</Text>
            <Text style={styles.windowSubtitle}>{props.category}</Text>
            
            {/* Edit quantity */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldText}>Edit quantity:  </Text>
              <TextInput
                style={styles.quantityInput}
                value={tempQuantity}
                onChangeText={(value) => setTempQuantity(value)}
              />
              
              {/* Edit unit */}
              <TouchableOpacity style={styles.pickerInput} onPress={openUnitPicker}>
                  <Text style={styles.fieldText}>{tempUnit}</Text>
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
                <View style={styles.pickerA}>
                  {isUnitPickerVisible && (
                    <Picker selectedValue={tempUnit} onValueChange={(value) => setTempUnit(value)}>
                      {units.map((unit, index) => (<Picker.Item key={index} label={unit} value={unit}/>))}
                    </Picker>
                  )}
                </View>
              </View>
            </Modal>

            {/* Edit expiration date */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldText}>Edit expiration date:  </Text>
              <TouchableOpacity style={styles.pickerInput} onPress={openExpirationPicker}>
                <Text style={styles.fieldText}>{tempExpiration.toLocaleDateString()}</Text>
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
                <View style={styles.pickerB}>
                  {isExpirationPickerVisible && (
                    <DateTimePicker
                      value={tempExpiration}
                      mode="date"
                      display="spinner"
                      onChange={(event, date) => {if (date) setTempExpiration(date);}}
                    />
                  )}
                </View>
              </View>
            </Modal>

            {/* Set item as shared */}
            <ScrollView horizontal={false} style={styles.sharedScroll}>
                <View style={styles.sharedAlignment}>
                  {props.roommates.map((roommate: string, index: number) => {
                    return (
                      <View key={roommate} style={styles.sharedContainer}>
                        <Text style={styles.fieldText} numberOfLines={1} ellipsizeMode="tail">Shared with {roommate}</Text>
                        <Pressable style={styles.iconSpacer} onPress={() => sharedToggle(index)}>
                          {tempShared[index] ? (
                            <Ionicons name="checkmark-circle" size={32} color={sharedColors[index]}/>
                          ) : (
                            <Ionicons name="ellipse-outline" size={32} color={sharedColors[index]}/>
                          )}
                        </Pressable>
                      </View>
                    );
                  })}
                </View>
              </ScrollView>  

            {/* Cancel/save user changes */}
            <View style={styles.rowAlignment}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => { closeWindow(); handleCancel(); }}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveButton} onPress={() => { handleSave(); }}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>

            {/* Delete item */}
            <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
              <Ionicons name="trash" size={32} color="#ff5555" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  itemDetails: {
    color: "gray",
  },
  editButton: {
    marginHorizontal: 5,
    padding: 20,
  },
  blurOverlay: {
    backgroundColor: `rgba(0, 0, 0, ${.1})`
  },
  windowAlignment: {
    flex: 1,
    justifyContent: "center",
  },
  windowContainer: {
    marginHorizontal: 50,
    borderRadius: 12,
    padding: 35,
    alignItems: "center",
    backgroundColor: "white",
  },
  windowTitle: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 15,
  },
  windowSubtitle: {
    fontWeight: 600,
    marginBottom: 35,
    color: "gray",
  },
  fieldText: {
    fontSize: 16,
  },
  fieldContainer: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  quantityInput: {
    marginRight: 10,
    width: 70,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "lightgray",
    padding: 10,
    fontSize: 16,
  },
  pickerInput: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#f0f0f0",
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  pickerSpacer: {
    flex: 1,
  },
  pickerA: {
    paddingBottom: 30,
    backgroundColor: "lightgray",
  },
  pickerB: {
    paddingBottom: 30,
    alignItems: "center",
    backgroundColor: "lightgray",
  },
  doneButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: "lightgray",
  },
  doneButtonText: {
    marginTop: 15,
    marginHorizontal: 25,
    color: "#2fb1ff",
    fontSize: 20,
    fontWeight: 600,
  },
  sharedScroll: {
    marginBottom: 35,
    maxHeight: 220,
    width: 250,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "lightgray",
  },
  sharedAlignment: {
    marginTop: 22,
    marginBottom: 10,
    marginHorizontal: 35,
    alignItems: "center",
  },
  sharedContainer: {
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  iconSpacer: {
    marginLeft: 5,
  },
  cancelButton: {
    marginRight: 35,
    width: 90,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#ff8667",
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "white",
  },
  cancelButtonText: {
    color: "#ff8667",
    fontSize: 16,
    fontWeight: "bold",
  },
  saveButton: {
    width: 90,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#ff8667",
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#ff8667",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    marginTop: 35,
  }
});

export default PantryItem