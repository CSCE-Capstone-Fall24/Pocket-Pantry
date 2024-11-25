import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Pressable, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MealItem from "@/components/MealItem";
import RecipeItem from "@/components/RecipeItem";

export default function MealPlan () {

  {/* Functions - recipe search window */}
  const [isWindowVisible, setWindowVisible] = useState(false);
  const openWindow = () => setWindowVisible(true);
  const closeWindow = () => {
    setWindowVisible(false);
  };

  return (
    <View style={styles.container}> 
      <View style={styles.header}>
        <Text style={styles.title}>Meal Plan</Text>
        <TouchableOpacity style={styles.addButton} onPress={openWindow}>
          <Ionicons name="add-outline" size={40} color="white"/>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Recipe search window */}
        <Modal
          transparent={true}
          animationType="slide"
          visible={isWindowVisible}
          onRequestClose={closeWindow}
        >
          <View style={styles.windowContainer}>
            <View style={styles.windowHeader}> 

              {/* Search bar */}
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

              {/* Close button */}
              <TouchableOpacity style={styles.closeButton} onPress={closeWindow}>
                <Ionicons name="close-outline" size={32} color="white"/>
              </TouchableOpacity>
            </View>

            {/* Filter button */}
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="add-outline" size={20} color="gray"/>
              <Text style={styles.filterText}>Add filter</Text>
            </TouchableOpacity>

            <View style={styles.line}></View>

            {/* Recipe results */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.resultsContainer}>
              <View>

                <RecipeItem/>
                <RecipeItem/>
                <RecipeItem/>
                <RecipeItem/>
                <RecipeItem/>
                <RecipeItem/>
                <RecipeItem/>
                <RecipeItem/>
                <RecipeItem/>
                <RecipeItem/>

              </View>
              <View style={styles.resultsBuffer}></View>
            </ScrollView>
          </View>
        </Modal>

        {/* Display planned meals */}
        <Text style={styles.dateHeader}>WEDNESDAY 11/27/2024</Text>
        <MealItem/>
        <MealItem/>
        <MealItem/>
        <MealItem/>
        <MealItem/>

        <Text style={styles.dateHeader}>SATURDAY 11/30/2024</Text>
        <MealItem/>
        <MealItem/>
        <MealItem/>
        <MealItem/>
        <MealItem/>

        <View style={styles.itemBuffer}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 25,
  },
  title: {
    marginTop: 30,
    marginLeft: 25,
    fontSize: 32,
    fontWeight: 700,
  },
  addButton: {
    marginTop: 25,
    marginRight: 25,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff8667",
  },
  windowContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  windowHeader: {
    marginTop: 75,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBarContainer: {
    marginLeft: 30,
    width: "69%",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  searchBar: {
    marginHorizontal: 14,
    flex: 1,
    flexShrink: 1,
    paddingVertical: 12,
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
  filterButton: {
    marginLeft: 30,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  filterText: {
    fontSize: 16,
    fontWeight: 500,
    color: "gray",
  },
  line: {
    borderBottomWidth: 0.5,
    borderColor: "lightgray",
  },
  resultsContainer: {
    backgroundColor: "#f0f0f0",
  },
  resultsBuffer: {
    height: 40,
  },
  dateHeader: {
    marginTop: 40,
    marginLeft: 25,
    color: "gray",
    fontWeight: 600,
  },
  itemBuffer: {
    height: 12,
  },
});