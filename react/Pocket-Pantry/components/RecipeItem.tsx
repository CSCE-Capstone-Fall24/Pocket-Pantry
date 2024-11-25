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

const RecipeItem = (props: RecipeProps) => {}

export default RecipeItem;
