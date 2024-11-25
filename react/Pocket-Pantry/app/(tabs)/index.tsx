import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import MealItem from '@/components/MealItem';
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker'
//import Roommates from '@/components/Roommates';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export default function Meal () {
  /*const [items, setItems] = useState([
    { id: "1", name: "Meal1", servings: 1, date: new Date(),
      shared: [false, false, false, false], roommates: ["Roommie 1", "Roommie 2", "Roommie 3", "Roommie 4"],
      ingredients: ["apple", "orange", "tomato"], ingredient_units: ["lbs", "oz", "purple"], ingredient_quantities: [1, 2, 3] },
    { id: "2", name: "Meal2", servings: 2, date: new Date(),
      shared: [false, false, false, false], roommates: ["Roommie 1", "Roommie 2", "Roommie 3", "Roommie 4"],
      ingredients: ["apple", "orange", "tomato"], ingredient_units: ["lbs", "oz", "purple"], ingredient_quantities: [1, 2, 3] },
    { id: "3", name: "Meal3", servings: 3, date: new Date(),
      shared: [false, false, false, false], roommates: ["Roommie 1", "Roommie 2", "Roommie 3", "Roommie 4"],
      ingredients: ["apple", "orange", "tomato"], ingredient_units: ["lbs", "oz", "purple"], ingredient_quantities: [1, 2, 3] },
    { id: "4", name: "Meal4", servings: 4, date: new Date(),
      shared: [false, false, false, false], roommates: ["Roommie 1", "Roommie 2", "Roommie 3", "Roommie 4"],
      ingredients: ["apple", "orange", "tomato"], ingredient_units: ["lbs", "oz", "purple"], ingredient_quantities: [1, 2, 3] }
  ]);*/

  interface Meal {
    id: string;
    name: string;
    servings: number;
    date: Date;
    shared: boolean[];
    roommates: string[];
    ingredients: string[];
    ingredientUnits: string[];
    ingredientQuantities: number[];
    cookTime: number;
    recipe: string;
    deleteMeal: (id: string) => void;
  }
  const [meals, setMeals] = useState<Meal[]>([]);

  {/* Functions - search meal window */}
  const [isWindowVisible, setWindowVisible] = useState(false);
  const openWindow = () => setWindowVisible(true);
  const closeWindow = () => {
    // We'll need to tie this in with our meal search algorithm
    setSearch('');
    setWindowVisible(false);
    setNewName('');
    setNewServings('');
    setNewDate(new Date());
    setNewShared([false, false, false, false]);
  };
  const [newSearch, setSearch] = useState('');

  {/* Functions - new meal name */}
  const [newName, setNewName] = useState('');

  {/* Functions - new meal servings */}
  const [newServings, setNewServings] = useState('');
  
  {/* Functions - new date to cook */}
  const [newDate, setNewDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const openDatePicker = () => setDatePickerVisible(true);
  const closeDatePicker = () => setDatePickerVisible(false);
  
  {/* Functions - set new meal as shared */}
  const roommates = ["BrianG", "ConnorH", "NickC", "JacobM"];
  const [newShared, setNewShared] = useState([false, false, false, false]);
  const sharedToggle = (index: number) => {
    setNewShared((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = !updatedState[index];
      return updatedState;
    });
  };

    {/* Functions - add meal */}
  const addMeal = () => {
    if (isNaN(Number(newServings))) {
      Alert.alert('Servings must be a number.');
    } else if (newName && newServings && newDate && newShared) {
      const newMeal = {
        id: uuidv4(),
        name: newName,
        servings: Number(newServings),
        date: newDate,
        shared: newShared,
        roommates: roommates,
        ingredients: ['','','','',''],
        ingredientUnits: ['','','','',''],
        ingredientQuantities: [0,0,0,0,0],
        cookTime: 0,
        recipe: "",
        deleteMeal: deleteMeal,
      };
      setMeals([...meals, newMeal]);
      closeWindow();
    } else {
      Alert.alert('Please fill out all fields.');
    }
  };

  {/* Functions - delete meal */}
  const deleteMeal = (id: string) => {
    setMeals((prevMeals) => prevMeals.filter(meal => meal.id !== id));
  };

  {/* Functions - date headers */}
  // TODO:

  return (
    <ScrollView>
      <SafeAreaView>

        <View style={styles.header}>
          <Text style={styles.title}>
            Meal Plan
          </Text>
          <Text style={styles.tempSubtitle}>
            (Frontend Branch) {/* This will need to be removed */}
          </Text>
          <TouchableOpacity style={styles.addButton} onPress={openWindow}>
            <Ionicons name="add-outline" size={40} color="white"/>
          </TouchableOpacity>
        </View>

        {/* Add meal window */}
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
            <View style={styles.windowContainer}>
              <Text style={styles.windowTitle}>Add Meal</Text>
              
              {/* Search Bar */}
              <View style={styles.mealSearchBarOuter}>
                <TextInput
                  style={styles.mealSearchBarInner}
                  placeholder = "Search for meals" // This should maybe be gray to distinguish it from actual text inputs
                  placeholderTextColor = "black"
                  onChangeText={(value) => setSearch(value)}
                />
                <Ionicons name="search-outline" size={40} color="#ff8667"/>
              </View>

              {/* --Input-servings-- User should select meal and THEN input serving */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldText}>Servings:  </Text>
                <TextInput
                  style={styles.nameInput}
                  value={newServings}
                  onChangeText={(value) => setNewServings(value)}
                />
              </View>

              {/* Input date to cook meal*/}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldText}>Date to cook meal:  </Text>
                <TouchableOpacity style={styles.pickerInput} onPress={openDatePicker}>
                  <Text style={styles.fieldText}>{newDate.toLocaleDateString()}</Text>
                </TouchableOpacity>
              </View>

              {/* Date to cook picker */}
              <Modal
                transparent={true}
                animationType="slide"
                visible={isDatePickerVisible}
                onRequestClose={closeDatePicker}
              >
                <Pressable style={styles.pickerSpacer} onPress={closeDatePicker}></Pressable>
                <View>
                  <View style={styles.doneButtonContainer}>
                    <TouchableOpacity onPress={closeDatePicker}>
                      <Text style={styles.doneButtonText}>Done</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.pickerB}>
                    {isDatePickerVisible && (
                      <DateTimePicker
                        value={newDate}
                        mode="date"
                        display="spinner"
                        onChange={(event, date) => {if (date) setNewDate(date);}}
                      />
                    )}
                  </View>
                </View>
              </Modal>

              {/* Set new meal as shared */}
              <View style={styles.sharedSpacer}>
                <View style={styles.sharedContainer}>
                  <Text style={styles.fieldText}>Shared with {roommates[0]}:  </Text>
                  <Pressable onPress={() => sharedToggle(0)}>
                    {newShared[0] ? (
                      <Ionicons name="checkmark-circle" size={32} color="#e167a4"/>
                    ) : (
                      <Ionicons name="ellipse-outline" size={32} color="#e167a4"/>
                    )}
                  </Pressable>
                </View>

                <View style={styles.sharedContainer}>
                  <Text style={styles.fieldText}>Shared with {roommates[1]}:  </Text>
                  <Pressable onPress={() => sharedToggle(1)}>
                    {newShared[1] ? (
                      <Ionicons name="checkmark-circle" size={32} color="#f4737e"/>
                    ) : (
                      <Ionicons name="ellipse-outline" size={32} color="#f4737e"/>
                    )}
                  </Pressable>
                </View>

                <View style={styles.sharedContainer}>
                  <Text style={styles.fieldText}>Shared with {roommates[2]}:  </Text>
                  <Pressable onPress={() => sharedToggle(2)}>
                    {newShared[2] ? (
                      <Ionicons name="checkmark-circle" size={32} color="#ff8667"/>
                    ) : (
                      <Ionicons name="ellipse-outline" size={32} color="#ff8667"/>
                    )}
                  </Pressable>
                </View>

                <View style={styles.sharedContainer}>
                  <Text style={styles.fieldText}>Shared with {roommates[3]}:  </Text>
                  <Pressable onPress={() => sharedToggle(3)}>
                    {newShared[3] ? (
                      <Ionicons name="checkmark-circle" size={32} color="#ffb778"/>
                    ) : (
                      <Ionicons name="ellipse-outline" size={32} color="#ffb778"/>
                    )}
                  </Pressable>
                </View>
              </View>

              {/* Cancel/save new item */}
              <View style={styles.rowAlignment}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => { closeWindow(); }}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.saveButton} onPress={() => { addMeal(); }}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Text style={styles.date}>MEAT, POULTRY & SEAFOOD</Text>
        {meals.map((meal) => (
          <View key={meal.id}>
            <View style={styles.line}></View>
            <MealItem id={meal.id} name={meal.name} servings={meal.servings} date={meal.date}
              shared={meal.shared} roommates={meal.roommates}
              ingredients={meal.ingredients} ingredientUnits={meal.ingredientUnits} ingredientQuantities={meal.ingredientQuantities}
              cookTime={meal.cookTime} recipe={meal.recipe}
              deleteMeal={deleteMeal}/>
          </View>
        ))}

        {/* {categorizedItems.map((categoryGroup) => (
          categoryGroup.items.length > 0 && (
            <View key={categoryGroup.category}>
              <Text style={styles.category}>
                {categoriesB[categoriesA.indexOf(categoryGroup.category)]}
              </Text>
              {categoryGroup.items.map((item) => (
                <View key={item.id}>
                  <View style={styles.line}></View>
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
        ))} */}
        
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
  tempSubtitle: { // This will need to be removed
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 25,
    color: 'gray',
    fontWeight: 600,
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
  windowAlignment: {
    flex: 1,
    justifyContent: 'center',
  },
  windowContainer: {
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
  fieldContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldText: {
    fontSize: 16,
  },
  nameInput: {
    width: 145,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'lightgray',
    padding: 10,
    fontSize: 16,
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
  pickerInput: {
    maxWidth: 170,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'lightgray',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  pickerSpacer: {
    flex: 1,
  },
  pickerA: {
    paddingBottom: 30,
    backgroundColor: 'gray',
  },
  pickerB: {
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
    marginBottom: 12,
    alignItems: 'center',
  },
  sharedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
  mealSearchBarOuter: {
    marginLeft: 20,
    width: 300,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'lightgray',
    padding: 10,
    fontSize: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    
  },
  mealSearchBarInner: {
    marginLeft: 10,
    width: 250,
    fontSize: 16,
  },
  date: {
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
});
