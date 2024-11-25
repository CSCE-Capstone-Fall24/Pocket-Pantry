import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Pressable, Alert } from "react-native";
import { BlurView } from "expo-blur";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useUserContext } from "./contexts/UserContext";

// const TEST_USER_ID = '83';

type Roommate = {
  id: number; 
  name: string; 
  isReciprocal: boolean;
};

type PantryProps = {
  id: string;
  user_id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiration: Date;
  shared: boolean[];
  shared_with: string[];
  deleteItem: (id: string, user_id: string) => void;
};

const PantryItem = (props: PantryProps) => {
  const { userData, setUserData } = useUserContext();

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
  // const [newShared, setNewShared] = useState<boolean[]>(new Array(reciprocatedRoommates.length).fill(false));
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
    // make POST request to EDIT item
    if (isNaN(Number(tempQuantity))) {
      Alert.alert("Please enter a valid quantity.");
    } else if (tempQuantity != "" && Number(tempQuantity) <= 0) {
      props.deleteItem(props.id, props.user_id);
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
    props.deleteItem(props.id, props.user_id);
  };

  return (
    <View style={styles.container}>

      {/* Displayed item information */}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.itemContainer}>
          <View style={styles.rowAlignment}>
            <Text style={styles.itemName}>{props.name} </Text>
            {props.shared_with.map((roommate: string, index: number) => {
              return (<Text key={index}> <Ionicons name="ellipse" size={13} color={sharedColors[index%11]}/></Text>);
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
            {
              userData.user_id == props.user_id ? (
                // IF USER VIEWING IS OWNER, GIVE THEM FULL SHARE PERMISSIONS
                props.shared_with.length > 0 && (
                  <ScrollView horizontal={false} style={styles.sharedScroll}>
                      {props.shared_with.map((roommate: string, index: number) => {
                        return (
                          <View key={roommate} style={styles.sharedContainer}>
                            <Text style={styles.sharedText} numberOfLines={1} ellipsizeMode="tail">Shared with {roommate}</Text>
                            <Pressable onPress={() => sharedToggle(index)}>
                                <Ionicons name="checkmark-circle" size={32} color={sharedColors[index]}/>
                            </Pressable>
                          </View>
                        );
                      })}
                  </ScrollView>
                )
              ) : (
                // USER VIEWING IS NOT OWNER
                // SHOW OWNER
                <ScrollView horizontal={false} style={styles.sharedScroll}>
                  <View key={999} style={styles.sharedContainer}>
                    <Text style={styles.sharedText} numberOfLines={1} ellipsizeMode="tail">Item Owner: {props.user_id}</Text>
                  </View>
                  {/* // SHOW SHARED WITH
                  // MARK YOU IN SHARED WITH */}
                  {props.shared_with.map((roommate: string, index: number) => {
                        return (
                          <View key={roommate} style={styles.sharedContainer}>
                            <Text style={styles.sharedText} numberOfLines={1} ellipsizeMode="tail">Shared with {roommate}</Text>
                            <Pressable>
                                <Ionicons name="checkmark-circle" size={32} color={sharedColors[index]}/>
                            </Pressable>
                            {roommate == userData.user_id && <Text style={styles.sharedText} numberOfLines={1} ellipsizeMode="tail">(You)</Text>}
                          </View>
                        );
                      })}
                </ScrollView>

              )
            }

            {/* Cancel/save user changes */}
            <View style={styles.buttonAlignment}>
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
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    shadowColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  itemContainer: {
    marginVertical: 12,
    marginLeft: 15,
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
    marginHorizontal: 2,
    padding: 20,
  },
  blurOverlay: {
    backgroundColor: `rgba(0, 0, 0, ${.15})`
  },
  windowAlignment: {
    flex: 1,
    justifyContent: "center",
  },
  windowContainer: {
    marginHorizontal: 35,
    borderRadius: 8,
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
    marginBottom: 15,
    color: "gray",
  },
  fieldText: {
    fontSize: 16,
  },
  fieldContainer: {
    marginTop: 20,
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
    paddingBottom: 35,
    backgroundColor: "#f0f0f0",
  },
  pickerB: {
    paddingBottom: 35,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  doneButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: "#f0f0f0",
  },
  doneButtonText: {
    marginTop: 15,
    marginHorizontal: 25,
    color: "#2fb1ff",
    fontSize: 20,
    fontWeight: 600,
  },
  sharedScroll: {
    marginTop: 20,
    maxHeight: 190,
    width: 270,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "lightgray",
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  sharedContainer: {
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  sharedText: {
    marginRight: 5,
    flexShrink: 1,
    fontSize: 16,
  },
  buttonAlignment: {
    marginTop: 35,
    flexDirection: "row",
    alignItems: "center",
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
  },
});

export default PantryItem;