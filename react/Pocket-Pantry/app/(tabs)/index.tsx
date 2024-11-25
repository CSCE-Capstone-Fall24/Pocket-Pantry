import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Pressable, Alert } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import MealItem from '@/components/MealItem';
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker'
//import Roommates from '@/components/Roommates';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export default function Meal () {
  const [meals, setMeals] = useState([
    { id: "1", name: "Meal1", servings: 1, date: new Date(),
      shared: [false, false, false, false], roommates: ["Roommie 1", "Roommie 2", "Roommie 3", "Roommie 4"],
      ingredients: ["apple", "orange", "tomato"], ingredientUnits: ["lbs", "oz", "purple"], ingredientQuantities: [1, 2, 3], 
      cookTime: 15, recipe: "There is no recipe, figure it out yourself" },
    { id: "2", name: "Meal2", servings: 2, date: new Date(),
      shared: [false, false, false, false], roommates: ["Roommie 1", "Roommie 2", "Roommie 3", "Roommie 4"],
      ingredients: ["apple", "orange", "tomato"], ingredientUnits: ["lbs", "oz", "purple"], ingredientQuantities: [1, 2, 3], 
      cookTime: 15, recipe: "There is no recipe, figure it out yourself" },
    { id: "3", name: "Meal3", servings: 3, date: new Date(),
      shared: [false, false, false, false], roommates: ["Roommie 1", "Roommie 2", "Roommie 3", "Roommie 4"],
      ingredients: ["apple", "orange", "tomato"], ingredientUnits: ["lbs", "oz", "purple"], ingredientQuantities: [1, 2, 3], 
      cookTime: 15, recipe: "There is no recipe, figure it out yourself" },
    { id: "4", name: "Meal4", servings: 4, date: new Date(),
      shared: [false, false, false, false], roommates: ["Roommie 1", "Roommie 2", "Roommie 3", "Roommie 4"],
      ingredients: ["apple", "orange", "tomato"], ingredientUnits: ["lbs", "oz", "purple"], ingredientQuantities: [1, 2, 3], 
      cookTime: 15, recipe: "There is no recipe, figure it out yourself" }
  ]);

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
  const [plannedMeals, setPlannedMeals] = useState<Meal[]>([]);

  {/* Functions - search meal window */}
  const [isWindowVisible, setWindowVisible] = useState(false);
  const openWindow = () => setWindowVisible(true);
  const closeWindow = () => {
    setWindowVisible(false);
    setSearch('');
    // Then we need to pull in recipes from database using meal-search algorithm
  };

  {/* Functions - search meal */}
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

        {/* Recipe search window */}
        <Modal
          transparent={true}
          animationType="slide"
          visible={isWindowVisible}
          onRequestClose={closeWindow}
        >
          <View style={styles.windowContainer}>
            <View style={styles.windowHeader}>
              
              <View style={styles.searchBarContainer}>
                <TextInput
                  style={styles.searchBar}
                  placeholder="Search for recipes"
                  placeholderTextColor="gray"
                />
                <View style={styles.searchBarIcon}>
                  <Ionicons name="search" size={20} color="gray"/>
                </View>
              </View>

              <TouchableOpacity style={styles.closeButton} onPress={closeWindow}>
                <Ionicons name="close-outline" size={32} color="white"/>
              </TouchableOpacity>
            </View>

            <ScrollView>

            </ScrollView>
          </View>
        </Modal>

      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    marginTop: 30,
    marginLeft: 25,
    fontSize: 32,
    fontWeight: 700,
  },
  windowHeader: {
    marginTop: 75,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBarContainer: {
    marginLeft: 30,
    height: 40,
    width: "68%",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  searchBar: {
    marginHorizontal: 14,
    flex: 1,
    flexShrink: 1,
    fontSize: 16,
    backgroundColor: "#f0f0f0",
  },
  searchBarIcon: {
    marginRight: 14,
  },
  closeButton: {
    marginRight: 30,
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
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
