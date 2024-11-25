import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Pressable, Alert } from "react-native";
import Modal from "react-native-modal"
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";

type RecipeProps = {
  recipeId: string;
  name: string;
  recipeServings: number;
  ingredients: string[];
  ingredientUnits: string[];
  ingredientQuantities: number[];
  cookTime: number;
  recipeSteps: string;
};

const RecipeItem = (props: RecipeProps) => {
  {/* Functions - view recipe window */}
  const [isWindowVisible, setWindowVisible] = useState(false);
  const openWindow = () => setWindowVisible(true);
  const closeWindow = () => setWindowVisible(false);

  return (
    <View style={styles.container}>
      
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{props.name}</Text>
      
      <TouchableOpacity style={styles.addButton} onPress={openWindow}>
          <Ionicons name="add-outline" size={28} color="white"/>
      </TouchableOpacity>

      {/* View recipe window */}
      <Modal
        isVisible={isWindowVisible}
        onBackdropPress={closeWindow}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        style={styles.windowContainer}
        backdropOpacity={0.0}
      >
        <View style={styles.window}>
          <Text style={styles.windowTitle} numberOfLines={1} ellipsizeMode="tail">{props.name}</Text>

          {/* Cancel/add recipe to meal plan */}
          <View style={styles.buttonAlignment}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => { closeWindow(); }}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton} onPress={() => { closeWindow(); }}>
              <Text style={styles.saveButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
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
  addButton: {
    marginRight: 32,
    height: 35,
    width: 35,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff8667",
  },
  windowContainer: {
    margin: 0,
    flex: 1,
    justifyContent: "center",
  },
  window: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  windowTitle: {
    marginTop: 60,
    fontSize: 36,
    fontWeight: 600,
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
});

export default RecipeItem;