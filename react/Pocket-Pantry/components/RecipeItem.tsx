import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Pressable, Alert } from "react-native";
import Modal from "react-native-modal"
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";

const API_URL = process.env["EXPO_PUBLIC_API_URL"];

type Roommate = {
  id: string; 
  name: string; 
  isReciprocal: boolean;
};

type RecipeProps = {
  id: number;
  name: string;
  description: string;
  servings: number;
  planned_servings: number;
  nutrition: number[];
  cook_time: number;
  cook_steps: string[];
  ingredients: string[];
  ingredient_quantities: number[];
  ingredient_units: string[];
  closeSearchWindow: () => void;

  editing: Boolean; // IF EDITING POST TO EDIT ON SAVE, ELSE POST TO ADD
  recip_roommates: Roommate[]; // need for share
  shared_with: Number[];
  user_id: Number;
  close_guy: () => void;
  deleteMeal: (arg1: string, arg2: string) => void;
  meal_id: string;
  refreshMeals: () => void;
};

const RecipeItem = (props: RecipeProps) => {
  const nutrition = ["Calories", "Fat", "Sugar", "Sodium", "Protein", "Saturated Fat", "Carbohydrates"];

  {/* Functions - view recipe window */}
  const [isZeWindowVisible, setWindowVisible] = useState(false);
  const openWindow = () => setWindowVisible(true);
  const closeWindow = () => {
    setWindowVisible(false);
    setServings(props.servings.toString());
    setQuantities(props.ingredient_quantities);
    setDate(new Date());

    if (props.editing) {
      setTimeout(() => {
        props.close_guy();
      }, 500);
    }
  };

  {/* Functions - add recipe to favorites */}
  const [favorited, setFavorited] = useState(false);

  {/* Functions - recipe text formatting */}
  const capitalizeFirstLetter = (value: string) => {
    if (!value) return "";
    return value.charAt(0).toUpperCase() + value.slice(1);
  };
  const separateHoursMinutes = (value: number) => {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return { hours, minutes };
  };
  const { hours, minutes } = separateHoursMinutes(props.cook_time);

  {/* Functions - set recipe servings */}
  const [servings, setServings] = useState(props.editing ? props.planned_servings.toString() : props.servings.toString());
  
  {/* Functions - adjust ingredient quantities based on recipe servings */}
  const [quantities, setQuantities] = useState(props.ingredient_quantities);
  const adjustQuantities = (value: string) => {
    setServings(value);
    if (props.servings > 0) {
      setQuantities(
        props.ingredient_quantities.map((item: number) =>
          value != "" && !isNaN(Number(value)) && Number(value) > 0 && item > 0
          ? ((Number(value) / props.servings) * item)
          : item
        )
      );
    }
  };

  useEffect(() => {
    adjustQuantities(servings);
  }, []);

  {/* Functions - set recipe date */}
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const openDatePicker = () => setDatePickerVisible(true);
  const closeDatePicker = () => setDatePickerVisible(false);
  const [date, setDate] = useState(new Date());

  {/* Functions - add recipe to meal plan */}
  const addRecipe = async () => {
    if (!servings || isNaN(Number(servings)) || Number(servings) <= 0) {
      Alert.alert('Please enter a valid quantity.');
    } else {
      
      const requestData = {
        user_id: props.user_id,
        recipe_id: props.id,
        n_servings: servings,
        is_shared: false, // shared_with.length > 0, // FIX
        shared_with: [],    // FIX
        expiration_date: date, // Expiration date
      };
    
      try {
        const response = await fetch(`${API_URL}/add_planned_meal/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to add the meal.');
        }
    
        const data = await response.json();
        alert('Meal added successfully!');
        
        props.refreshMeals();

        closeWindow();
        setTimeout(() => {
          props.closeSearchWindow();
        }, 350);

      } catch (error: any) {
        Alert.alert('Error', error.message || 'Something went wrong.');
      }
    }
  };

  useEffect(() => {
    if (props.editing) {
      setWindowVisible(true);
    }
  }, [props.editing]);

  return (
    <TouchableOpacity onPress={openWindow}>
      <View style={styles.container}>

        {/* Recipe card information */}
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{props.name}</Text>

        {/* View recipe window */}
        <Modal
          isVisible={isZeWindowVisible}
          onBackdropPress={closeWindow}
          animationIn="slideInRight"
          animationOut="slideOutRight"
          style={styles.window}
          backdropOpacity={0.0}
        >
          <ScrollView style={styles.recipeContainer}>
          
            {/* Back button/bookmark */}
            <View style={styles.recipeHeader}>
              <TouchableOpacity style={styles.backButton} onPress={closeWindow}>
                <Ionicons name={"chevron-back"} size={40} color="gray"/>
              </TouchableOpacity>

              {props.editing ? (
              <Pressable style={styles.bookmark} onPress={() => props.deleteMeal(props.meal_id.toString(), props.user_id.toString())}>
                <Ionicons name="trash" size={40} color="#ff8667"/>
              </Pressable>
              ) : null}

              <Pressable style={styles.bookmark} onPress={() => setFavorited(!favorited)}>
                <Ionicons name={favorited ? "bookmark" : "bookmark-outline"} size={40} color="#ff8667"/>
              </Pressable>
            </View>

            {/* Recipe title/description */}
            <Text style={styles.recipeTitle}>{props.name.toUpperCase()}</Text>
            {props.description
              ? <Text style={styles.recipeDescription}>"{props.description}"</Text>
              : null
            }

            <View
              style={[
                props.cook_time > 0 ||
                props.servings > 0
                  ? {marginTop: 25}
                  : undefined
              ]}
            >
              {/* Recipe cook time */}
              {hours > 0 && minutes > 0 ? (
                <Text style={styles.recipeText}>
                  Total prep/cook time: {hours} hours, {minutes} minutes
                </Text>
              ) : hours > 0 ? (
                <Text style={styles.recipeText}>
                  Total prep/cook time: {hours} hours
                </Text>
              ) : minutes > 0 ? (
                <Text style={styles.recipeText}>
                  Total prep/cook time: {minutes} minutes
                </Text>
              ) : null}

              {/* Recipe servings */}
              {props.servings > 0 ? (
                !servings || isNaN(Number(servings)) || Number(servings) <= 0 ? (
                  <Text style={styles.recipeText}>
                    Servings: {props.servings.toString()}
                  </Text>
                ) : (
                  <Text style={styles.recipeText}>Servings: {servings}</Text>
                )
              ) : null}
            </View>

            {/* Recipe ingredient information */}
            <Text style={styles.recipeTextHeader}>INGREDIENTS</Text>
            {props.ingredients.map((item, index) => (
              <Text style={styles.recipeText} key={index}>
                {quantities.length != 0 && quantities[index] > 0 ? `${parseFloat(quantities[index].toString()).toFixed(1)} ` : null}
                {props.ingredient_units.length != 0 && props.ingredient_units[index] !== "unknown unit" 
                  ? `${props.ingredient_units[index]} ` 
                  : null
                }
                {capitalizeFirstLetter(item)}
              </Text>
            ))}

            {/* Recipe cooking instructions */}
            <Text style={styles.recipeTextHeader}>COOKING INSTRUCTIONS</Text>
            {props.cook_steps.map((item, index) => (
              <Text style={styles.recipeText} key={index}>{index + 1}. {capitalizeFirstLetter(item)}</Text>
            ))}

            {/* Recipe nutrition information */}
            <Text style={styles.recipeTextHeader}>NUTRITION</Text>
            {props.nutrition.map((item, index) => (
              index === 0 ? (
                  <Text style={styles.recipeText} key={index}>{nutrition[index]}: {Math.round(Number(servings) / props.servings * item)} Calories</Text>
                ) : (
                  <Text style={styles.recipeText} key={index}>{nutrition[index]}: {Math.round(Number(servings) / props.servings * item)}% Daily Value</Text>
                )
            ))}

            {/* Set recipe servings/date */}
            <View style={styles.recipeInputContainer}>
              <Text style={styles.recipeInputText}>Servings:  </Text>
              <TextInput
                style={styles.recipeServingsInput}
                value={servings}
                onChangeText={(value) => adjustQuantities(value)}
              />
              <Text style={styles.recipeInputText}>Date:  </Text>
              <TouchableOpacity style={styles.recipeDateInput} onPress={openDatePicker}>
                <Text style={styles.recipeInputText}>{date.toLocaleDateString()}</Text>
              </TouchableOpacity>
            </View>

            {/* Recipe date picker */}
            <Modal
              isVisible={isDatePickerVisible}
              onBackdropPress={closeDatePicker}
              animationIn="slideInUp"
              animationOut="slideOutDown"
              style={styles.window}
              backdropOpacity={0.0}
            >
              <Pressable style={styles.datePickerSpacer} onPress={closeDatePicker}></Pressable>
              <View>
                <View style={styles.doneButtonContainer}>
                  <TouchableOpacity onPress={closeDatePicker}>
                    <Text style={styles.doneButtonText}>Done</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.datePicker}>
                  {isDatePickerVisible && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display="spinner"
                      onChange={(event, value) => {if (value) setDate(value);}}
                    />
                  )}
                </View>
              </View>
            </Modal>

            {/* Cancel/add recipe to meal plan */}
            <View style={styles.recipeInputContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={closeWindow}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addButton} onPress={addRecipe}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.scrollerSpacer}></View>
          </ScrollView>
        </Modal>
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    shadowColor: "black",
  },
  title: {
    marginLeft: 32,
    fontSize: 28,
  },
  window: {
    margin: 0,
    flex: 1,
  },
  recipeContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  recipeHeader: {
    marginTop: 75,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    marginLeft: 20,
  },
  bookmark: {
    marginHorizontal: 25,
  },
  recipeTitle: {
    marginTop: 28,
    marginHorizontal: 25,
    fontSize: 28,
    fontWeight: 600,
  },
  recipeDescription: {
    marginTop: 30,
    marginHorizontal: 25,
    fontSize: 16,
    fontStyle: "italic",
    color: "gray",
  },
  recipeTextHeader: {
    marginTop: 35,
    marginHorizontal: 25,
    fontWeight: 600,
    color: "gray",
  },
  recipeText: {
    marginTop: 10,
    marginHorizontal: 25,
    fontSize: 16,
  },
  recipeInputContainer: {
    marginTop: 35,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  recipeInputText: {
    fontSize: 16,
  },
  recipeServingsInput: {
    marginRight: 20,
    width: 70,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "lightgray",
    padding: 11,
    fontSize: 16,
  },
  recipeDateInput: {
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#f0f0f0",
  },
  datePickerSpacer: {
    flex: 1,
  },
  datePicker: {
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
    fontSize: 20,
    fontWeight: 600,
    color: "#2fb1ff",
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
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff8667",
  },
  addButton: {
    width: 90,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#ff8667",
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  scrollerSpacer: {
    height: 250,
  },
});

export default RecipeItem;