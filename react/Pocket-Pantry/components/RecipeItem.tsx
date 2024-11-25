import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Pressable, Alert } from "react-native";
import { BlurView } from "expo-blur";
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
  return (
    <View style={styles.container}>
      <Text>Recipe #1</Text>
      <TouchableOpacity>
        <Ionicons name="pencil" size={26} color="gray"/>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    height: 100,
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
});

export default RecipeItem;