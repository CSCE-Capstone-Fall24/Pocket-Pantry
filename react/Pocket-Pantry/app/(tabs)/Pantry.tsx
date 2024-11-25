import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import PantryItem from '@/components/PantryItem';
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker';
import { useUserContext } from '@/components/contexts/UserContext';

const API_URL = process.env["EXPO_PUBLIC_API_URL"];

export default function Pantry () {
  type Roommate = {
    id: number; 
    name: string; 
    isReciprocal: boolean;
  };
  
  interface Item {
    id: number;
    name: string;
    quantity: number;
    unit: string;
    expiration: Date;
    shared: boolean[];
  }

  const [items, setItems] = useState<Item[]>([]);
  const { userData, setUserData } = useUserContext();
  const reciprocatedRoommates = userData.roommates
  .filter((roommate: { is_reciprocated: any; }) => roommate.is_reciprocated)
  .map((roommate: { roommate_id: any; username: any; is_reciprocated: any; }) => ({
    id: roommate.roommate_id,
    name: roommate.username,
    isReciprocal: roommate.is_reciprocated,
  }));

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_URL}/whole_pantry/?user_id=${userData.user_id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        // console.log(data);

        const transformedItems: Item[] = data.map((item: any) => ({
          id: item.pantry_id,
          name: item.food_name,
          quantity: item.quantity,
          unit: item.unit,
          expiration: new Date(item.expiration_date),
          shared: item.shared_with.map((sharedUserId: number) => 
            reciprocatedRoommates.some((roommate: Roommate) => roommate.id === sharedUserId)
          ),
        }));        

        setItems(transformedItems);
        alert("GOT ITEMS AS\n" + transformedItems);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  {/* Functions - add item window */}
  const [isWindowVisible, setWindowVisible] = useState(false);
  const openWindow = () => setWindowVisible(true);
  const closeWindow = () => {
    setWindowVisible(false);
    setNewName('');
    setNewQuantity('');
    setNewUnit('oz');
    setNewExpiration(new Date());
    // setNewShared([false, false, false, false]);
    setNewShared(new Array(reciprocatedRoommates.length).fill(false));
  };

  {/* Functions - new item name/quantity */}
  const [newName, setNewName] = useState('');
  const [newQuantity, setNewQuantity] = useState('');

   {/* Functions - new item unit */}
  const [newUnit, setNewUnit] = useState('oz');
  const [isUnitPickerVisible, setUnitPickerVisible] = useState(false);
  const openUnitPicker = () => setUnitPickerVisible(true);
  const closeUnitPicker = () => setUnitPickerVisible(false);  
  const units = [
    "pieces", "oz", "lbs", "tbsp", "tsp", "fl oz", "c", "pt",
    "qt", "gal", "mg", "g", "kg", "ml", "l", "drops", "dashes",
    "pinches", "handfuls", "cloves", "slices", "sticks", "cans",
    "bottles", "packets", "bunches", "leaves", "stones", "sprigs"
  ];
  
   {/* Functions - new item expiration date */}
  const [newExpiration, setNewExpiration] = useState(new Date());
  const [isExpirationPickerVisible, setExpirationPickerVisible] = useState(false);
  const openExpirationPicker = () => setExpirationPickerVisible(true);
  const closeExpirationPicker = () => setExpirationPickerVisible(false);
  
   {/* Functions - set new item as shared */}
  // const [newShared, setNewShared] = useState([false, false, false, false]);
  const [newShared, setNewShared] = useState<boolean[]>(new Array(reciprocatedRoommates.length).fill(false));
  const newSharedToggle = (index: number) => {
    setNewShared((prevState) =>
      prevState.map((item, i) => (i === index ? !item : item))
    );
  };

  {/* Functions - add item */}
  const addItem = async () => {
    if (isNaN(Number(newQuantity))) {
      Alert.alert('Quantity must be a number.');
    } else if (newName && newQuantity && newUnit && newExpiration && newShared) {
      // Prepare the item object to send to the backend
      const newItem = {
        food_name: newName,
        quantity: Number(newQuantity),
        unit: newUnit,
        user_id: userData.user_id, // assuming `userData` contains the user's ID
        expiration_date: newExpiration.toISOString(), // format the expiration date as ISO string
        shared_with: reciprocatedRoommates
          .filter((roommate: Roommate) => newShared[reciprocatedRoommates.indexOf(roommate)]) // Only include roommates selected as shared
          .map((roommate: Roommate) => roommate.id),
      };

      console.log("INSERTING ITEM: ");
      console.log(newItem);
  
      try {
        const response = await fetch(`${API_URL}/add_item/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newItem),
        });
  
        if (!response.ok) {
          throw new Error('Failed to add item to pantry');
        }
  
        const addedItem = await response.json();
  
        const transformedAddedItem: Item = {
          id: addedItem.pantry_id,
          name: addedItem.food_name,
          quantity: addedItem.quantity,
          unit: addedItem.unit,
          expiration: new Date(addedItem.expiration_date),
          shared: addedItem.shared_with.map((sharedUserId: number) => 
            reciprocatedRoommates.some((roommate: Roommate) => roommate.id === sharedUserId)
          ),
        };
  
        setItems(prevItems => [...prevItems, transformedAddedItem]);
  
        // console.log(transformedAddedItem);
        closeWindow();
      } catch (error) {
        console.error('Error adding item:', error);
        alert('Error, Failed to add item.');
      }
    } else {
      alert('Please fill out all fields.');
    }
  };
  

  return (
    <ScrollView>
      <SafeAreaView>

        <View style={styles.header}>
          <Text style={styles.title}>Pantry</Text>
          <TouchableOpacity style={styles.addButton} onPress={openWindow}>
            <Ionicons name="add-outline" size={40} color="white"/>
          </TouchableOpacity>
        </View>

        {/* Add item window */}
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
              <Text style={styles.windowTitle}>Add item</Text>
              
              {/* Input name */}
              <View style={styles.nameContainer}>
                <Text style={styles.windowText}>Name:  </Text>
                <TextInput
                  style={styles.nameInput}
                  value={newName}
                  onChangeText={(value) => setNewName(value)}
                />
              </View>

              {/* Input quantity */}
              <View style={styles.quantityContainer}>
                <Text style={styles.windowText}>Quantity:  </Text>
                <TextInput
                  style={styles.quantityInput}
                  value={newQuantity}
                  onChangeText={(value) => setNewQuantity(value)}
                />

                {/* Input unit */}
                <TouchableOpacity
                  style={styles.pickerInput}
                  onPress={openUnitPicker}
                >
                  <Text style={styles.windowText}>{newUnit}</Text>
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
                        selectedValue={newUnit}
                        onValueChange={(newUnit) => setNewUnit(newUnit)}
                      >
                        {units.map((unit, index) => (
                          <Picker.Item key={index} label={unit} value={unit} />
                        ))}
                      </Picker>
                    )}
                  </View>
                </View>
              </Modal>
              
              {/* Input expiration date */}
              <View style={styles.expirationContainer}>
                <Text style={styles.windowText}>Expiration date:  </Text>
                <TouchableOpacity
                  style={styles.pickerInput}
                  onPress={openExpirationPicker}
                >
                  <Text style={styles.windowText}>{newExpiration.toLocaleDateString()}</Text>
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
                        value={newExpiration}
                        mode="date"
                        display="spinner"
                        onChange={(event, date) => {
                          if (date) setNewExpiration(date);
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
                  <Pressable onPress={() => newSharedToggle(0)}>
                    {newShared[0] ? (
                      <Ionicons name="checkmark-circle" size={32} color="#e167a4"/>
                    ) : (
                      <Ionicons name="ellipse-outline" size={32} color="#e167a4"/>
                    )}
                  </Pressable>
                </View>

                <View style={styles.sharedContainer}>
                  <Text style={styles.windowText}>Shared with user2:  </Text>
                  <Pressable onPress={() => newSharedToggle(1)}>
                    {newShared[1] ? (
                      <Ionicons name="checkmark-circle" size={32} color="#f4737e"/>
                    ) : (
                      <Ionicons name="ellipse-outline" size={32} color="#f4737e"/>
                    )}
                  </Pressable>
                </View>

                <View style={styles.sharedContainer}>
                  <Text style={styles.windowText}>Shared with user3:  </Text>
                  <Pressable onPress={() => newSharedToggle(2)}>
                    {newShared[2] ? (
                      <Ionicons name="checkmark-circle" size={32} color="#ff8667"/>
                    ) : (
                      <Ionicons name="ellipse-outline" size={32} color="#ff8667"/>
                    )}
                  </Pressable>
                </View>

                <View style={styles.sharedContainer}>
                  <Text style={styles.windowText}>Shared with user4:  </Text>
                  <Pressable onPress={() => newSharedToggle(3)}>
                    {newShared[3] ? (
                      <Ionicons name="checkmark-circle" size={32} color="#ffb778"/>
                    ) : (
                      <Ionicons name="ellipse-outline" size={32} color="#ffb778"/>
                    )}
                  </Pressable>
                </View>
              </View> */}

              <View style={styles.sharedSpacer}>
                {reciprocatedRoommates.map((roommate: Roommate, index: number) => {
                  const baseHue = 30;
                  const hueShift = 15;
                  const hue = (baseHue + index * hueShift) % 360;
                  const color = `hsl(${hue}, 100%, 50%)`;

                  return (
                    <View key={roommate.id} style={styles.sharedContainer}>
                      <Text style={styles.windowText}>Shared with {roommate.name}: </Text>
                      <Pressable onPress={() => newSharedToggle(index)}>
                        {newShared[index] ? (
                          <Ionicons name="checkmark-circle" size={32} color={color} /> // Use calculated HSL color
                        ) : (
                          <Ionicons name="ellipse-outline" size={32} color={color} /> // Use calculated HSL color
                        )}
                      </Pressable>
                    </View>
                  );
                })}
              </View>


              {/* Cancel/save new item */}
              <View style={styles.rowAlignment}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    closeWindow();
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.saveButton}
                  onPress={() => {
                    addItem();
                  }}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Text style={styles.category}>MEAT, POULTRY & SEAFOOD</Text>
        {items.map((item) => (
          <View key={item.id}>
            <View style={styles.line}></View>
            <PantryItem id={item.id} 
                        name={item.name} 
                        quantity={item.quantity} 
                        unit={item.unit} 
                        expiration={item.expiration} 
                        shared={item.shared}
                        canShareWith={reciprocatedRoommates}/>
          </View>
        ))}
        
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    marginTop: 25,
    marginLeft: 25,
    fontSize: 32,
    fontWeight: 700,
  },
  addButton: {
    marginTop: 25,
    marginRight: 25,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff8667',
  },
  category: {
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 25,
    color: 'gray',
    fontWeight: 600,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
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
  nameContainer: {
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameInput: {
    width: 135,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'lightgray',
    padding: 10,
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
  rowAlignment: {
    flexDirection: 'row',
    alignItems: 'center',
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
