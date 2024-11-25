import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import PantryItem from "@/components/PantryItem";

export default function Pantry () {
  interface Item {
    id: string;
    name: string;
    category: string;
    quantity: number;
    unit: string;
    expiration: Date;
    shared: boolean[];
    roommates: string[];
    deleteItem: (id: string) => void;
  }
  const [items, setItems] = useState<Item[]>([]);

  type Roommate = {
    id: number; 
    name: string; 
    isReciprocal: boolean;
  };

  const categoriesA = [
    "Proteins", "Fresh Produce", "Dairy & Alternatives",
    "Bakery, Grains & Dried Goods", "Canned & Jarred Goods",
    "Frozen Foods", "Baking Essentials", "Condiments, Sauces & Dressings",
    "Herbs, Spices & Seasonings", "Oils, Fats & Vinegars",
    "Beverages", "Snacks & Treats", "Specialty & Miscellaneous",
  ];
  const categoriesB = [
    "PROTEINS", "FRESH PRODUCE", "DAIRY & ALTERNATIVES",
    "BAKERY, GRAINS & DRIED GOODS", "CANNED & JARRED GOODS",
    "FROZEN FOODS", "BAKING ESSENTIALS", "CONDIMENTS, SAUCES & DRESSINGS",
    "HERBS, SPICES & SEASONINGS", "OILS, FATS & VINEGARS",
    "BEVERAGES", "SNACKS & TREATS", "SPECIALTY & MISCELLANEOUS",
  ];
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

  {/* Functions - add item window */}
  const [isWindowVisible, setWindowVisible] = useState(false);
  const openWindow = () => setWindowVisible(true);
  const closeWindow = () => {
    setWindowVisible(false);
    setNewName("");
    setNewCategory("Proteins");
    setNewQuantity("");
    setNewUnit("pieces");
    setNewExpiration(new Date());
    setNewShared([false, false, false, false]);
  };

  {/* Functions - new item name */}
  const [newName, setNewName] = useState("");

  {/* Functions - new item category */}
  const [newCategory, setNewCategory] = useState("Proteins");
  const [isCategoryPickerVisible, setCategoryPickerVisible] = useState(false);
  const openCategoryPicker = () => setCategoryPickerVisible(true);
  const closeCategoryPicker = () => setCategoryPickerVisible(false);
  
  {/* Functions - new item quantity */}
  const [newQuantity, setNewQuantity] = useState("");

  {/* Functions - new item unit */}
  const [newUnit, setNewUnit] = useState("pieces");
  const [isUnitPickerVisible, setUnitPickerVisible] = useState(false);
  const openUnitPicker = () => setUnitPickerVisible(true);
  const closeUnitPicker = () => setUnitPickerVisible(false);
  
  {/* Functions - new item expiration date */}
  const [newExpiration, setNewExpiration] = useState(new Date());
  const [isExpirationPickerVisible, setExpirationPickerVisible] = useState(false);
  const openExpirationPicker = () => setExpirationPickerVisible(true);
  const closeExpirationPicker = () => setExpirationPickerVisible(false);
  
  {/* Functions - set new item as shared */}
  const reciprocatedRoommates = [
    "username1", "username2", "username3333333333", "username4",
    "username5", "username6", "username7", "username8",
    "username9", "username10", "username11",
  ];
  const [newShared, setNewShared] = useState<boolean[]>(new Array(reciprocatedRoommates.length).fill(false));
  const sharedToggle = (index: number) => {
    setNewShared((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = !updatedState[index];
      return updatedState;
    });
  };

  {/* Functions - add item */}
  const addItem = () => {
    if (!(newName && newQuantity)) {
      Alert.alert("Please fill out all fields.");
    } else if (isNaN(Number(newQuantity)) || Number(newQuantity) <= 0) {
      Alert.alert("Please enter a valid quantity.");
    } else {
      const newItem = {
        id: uuidv4(),
        name: newName,
        category: newCategory,
        quantity: Number(newQuantity),
        unit: newUnit,
        expiration: newExpiration,
        shared: newShared,
        roommates: reciprocatedRoommates,
        deleteItem: deleteItem,
      };
      setItems([...items, newItem]);
      closeWindow();
    }
  };

  {/* Functions - delete item */}
  const deleteItem = (id: string) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  {/* Functions - category headers */}
  const categorizedItems = categoriesA.map((category) => ({
    category, items: items.filter((item) => item.category === category),
  }));

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.title}>Pantry</Text>
        <TouchableOpacity style={styles.addButton} onPress={openWindow}>
          <Ionicons name="add-outline" size={40} color="white"/>
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
      
        {/* Add item window */}
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
              <Text style={styles.windowTitle}>Add item</Text>
              
              {/* Input name */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldText}>Name:  </Text>
                <TextInput
                  style={styles.nameInput}
                  value={newName}
                  onChangeText={(value) => setNewName(value)}
                />
              </View>

              {/* Input category */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldText}>Category:  </Text>
                <TouchableOpacity style={styles.pickerInput} onPress={openCategoryPicker}>
                  <Text style={styles.fieldText} numberOfLines={1} ellipsizeMode="tail">{newCategory}</Text>
                </TouchableOpacity>
              </View>

              {/* Category picker */}
              <Modal
                transparent={true}
                animationType="slide"
                visible={isCategoryPickerVisible}
                onRequestClose={closeCategoryPicker}
              >
                <Pressable style={styles.pickerSpacer} onPress={closeCategoryPicker}></Pressable>
                <View>
                  <View style={styles.doneButtonContainer}>
                    <TouchableOpacity onPress={closeCategoryPicker}>
                      <Text style={styles.doneButtonText}>Done</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.pickerA}>
                    {isCategoryPickerVisible && (
                      <Picker selectedValue={newCategory} onValueChange={(newCategory) => setNewCategory(newCategory)}>
                        {categoriesA.map((category, index) => (
                          <Picker.Item key={index} label={category} value={category} />
                        ))}
                      </Picker>
                    )}
                  </View>
                </View>
              </Modal>

              {/* Input quantity */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldText}>Quantity:  </Text>
                <TextInput
                  style={styles.quantityInput}
                  value={newQuantity}
                  onChangeText={(value) => setNewQuantity(value)}
                />

                {/* Input unit */}
                <TouchableOpacity style={styles.pickerInput} onPress={openUnitPicker}>
                  <Text style={styles.fieldText}>{newUnit}</Text>
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
                      <Picker selectedValue={newUnit} onValueChange={(newUnit) => setNewUnit(newUnit)}>
                        {units.map((unit, index) => (
                          <Picker.Item key={index} label={unit} value={unit} />
                        ))}
                      </Picker>
                    )}
                  </View>
                </View>
              </Modal>
              
              {/* Input expiration date */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldText}>Expiration date:  </Text>
                <TouchableOpacity style={styles.pickerInput} onPress={openExpirationPicker}>
                  <Text style={styles.fieldText}>{newExpiration.toLocaleDateString()}</Text>
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
                        value={newExpiration}
                        mode="date"
                        display="spinner"
                        onChange={(event, date) => {if (date) setNewExpiration(date);}}
                      />
                    )}
                  </View>
                </View>
              </Modal>

              {/* Set new item as shared */}
              {reciprocatedRoommates.length > 0 && (
                <ScrollView horizontal={false} style={styles.sharedScroll}>
                  {reciprocatedRoommates.map((roommate: string, index: number) => {
                    return (
                      <View key={roommate} style={styles.sharedContainer}>
                        <Text style={styles.sharedText} numberOfLines={1} ellipsizeMode="tail">Shared with {roommate}</Text>
                        <Pressable onPress={() => sharedToggle(index)}>
                          {newShared[index] ? (
                            <Ionicons name="checkmark-circle" size={32} color={sharedColors[index%11]}/>
                          ) : (
                            <Ionicons name="ellipse-outline" size={32} color={sharedColors[index%11]}/>
                          )}
                        </Pressable>
                      </View>  
                    );
                  })}
                </ScrollView>
              )}

              {/* Cancel/save new item */}
              <View style={styles.buttonAlignment}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => { closeWindow(); }}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.saveButton} onPress={() => { addItem(); }}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Display items */}
        {categorizedItems.map((categoryGroup) => (
          categoryGroup.items.length > 0 && (
            <View key={categoryGroup.category}>
              <Text style={styles.categoryHeader}>
                {categoriesB[categoriesA.indexOf(categoryGroup.category)]}
              </Text>
              {categoryGroup.items.map((item) => (
                <View key={item.id}>
                  <PantryItem
                    id={item.id}
                    name={item.name}
                    category={item.category}
                    quantity={item.quantity}
                    unit={item.unit}
                    expiration={item.expiration}
                    shared={item.shared}
                    roommates={item.roommates}
                    deleteItem={deleteItem}
                  />
                </View>
              ))}
            </View>
          )
        ))}
        <View style={styles.itemBuffer}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 25
  },
  title: {
    marginTop: 30,
    marginLeft: 25,
    fontSize: 32,
    fontWeight: 700,
  },
  addButton: {
    marginTop: 25,
    marginRight: 25,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff8667",
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
    marginBottom: 10,
  },
  fieldContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  fieldText: {
    fontSize: 16,
  },
  nameInput: {
    width: 145,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "lightgray",
    padding: 10,
    fontSize: 16,
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
    maxWidth: 170,
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
  categoryHeader: {
    marginTop: 40,
    marginLeft: 25,
    color: "gray",
    fontWeight: 600,
  },
  itemBuffer: {
    height: 80,
  },
});
