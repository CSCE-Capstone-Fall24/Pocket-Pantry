import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Pressable, Alert } from 'react-native'
import { BlurView } from 'expo-blur';
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker'
import { RecipeProps } from '@/components/RecipeItem';

type MealProps = RecipeProps & {
  mealId: string
  mealServings: number // default to recipeServings, user can change
  date: Date
  shared: boolean[]
  roommates: string[]
  deleteMeal: (id: string) => void
}

const MealItem = (props: MealProps) => {
  {/* Functions - view window */}
  const [isWindowVisible, setWindowVisible] = useState(false);
  const openWindow = () => setWindowVisible(true);
  const closeWindow = () => setWindowVisible(false);

  {/* Functions - edit meal servings */}
  const [servings, setServings] = useState(props.mealServings.toString());
  const [tempServings, setTempServings] = useState(servings);

  {/* Functions - edit date to cook*/}
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const openDatePicker = () => setDatePickerVisible(true);
  const closeDatePicker = () => setDatePickerVisible(false);
  const [date, setDate] = useState(props.date);
  const [tempDate, setTempDate] = useState(date);

  {/* Functions - set meal as shared */}
  const [shared, setShared] = useState(props.shared);
  const [tempShared, setTempShared] = useState(shared);
  const sharedToggle = (index: number) => {
    setTempShared((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = !updatedState[index];
      return updatedState;
    });
  };

  {/* Functions - set ingredient arrays */}
  const [ingredientQuantities, setIngredientQuantities] = useState(props.ingredientQuantities.toString());
  const [tempIngredientQuantities, setTempIngredientQuantities] = useState(ingredientQuantities);

  {/* Functions - cancel/save user changes */}
  const handleCancel = () => {
    setTempServings(servings);
    setTempDate(date);
    setTempShared(shared);
    setTempIngredientQuantities(ingredientQuantities);
  }
  const handleSave = () => {
    if (isNaN(Number(tempServings))) {
      Alert.alert('Please enter a valid number of servings.');
    } else if (tempServings != '' && Number(tempServings) <= 0) {
      props.deleteMeal(props.mealId);
    } else {
      setIngredientQuantities(
        String(Number(tempIngredientQuantities) * (Number(tempServings)/Number(servings)))
      ); // idk if this actually works properly; needs to be tested
      if (tempServings != '') {
        setServings(tempServings);
      } else {
        setTempServings(servings);
      }
      setDate(date);
      setShared(tempShared);
      closeWindow();
    }
  };

  {/* Functions - confirm choice to delete meal */}
  const confirmDelete = () => {
    Alert.alert(
      'Delete meal?',
      ``,
      [{
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => props.deleteMeal(props.mealId),
      }],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>

      {/* Displayed item information */}
      <View style={styles.mealContainer}>
        <Text style={styles.dateContainer}>
          {date.toLocaleDateString()}
        </Text>
        <View style={styles.rowAlignment}>
          <Text style={styles.mealName}>{props.name}</Text>
          {shared[0] ? (<Text>  <Ionicons name="ellipse" size={13} color="#e167a4"/></Text>) : (null)}
          {shared[1] ? (<Text>  <Ionicons name="ellipse" size={13} color="#f4737e"/></Text>) : (null)}
          {shared[2] ? (<Text>  <Ionicons name="ellipse" size={13} color="#ff8667"/></Text>) : (null)}
          {shared[3] ? (<Text>  <Ionicons name="ellipse" size={13} color="#ffb778"/></Text>) : (null)}
        </View>
      </View>

      <TouchableOpacity style={styles.viewButton} onPress={openWindow}>
        <Ionicons name="pencil" size={26} color="gray"/> {/*change this to View button*/}
      </TouchableOpacity>

      {/* View window */}
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
            <Text style={styles.windowTitle}>{props.name}</Text>

            {/* Edit date to cook */}
            <View style={styles.dateContainer}>
              <Text style={styles.fieldText}>Planned To Cook On:  </Text>
              <TouchableOpacity style={styles.pickerInput} onPress={openDatePicker}>
                <Text style={styles.fieldText}>{tempDate.toLocaleDateString()}</Text>
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
                      value={tempDate}
                      mode="date"
                      display="spinner"
                      onChange={(event, date) => {if (date) setTempDate(date);}}
                    />
                  )}
                </View>
              </View>
            </Modal>

            {/* Edit servings */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldText}>Servings:  </Text>
              <TextInput
                style={styles.servingsInput}
                value={tempServings}
                onChangeText={(value) => setTempServings(value)}
              />
            </View>

            {/* Set meal as shared */}
            <View style={styles.sharedSpacer}>
              <View style={styles.sharedContainer}>
                <Text style={styles.fieldText}>Shared with {props.roommates[0]}:  </Text>
                <Pressable onPress={() => sharedToggle(0)}>
                  {tempShared[0] ? (
                    <Ionicons name="checkmark-circle" size={32} color="#e167a4"/>
                  ) : (
                    <Ionicons name="ellipse-outline" size={32} color="#e167a4"/>
                  )}
                </Pressable>
              </View>

              <View style={styles.sharedContainer}>
                <Text style={styles.fieldText}>Shared with {props.roommates[1]}:  </Text>
                <Pressable onPress={() => sharedToggle(1)}>
                  {tempShared[1] ? (
                    <Ionicons name="checkmark-circle" size={32} color="#f4737e"/>
                  ) : (
                    <Ionicons name="ellipse-outline" size={32} color="#f4737e"/>
                  )}
                </Pressable>
              </View>

              <View style={styles.sharedContainer}>
                <Text style={styles.fieldText}>Shared with {props.roommates[2]}:  </Text>
                <Pressable onPress={() => sharedToggle(2)}>
                  {tempShared[2] ? (
                    <Ionicons name="checkmark-circle" size={32} color="#ff8667"/>
                  ) : (
                    <Ionicons name="ellipse-outline" size={32} color="#ff8667"/>
                  )}
                </Pressable>
              </View>

              <View style={styles.sharedContainer}>
                <Text style={styles.fieldText}>Shared with {props.roommates[3]}:  </Text>
                <Pressable onPress={() => sharedToggle(3)}>
                  {tempShared[3] ? (
                    <Ionicons name="checkmark-circle" size={32} color="#ffb778"/>
                  ) : (
                    <Ionicons name="ellipse-outline" size={32} color="#ffb778"/>
                  )}
                </Pressable>
              </View>
            </View>   

            {/* List Ingredients */}
          <View style={styles.ingredientsContainer}>
            <Text style={styles.fieldText}>Ingredients:</Text>
            {props.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <Text style={styles.ingredientText}>
                  {props.ingredientQuantities[index]} {props.ingredientUnits[index]} {ingredient}
                </Text>
              </View>
            ))}
          </View>

            {/* Cook Time */}

            {/* Recipe Steps */}

            {/* Cooked and Remove buttons */}
            
            {/* Cancel/save user changes */}
            <View style={styles.rowAlignment}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => { closeWindow(); handleCancel(); }}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveButton} onPress={() => { handleSave(); }}>
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
  mealContainer: {
    marginVertical: 10,
    marginLeft: 25,
  },
  rowAlignment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealName: {
    marginBottom: 5,
    fontSize: 20,
  },
  mealDetails: {
    color: 'gray',
  },
  viewButton: {
    marginRight: 5,
    padding: 20,
  },
  windowAlignment: {
    flex: 1,
    justifyContent: 'center',
  },
  windowContainer: {
    marginHorizontal: 50,
    borderRadius: 8,
    padding: 35,
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  windowTitle: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 30,
  },
  windowSubtitle: {
    fontWeight: 600,
    marginBottom: 35,
    color: 'gray',
  },
  fieldText: {
    fontSize: 16,
  },
  fieldContainer: {
    marginBottom: 20,
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
    marginTop: 10,
    marginBottom: 10,
    color: 'gray',
    fontSize: 24,
    fontWeight: 600,
  },
  pickerInput: {
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
  deleteButton: {
    marginTop: 35,
  },
  ingredientsContainer: {
    marginTop: 10,
    marginBottom: 20,
    paddingLeft: 10,
  },
  ingredientItem: {
    marginVertical: 5,
    paddingLeft: 15,
  },
  ingredientText: {
    fontSize: 16,
    color: 'gray',
  },  
});

export default MealItem;