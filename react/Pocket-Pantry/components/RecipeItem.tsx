import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Pressable } from 'react-native'
import { BlurView } from 'expo-blur';
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker'

type RecipeProps = {
  id: number
  name: string
  servings: number
  ingredientUnit: string[] 
  ingredientQuantities: number[]
  // Add an ingredients array; probably gonna be a string array
  ingredients: string[]
};

const MealItem = (props: RecipeProps) => {
  const [isWindowVisible, setWindowVisible] = useState(false);
  const openWindow = () => setWindowVisible(true);
  const closeWindow = () => setWindowVisible(false);

  const [servings, setServings] = useState(props.servings.toString());
  const [tempServings, setTempServings] = useState(servings);

  const [isScrollerVisible, setScrollerVisible] = useState(false);
  const openScroller = () => setScrollerVisible(true);
  const closeScroller = () => setScrollerVisible(false);


  const [ingredients, setIngredients] = useState(props.ingredients.toString());
  const [tempIngredients, setTempIngredients] = useState(ingredients);

  const handleCancel = () => {
    setTempServings(servings);
    setTempIngredients(ingredients)
  }
  const handleSave = () => {
    if (tempServings != '' && !isNaN(Number(tempServings))) {
      setServings(tempServings);
    } else {
      setTempServings(servings);
    }
    setIngredients(ingredients)
  };

  return (
    <View style={styles.container}>

      {/* Displayed item information */}
      <View style={styles.itemContainer}>
        <View style={styles.rowAlignment}>
          <Text style={styles.itemName}>{props.name}</Text>
        </View>
        <Text style={styles.itemDetails}>{servings} {props.servings}</Text>
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
            
            {/* Edit servings */}
            <View style={styles.servingsContainer}>
              <Text style={styles.windowText}>Edit servings:  </Text>
              <TextInput
                style={styles.servingsInput}
                value={tempServings}
                onChangeText={(value) => setTempServings(value)}
              />
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
  servingsContainer: {
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealSearchBar: {
    width: 70,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'lightgray',
    padding: 10,
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

export default MealItem;