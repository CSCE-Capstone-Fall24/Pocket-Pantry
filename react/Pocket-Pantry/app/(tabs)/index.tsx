import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Pressable, Alert } from "react-native";
import { BlurView } from "expo-blur";
import Ionicons from "@expo/vector-icons/Ionicons";
import MealItem from "@/components/MealItem";
import RecipeItem from "@/components/RecipeItem";

export default function MealPlan () {
  interface Recipe {
    recipeId: string;
    name: string;
    recipeServings: number;
    ingredients: string[];
    ingredientUnits: string[];
    ingredientQuantities: number[];
    cookTime: number;
    recipeSteps: string;
  }

  const [recipes, setRecipes] = useState<Recipe[]>([
    { recipeId: "1", name: "Recipe1", recipeServings: 1, 
      ingredients: ["apple", "orange", "tomato"], ingredientUnits: ["lbs", "oz", "purple"], ingredientQuantities: [1, 2, 3], 
      cookTime: 15, recipeSteps: "Don't burn the kitchen down"
    },
    { recipeId: "2", name: "Recipe2", recipeServings: 1, 
      ingredients: ["apple", "orange", "tomato"], ingredientUnits: ["lbs", "oz", "purple"], ingredientQuantities: [1, 2, 3], 
      cookTime: 30, recipeSteps: "Don't burn the kitchen down"
    },
    { recipeId: "3", name: "Recipe3", recipeServings: 1, 
      ingredients: ["apple", "orange", "tomato"], ingredientUnits: ["lbs", "oz", "purple"], ingredientQuantities: [1, 2, 3], 
      cookTime: 45, recipeSteps: "Don't burn the kitchen down"
    },
    { recipeId: "4", name: "Recipe4", recipeServings: 1, 
      ingredients: ["apple", "orange", "tomato"], ingredientUnits: ["lbs", "oz", "purple"], ingredientQuantities: [1, 2, 3], 
      cookTime: 60, recipeSteps: "Don't burn the kitchen down"
    },
    { recipeId: "5", name: "Recipe1", recipeServings: 1, 
      ingredients: ["apple", "orange", "tomato"], ingredientUnits: ["lbs", "oz", "purple"], ingredientQuantities: [1, 2, 3], 
      cookTime: 15, recipeSteps: "Don't burn the kitchen down"
    },
    { recipeId: "6", name: "Recipe2", recipeServings: 1, 
      ingredients: ["apple", "orange", "tomato"], ingredientUnits: ["lbs", "oz", "purple"], ingredientQuantities: [1, 2, 3], 
      cookTime: 30, recipeSteps: "Don't burn the kitchen down"
    },
    { recipeId: "7", name: "Recipe3", recipeServings: 1, 
      ingredients: ["apple", "orange", "tomato"], ingredientUnits: ["lbs", "oz", "purple"], ingredientQuantities: [1, 2, 3], 
      cookTime: 45, recipeSteps: "Don't burn the kitchen down"
    },
    { recipeId: "8", name: "Recipe4", recipeServings: 1, 
      ingredients: ["apple", "orange", "tomato"], ingredientUnits: ["lbs", "oz", "purple"], ingredientQuantities: [1, 2, 3], 
      cookTime: 60, recipeSteps: "Don't burn the kitchen down"
    }
  ]);

  {/* Functions - recipe search window */}
  const [isWindowVisible, setWindowVisible] = useState(false);
  const openWindow = () => setWindowVisible(true);
  const closeWindow = () => setWindowVisible(false);

  {/* Functions - filter window */}
  const [isFilterVisible, setFilterVisible] = useState(false);
  const openFilter = () => setFilterVisible(true);
  const closeFilter = () => setFilterVisible(false);

  {/* Functions - set filters */}
  const filterNames = ["Recipes cookable with inventory"];
  const [filter, setFilter] = useState<boolean[]>(new Array(filterNames.length).fill(false));
  const [tempFilter, setTempFilter] = useState(filter);
  const filterToggle = (index: number) => {
    setTempFilter((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = !updatedState[index];
      return updatedState;
    });
  };
  const filterCancel = () => { setTempFilter(filter); closeFilter(); };
  const filterApply = () => { setFilter(tempFilter); closeFilter(); };

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

              {/* Search bar/filter */}
              <View style={styles.searchBarContainer}>
                <TextInput
                  style={styles.searchBar}
                  placeholder="Search for recipes"
                  placeholderTextColor="gray"
                />
                <TouchableOpacity style={styles.filterButton} onPress={openFilter}>
                  <Ionicons name="options" size={27} color="gray"/>
                </TouchableOpacity>
              </View>

              {/* Close button */}
              <TouchableOpacity style={styles.closeButton} onPress={closeWindow}>
                <Ionicons name="close-outline" size={50} color="gray"/>
              </TouchableOpacity>
            </View>

            {/* Filter window */}
            <Modal
              transparent={true}
              animationType="fade"
              visible={isFilterVisible}
              onRequestClose={closeFilter}
            >
              <View style={[StyleSheet.absoluteFill, styles.blurOverlay]}>
                <BlurView style={StyleSheet.absoluteFill} intensity={30}/>
              </View>
              <View style={styles.filterAlignment}>
                <View style={styles.filterContainer}>
                  <Text style={styles.filterTitle} numberOfLines={1} ellipsizeMode="tail">Filters</Text>

                  {filterNames.map((filterName: string, index: number) => {
                    return (
                      <View key={filterName} style={styles.fieldContainer}>
                        <Text style={styles.fieldText} numberOfLines={1} ellipsizeMode="tail">{filterName}</Text>
                        <Pressable onPress={() => filterToggle(index)}>
                          {tempFilter[index] ? (
                            <Ionicons name="checkbox" size={32} color="gray"/>
                          ) : (
                            <Ionicons name="square-outline" size={32} color="gray"/>
                          )}
                        </Pressable>
                      </View>
                    );
                  })}

                  {/* Cancel/apply filters */}
                  <View style={styles.buttonAlignment}>
                    <TouchableOpacity style={styles.cancelButton} onPress={filterCancel}>
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.applyButton} onPress={filterApply}>
                      <Text style={styles.applyButtonText}>Apply</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            <View style={styles.line}></View>

            {/* Recipe results */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.resultsContainer}>
              {recipes.map((recipe) => (
                <View key={recipe.recipeId}>
                  <RecipeItem
                    key={recipe.recipeId}
                    recipeId={recipe.recipeId}
                    name={recipe.name}
                    recipeServings={recipe.recipeServings}
                    ingredients={recipe.ingredients}
                    ingredientUnits={recipe.ingredientUnits}
                    ingredientQuantities={recipe.ingredientQuantities}
                    cookTime={recipe.cookTime}
                    recipeSteps={recipe.recipeSteps}
                  />
                </View>
              ))}
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
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBarContainer: {
    marginLeft: 35,
    width: "68%",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  searchBar: {
    flex: 1,
    flexShrink: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 16,
  },
  closeButton: {
    marginRight: 24,
  },
  filterButton: {
    paddingHorizontal: 14,
  },
  blurOverlay: {
    backgroundColor: `rgba(0, 0, 0, ${.15})`
  },
  filterAlignment: {
    flex: 1,
    justifyContent: "center",
  },
  filterContainer: {
    marginHorizontal: 35,
    borderRadius: 8,
    padding: 35,
    alignItems: "center",
    backgroundColor: "white",
  },
  filterTitle: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 15,
  },
  fieldContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  fieldText: {
    marginRight: 5,
    fontSize: 16,
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
    borderColor: "gray",
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "white",
  },
  cancelButtonText: {
    color: "gray",
    fontSize: 16,
    fontWeight: "bold",
  },
  applyButton: {
    width: 90,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "gray",
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "gray",
  },
  applyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  line: {
    borderBottomWidth: 0.5,
    borderColor: "lightgray",
  },
  resultsContainer: {
    backgroundColor: "#f0f0f0",
  },
  resultsBuffer: {
    height: 140,
  },
  dateHeader: {
    marginTop: 40,
    marginLeft: 25,
    color: "gray",
    fontWeight: 600,
  },
  itemBuffer: {
    height: 16,
  },
});