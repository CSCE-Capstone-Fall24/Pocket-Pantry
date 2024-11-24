import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, TextInput, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import MealItem from '@/components/MealItem';
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker'

const API_URL = process.env["EXPO_PUBLIC_API_URL"];

export default function Meal () {
  const [items, setItems] = useState([
    { id: 1, name: "Meal1", servings: 10, unit: "lbs", date: new Date(), shared: [false, false, false, false], ingredients: ["ingredient1", "ingredient2", "ingredient3", "ingredient4", "ingredient5"]  },
    { id: 2, name: "Meal2", servings: 10, unit: "lbs", date: new Date(), shared: [false, false, false, false], ingredients: ["ingredient1", "ingredient2", "ingredient3", "ingredient4", "ingredient5"]  },
    { id: 3, name: "Meal3", servings: 10, unit: "lbs", date: new Date(), shared: [false, false, false, false], ingredients: ["ingredient1", "ingredient2", "ingredient3", "ingredient4", "ingredient5"]  },
    { id: 4, name: "Meal4", servings: 10, unit: "lbs", date: new Date(), shared: [false, false, false, false], ingredients: ["ingredient1", "ingredient2", "ingredient3", "ingredient4", "ingredient5"]  },
  ]);

  const [isWindowVisible, setWindowVisible] = useState(false);
  const openWindow = () => setWindowVisible(true);
  const closeWindow = () => {
    setSearch('');
    setWindowVisible(false);
    setNewName('');
    setNewServings('');
    setNewUnit('');
    setNewDate(new Date());
    setNewShared([false, false, false, false]);
  };

  const [newSearch, setSearch] = useState('');
  const [newName, setNewName] = useState('');
  const [newServings, setNewServings] = useState('');
  const [newUnit, setNewUnit] = useState('');
  
  const [newDate, setNewDate] = useState(new Date());
  const [isScrollerVisible, setScrollerVisible] = useState(false);
  const openScroller = () => setScrollerVisible(true);
  const closeScroller = () => setScrollerVisible(false);
  
  const [newShared, setNewShared] = useState([false, false, false, false]);
  const newSharedToggle = (index: number) => {
    setNewShared((prevState) =>
      prevState.map((item, i) => (i === index ? !item : item))
    );
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${API_URL}/all_recipes`);
        const data = await response.json();
        setSearch(data);
        console.log("FETCHING");
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);
  
  const renderRecipes = ({item}:{item:any}) => (
    <MealItem
      id={item.id}
      name={item.food_name}
      servings={item.servings}
      unit={item.unit}
      date={item.expiration_date}
      shared={item.shared}
      ingredients={item.ingredients}
    />
  );

  const addItem = () => {
    if (isNaN(Number(newServings))) {
      Alert.alert('Servings must be a number.');
    } else if (newName && newServings && newDate && newShared) {
      const newItem = {
        id: items.length + 1,
        name: newName,
        servings: Number(newServings),
        unit: newUnit,
        date: newDate,
        shared: newShared,
        ingredients: ['','','','',''],
      };
      setItems([...items, newItem]);
      closeWindow();
    } else {
      Alert.alert('Please fill out all fields.');
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.scrollerSpacer}>

        <View style={styles.header}>
          <Text style={styles.title}>
          Meal Plan
          </Text>
        </View>

        <View style={styles.mealSearchBarOuter}>
          <TextInput
            style={styles.mealSearchBarInner}
            placeholder = "Search for meals"
            placeholderTextColor = "black"
            onChangeText={(value) => setSearch(value)}
          />
          <Ionicons name="search-outline" size={40} color="#ff8667"/>
        </View>
        <FlatList
          data={newSearch}
          keyExtractor={(item) => item.recipe_id.toString}
          renderItem={renderRecipes}
          ItemSeparatorComponent={() => <View style={styles.line}></View>}
        />

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

              {/* Input servings */}
              <View style={styles.servingsContainer}>
                <Text style={styles.windowText}>Servings:  </Text>
                <TextInput
                  style={styles.servingsInput}
                  value={newServings}
                  onChangeText={(value) => setNewServings(value)}
                />
              </View>

              {/* Input unit */}
              

              {/* Input date to cook meal*/}
              <View style={styles.dateContainer}>
                <Text style={styles.windowText}>Date to cook meal:  </Text>
                <TouchableOpacity
                  style={styles.dateInput}
                  onPress={openScroller}
                >
                  <Text style={styles.windowText}>{newDate.toLocaleDateString()}</Text>
                </TouchableOpacity>
              </View>

              {/* Cook date scroller */}
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
                        value={newDate}
                        mode="date"
                        display="spinner"
                        onChange={(event, date) => {
                          if (date) setNewDate(date);
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
            <MealItem id={item.id} name={item.name} servings={item.servings} unit={item.unit} date={item.date} shared={item.shared} ingredients={item.ingredients}/>
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
  servingsContainer: {
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
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
  servingsInput: {
    width: 70,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'lightgray',
    padding: 10,
    fontSize: 16,
  },
  dateContainer: {
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateInput: {
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