import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Pressable, Alert } from "react-native";
import { BlurView } from "expo-blur";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";

type MealProps = {
  
};

const MealItem = (props: MealProps) => {
  return (
    <View style={styles.container}>
      
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
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
});

export default MealItem;