import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Pressable, Alert } from 'react-native'
import { BlurView } from 'expo-blur';
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker'

export type RecipeProps = { // view http://47.218.196.222:8000/planned_meals?user_id=4 for more info
    recipeId: string;
    name: string;
    recipeServings: number; // e.g. "default" number of servings - how ever many servings the original recipe calls for
    ingredients: string[];
    ingredientUnits: string[];
    ingredientQuantities: number[];
    cookTime: number; // cook time is in minutes
    recipeSteps: string; // this is cook_steps
};

const RecipeItem = (props: RecipeProps) => {
    // Going into Recipe Search screen
    
    // Need a function to add to planned meals, which should create a MealItem and copy over RecipeProps
        // mealServings will just copy recipeServings, but users will be able to add/remove servings
            // should not be able to do 0 servings, users will just need to remove planned meal at that point
        // mealID will be assigned a random value similar to id in PantryProps
        // users will set date and shared mealProps
    return (
        <View style={styles.recipeContainer}>
            <Text style={styles.recipeText}>
                Test Text
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    recipeContainer: {
        height: 100,
        marginTop: 12,
        marginHorizontal: 12,
        borderRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 5,
        shadowColor: "black",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
    },
    recipeText: {
        // put shit in here
    },
});

export default RecipeItem;